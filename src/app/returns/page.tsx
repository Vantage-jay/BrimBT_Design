// ══════════════════════════════════════════════════════════════
// FILE: src/app/returns/page.tsx
// ══════════════════════════════════════════════════════════════

import Link from 'next/link'
import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12">
        <p className="eyebrow mb-2">Help Centre</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white">Returns & Exchanges</h1>
        <p className="text-[14px] text-brand-gray mt-4 max-w-xl leading-relaxed">We want you to love every piece. If something is not right, we make returns easy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {[
          { num:'1', title:'Request Return', desc:'Log in to your account, find your order, and click Return Items.' },
          { num:'2', title:'Print Label',    desc:'We will email you a prepaid return label within 24 hours.' },
          { num:'3', title:'Get Refund',     desc:'Refund processed within 5–7 days of receiving your return.' },
        ].map((step) => (
          <div key={step.num} className="border border-brand-accent/15 p-7">
            <p className="font-display text-4xl text-brand-accent/20 font-light mb-4">{step.num}</p>
            <p className="font-display text-xl text-brand-white mb-3">{step.title}</p>
            <p className="text-[13px] text-brand-gray leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Eligible for Return</p>
          <ul className="space-y-3">
            {['Unworn and unwashed items','Original tags still attached','Returned within 30 days of delivery','Original packaging preferred'].map((i) => (
              <li key={i} className="flex items-center gap-3 text-[13px] text-brand-gray">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />{i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5 flex items-center gap-2"><XCircle size={14} className="text-red-400" /> Not Eligible</p>
          <ul className="space-y-3">
            {['Final sale and marked-down items','Worn, washed, or altered items','Items returned after 30 days','Intimates and swimwear (hygiene reasons)'].map((i) => (
              <li key={i} className="flex items-center gap-3 text-[13px] text-brand-gray">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />{i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/orders" className="btn-primary flex items-center gap-2"><RotateCcw size={14} /> Start a Return</Link>
        <Link href="/contact" className="text-[11px] tracking-[0.15em] uppercase text-brand-gray border border-brand-accent/20 px-6 py-4 hover:border-brand-accent hover:text-brand-white transition-colors">Contact Support</Link>
      </div>
    </div>
  )
}

