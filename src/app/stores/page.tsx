// ══════════════════════════════════════════════════════════════
// FILE: src/app/stores/page.tsx
// ══════════════════════════════════════════════════════════════

export default function StoresPage() {
  const STORES = [
    { city:'Umuahia',  address:'Shop 89,Zone A,Apumiri Ubakala Umuahia South,Abia State',        hours:'Mon–Sat 9am–7pm, Sun Closed',  phone:'+234 7010315497' },
 /*   { city:'New York',  address:'123 Fifth Avenue, NY 10001',        hours:'Mon–Sat 10am–8pm, Sun 11am–6pm',  phone:'+1 (212) 555-0100' },
    { city:'Los Angeles', address:'456 Rodeo Drive, Beverly Hills',  hours:'Mon–Sat 10am–7pm, Sun 11am–6pm',  phone:'+1 (310) 555-0200' },
    { city:'London',    address:'78 New Bond Street, W1S 1RZ',       hours:'Mon–Sat 10am–7pm, Sun 12pm–5pm',  phone:'+44 20 7946 0300'  },
    { city:'Lagos',     address:'15 Adeola Odeku Street, Victoria Island', hours:'Mon–Sat 10am–7pm',           phone:'+234 1 555 0400'   }, */
  ]
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-16">
        <p className="eyebrow mb-3">Visit Us</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white">Our Stores</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STORES.map((store) => (
          <div key={store.city} className="border border-brand-accent/15 p-8 hover:border-brand-accent/35 transition-colors">
            <p className="eyebrow mb-3">{store.city}</p>
            <p className="font-display text-xl text-brand-white mb-4">{store.address}</p>
            <div className="space-y-2 text-[13px] text-brand-gray">
              <p>Hours: {store.hours}</p>
              <p>Tel: {store.phone}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 border border-brand-accent/15 p-8 bg-brand-accent/[0.02] text-center">
        <p className="font-display text-xl text-brand-white mb-3">Coming Soon</p>
        <p className="text-[13px] text-brand-gray">We are expanding to other places in Nigeria by 2027. Stay tuned.</p>
      </div>
    </div>
  )
}
