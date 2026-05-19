// ══════════════════════════════════════════════════════════════
// FILE: src/app/press/page.tsx
// ══════════════════════════════════════════════════════════════

export default function PressPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-16">
        <p className="eyebrow mb-3">Media</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white">Press & Media</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        <div>
          <p className="eyebrow mb-4">Press Enquiries</p>
          <p className="text-[14px] text-brand-gray leading-[1.9] mb-6">For press enquiries, interview requests, product loans, and collaboration proposals, please contact our PR team directly.</p>
          <div className="space-y-3">
            <p className="text-[13px] text-brand-gray">Email: <a href="mailto:press@brimbtdesign.com" className="text-brand-accent hover:underline">press@brimbtdesign.com</a></p>
            <p className="text-[13px] text-brand-gray">Response time: 1–2 business days</p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Brand Assets</p>
          <p className="text-[14px] text-brand-gray leading-[1.9] mb-6">Download our press kit including brand guidelines, approved logos, product imagery, and founder bios.</p>
          <button className="btn-primary">Download Press Kit</button>
        </div>
      </div>
      <div>
        <p className="eyebrow mb-8">As Seen In</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Vogue', 'Elle', 'Harper\'s Bazaar', 'Business of Fashion', 'WWD', 'Refinery29', 'Who What Wear', 'Grazia'].map((pub) => (
            <div key={pub} className="border border-brand-accent/15 p-6 flex items-center justify-center text-center">
              <p className="font-display text-[15px] text-brand-gray/50 italic">{pub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
