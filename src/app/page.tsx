'use client'

/* ============================================================
   BrimBT Design — Homepage
   File: src/app/page.tsx
   ============================================================ */

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MoveRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

// ── 1. MOCK DATA ───────────────────────────────────────────
// Replace with real API/database calls later

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Body Wrap Dress',
    brand: 'BrimBT Studio',
    slug: 'silk-body-wrap-dress',
    category: 'clothing',
    description: 'Luxurious silk wrap dress with adjustable tie waist.',
    price: 189,
    badge: 'new',
    images: [{ url: '', alt: 'Silk Body Wrap Dress' }],
    variants: [
      { size: 'XS', stock: 4 },
      { size: 'S',  stock: 8 },
      { size: 'M',  stock: 6 },
      { size: 'L',  stock: 3 },
    ],
    rating: 4.9,
    reviewCount: 124,
    isFeatured: true,
    isNew: true,
    createdAt: '2026-01-01',
  },
  {
    id: '2',
    name: 'Cloud Runner Sneakers',
    brand: 'BrinmBT Footwear',
    slug: 'cloud-runner-sneakers',
    category: 'footwear',
    description: 'Ultra-light performance sneakers with cloud sole.',
    price: 142,
    originalPrice: 180,
    badge: 'sale',
    images: [{ url: '', alt: 'Cloud Runner Sneakers' }],
    variants: [
      { size: '38', stock: 5 },
      { size: '39', stock: 7 },
      { size: '40', stock: 4 },
      { size: '41', stock: 2 },
    ],
    rating: 4.8,
    reviewCount: 89,
    isFeatured: true,
    isNew: false,
    createdAt: '2026-01-05',
  },
  {
    id: '3',
    name: 'Linen Wide Leg Set',
    brand: 'BrinmBT Studio',
    slug: 'linen-wide-leg-set',
    category: 'clothing',
    description: 'Breathable linen co-ord set with wide leg trousers.',
    price: 224,
    badge: null,
    images: [{ url: '', alt: 'Linen Wide Leg Set' }],
    variants: [
      { size: 'S',  stock: 6 },
      { size: 'M',  stock: 9 },
      { size: 'L',  stock: 5 },
      { size: 'XL', stock: 3 },
    ],
    rating: 4.7,
    reviewCount: 67,
    isFeatured: true,
    isNew: false,
    createdAt: '2026-01-10',
  },
  {
    id: '4',
    name: 'Sculptured Heel Mule',
    brand: 'BrinmBT Footwear',
    slug: 'sculptured-heel-mule',
    category: 'footwear',
    description: 'Architectural heel mule in premium leather.',
    price: 165,
    badge: 'hot',
    images: [{ url: '', alt: 'Sculptured Heel Mule' }],
    variants: [
      { size: '36', stock: 3 },
      { size: '37', stock: 5 },
      { size: '38', stock: 4 },
      { size: '39', stock: 6 },
    ],
    rating: 4.9,
    reviewCount: 102,
    isFeatured: true,
    isNew: false,
    createdAt: '2026-01-12',
  },
]

const CATEGORIES = [
  { label: 'Clothing & Bodywear', count: '148 pieces', href: '/products?category=clothing',     emoji: '👗', span: 'row-span-2' },
  { label: 'Footwear',            count: '84 pairs',   href: '/products?category=footwear',      emoji: '👟', span: '' },
  { label: 'Bags',                count: '52 styles',  href: '/products?category=bags',          emoji: '👜', span: '' },
  { label: 'Accessories',         count: '96 items',   href: '/products?category=accessories',   emoji: '💍', span: '' },
  { label: 'Essentials',          count: '60 items',   href: '/products?category=essentials',    emoji: '🧦', span: '' },
]

// ── 2. ANIMATION VARIANTS ──────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── 3. REVEAL WRAPPER ──────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  )
}

// ── 4. BADGE ───────────────────────────────────────────────

function Badge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    new:     'bg-brand-accent text-brand-black',
    sale:    'bg-red-500 text-white',
    hot:     'bg-orange-500 text-white',
    limited: 'bg-purple-600 text-white',
  }
  return (
    <span className={`absolute top-4 left-4 z-10 text-[9px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 ${styles[type] ?? ''}`}>
      {type}
    </span>
  )
}

// ── 5. PRODUCT CARD ────────────────────────────────────────

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const addItem  = useCartStore((s) => s.addItem)
  const firstVariant = product.variants[0]

  return (
    <Reveal delay={delay}>
      <div className="group cursor-pointer">

        {/* Image area */}
        <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#161412] to-[#221e1a] mb-5 flex items-center justify-center">
          {product.badge && <Badge type={product.badge} />}

          {/* Placeholder emoji — replace with next/image later */}
          <span className="text-6xl opacity-10 font-display select-none">
            {product.category === 'footwear' ? '👟' : '👗'}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Quick Add button */}
          <motion.button
            initial={{ y: 16, opacity: 0 }}
            whileHover={{ y: 0,  opacity: 1 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-brand-white text-brand-black text-[10px] font-medium tracking-[0.2em] uppercase px-7 py-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => addItem(product, firstVariant.size, 1)}
          >
            Quick Add
          </motion.button>
        </div>

        {/* Info */}
        <div className="px-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-1.5">
            {product.brand}
          </p>
          <p className="font-display text-xl text-brand-white mb-3 leading-tight">
            {product.name}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-brand-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[12px] text-brand-gray line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {/* Wishlist */}
            <button
              aria-label="Add to wishlist"
              className="w-8 h-8 rounded-full border border-brand-accent/25 flex items-center justify-center text-brand-gray hover:border-brand-accent hover:text-brand-accent transition-all text-sm"
            >
              ♡
            </button>
          </div>

          {/* Sizes */}
          <div className="flex gap-1.5 mt-3">
            {product.variants.map((v) => (
              <span
                key={v.size}
                className="text-[9px] text-brand-gray border border-white/10 px-2 py-1 hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                {v.size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ── 6. HERO SECTION ────────────────────────────────────────

function Hero() {
  return (
    <section className="relative h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden -mt-[80px]">

      {/* Left — Text */}
      <div className="relative z-10 flex flex-col justify-end px-15 pb-24 bg-brand-black">
        <motion.p
          className="eyebrow mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          New Collection — SS 2026
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(52px,6vw,88px)] font-light leading-[1.05] text-brand-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Wear Your<br />
          <em className="italic text-brand-accent">Confidence</em><br />
          Bare Your Style
        </motion.h1>

        <motion.p
          className="mt-7 text-sm text-brand-gray leading-[1.9] max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Precision-crafted bodywear, performance footwear, and elevated
          everyday essentials — designed for those who move with intention.
        </motion.p>

        <motion.div
          className="mt-14 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link href="/products" className="btn-primary">
            Shop Collection
          </Link>
          <Link href="/collections" className="btn-ghost group">
            Explore Lookbook
            <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Right — Image placeholder */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-[#1c1714] to-[#2a2420]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        {/* Gradient bleed into left panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent z-10 w-2/5" />

        {/* Placeholder — swap with next/image when you have product photos */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-display text-[160px] text-brand-accent/5 select-none tracking-tight leading-none">
            BT
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 right-14 z-20 flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-brand-accent" />
          <p className="text-[9px] tracking-[0.3em] uppercase text-brand-accent [writing-mode:vertical-rl]">
            Scroll
          </p>
        </div>
      </motion.div>
    </section>
  )
}

// ── 7. TICKER ──────────────────────────────────────────────

function Ticker() {
  const items = [
    'Free Shipping Over $150',
    'New SS 2026 Collection Now Live',
    'Premium Quality Bodywear',
    'Easy Returns · 30 Days',
    'Exclusive Members-Only Drops',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="border-y border-brand-accent/20 bg-brand-accent/[0.04] py-3.5 overflow-hidden">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.25em] uppercase text-brand-accent px-12 flex-shrink-0"
          >
            {item}
            <span className="text-brand-gray mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── 8. CATEGORIES SECTION ──────────────────────────────────

function Categories() {
  return (
    <section className="section-pad">
      {/* Header */}
      <Reveal className="flex justify-between items-end mb-16">
        <div>
          <p className="eyebrow mb-3">Shop by Category</p>
          <h2 className="section-title">
            Browse Our <em>Collections</em>
          </h2>
        </div>
        <Link href="/products" className="text-[11px] tracking-[0.18em] uppercase text-brand-gray border-b border-brand-gray pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">
          View All
        </Link>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[680px]">
        {CATEGORIES.map((cat, i) => (
          <Reveal
            key={cat.label}
            delay={i * 0.08}
            className={`relative overflow-hidden group cursor-pointer ${i === 0 ? 'row-span-2' : ''}`}
          >
            <Link href={cat.href} className="block w-full h-full">
              {/* Background */}
              <div className="w-full h-full bg-gradient-to-br from-[#1c1714] to-[#2a2018] flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
                <span className="text-8xl opacity-[0.07] font-display select-none">
                  {cat.emoji}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 overlay-bottom" />

              {/* Content */}
              <div className="absolute bottom-8 left-8">
                <p className="eyebrow mb-2">{i === 0 ? 'Category' : 'Category'}</p>
                <h3 className="font-display text-2xl font-light text-brand-white leading-tight">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-brand-gray mt-2 tracking-wide">
                  {cat.count}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-brand-accent/30 flex items-center justify-center text-brand-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowRight size={16} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── 9. FEATURED PRODUCTS ───────────────────────────────────

function FeaturedProducts() {
  return (
    <section className="section-pad pt-0">
      {/* Header */}
      <Reveal className="flex justify-between items-end mb-16">
        <div>
          <p className="eyebrow mb-3">Handpicked For You</p>
          <h2 className="section-title">
            Featured <em>Picks</em>
          </h2>
        </div>
        <Link href="/products" className="text-[11px] tracking-[0.18em] uppercase text-brand-gray border-b border-brand-gray pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">
          All Products
        </Link>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {FEATURED_PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

// ── 10. BRAND STATEMENT ────────────────────────────────────

function BrandStatement() {
  return (
    <section className="border-y border-brand-accent/12 bg-brand-accent/[0.02]">
      <div className="max-w-[1440px] mx-auto px-15 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        <Reveal>
          <blockquote className="font-display text-[clamp(28px,3.5vw,52px)] font-light leading-[1.25] text-brand-white">
            "We believe style begins where{' '}
            <em className="italic text-brand-accent">comfort</em> and{' '}
            <em className="italic text-brand-accent">confidence</em> meet."
          </blockquote>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm text-brand-gray leading-[2] mb-6">
            BrinmBT Design was born from a single belief: that what you wear
            shapes how you move through the world. Every stitch, every sole,
            every silhouette is crafted with that philosophy in mind.
          </p>
          <p className="text-sm text-brand-gray leading-[2] mb-12">
            From premium bodywear to performance footwear — our collections
            bridge the gap between luxury and everyday living.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-brand-accent/15">
            {[
              { num: '12K+', label: 'Happy Customers' },
              { num: '380+', label: 'Products' },
              { num: '4.9★', label: 'Avg. Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-light text-brand-accent leading-none mb-2">
                  {stat.num}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}

// ── 11. PROMO BANNER ───────────────────────────────────────

function PromoBanner() {
  return (
    <section className="section-pad">
      <Reveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1c1611] via-[#2d2018] to-[#1a1410] px-20 py-20 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Watermark */}
          <span
            aria-hidden
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-display text-[200px] font-semibold text-brand-accent/[0.04] leading-none select-none pointer-events-none"
          >
            BT
          </span>

          <div className="relative z-10">
            <p className="eyebrow mb-5">Limited Time Offer</p>
            <h2 className="font-display text-[clamp(32px,4vw,58px)] font-light text-brand-white leading-[1.1] mb-4">
              Summer <em className="italic text-brand-accent">Edit</em> —<br />
              Up to 40% Off
            </h2>
            <p className="text-sm text-brand-gray max-w-md leading-[1.9]">
              Refresh your wardrobe with our curated summer selection.
              Lightweight fabrics, bold silhouettes — all on sale now.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link href="/products?badge=sale" className="btn-primary">
              Shop Sale
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── 12. NEWSLETTER ─────────────────────────────────────────

function Newsletter() {
  return (
    <section className="section-pad pt-0 text-center">
      <Reveal>
        <p className="eyebrow mb-4">Stay in the Loop</p>
        <h2 className="section-title mb-4">
          Join the <em>Inner Circle</em>
        </h2>
        <p className="text-sm text-brand-gray mb-12 max-w-sm mx-auto">
          Early access to drops, exclusive offers, and editorial content —
          delivered to your inbox.
        </p>

        <div className="flex max-w-md mx-auto border border-brand-accent/30 focus-within:border-brand-accent/60 transition-colors">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent px-6 py-4 text-sm text-brand-white placeholder:text-brand-gray focus:outline-none"
          />
          <button className="bg-brand-accent hover:bg-brand-accent-dark transition-colors text-brand-black text-[10px] font-medium tracking-[0.2em] uppercase px-7">
            Subscribe
          </button>
        </div>
      </Reveal>
    </section>
  )
}

// ── 13. PAGE EXPORT ────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Categories />
      <FeaturedProducts />
      <BrandStatement />
      <PromoBanner />
      <Newsletter />
    </>
  )
} 