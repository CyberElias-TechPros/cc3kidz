'use client'
import { useEffect, useRef } from 'react'
import { useIsMobile } from './useIsMobile'

// GPU-acaccelerated shader background - procedural liquid gradient
// Mobile: static gradient fallback to save GPU

const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const frag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uIntensity;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 m = uMouse / uResolution;
  
  // Liquid distortion
  float t = uTime * 0.15;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;
  
  // Mouse influence
  float md = length(p - (m * 2.0 - 1.0) * 0.5);
  float mouseWobble = (1.0 - smoothstep(0.0, 2.0, md)) * 0.3;
  
  // Procedural waves
  float w1 = sin(p.x * 2.0 + t) * 0.1;
  float w2 = cos(p.y * 1.5 - t * 0.7) * 0.08;
  float w3 = sin(length(p) * 3.0 - t) * 0.05;
  
  uv.x += w1 * uIntensity + mouseWobble * 0.1;
  uv.y += w2 * uIntensity;
  
  // Iridescent gradient - LoveWorld navy/gold palette
  vec3 c1 = vec3(0.055, 0.106, 0.2); // #0E1B33 navy
  vec3 c2 = vec3(0.776, 0.627, 0.290); // #C6A04A gold
  vec3 c3 = vec3(0.251, 0.620, 0.737); // #409EBD teal accent
  vec3 c4 = vec3(0.95, 0.96, 0.98); // near white
  
  float d = length(uv - 0.5);
  float n = noise(uv * 3.0 + t * 0.1) * 0.015;
  
  vec3 col = mix(c1, c2, smoothstep(0.1, 0.7, uv.x + w3 + n));
  col = mix(col, c3, smoothstep(0.3, 0.9, uv.y + w1 * 0.5) * 0.4);
  col = mix(col, c4, smoothstep(0.6, 1.0, d) * 0.15);
  
  // Subtle vignette
  float vignette = 1.0 - smoothstep(0.5, 1.2, d);
  col *= 0.85 + vignette * 0.15;
  
  // Chromatic edge
  col.r += sin(uv.x * 12.0 + t) * 0.008 * uIntensity;
  col.b += cos(uv.y * 10.0 - t) * 0.008 * uIntensity;
  
  gl_FragColor = vec4(col, 1.0);
}
`

export function WebGLShader({ className, intensity = 1, opacity = 0.9 }: { className?: string; intensity?: number; opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { shouldReduce } = useIsMobile()
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (shouldReduce) return // mobile: use CSS fallback, no WebGL
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const vertShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertShader, vert)
    gl.compileShader(vertShader)

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragShader, frag)
    gl.compileShader(fragShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const posLoc = gl.getAttribLocation(program, 'position')
    const timeLoc = gl.getUniformLocation(program, 'uTime')
    const resLoc = gl.getUniformLocation(program, 'uResolution')
    const mouseLoc = gl.getUniformLocation(program, 'uMouse')
    const intensLoc = gl.getUniformLocation(program, 'uIntensity')

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = rect.height - (e.clientY - rect.top)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5) // cap for perf
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    let start = performance.now()
    const loop = () => {
      const now = (performance.now() - start) / 1000
      gl.uniform1f(timeLoc, now)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.uniform2f(mouseLoc, mouseRef.current.x * (canvas.width / canvas.clientWidth), mouseRef.current.y * (canvas.height / canvas.clientHeight))
      gl.uniform1f(intensLoc, intensity)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
      try { gl.deleteProgram(program) } catch {}
    }
  }, [shouldReduce, intensity])

  // Mobile fallback: CSS gradient
  if (shouldReduce) {
    return (
      <div
        className={className}
        style={{
          background: 'radial-gradient(900px 520px at 92% 4%, rgba(14,27,51,0.08), transparent 62%), linear-gradient(135deg, #0E1B33 0%, #1a2a4a 50%, #C6A04A 100%)',
          opacity,
        }}
        aria-hidden
      />
    )
  }

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', display: 'block', opacity }} aria-hidden />
}
