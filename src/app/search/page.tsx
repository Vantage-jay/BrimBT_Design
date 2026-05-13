'use client'

/* ============================================================
   BrimBT Design — Search Page
   File: src/app/search/page.tsx
   ============================================================ */

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import ProductGrid from '@/components/products/ProductGrid'
import type { Product } from '@/types'

const ALL_PRODUCTS: Product[] = [
  { id:'1',  name:'Silk Body Wrap Dress',    brand:'BrimBT Studio',   slug:'silk-body-wrap-dress',    category:'clothing',    description:'Luxurious silk wrap dress.',        price:189, badge:'new',     images:[{url:'',alt:''}], variants:[{size:'XS',stock:4},{size:'S',stock:8}],  rating:4.9, reviewCount:124, isFeatured:true,  isNew:true,  createdAt:'2026-01-01' },
  { id:'2',  name:'Cloud Runner Sneakers',   brand:'BrimBT Footwear', slug:'cloud-runner-sneakers',   category:'footwear',    description:'Ultra-light sneakers.',             price:142, originalPrice:180, badge:'sale', images:[{url:'',alt:''}], variants:[{size:'38',stock:5}], rating:4.8, reviewCount:89,  isFeatured:true,  isNew:false, createdAt:'2026-01-05' },
  { id:'3',  name:'Linen Wide Leg Set',      brand:'BrimBT Studio',   slug:'linen-wide-leg-set',      category:'clothing',    description:'Breathable linen co-ord set.',      price:224, badge:null,      images:[{url:'',alt:''}], variants:[{size:'S',stock:6},{size:'M',stock:9}],   rating:4.7, reviewCount:67,  isFeatured:true,  isNew:false, createdAt:'2026-01-10' },
  { id:'4',  name:'Sculptured Heel Mule',    brand:'BrimBT Footwear', slug:'sculptured-heel-mule',    category:'footwear',    description:'Architectural heel mule.',          price:165, badge:'hot',     images:[{url:'',alt:''}], variants:[{size:'36',stock:3}],             rating:4.9, reviewCount:102, isFeatured:true,  isNew:false, createdAt:'2026-01-12' },
  { id:'5',  name:'Ribbed Bodysuit',         brand:'BrimBT Studio',   slug:'ribbed-bodysuit',         category:'clothing',    description:'Seamless ribbed bodysuit.',         price:89,  badge:'new',     images:[{url:'',alt:''}], variants:[{size:'XS',stock:6}],             rating:4.6, reviewCount:58,  isFeatured:false, isNew:true,  createdAt:'2026-01-15' },
  { id:'6',  name:'Platform Chelsea Boot',   brand:'BrimBT Footwear', slug:'platform-chelsea-boot',   category:'footwear',    description:'Chunky platform Chelsea boot.',     price:198, badge:null,      images:[{url:'',alt:''}], variants:[{size:'37',stock:4}],             rating:4.7, reviewCount:43,  isFeatured:false, isNew:false, createdAt:'2026-01-18' },
  { id:'7',  name:'Oversized Blazer',        brand:'BrimBT Studio',   slug:'oversized-blazer',        category:'clothing',    description:'Structured oversized blazer.',      price:265, badge:null,      images:[{url:'',alt:''}], variants:[{size:'S',stock:3}],              rating:4.8, reviewCount:76,  isFeatured:false, isNew:false, createdAt:'2026-01-20' },
  { id:'8',  name:'Woven Tote Bag',          brand:'BrimBT Studio',   slug:'woven-tote-bag',          category:'bags',        description:'Handwoven structured tote.',        price:134, badge:'new',     images:[{url:'',alt:''}], variants:[{size:'One Size',stock:12}],      rating:4.5, reviewCount:34,  isFeatured:false, isNew:true,  createdAt:'2026-01-22' },
  { id:'9',  name:'Gold Chain Necklace',     brand:'BrimBT Studio',   slug:'gold-chain-necklace',     category:'accessories', description:'18k gold-plated necklace.',         price:79,  badge:null,      images:[{url:'',alt:''}], variants:[{size:'One Size',stock:20}],      rating:4.9, reviewCount:91,  isFeatured:false, isNew:false, createdAt:'2026-01-24' },
  { id:'10', name:'Seamless Bike Shorts',    brand:'BrimBT Studio',   slug:'seamless-bike-shorts',    category:'essentials',  description:'High-waist seamless bike shorts.',  price:64,  originalPrice:85, badge:'sale', images:[{url:'',alt:''}], variants:[{size:'XS',stock:8}], rating:4.6, reviewCount:112, isFeatured:false, isNew:false, createdAt:'2026-01-26' },
  { id:'11', name:'Strappy Sandal',          brand:'BrimBT Footwear', slug:'strappy-sandal',          category:'footwear',    description:'Minimalist strappy flat sandal.',   price:118, badge:null,      images:[{url:'',alt:''}], variants:[{size:'36',stock:6}],             rating:4.4, reviewCount:29,  isFeatured:false, isNew:false, createdAt:'2026-01-28' },
  { id:'12', name:'Knit Midi Dress',         brand:'BrimBT Studio',   slug:'knit-midi-dress',         category:'clothing',    description:'Fine-knit midi dress with slit.',   price:178, badge:'limited', images:[{url:'',alt:''}], variants:[{size:'XS',stock:2}],             rating:4.8, reviewCount:55,  isFeatured:false, isNew:false, createdAt:'2026-01-30' },
]

const TRENDING   = ['Silk Dress', 'Sneakers', 'Linen Set', 'Heel Mule', 'Blazer']
const RECENT_KEY = 'brimbt-recent-searches'

function searchProducts(query: string, products: Product[]): Product[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return products.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  )
}

function SearchPageInner() {
  const inputRef             = useRef<HTMLInputElement>(null)
  const [query,  setQuery]   = useState('')
  const [recent, setRecent]  = useState<string[]>([])

  useEffect(() => {
    inputRef.current?.focus()
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')) } catch { /* noop */ }
  }, [])

  useEffect(() => {
    if (!query.trim() || query.length < 3) return
    const timer = setTimeout(() => {
      setRecent((prev) => {
        const updated = [query, ...prev.filter((q) => q !== query)].slice(0, 5)
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
        return updated
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [query])

  const results  = useMemo(() => searchProducts(query, ALL_PRODUCTS), [query])
  const hasQuery = query.trim().length > 0

  const clearRecent = () => { setRecent([]); localStorage.removeItem(RECENT_KEY) }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-10">
        <p className="eyebrow mb-2">BrimBT Design</p>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white mb-8">Search</h1>
        <div className="relative flex items-center border-b-2 border-brand-accent/40 focus-within:border-brand-accent transition-colors pb-2">
          <Search size={20} className="text-brand-gray flex-shrink-0 mr-4" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, categories..."
            autoComplete="off"
            className="flex-1 bg-transparent text-[18px] text-brand-white placeholder:text-brand-gray/40 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-brand-gray hover:text-brand-white transition-colors ml-3">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!hasQuery ? (
          <motion.div key="suggestions" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            {recent.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="eyebrow">Recent Searches</p>
                  <button onClick={clearRecent} className="text-[10px] text-brand-gray hover:text-brand-accent transition-colors">Clear</button>
                </div>
                {recent.map((q) => (
                  <button key={q} onClick={() => setQuery(q)}
                    className="flex items-center gap-3 w-full text-left py-2.5 border-b border-brand-accent/8 group">
                    <Clock size={13} className="text-brand-gray group-hover:text-brand-accent" />
                    <span className="text-[13px] text-brand-gray group-hover:text-brand-accent">{q}</span>
                  </button>
                ))}
              </div>
            )}
            <div>
              <p className="eyebrow mb-5">Trending Now</p>
              {TRENDING.map((q, i) => (
                <button key={q} onClick={() => setQuery(q)}
                  className="flex items-center gap-3 w-full text-left py-2.5 border-b border-brand-accent/8 group">
                  <TrendingUp size={13} className="text-brand-accent" />
                  <span className="text-[13px] text-brand-gray group-hover:text-brand-accent flex-1">{q}</span>
                  <span className="text-[9px] text-brand-gray/40">#{i + 1}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div key="no-results" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="text-center py-24">
            <span className="font-display text-[80px] text-brand-accent/10 leading-none block mb-6 select-none">?</span>
            <p className="font-display text-2xl font-light text-brand-white mb-3">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-[13px] text-brand-gray mb-10 max-w-xs mx-auto">Try a different spelling or browse our collections.</p>
            <Link href="/products" className="btn-primary">Browse All Products</Link>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <p className="text-[12px] text-brand-gray mb-8">
              <span className="text-brand-white font-medium">{results.length}</span> result{results.length !== 1 ? 's' : ''} for{' '}
              <span className="text-brand-accent">&ldquo;{query}&rdquo;</span>
            </p>
            <ProductGrid products={results} columns={4} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SearchPage() {
  return <Suspense><SearchPageInner /></Suspense>
}
