// ══════════════════════════════════════════════════════════════
// FILE: src/app/sizing/page.tsx
// ══════════════════════════════════════════════════════════════

import Link from 'next/link'

const CLOTHING = [
  { size:'XS', bust:'31-32"', waist:'24-25"', hips:'34-35"', uk:'6',  eu:'34' },
  { size:'S',  bust:'33-34"', waist:'26-27"', hips:'36-37"', uk:'8',  eu:'36' },
  { size:'M',  bust:'35-36"', waist:'28-29"', hips:'38-39"', uk:'10', eu:'38' },
  { size:'L',  bust:'37-39"', waist:'30-32"', hips:'40-42"', uk:'12', eu:'40' },
  { size:'XL', bust:'40-42"', waist:'33-35"', hips:'43-45"', uk:'14', eu:'42' },
]
const FOOTWEAR = [
  { us:'5', uk:'2.5', eu:'35', cm:'21.5' }, { us:'6', uk:'3.5', eu:'36', cm:'22.5' },
  { us:'7', uk:'4.5', eu:'37', cm:'23.5' }, { us:'8', uk:'5.5', eu:'38', cm:'24.0' },
  { us:'9', uk:'6.5', eu:'39', cm:'25.0' }, { us:'10', uk:'7.5', eu:'40', cm:'25.5' },
]

export default function SizingPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12">
        <p className="eyebrow mb-2">Fit Guide</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white">Size Guide</h1>
        <p className="text-[14px] text-brand-gray mt-4 max-w-xl leading-relaxed">Use this guide to find your perfect fit. If between sizes, we recommend sizing up.</p>
      </div>
      <div className="border border-brand-accent/15 p-8 mb-12 bg-brand-accent/[0.02]">
        <p className="eyebrow mb-5">How to Measure</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label:'Bust',  desc:'Around the fullest part of your chest, tape parallel to the floor.' },
            { label:'Waist', desc:'Around your natural waistline, the narrowest part of your torso.' },
            { label:'Hips',  desc:'Around the fullest part of your hips, about 8 inches below your waist.' },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[11px] tracking-[0.2em] uppercase text-brand-accent mb-2">{m.label}</p>
              <p className="text-[13px] text-brand-gray leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        <p className="eyebrow mb-6">Clothing & Bodywear</p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="border-b border-brand-accent/20">{['Size','Bust','Waist','Hips','UK','EU'].map((h) => <th key={h} className="text-left py-3 pr-8 text-[10px] tracking-[0.2em] uppercase text-brand-gray font-medium">{h}</th>)}</tr></thead>
            <tbody>{CLOTHING.map((r, i) => <tr key={r.size} className={`border-b border-brand-accent/8 ${i%2===0?'bg-brand-accent/[0.02]':''}`}><td className="py-3.5 pr-8 text-brand-accent font-medium">{r.size}</td><td className="py-3.5 pr-8 text-brand-white">{r.bust}</td><td className="py-3.5 pr-8 text-brand-white">{r.waist}</td><td className="py-3.5 pr-8 text-brand-white">{r.hips}</td><td className="py-3.5 pr-8 text-brand-gray">{r.uk}</td><td className="py-3.5 pr-8 text-brand-gray">{r.eu}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="mb-12">
        <p className="eyebrow mb-6">Footwear</p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="border-b border-brand-accent/20">{['US','UK','EU','CM'].map((h) => <th key={h} className="text-left py-3 pr-8 text-[10px] tracking-[0.2em] uppercase text-brand-gray font-medium">{h}</th>)}</tr></thead>
            <tbody>{FOOTWEAR.map((r, i) => <tr key={r.us} className={`border-b border-brand-accent/8 ${i%2===0?'bg-brand-accent/[0.02]':''}`}><td className="py-3.5 pr-8 text-brand-accent font-medium">{r.us}</td><td className="py-3.5 pr-8 text-brand-white">{r.uk}</td><td className="py-3.5 pr-8 text-brand-white">{r.eu}</td><td className="py-3.5 pr-8 text-brand-gray">{r.cm}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="border-t border-brand-accent/12 pt-8 flex gap-4">
        <Link href="/contact" className="btn-primary">Still Unsure? Contact Us</Link>
      </div>
    </div>
  )
}
