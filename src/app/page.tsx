'use client'

/* ============================================================
   BrimBT Design — Homepage (Light Theme)
   File: src/app/page.tsx
   ============================================================ */

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MoveRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

// ── Mock Data ──────────────────────────────────────────────

const FEATURED_PRODUCTS: Product[] = [
  { id:'1', name:'Silk Body Wrap Dress',  brand:'BrimBT Studio',   slug:'silk-body-wrap-dress',  category:'clothing', description:'Luxurious silk wrap dress.',    price:189, badge:'new',  images:[{url:'',alt:''}], variants:[{size:'XS',stock:4},{size:'S',stock:8},{size:'M',stock:6},{size:'L',stock:3}],   rating:4.9, reviewCount:124, isFeatured:true, isNew:true,  createdAt:'2026-01-01' },
  { id:'2', name:'Cloud Runner Sneakers', brand:'BrimBT Footwear', slug:'cloud-runner-sneakers', category:'footwear', description:'Ultra-light sneakers.',         price:142, originalPrice:180, badge:'sale', images:[{url:'',alt:''}], variants:[{size:'38',stock:5},{size:'39',stock:7},{size:'40',stock:4},{size:'41',stock:2}], rating:4.8, reviewCount:89,  isFeatured:true, isNew:false, createdAt:'2026-01-05' },
  { id:'3', name:'Linen Wide Leg Set',    brand:'BrimBT Studio',   slug:'linen-wide-leg-set',    category:'clothing', description:'Breathable linen co-ord set.',  price:224, badge:null,   images:[{url:'',alt:''}], variants:[{size:'S',stock:6},{size:'M',stock:9},{size:'L',stock:5},{size:'XL',stock:3}],  rating:4.7, reviewCount:67,  isFeatured:true, isNew:false, createdAt:'2026-01-10' },
  { id:'4', name:'Sculptured Heel Mule',  brand:'BrimBT Footwear', slug:'sculptured-heel-mule',  category:'footwear', description:'Architectural heel mule.',      price:165, badge:'hot',  images:[{url:'',alt:''}], variants:[{size:'36',stock:3},{size:'37',stock:5},{size:'38',stock:4},{size:'39',stock:6}], rating:4.9, reviewCount:102, isFeatured:true, isNew:false, createdAt:'2026-01-12' },
]

const CATEGORIES = [
  { label:'Clothing & Bodywear', count:'148 pieces', href:'/products?category=clothing',   emoji:'👗' },
  { label:'Footwear',            count:'84 pairs',   href:'/products?category=footwear',    emoji:'👟' },
  { label:'Bags',                count:'52 styles',  href:'/products?category=bags',        emoji:'👜' },
  { label:'Accessories',         count:'96 items',   href:'/products?category=accessories', emoji:'💍' },
  { label:'Essentials',          count:'60 items',   href:'/products?category=essentials',  emoji:'🧦' },
]

// ── Reveal ─────────────────────────────────────────────────

function Reveal({ children, delay=0, className='' }: { children:React.ReactNode; delay?:number; className?:string }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.8, ease:[0.22,1,0.36,1], delay }}>
      {children}
    </motion.div>
  )
}

// ── Badge ──────────────────────────────────────────────────

function Badge({ type }: { type: string }) {
  const styles: Record<string,string> = {
    new:     'bg-brand-accent text-white',
    sale:    'bg-red-500 text-white',
    hot:     'bg-orange-500 text-white',
    limited: 'bg-purple-600 text-white',
  }
  return (
    <span className={`absolute top-3 left-3 z-10 text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 ${styles[type] ?? ''}`}>
      {type}
    </span>
  )
}

// ── Product Card ───────────────────────────────────────────

function ProductCard({ product, delay }: { product:Product; delay:number }) {
  const addItem      = useCartStore((s) => s.addItem)
  const firstVariant = product.variants[0]

  return (
    <Reveal delay={delay}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden aspect-[3/4] bg-brand-surface-2 mb-4 flex items-center justify-center">
          {product.badge && <Badge type={product.badge} />}
          <span className="text-6xl opacity-20 font-display select-none">
            {product.category === 'footwear' ? '👟' : '👗'}
          </span>
          <div className="absolute inset-0 bg-brand-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <motion.button
            initial={{ y:16, opacity:0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-black text-white text-[10px] font-medium tracking-[0.2em] uppercase px-6 py-2.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-brand"
            onClick={() => addItem(product, firstVariant.size, 1)}
          >
            Quick Add
          </motion.button>
        </div>
        <div className="px-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-brand-text-muted mb-1">{product.brand}</p>
          <p className="font-display text-[18px] text-brand-black mb-2 leading-tight">{product.name}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-brand-black font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-[12px] text-brand-text-muted line-through">${product.originalPrice}</span>
              )}
            </div>
            <button className="w-7 h-7 rounded-full border border-brand-accent/30 flex items-center justify-center text-brand-text-muted hover:border-brand-accent hover:text-brand-accent transition-all text-sm">♡</button>
          </div>
          <div className="flex gap-1.5 mt-2">
            {product.variants.map((v) => (
              <span key={v.size} className="text-[9px] text-brand-text-muted border border-brand-accent/20 px-2 py-0.5 hover:border-brand-accent hover:text-brand-accent transition-colors">
                {v.size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ── Hero ───────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden -mt-[80px]">
      {/* Left */}
      <div className="flex flex-col justify-end px-6 lg:px-15 pb-20 pt-32 bg-brand-cream relative">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage:'repeating-linear-gradient(45deg,#b8860b 0,#b8860b 1px,transparent 0,transparent 50%)', backgroundSize:'20px 20px' }} />

        <div className="relative z-10">
          <motion.p className="eyebrow mb-6" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}>
            New Collection — SS 2026
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(48px,6vw,84px)] font-light leading-[1.05] text-brand-black"
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8, ease:[0.22,1,0.36,1] }}
          >
            Wear Your<br />
            <em className="italic text-brand-accent">Confidence</em><br />
            Bare Your Style
          </motion.h1>
          <motion.p className="mt-6 text-[14px] text-brand-text-secondary leading-[1.9] max-w-sm"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7, duration:0.7 }}>
            Precision-crafted bodywear, performance footwear, and elevated everyday essentials — designed for those who move with intention.
          </motion.p>
          <motion.div className="mt-10 flex items-center gap-6"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, duration:0.7 }}>
            <Link href="/products" className="btn-primary">Shop Collection</Link>
            <Link href="/collections" className="btn-ghost group">
              Explore Lookbook
              <MoveRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-brand-surface-2 to-brand-cream min-h-[50vh] md:min-h-0"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2, delay:0.2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[200px] font-semibold text-brand-accent/10 select-none leading-none tracking-tight">BT</span>
        </div>
        <div className="absolute bottom-16 right-10 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-brand-accent" />
          <p className="text-[9px] tracking-[0.3em] uppercase text-brand-accent [writing-mode:vertical-rl]">Scroll</p>
        </div>
      </motion.div>
    </section>
  )
}

// ── Ticker ─────────────────────────────────────────────────

function Ticker() {
  const items = ['Free Shipping Over $150','New SS 2026 Collection','Premium Quality Bodywear','Easy Returns · 30 Days','Members-Only Drops']
  const doubled = [...items, ...items]
  return (
    <div className="border-y border-brand-accent/20 bg-brand-accent-bg py-3 overflow-hidden">
      <div className="ticker-track flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-[11px] tracking-[0.25em] uppercase text-brand-accent px-10 flex-shrink-0">
            {item} <span className="text-brand-accent/40 mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Categories ─────────────────────────────────────────────

function Categories() {
  return (
    <section className="section-pad bg-brand-white">
      <Reveal className="flex justify-between items-end mb-14">
        <div>
          <p className="eyebrow mb-3">Shop by Category</p>
          <h2 className="section-title">Browse Our <em>Collections</em></h2>
        </div>
        <Link href="/products" className="text-[11px] tracking-[0.18em] uppercase text-brand-text-muted border-b border-brand-text-muted pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">
          View All
        </Link>
      </Reveal>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[640px]">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.label} delay={i*0.08}
            className={`relative overflow-hidden group cursor-pointer ${i===0 ? 'row-span-2' : ''}`}>
            <Link href={cat.href} className="block w-full h-full">
              <div className="w-full h-full bg-brand-surface-2 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
                <span className="text-7xl opacity-30 select-none">{cat.emoji}</span>
              </div>
              <div className="absolute inset-0 overlay-bottom" />
              <div className="absolute bottom-6 left-6">
                <p className="eyebrow mb-1.5">{cat.label}</p>
                <p className="text-[11px] text-brand-text-muted">{cat.count}</p>
              </div>
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-brand-accent/40 bg-brand-white/80 flex items-center justify-center text-brand-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowRight size={14} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Featured Products ───────────────────────────────────────

function FeaturedProducts() {
  return (
    <section className="section-pad bg-brand-surface pt-0">
      <Reveal className="flex justify-between items-end mb-14">
        <div>
          <p className="eyebrow mb-3">Handpicked For You</p>
          <h2 className="section-title">Featured <em>Picks</em></h2>
        </div>
        <Link href="/products" className="text-[11px] tracking-[0.18em] uppercase text-brand-text-muted border-b border-brand-text-muted pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">
          All Products
        </Link>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {FEATURED_PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i*0.1} />
        ))}
      </div>
    </section>
  )
}

// ── Brand Statement ─────────────────────────────────────────

function BrandStatement() {
  return (
    <section className="border-y border-brand-accent/12 bg-brand-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <blockquote className="font-display text-[clamp(26px,3.5vw,48px)] font-light leading-[1.25] text-brand-black">
            &ldquo;We believe style begins where <em className="italic text-brand-accent">comfort</em> and <em className="italic text-brand-accent">confidence</em> meet.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[14px] text-brand-text-secondary leading-[2] mb-5">
            BrimBT Design was born from a single belief: that what you wear shapes how you move through the world. Every stitch, every sole, every silhouette is crafted with that philosophy in mind.
          </p>
          <p className="text-[14px] text-brand-text-secondary leading-[2] mb-10">
            From premium bodywear to performance footwear — our collections bridge the gap between luxury and everyday living.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-accent/12">
            {[{num:'12K+',label:'Happy Customers'},{num:'380+',label:'Products'},{num:'4.9★',label:'Avg. Rating'}].map((stat)=>(
              <div key={stat.label}>
                <p className="font-display text-4xl font-light text-brand-accent leading-none mb-2">{stat.num}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Promo Banner ────────────────────────────────────────────

function PromoBanner() {
  return (
    <section className="section-pad bg-brand-surface">
      <Reveal>
        <div className="relative overflow-hidden bg-brand-black px-12 lg:px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <span aria-hidden className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-display text-[180px] font-semibold text-brand-accent/[0.06] leading-none select-none pointer-events-none">BT</span>
          <div className="relative z-10">
            <p className="eyebrow mb-4">Limited Time Offer</p>
            <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-brand-white leading-[1.1] mb-3">
              Summer <em className="italic text-brand-accent">Edit</em> —<br />Up to 40% Off
            </h2>
            <p className="text-[13px] text-brand-white/60 max-w-sm leading-[1.9]">
              Refresh your wardrobe with our curated summer selection. Lightweight fabrics, bold silhouettes.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <Link href="/products?badge=sale" className="btn-primary">Shop Sale</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── Newsletter ─────────────────────────────────────────────

function Newsletter() {
  return (
    <section className="section-pad pt-0 text-center bg-brand-surface">
      <Reveal>
        <p className="eyebrow mb-3">Stay in the Loop</p>
        <h2 className="section-title mb-4">Join the <em>Inner Circle</em></h2>
        <p className="text-[14px] text-brand-text-secondary mb-10 max-w-sm mx-auto leading-relaxed">
          Early access to drops, exclusive offers, and editorial content — delivered to your inbox.
        </p>
        <div className="flex max-w-md mx-auto border border-brand-accent/30 focus-within:border-brand-accent/60 transition-colors bg-brand-white shadow-brand">
          <input type="email" placeholder="Your email address"
            className="flex-1 bg-transparent px-5 py-4 text-[13px] text-brand-black placeholder:text-brand-text-muted focus:outline-none" />
          <button className="bg-brand-accent hover:bg-brand-accent-dark transition-colors text-white text-[10px] font-medium tracking-[0.2em] uppercase px-6">
            Subscribe
          </button>
        </div>
      </Reveal>
    </section>
  )
}

// ── Page Export ─────────────────────────────────────────────

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
