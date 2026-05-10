'use client'

/* ============================================================
   BrinmBT Design — Product Detail Page
   File: src/app/products/[id]/page.tsx
   ============================================================ */

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Share2, ChevronLeft, ChevronRight,
  Star, Minus, Plus, ChevronDown,
  Truck, RotateCcw, ShieldCheck, ChevronUp,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/types'
import clsx from 'clsx'

// ── 1. MOCK DATA ───────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  { id:'1', name:'Silk Body Wrap Dress',  brand:'BrinmBT Studio',   slug:'silk-body-wrap-dress',  category:'clothing', description:'Luxurious silk wrap dress with adjustable tie waist. Cut from 100% pure silk charmeuse, this dress drapes beautifully against the body. Features a deep V-neckline, long sleeves, and a floor-grazing length that elongates the silhouette.', price:189, badge:'new',  images:[{url:'',alt:'Front View'},{url:'',alt:'Back View'},{url:'',alt:'Detail'}], variants:[{size:'XS',stock:4},{size:'S',stock:8},{size:'M',stock:6},{size:'L',stock:0}],   rating:4.9, reviewCount:124, isFeatured:true,  isNew:true,  createdAt:'2026-01-01' },
  { id:'2', name:'Cloud Runner Sneakers', brand:'BrinmBT Footwear', slug:'cloud-runner-sneakers', category:'footwear', description:'Ultra-light performance sneakers engineered with our proprietary cloud sole technology. The breathable mesh upper keeps your feet cool while the responsive foam midsole absorbs impact with every step.',          price:142, originalPrice:180, badge:'sale', images:[{url:'',alt:'Side View'},{url:'',alt:'Top View'},{url:'',alt:'Sole'}], variants:[{size:'38',stock:5},{size:'39',stock:7},{size:'40',stock:4},{size:'41',stock:0}], rating:4.8, reviewCount:89,  isFeatured:true,  isNew:false, createdAt:'2026-01-05' },
  { id:'3', name:'Linen Wide Leg Set',    brand:'BrinmBT Studio',   slug:'linen-wide-leg-set',    category:'clothing', description:'Breathable linen co-ord set featuring wide leg trousers and a matching relaxed crop top. Crafted from 100% Belgian linen, this set is designed for effortless warm-weather dressing.',                             price:224, badge:null,   images:[{url:'',alt:'Full Look'},{url:'',alt:'Top'},{url:'',alt:'Trousers'}],           variants:[{size:'S',stock:6},{size:'M',stock:9},{size:'L',stock:5},{size:'XL',stock:3}],  rating:4.7, reviewCount:67,  isFeatured:true,  isNew:false, createdAt:'2026-01-10' },
  { id:'4', name:'Sculptured Heel Mule',  brand:'BrinmBT Footwear', slug:'sculptured-heel-mule',  category:'footwear', description:'Architectural heel mule crafted from premium full-grain leather. The sculptured 80mm block heel provides both height and stability, while the open-toe silhouette keeps the look fresh and modern.',              price:165, badge:'hot',  images:[{url:'',alt:'Side View'},{url:'',alt:'Front'},{url:'',alt:'Heel Detail'}],        variants:[{size:'36',stock:3},{size:'37',stock:5},{size:'38',stock:4},{size:'39',stock:6}], rating:4.9, reviewCount:102, isFeatured:true,  isNew:false, createdAt:'2026-01-12' },
  { id:'5', name:'Ribbed Bodysuit',       brand:'BrinmBT Studio',   slug:'ribbed-bodysuit',       category:'clothing', description:'Seamless ribbed bodysuit with a high scoop neck and snap closure at the gusset. Made from a soft cotton-modal blend that moves with you all day.',                                                                 price:89,  badge:'new',  images:[{url:'',alt:'Front'}],                                                           variants:[{size:'XS',stock:6},{size:'S',stock:10},{size:'M',stock:8},{size:'L',stock:4}],  rating:4.6, reviewCount:58,  isFeatured:false, isNew:true,  createdAt:'2026-01-15' },
  { id:'6', name:'Platform Chelsea Boot', brand:'BrinmBT Footwear', slug:'platform-chelsea-boot', category:'footwear', description:'Chunky platform Chelsea boot in smooth vegan leather. Pull-on style with elasticated side panels and a 40mm platform sole.',                                                                                    price:198, badge:null,   images:[{url:'',alt:'Side'}],                                                            variants:[{size:'37',stock:4},{size:'38',stock:6},{size:'39',stock:5},{size:'40',stock:3}], rating:4.7, reviewCount:43,  isFeatured:false, isNew:false, createdAt:'2026-01-18' },
  { id:'7', name:'Oversized Blazer',      brand:'BrinmBT Studio',   slug:'oversized-blazer',      category:'clothing', description:'Structured oversized blazer in a premium wool blend. Single-button closure, notched lapels, and two welt pockets.',                                                                                            price:265, badge:null,   images:[{url:'',alt:'Front'}],                                                           variants:[{size:'S',stock:3},{size:'M',stock:5},{size:'L',stock:4},{size:'XL',stock:2}],  rating:4.8, reviewCount:76,  isFeatured:false, isNew:false, createdAt:'2026-01-20' },
  { id:'8', name:'Woven Tote Bag',        brand:'BrinmBT Studio',   slug:'woven-tote-bag',        category:'bags',     description:'Handwoven structured tote in natural raffia with leather handles. Spacious interior with a zip inner pocket.',                                                                                                price:134, badge:'new',  images:[{url:'',alt:'Front'}],                                                           variants:[{size:'One Size',stock:12}],                                                     rating:4.5, reviewCount:34,  isFeatured:false, isNew:true,  createdAt:'2026-01-22' },
]

// ── 2. SUB-COMPONENTS ──────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <Star key={s} size={13} className={s <= Math.round(rating) ? 'text-brand-accent fill-brand-accent' : 'text-brand-gray'} />
        ))}
      </div>
      <span className="text-[12px] text-brand-gray">{rating} ({count} reviews)</span>
    </div>
  )
}

function ImageGallery({ images }: { images: Product['images'] }) {
  const [active, setActive] = useState(0)
  const prev = useCallback(() => setActive((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() => setActive((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="hidden md:flex flex-col gap-3 w-[72px] flex-shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              'aspect-square bg-gradient-to-br from-[#161412] to-[#221e1a] border-2 transition-colors flex items-center justify-center text-lg text-brand-accent/10 font-display',
              active === i ? 'border-brand-accent' : 'border-transparent hover:border-brand-accent/30'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 relative aspect-[3/4] bg-gradient-to-br from-[#161412] to-[#221e1a] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{    opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.32 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <span className="font-display text-[110px] text-brand-accent/[0.06] leading-none select-none">BT</span>
            <p className="text-[10px] text-brand-gray/40 tracking-widest uppercase">{images[active]?.alt}</p>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-black/50 border border-brand-accent/20 flex items-center justify-center text-brand-gray hover:text-brand-accent transition-colors">
              <ChevronLeft size={15} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-black/50 border border-brand-accent/20 flex items-center justify-center text-brand-gray hover:text-brand-accent transition-colors">
              <ChevronRight size={15} />
            </button>
          </>
        )}

        {/* Mobile dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={clsx('h-1.5 rounded-full transition-all', active === i ? 'w-4 bg-brand-accent' : 'w-1.5 bg-brand-gray/40')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-accent/12">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full py-5">
        <span className="text-[12px] tracking-[0.2em] uppercase text-brand-white font-medium">{title}</span>
        {open ? <ChevronUp size={14} className="text-brand-gray" /> : <ChevronDown size={14} className="text-brand-gray" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden"
          >
            <div className="pb-5 text-[13px] text-brand-gray leading-[1.9]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TrustBadges() {
  const items = [
    { icon: Truck,       label: 'Free Shipping', sub: 'Orders over $150'   },
    { icon: RotateCcw,   label: 'Easy Returns',  sub: '30-day policy'      },
    { icon: ShieldCheck, label: 'Secure Pay',     sub: 'Encrypted checkout' },
  ]
  return (
    <div className="grid grid-cols-3 gap-3 py-6 border-y border-brand-accent/12">
      {items.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex flex-col items-center text-center gap-1.5">
          <Icon size={17} className="text-brand-accent" />
          <p className="text-[10px] text-brand-white tracking-wide">{label}</p>
          <p className="text-[9px] text-brand-gray">{sub}</p>
        </div>
      ))}
    </div>
  )
}

// ── 3. MAIN PAGE ───────────────────────────────────────────

export default function ProductDetailPage() {
  const params  = useParams()
  const addItem = useCartStore((s) => s.addItem)

  const product = ALL_PRODUCTS.find(
    (p) => p.slug === params.id || p.id === String(params.id)
  )

  const [selectedSize, setSelectedSize] = useState('')
  const [quantity,     setQuantity]     = useState(1)
  const [wishlisted,   setWishlisted]   = useState(false)
  const [addedToCart,  setAddedToCart]  = useState(false)
  const [sizeError,    setSizeError]    = useState(false)

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-40 text-center">
        <p className="font-display text-5xl text-brand-white mb-4">Product not found</p>
        <p className="text-brand-gray mb-10">This product may have been removed or the link is incorrect.</p>
        <Link href="/products" className="btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return }
    addItem(product, selectedSize, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const related = ALL_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-10 text-[11px] text-brand-gray">
        <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
        <span className="opacity-30">/</span>
        <Link href="/products" className="hover:text-brand-white transition-colors">Products</Link>
        <span className="opacity-30">/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-brand-white transition-colors capitalize">{product.category}</Link>
        <span className="opacity-30">/</span>
        <span className="text-brand-accent truncate max-w-[160px]">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

        {/* Gallery */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
          <ImageGallery images={product.images} />
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay:0.1 }}>

          {/* Badge */}
          {product.badge && (
            <span className={clsx('inline-block text-[9px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 mb-4',
              product.badge==='new' && 'bg-brand-accent text-brand-black',
              product.badge==='sale' && 'bg-red-500 text-white',
              product.badge==='hot' && 'bg-orange-500 text-white',
              product.badge==='limited' && 'bg-purple-600 text-white',
            )}>
              {product.badge}
            </span>
          )}

          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gray mb-2">{product.brand}</p>
          <h1 className="font-display text-[clamp(30px,3.5vw,48px)] font-light text-brand-white leading-tight mb-4">
            {product.name}
          </h1>

          <div className="mb-5"><StarRating rating={product.rating} count={product.reviewCount} /></div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-brand-accent/12">
            <span className="font-display text-3xl font-light text-brand-white">${product.price}</span>
            {product.originalPrice && <span className="text-lg text-brand-gray line-through">${product.originalPrice}</span>}
            {discountPct && <span className="text-[11px] text-red-400 border border-red-400/30 px-2 py-1">Save {discountPct}%</span>}
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] tracking-[0.2em] uppercase text-brand-white">
                Select Size {selectedSize && <span className="text-brand-accent ml-1">— {selectedSize}</span>}
              </p>
              <Link href="/sizing" className="text-[11px] text-brand-gray underline underline-offset-2 hover:text-brand-accent transition-colors">
                Size Guide
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => { if (v.stock > 0) { setSelectedSize(v.size); setSizeError(false) } }}
                  disabled={v.stock === 0}
                  className={clsx(
                    'min-w-[52px] px-3 py-2.5 border text-[11px] tracking-wide transition-all',
                    v.stock === 0
                      ? 'border-white/5 text-brand-gray/30 cursor-not-allowed line-through'
                      : selectedSize === v.size
                        ? 'border-brand-accent text-brand-accent bg-brand-accent/10'
                        : 'border-white/15 text-brand-gray hover:border-brand-accent hover:text-brand-accent'
                  )}
                >
                  {v.size}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {sizeError && (
                <motion.p initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  className="mt-2 text-[11px] text-red-400">
                  Please select a size to continue.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Quantity + Add to Cart + Wishlist */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center border border-brand-accent/20">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-11 h-12 flex items-center justify-center text-brand-gray hover:text-brand-white transition-colors"><Minus size={13} /></button>
              <span className="w-10 text-center text-sm text-brand-white">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="w-11 h-12 flex items-center justify-center text-brand-gray hover:text-brand-white transition-colors"><Plus size={13} /></button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={clsx(
                'flex-1 h-12 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300',
                addedToCart ? 'bg-green-600 text-white' : 'bg-brand-accent text-brand-black hover:bg-brand-accent-dark'
              )}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </motion.button>

            <button
              onClick={() => setWishlisted((w) => !w)}
              className={clsx(
                'w-12 h-12 border flex items-center justify-center transition-all',
                wishlisted ? 'border-brand-accent bg-brand-accent/10 text-brand-accent' : 'border-brand-accent/20 text-brand-gray hover:border-brand-accent hover:text-brand-accent'
              )}
            >
              <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <button className="flex items-center gap-2 text-[11px] text-brand-gray hover:text-brand-accent transition-colors mb-6">
            <Share2 size={13} /> Share this product
          </button>

          <TrustBadges />

          {/* Accordions */}
          <div className="mt-6">
            <Accordion title="Product Details"><p>{product.description}</p></Accordion>
            <Accordion title="Size & Fit"><p>Model is 5&apos;9&quot; and wears size S. We recommend sizing up if between sizes.</p></Accordion>
            <Accordion title="Materials & Care"><p>Hand wash cold or dry clean only. Do not tumble dry. Iron on low heat.</p></Accordion>
            <Accordion title="Shipping & Returns"><p>Free standard shipping over $150. Free returns within 30 days — items must be unworn with tags attached.</p></Accordion>
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">You May Also Like</p
<h2 className="section-title">Complete the <em>Look</em></h2>
            </div>
            <Link href={`/products?category=${product.category}`} className="text-[11px] tracking-[0.18em] uppercase text-brand-gray border-b border-brand-gray pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:i*0.1 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}