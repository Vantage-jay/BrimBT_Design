// ══════════════════════════════════════════════════════════════
// FILE: src/app/careers/page.tsx
// ══════════════════════════════════════════════════════════════

import Link from 'next/link'

const ROLES = [
  { title:'Senior UI/UX Designer',      dept:'Design',     location:'New York, NY',   type:'Full-time' },
  { title:'Fashion Buyer',              dept:'Merchandising',location:'New York, NY', type:'Full-time' },
  { title:'Digital Marketing Manager', dept:'Marketing',   location:'Remote',         type:'Full-time' },
  { title:'Customer Experience Lead',  dept:'Operations',  location:'New York, NY',   type:'Full-time' },
  { title:'Textile Sourcing Analyst',  dept:'Supply Chain',location:'New York, NY',   type:'Contract'  },
]

export default function CareersPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-16">
        <p className="eyebrow mb-3">Join the Team</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white mb-6">
          Build Something <em className="italic text-brand-accent">Bold</em> With Us
        </h1>
        <p className="text-[14px] text-brand-gray max-w-xl leading-[1.9]">
          We are a small, ambitious team building the next generation of premium fashion. If you care deeply about design, quality, and impact — we want to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title:'Remote Friendly',   desc:'Most roles offer flexible remote or hybrid arrangements.' },
          { title:'Competitive Pay',   desc:'Salaries benchmarked at the 75th percentile for our industry.' },
          { title:'Staff Discount',    desc:'50% discount on all BrimBT Design products.' },
        ].map(({ title, desc }) => (
          <div key={title} className="border border-brand-accent/15 p-6">
            <p className="font-display text-lg text-brand-white mb-2">{title}</p>
            <p className="text-[13px] text-brand-gray leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <p className="eyebrow mb-8">Open Roles</p>
      <div className="space-y-3 mb-16">
        {ROLES.map((role) => (
          <div key={role.title} className="border border-brand-accent/15 p-6 flex items-center justify-between hover:border-brand-accent/35 transition-colors group">
            <div>
              <p className="text-[15px] text-brand-white group-hover:text-brand-accent transition-colors mb-1">{role.title}</p>
              <p className="text-[12px] text-brand-gray">{role.dept} • {role.location} • {role.type}</p>
            </div>
            <Link href="/contact" className="text-[10px] tracking-[0.15em] uppercase text-brand-accent border border-brand-accent/30 px-4 py-2 hover:bg-brand-accent/10 transition-colors">
              Apply
            </Link>
          </div>
        ))}
      </div>

      <div className="border border-brand-accent/20 p-10 text-center">
        <p className="font-display text-2xl text-brand-white mb-3">Don&apos;t see your role?</p>
        <p className="text-[13px] text-brand-gray mb-8">We are always open to exceptional talent. Send us your CV and a note about why you want to join BrimBT Design.</p>
        <Link href="/contact" className="btn-primary">Get in Touch</Link>
      </div>
    </div>
  )
}

