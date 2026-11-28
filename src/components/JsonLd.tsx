export function ChurchJsonLd(){
  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Christ Embassy Central Church 3",
    alternateName: "CE Central Church 3 — CC3 Group, PH Zone 3",
    url: "https://cecentralchurch3.org",
    logo: "https://cecentralchurch3.org/assets/images/loveworld-logo.png",
    description: "Christ Embassy Central Church 3, Port Harcourt — a LoveWorld family raised in the Word, led by the Spirit.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station",
      addressLocality: "Port Harcourt",
      addressRegion: "Rivers State",
      addressCountry: "NG"
    },
    geo: { "@type": "GeoCoordinates", latitude: 4.8427161194266155, longitude: 6.984262611031861 },
    telephone: "+2349058628386",
    sameAs: [
      "https://web.facebook.com/cc3phzone3",
      "https://www.instagram.com/cephzone3",
      "https://www.youtube.com/@ChristEmbassyPHZone3"
    ]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
export function BreadcrumbJsonLd({ items }: { items: { name:string; item?:string }[] }){
  const data = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement: items.map((it, i)=> ({ "@type":"ListItem", position: i+1, name: it.name, item: it.item }))
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
