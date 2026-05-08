/* ============================================================
   BrinmBT Design — Root Layout
   File: src/app/layout.tsx
   ============================================================ */

import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

// ── 1. FONT DEFINITIONS ────────────────────────────────────
// Using next/font for optimized, self-hosted font loading
// (faster than @import, no layout shift)

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-display',
  display:  'swap',
})

const dmSans = DM_Sans({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-body',
  display:  'swap',
})

// ── 2. METADATA ────────────────────────────────────────────
// Controls browser tab title, SEO description, social share previews

export const metadata: Metadata = {
  title: {
    default:  'BrinmBT Design — Premium Bodywear & Footwear',
    template: '%s | BrinmBT Design',   // e.g. "Silk Wrap Dress | BrinmBT Design"
  },
  description:
    'Shop premium bodywear, footwear & lifestyle essentials at BrinmBT Design. Crafted for the intentional — worn by the bold.',
  keywords: [
    'bodywear',
    'footwear',
    'clothing',
    'fashion',
    'BrinmBT Design',
    'premium fashion',
    'women clothing',
    'accessories',
  ],
  authors:  [{ name: 'BrinmBT Design' }],
  creator:  'BrinmBT Design',

  // ── Open Graph (Facebook, WhatsApp previews) ────────────
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://brinmbtdesign.com',
    siteName:    'BrinmBT Design',
    title:       'BrinmBT Design — Premium Bodywear & Footwear',
    description: 'Shop premium bodywear, footwear & lifestyle essentials.',
    images: [
      {
        url:    '/og-image.jpg',   // add this image to /public later
        width:  1200,
        height: 630,
        alt:    'BrinmBT Design',
      },
    ],
  },

  // ── Twitter / X card ────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       'BrinmBT Design',
    description: 'Premium bodywear, footwear & lifestyle essentials.',
    images:      ['/og-image.jpg'],
  },

  // ── Icons ───────────────────────────────────────────────
  icons: {
    icon:        '/favicon.ico',
    apple:       '/apple-touch-icon.png',
  },

  // ── Robots ──────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
  },
}

// ── 3. VIEWPORT ────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor:    '#0a0a0a',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  1,
}

// ── 4. ROOT LAYOUT ─────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-brand-black text-brand-white font-body antialiased">

        {/* ── Navigation (fixed, appears on every page) ── */}
        <Navbar />

        {/* ── Main Content ──────────────────────────────── */}
        {/*
          pt-[80px] offsets content below the fixed navbar.
          min-h-screen ensures footer stays at the bottom
          even on short pages.
        */}
        <main className="min-h-screen pt-[80px]">
          {children}
        </main>

        {/* ── Footer (appears on every page) ────────────── */}
        <Footer />

        {/*
          Cart Drawer will be added here in a later step.
          <CartDrawer />
        */}

      </body>
    </html>
  )
}