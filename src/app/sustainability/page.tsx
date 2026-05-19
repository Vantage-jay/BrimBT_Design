// ══════════════════════════════════════════════════════════════
// FILE: src/app/sustainability/page.tsx
// ══════════════════════════════════════════════════════════════

export default function SustainabilityPage() {
  return (
    <div>
      <section className="min-h-[50vh] flex flex-col justify-end px-6 lg:px-15 pb-20 bg-gradient-to-br from-[#0e1a14] to-[#0a0a0a]">
        <p className="eyebrow mb-4">Our Commitment</p>
        <h1 className="font-display text-[clamp(40px,6vw,80px)] font-light text-brand-white leading-[1.05]">
          Fashion with a <em className="italic text-brand-accent">Future</em>
        </h1>
      </section>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { num:'80%', label:'Sustainably Sourced Materials', desc:'At least 80% of our fabrics are sourced from certified sustainable suppliers.' },
            { num:'0',   label:'Single-Use Plastic in Packaging', desc:'All our packaging is made from recycled or biodegradable materials.' },
            { num:'2027',label:'Carbon Neutral Target', desc:'We are committed to achieving carbon neutrality across our entire supply chain.' },
          ].map((s) => (
            <div key={s.label} className="border border-brand-accent/15 p-8">
              <p className="font-display text-5xl text-brand-accent font-light mb-4">{s.num}</p>
              <p className="font-display text-lg text-brand-white mb-3">{s.label}</p>
              <p className="text-[13px] text-brand-gray leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title:'Materials', body:'We work exclusively with suppliers who meet our strict environmental and ethical standards. Our silk is certified by the Responsible Silk Standard, our linen by the European Flax certification, and our packaging is 100% recycled.' },
            { title:'Manufacturing', body:'All our garments are produced in factories that pay fair wages, provide safe working conditions, and hold GOTS or SA8000 certification. We conduct annual audits and publish our supplier list.' },
            { title:'Packaging', body:'Our boxes, tissue paper, and mailers are made from post-consumer recycled content. We have eliminated all single-use plastic from our packaging and use soy-based inks for printing.' },
            { title:'Giving Back', body:'We donate 1% of every sale to environmental causes through our partnership with 1% for the Planet. We also run an annual take-back programme where customers can return old BrimBT pieces for recycling.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <p className="eyebrow mb-4">{title}</p>
              <p className="text-[14px] text-brand-gray leading-[1.9]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


