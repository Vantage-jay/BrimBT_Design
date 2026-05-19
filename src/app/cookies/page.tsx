// ══════════════════════════════════════════════════════════════
// FILE: src/app/cookies/page.tsx
// ══════════════════════════════════════════════════════════════

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">Cookie Policy</h1>
        <p className="text-[12px] text-brand-gray mt-3">Last updated: January 1, 2026</p>
      </div>
      <div className="space-y-10 text-[14px] text-brand-gray leading-[1.9]">
        {[
          { title:'What Are Cookies', body:'Cookies are small text files placed on your device when you visit our website. They help us provide a better shopping experience by remembering your preferences and understanding how you use our site.' },
          { title:'Essential Cookies', body:'These cookies are necessary for the website to function and cannot be switched off. They include cookies that remember your cart contents, keep you logged in, and enable secure checkout.' },
          { title:'Analytics Cookies', body:'We use analytics cookies to understand how visitors interact with our website. This data helps us improve page performance, navigation, and content. All analytics data is anonymised.' },
          { title:'Marketing Cookies', body:'These cookies track your browsing activity to show you relevant advertising on other platforms. You can opt out of marketing cookies without affecting core site functionality.' },
          { title:'Managing Cookies', body:'You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect your ability to use some features, such as staying logged in or maintaining your cart.' },
          { title:'Contact', body:'For questions about our cookie practices, contact us at privacy@brimbtdesign.com.' },
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


