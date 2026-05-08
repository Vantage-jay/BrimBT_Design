'use client'

/* ============================================================
   BrinmBT Design — Footer Component
   File: src/components/layout/Footer.tsx
   ============================================================ */

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, ArrowRight } from 'lucide-react'
import clsx from 'clsx'

// ── 1. FOOTER DATA ─────────────────────────────────────────

const FOOTER_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'New Arrivals',  href: '/products?badge=new' },
      { label: 'Clothing',      href: '/products?category=clothing' },
      { label: 'Footwear',      href: '/products?category=footwear' },
      { label: 'Accessories',   href: '/products?category=accessories' },
      { label: 'Essentials',    href: '/products?category=essentials' },
      { label: 'Sale',          href: '/products?badge=sale' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Sizing Guide',  href: '/sizing' },
      { label: 'Track Order',   href: '/orders' },
      { label: 'Returns',       href: '/returns' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Contact Us',    href: '/contact' },
      { label: 'FAQ',           href: '/faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',      href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Careers',       href: '/careers' },
      { label: 'Press',         href: '/press' },
      { label: 'Affiliates',    href: '/affiliates' },
      { label: 'Store Locator', href: '/stores' },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'TikTok',    href: 'https://tiktok.com',    icon: null },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: null },
  { label: 'Twitter',   href: 'https://twitter.com',   icon: null },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',    href: '/privacy' },
  { label: 'Terms of Service',  href: '/terms' },
  { label: 'Cookie Policy',     href: '/cookies' },
]

// ── 2. NEWSLETTER FORM ─────────────────────────────────────

function NewsletterInput() {
  const [email,      setEmail]      = useState('')
  const [submitted,  setSubmitted]  = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')

  const handleSubmit = async () => {
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setLoading(true)

    // Simulate API call — replace with real endpoint later
    await new Promise((res) => setTimeout(res, 1000))

    setLoading(false)
    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-brand-accent text-sm tracking-wide"
      >
        ✓ You're on the list. Welcome to the inner circle.
      </motion.p>
    )
  }

  return (
    <div>
      <div className="flex border border-brand-accent/30 focus-within:border-brand-accent/60 transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Your email address"
          className="flex-1 bg-transparent px-4 py-3 text-sm text-brand-white placeholder:text-brand-gray focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          aria-label="Subscribe to newsletter"
          className={clsx(
            'px-4 flex items-center justify-center text-brand-black transition-colors',
            loading
              ? 'bg-brand-accent/60 cursor-wait'
              : 'bg-brand-accent hover:bg-brand-accent-dark'
          )}
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-brand-black/40 border-t-brand-black rounded-full animate-spin" />
            : <ArrowRight size={16} />
          }
        </button>
      </div>
      {error && (
        <p className="mt-2 text-[11px] text-red-400 tracking-wide">{error}</p>
      )}
    </div>
  )
}

// ── 3. MAIN FOOTER ─────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-accent/12 bg-brand-black">

      {/* ── Top Section ──────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-15 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-14">

          {/* Brand Column */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-3xl font-semibold tracking-[0.22em] text-brand-white uppercase block mb-5"
            >
              Brinm<span className="text-brand-accent">BT</span> Design
            </Link>

            {/* Tagline */}
            <p className="text-[13px] text-brand-gray leading-[1.9] max-w-[280px] mb-8">
              Premium bodywear, footwear & lifestyle essentials. Crafted for the intentional — worn by the bold.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="eyebrow mb-4">Join the Inner Circle</p>
              <NewsletterInput />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[10px] tracking-[0.2em] uppercase text-brand-gray hover:text-brand-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow mb-6">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-brand-gray hover:text-brand-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="border-t border-brand-accent/10" />

      {/* ── Bottom Bar ───────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-15 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Copyright */}
        <p className="text-[12px] text-brand-gray tracking-wide">
          © {year} BrinmBT Design. All rights reserved.
        </p>

        {/* Legal Links */}
        <div className="flex items-center gap-6">
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-6">
              <Link
                href={link.href}
                className="text-[11px] text-brand-gray hover:text-brand-white tracking-wide transition-colors"
              >
                {link.label}
              </Link>
              {i < LEGAL_LINKS.length - 1 && (
                <span className="text-brand-accent/30 text-xs">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Payment Icons — text placeholders until you add real icons */}
        <div className="flex items-center gap-3">
          {['Visa', 'Mastercard', 'PayPal', 'Stripe'].map((p) => (
            <span
              key={p}
              className="text-[9px] tracking-[0.1em] uppercase text-brand-gray/50 border border-brand-gray/20 px-2 py-1"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ── Brand Watermark ───────────────────────────────── */}
      <div
        aria-hidden
        className="overflow-hidden pointer-events-none select-none pb-2"
      >
        <p className="font-display text-[10vw] font-semibold tracking-[0.1em] text-brand-accent/[0.03] text-center whitespace-nowrap leading-none">
          BRINMBT DESIGN
        </p>
      </div>

    </footer>
  )
}