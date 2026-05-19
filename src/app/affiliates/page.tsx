// ══════════════════════════════════════════════════════════════
// FILE: src/app/affiliates/page.tsx
// ══════════════════════════════════════════════════════════════

import Link from 'next/link'

export default function AffiliatesPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-16">
        <p className="eyebrow mb-3">Partner With Us</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white">
          Affiliate <em className="italic text-brand-accent">Programme</em>
        </h1>
        <p className="text-[14px] text-brand-gray mt-4 max-w-xl leading-relaxed">Earn commission by sharing BrimBT Design with your audience. Perfect for influencers, bloggers, and content creators.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { rate:'15%', label:'Commission Rate',   desc:'Earn 15% on every sale made through your unique referral link.' },
          { rate:'30',  label:'Cookie Duration',   desc:'30-day cookie window means you earn commission on purchases made within a month of a click.' },
          { rate:'$50', label:'Minimum Payout',    desc:'Payments are made monthly via PayPal or bank transfer once you reach $50 in earnings.' },
        ].map((s) => (
          <div key={s.label} className="border border-brand-accent/15 p-8">
            <p className="font-display text-5xl text-brand-accent font-light mb-3">{s.rate}</p>
            <p className="font-display text-lg text-brand-white mb-2">{s.label}</p>
            <p className="text-[13px] text-brand-gray leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="border border-brand-accent/20 p-10 max-w-lg">
        <p className="eyebrow mb-4">Apply to Join</p>
        <p className="text-[14px] text-brand-gray leading-[1.9] mb-8">Fill out a short application and our team will review it within 3 business days.</p>
        <Link href="/contact" className="btn-primary">Apply Now</Link>
      </div>
    </div>
  )
}
