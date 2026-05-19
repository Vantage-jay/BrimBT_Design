// ══════════════════════════════════════════════════════════════
// FILE: src/app/terms/page.tsx
// ══════════════════════════════════════════════════════════════

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">Terms of Service</h1>
        <p className="text-[12px] text-brand-gray mt-3">Last updated: January 1, 2026</p>
      </div>
      <div className="space-y-10 text-[14px] text-brand-gray leading-[1.9]">
        {[
          { title:'Acceptance of Terms', body:'By accessing or using the BrimBT Design website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.' },
          { title:'Products and Pricing', body:'We reserve the right to modify prices at any time without notice. All prices are in USD. We are not responsible for typographical errors in pricing and reserve the right to cancel orders placed at incorrect prices.' },
          { title:'Orders and Payment', body:'By placing an order you represent that you are authorised to use the payment method provided. We reserve the right to refuse or cancel any order for reasons including product availability, suspected fraud, or pricing errors.' },
          { title:'Intellectual Property', body:'All content on this site including text, images, logos, and design is the property of BrimBT Design and may not be reproduced without written permission.' },
          { title:'Limitation of Liability', body:'BrimBT Design shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our liability is limited to the amount paid for the relevant product.' },
          { title:'Governing Law', body:'These terms are governed by the laws of the State of New York, United States. Any disputes shall be resolved in the courts of New York County.' },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-display text-xl text-brand-white mb-3">{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

