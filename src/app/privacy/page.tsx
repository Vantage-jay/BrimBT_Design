// ══════════════════════════════════════════════════════════════
// FILE: src/app/privacy/page.tsx
// ══════════════════════════════════════════════════════════════

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">Privacy Policy</h1>
        <p className="text-[12px] text-brand-gray mt-3">Last updated: January 1, 2026</p>
      </div>
      <div className="space-y-10 text-[14px] text-brand-gray leading-[1.9]">
        {[
          { title:'Information We Collect', body:'We collect information you provide directly (name, email, address, payment details) and information collected automatically (browsing behavior, device type, IP address) when you use our website.' },
          { title:'How We Use Your Information', body:'We use your information to process orders, send confirmations and shipping updates, provide customer support, personalise your shopping experience, send marketing emails (with your consent), and improve our website and services.' },
          { title:'Sharing Your Information', body:'We do not sell your personal data. We share information only with trusted third-party service providers (payment processors, shipping carriers, email platforms) who help us operate our business, and only to the extent necessary.' },
          { title:'Cookies', body:'We use cookies to keep you logged in, remember your cart, and understand how visitors use our site. You can control cookies through your browser settings. Some features may not function properly if cookies are disabled.' },
          { title:'Your Rights', body:'You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing emails via the unsubscribe link in any email. To exercise these rights, contact us at privacy@brimbtdesign.com.' },
          { title:'Data Security', body:'We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information.' },
          { title:'Contact Us', body:'If you have questions about this Privacy Policy, contact us at privacy@brimbtdesign.com or by mail at BrimBT Design, New York, NY 10001, United States.' },
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


