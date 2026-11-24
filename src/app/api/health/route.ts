export async function GET(){
  const hasDb = !!process.env.DATABASE_URL
  return Response.json({ ok:true, app:'cc3-main', time:new Date().toISOString(), db: hasDb ? 'postgres' : 'file-json (dev)', version:'1.0.0' })
}
