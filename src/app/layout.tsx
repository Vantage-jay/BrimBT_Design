/* ============================================================
   BrimBT Design — Root Layout
   File: src/app/layout.tsx
   ============================================================ */

import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import '@/styles/globals.css'

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

export const metadata: Metadata = {
  title: {
    default:  'BrimBT Design — Premium Bodywear & Footwear',
    template: '%s | BrinmBT Design',
  },
  description: 'Shop premium bodywear, footwear & lifestyle essentials at BrinmBT Design. Crafted for the intentional — worn by the bold.',
  keywords: ['bodywear','footwear','clothing','fashion','BrinmBT Design','premium fashion','accessories'],
  authors:  [{ name: 'BrimBT Design' }],
  creator:  'BrimBT Design',
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://brimbtdesign.com',
    siteName:    'BrimBT Design',
    title:       'BrimBT Design — Premium Bodywear & Footwear',
    description: 'Shop premium bodywear, footwear & lifestyle essentials.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'BrimBT Design' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'BrimBT Design',
    description: 'Premium bodywear, footwear & lifestyle essentials.',
    images:      ['/og-image.jpg'],
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  robots: { index: true, follow: true },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="bg-brand-black text-brand-white font-body antialiased">
        <Navbar />
        <main className="min-h-screen pt-[80px]">
          {children}
        </main>
        <Footer />
        {/* Cart drawer — available on every page */}
        <CartDrawer />
      </body>
    </html>
  )
              }
   
