'use client'

/* ============================================================
   BrinmBT Design — Product Listings Page
   File: src/app/products/page.tsx
   ============================================================ */

import { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import ProductGrid from '@/components/products/ProductGrid'
import type { Product, ProductFilters, ProductCategory, SortOption } from '@/types'
import clsx from 'clsx'

// ── 1. MOCK DATA ───────────────────────────────────────────
// Replace with real API fetch later

const ALL_PRODUCTS: Product[] = [
  { id:'1',  name:'Silk Body Wrap Dress',    brand:'BrinmBT Studio',   slug:'silk-body-wrap-dress',    category:'clothing',   description:'Luxurious silk wrap dress.',        price:189, badge:'new',   images:[{url:'',alt:''}], variants:[{size:'XS',stock:4},{size:'S',stock:8},{size:'M',stock:6},{size:'L',stock:3}],   rating:4.9, reviewCount:124, isFeatured:true,  isNew:true,  createdAt:'2026-01-01' },
  { id:'2',  name:'Cloud Runner Sneakers',   brand:'BrinmBT Footwear', slug:'cloud-runner-sneakers',   category:'footwear',   description:'Ultra-light sneakers.',             price:142, originalPrice:180, badge:'sale', images:[{url:'',alt:''}], variants:[{size:'38',stock:5},{size:'39',stock:7},{size:'40',stock:4},{size:'41',stock:2}], rating:4.8, reviewCount:89,  isFeatured:true,  isNew:false, createdAt:'2026-01-05' },
  { id:'3',  name:'Linen Wide Leg Set',      brand:'BrinmBT Studio',   slug:'linen-wide-leg-set',      category:'clothing',   description:'Breathable linen co-ord set.',      price:224, badge:null,   images:[{url:'',alt:''}], variants:[{size:'S',stock:6},{size:'M',stock:9},{size:'L',stock:5},{size:'XL',stock:3}],  rating:4.7, reviewCount:67,  isFeatured:true,  isNew:false, createdAt:'2026-01-10' },
  { id:'4',  name:'Sculptured Heel Mule',    brand:'BrinmBT Footwear', slug:'sculptured-heel-mule',    category:'footwear',   description:'Architectural heel mule.',          price:165, badge:'hot',  images:[{url:'',alt:''}], variants:[{size:'36',stock:3},{size:'37',stock:5},{size:'38',stock:4},{size:'39',stock:6}], rating:4.9, reviewCount:102, isFeatured:true,  isNew:false, createdAt:'2026-01-12' },
  { id:'5',  name:'Ribbed Bodysuit',         brand:'BrinmBT Studio',   slug:'ribbed-bodysuit',         category:'clothing',   description:'Seamless ribbed bodysuit.',         price:89,  badge:'new',  images:[{url:'',alt:''}], variants:[{size:'XS',stock:6},{size:'S',stock:10},{size:'M',stock:8},{size:'L',stock:4}],  rating:4.6, reviewCount:58,  isFeatured:false, isNew:true,  createdAt:'2026-01-15' },
  { id:'6',  name:'Platform Chelsea Boot',   brand:'BrinmBT Footwear', slug:'platform-chelsea-boot',   category:'footwear',   description:'Chunky platform Chelsea boot.',     price:198, badge:null,   images:[{url:'',alt:''}], variants:[{size:'37',stock:4},{size:'38',stock:6},{size:'39',stock:5},{size:'40',stock:3}], rating:4.7, reviewCount:43,  isFeatured:false, isNew:false, createdAt:'2026-01-18' },
  { id:'7',  name:'Oversized Blazer',        brand:'BrinmBT Studio',   slug:'oversized-blazer',        category:'clothing',   description:'Structured oversized blazer.',      price:265, badge:null,   images:[{url:'',alt:''}], variants:[{size:'S',stock:3},{size:'M',stock:5},{size:'L',stock:4},{size:'XL',stock:2}],  rating:4.8, reviewCount:76,  isFeatured:false, isNew:false, createdAt:'2026-01-20' },
  { id:'8',  name:'Woven Tote Bag',          brand:'BrinmBT Studio',   slug:'woven-tote-bag',          category:'bags',       description:'Handwoven structured tote.',        price:134, badge:'new',  images:[{url:'',alt:''}], variants:[{size:'One Size',stock:12}],                                                     rating:4.5, reviewCount:34,  isFeatured:false, isNew:true,  createdAt:'2026-01-22' },
  { id:'9',  name:'Gold Chain Necklace',     brand:'BrinmBT Studio',   slug:'gold-chain-necklace',     category:'accessories',description:'18k gold-plated chain necklace.',   price:79,  badge:null,   images:[{url:'',alt:''}], variants:[{size:'One Size',stock:20}],                                                     rating:4.9, reviewCount:91,  isFeatured:false, isNew:false, createdAt:'2026-01-24' },
  { id:'10', name:'Seamless Bike Shorts',    brand:'BrinmBT Studio',   slug:'seamless-bike-shorts',    category:'essentials', description:'High-waist seamless bike shorts.',  price:64,  originalPrice:85, badge:'sale', images:[{url:'',alt:''}], variants:[{size:'XS',stock:8},{size:'S',stock:10},{size:'M',stock:7},{size:'L',stock:5}],  rating:4.6, reviewCount:112, isFeatured:false, isNew:false, createdAt:'2026-01-26' },
  { id:'11', name:'Strappy Sandal',          brand:'BrinmBT Footwear', slug:'strappy-sandal',          category:'footwear',   description:'Minimalist strappy flat sandal.',   price:118, badge:null,   images:[{url:'',alt:''}], variants:[{size:'36',stock:6},{size:'37',stock:8},{size:'38',stock:5},{size:'39',stock:4}], rating:4.4, reviewCount:29,  isFeatured:false, isNew:false, createdAt:'2026-01-28' },
  { id:'12', name:'Knit Midi Dress',         brand:'BrinmBT Studio',   slug:'knit-midi-dress',         category:'clothing',   description:'Fine-knit midi dress with slit.',   price:178, badge:'limited', images:[{url:'',alt:''}], variants:[{size:'XS',stock:2},{size:'S',stock:3},{size:'M',stock:2},{size:'L',stock:1}], rating:4.8, reviewCount:55,  isFeatured:false, isNew:false, createdAt:'2026-01-30' },
]

// ── 2. FILTER CONSTANTS ────────────────────────────────────

const CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Products' },
  { value: 'clothing',    label: 'Clothing'     },
  { value: 'footwear',    label: 'Footwear'     },
  { value: 'bags',        label: 'Bags'         },
  { value: 'accessories', label: 'Accessories'  },
  { value: 'essentials',  label: 'Essentials'   },
]

const SIZES_CLOTHING  = ['XS', 'S', 'M', 'L', 'XL']
const SIZES_FOOTWEAR  = ['36', '37', '38', '39', '40', '41']
const SIZES_UNIVERSAL = ['One Size']
const ALL_SIZES       = [...SIZES_CLOTHING, ...SIZES_FOOTWEAR, ...SIZES_UNIVERSAL]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',       label: 'Newest'       },
  { value: 'price-asc',    label: 'Price: Low–High' },
  { value: 'price-desc',   label: 'Price: High–Low' },
  { value: 'rating',       label: 'Top Rated'    },
  { value: 'best-selling', label: 'Best Selling' },
]

const BADGES = [
  { value: 'all',     label: 'All'     },
  { value: 'new',     label: 'New'     },
  { value: 'sale',    label: 'Sale'    },
  { value: 'hot',     label: 'Hot'     },
  { value: 'limited', label: 'Limited' },
]

const DEFAULT_FILTERS: ProductFilters = {
  category:   'all',
  priceRange: [0, 500],
  sizes:      [],
  sort:       'newest',
  badge:      'all',
}

// ── 3. FILTER LOGIC ────────────────────────────────────────

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products]

  // Category
  if (filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category)
  }

  // Price range
  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  )

  // Sizes
  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      p.variants.some((v) => filters.sizes.includes(v.size) && v.stock > 0)
    )
  }

  // Badge
  if (filters.badge && filters.badge !== 'all') {
    result = result.filter((p) => p.badge === filters.badge)
  }

  // Sort
  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'best-selling':
      result.sort((a, b) => b.reviewCount - a.reviewCount)
      break
  }

  return result
}

// ── 4. FILTER SECTION (collapsible) ───────────────────────

interface FilterSectionProps {
  title:     string
  children:  React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-brand-accent/12 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left mb-0"
      >
        <span className="text-[11px] tracking-[0.25em] uppercase text-brand-white font-medium">
          {title}
        </span>
        {open
          ? <ChevronUp size={14} className="text-brand-gray" />
          : <ChevronDown size={14} className="text-brand-gray" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{    height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── 5. FILTERS SIDEBAR ─────────────────────────────────────

interface FilterSidebarProps {
  filters:   ProductFilters
  onChange:  (filters: ProductFilters) => void
  onClear:   () => void
  totalActive: number
}

function FilterSidebar({ filters, onChange, onClear, totalActive }: FilterSidebarProps) {
  const update = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) =>
    onChange({ ...filters, [key]: value })

  const toggleSize = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    update('sizes', sizes)
  }

  return (
    <aside className="w-full lg:w-[240px] flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-5 border-b border-brand-accent/12">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-brand-accent" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-brand-white font-medium">
            Filters
          </span>
          {totalActive > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-accent text-brand-black text-[9px] font-medium flex items-center justify-center">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            onClick={onClear}
            className="text-[10px] tracking-[0.15em] uppercase text-brand-gray hover:text-brand-accent transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => update('category', cat.value)}
              className={clsx(
                'block w-full text-left text-[12px] tracking-wide py-1 transition-colors',
                filters.category === cat.value
                  ? 'text-brand-accent'
                  : 'text-brand-gray hover:text-brand-white'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] text-brand-gray">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={filters.priceRange[1]}
            onChange={(e) =>
              update('priceRange', [filters.priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-brand-accent cursor-pointer"
          />
          <div className="flex gap-2">
            {[100, 200, 300, 500].map((max) => (
              <button
                key={max}
                onClick={() => update('priceRange', [0, max])}
                className={clsx(
                  'text-[9px] px-2 py-1 border transition-colors',
                  filters.priceRange[1] === max
                    ? 'border-brand-accent text-brand-accent'
                    : 'border-white/10 text-brand-gray hover:border-brand-accent hover:text-brand-accent'
                )}
              >
                &lt;${max}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={clsx(
                'text-[9px] px-2.5 py-1.5 border transition-colors',
                filters.sizes.includes(size)
                  ? 'border-brand-accent text-brand-accent bg-brand-accent/10'
                  : 'border-white/10 text-brand-gray hover:border-brand-accent hover:text-brand-accent'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Badge / Tag */}
      <FilterSection title="Collection Tag">
        <div className="space-y-2">
          {BADGES.map((b) => (
            <button
              key={b.value}
              onClick={() => update('badge', b.value as ProductFilters['badge'])}
              className={clsx(
                'block w-full text-left text-[12px] tracking-wide py-1 transition-colors',
                filters.badge === b.value
                  ? 'text-brand-accent'
                  : 'text-brand-gray hover:text-brand-white'
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}

// ── 6. ACTIVE FILTER CHIPS ─────────────────────────────────

interface ActiveChipsProps {
  filters:   ProductFilters
  onChange:  (filters: ProductFilters) => void
}

function ActiveChips({ filters, onChange }: ActiveChipsProps) {
  const chips: { label: string; onRemove: () => void }[] = []

  if (filters.category !== 'all')
    chips.push({ label: filters.category, onRemove: () => onChange({ ...filters, category: 'all' }) })

  if (filters.priceRange[1] < 500)
    chips.push({ label: `Under $${filters.priceRange[1]}`, onRemove: () => onChange({ ...filters, priceRange: [0, 500] }) })

  filters.sizes.forEach((size) =>
    chips.push({ label: `Size ${size}`, onRemove: () => onChange({ ...filters, sizes: filters.sizes.filter((s) => s !== size) }) })
  )

  if (filters.badge && filters.badge !== 'all')
    chips.push({ label: filters.badge, onRemove: () => onChange({ ...filters, badge: 'all' }) })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase border border-brand-accent/30 text-brand-accent px-3 py-1.5 hover:bg-brand-accent/10 transition-colors"
        >
          {chip.label}
          <X size={10} />
        </button>
      ))}
    </div>
  )
}

// ── 7. SORT + VIEW CONTROLS ────────────────────────────────

interface SortBarProps {
  sort:      SortOption
  onSort:    (sort: SortOption) => void
  showMobileFilters: () => void
  activeFilterCount: number
}

function SortBar({ sort, onSort, showMobileFilters, activeFilterCount }: SortBarProps) {
  const [open, setOpen] = useState(false)
  const current = SORT_OPTIONS.find((o) => o.value === sort)

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Mobile filter toggle */}
      <button
        onClick={showMobileFilters}
        className="lg:hidden flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-gray border border-brand-accent/20 px-4 py-2.5 hover:border-brand-accent hover:text-brand-accent transition-colors"
      >
        <SlidersHorizontal size={13} />
        Filters
        {activeFilterCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-brand-accent text-brand-black text-[9px] font-medium flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Sort dropdown */}
      <div className="relative ml-auto">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-gray hover:text-brand-white transition-colors"
        >
          Sort: <span className="text-brand-white">{current?.label}</span>
          <ChevronDown size={13} className={clsx('transition-transform', open && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-3 w-48 bg-brand-black border border-brand-accent/20 py-2 z-20 shadow-xl"
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onSort(opt.value); setOpen(false) }}
                  className={clsx(
                    'block w-full text-left px-5 py-2.5 text-[11px] tracking-wide transition-colors',
                    sort === opt.value
                      ? 'text-brand-accent bg-brand-accent/5'
                      : 'text-brand-gray hover:text-brand-white hover:bg-white/3'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── 8. PAGE HEADER ─────────────────────────────────────────

function PageHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="border-b border-brand-accent/12 mb-12 pb-10">
      <p className="eyebrow mb-3">BrinmBT Design</p>
      <div className="flex items-end justify-between">
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white leading-none">
          {title}
        </h1>
        <span className="text-[12px] text-brand-gray mb-2">
          {count} products
        </span>
      </div>
    </div>
  )
}

// ── 9. MAIN PAGE ───────────────────────────────────────────

const PAGE_SIZE = 8

export default function ProductsPage() {
  const router       = useSearchParams()
  const [filters, setFilters]             = useState<ProductFilters>(DEFAULT_FILTERS)
  const [page, setPage]                   = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loading, setLoading]             = useState(false)

  // Count active filters for badges
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.category !== 'all')       count++
    if (filters.priceRange[1] < 500)      count++
    if (filters.sizes.length > 0)         count += filters.sizes.length
    if (filters.badge && filters.badge !== 'all') count++
    return count
  }, [filters])

  // Apply filters + sort to all products
  const filteredProducts = useMemo(
    () => applyFilters(ALL_PRODUCTS, filters),
    [filters]
  )

  // Paginate
  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE)
  const hasMore         = visibleProducts.length < filteredProducts.length

  const handleFilterChange = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters)
    setPage(1)   // reset to first page on filter change
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }, [])

  const handleLoadMore = useCallback(() => {
    setLoading(true)
    // Simulate async fetch delay — replace with real API call later
    setTimeout(() => {
      setPage((p) => p + 1)
      setLoading(false)
    }, 600)
  }, [])

  const sortLabel = SORT_OPTIONS.find((o) => o.value === filters.sort)?.label ?? ''

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-16">

      {/* Page Header */}
      <PageHeader
        title={
          filters.category === 'all'
            ? 'All Products'
            : filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
        }
        count={filteredProducts.length}
      />

      <div className="flex gap-12">

        {/* ── Desktop Sidebar ──────────────────────────── */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            totalActive={activeFilterCount}
          />
        </div>

        {/* ── Product Area ──────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Sort bar */}
          <SortBar
            sort={filters.sort}
            onSort={(sort) => handleFilterChange({ ...filters, sort })}
            showMobileFilters={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {/* Active filter chips */}
          <ActiveChips filters={filters} onChange={handleFilterChange} />

          {/* Product Grid */}
          <ProductGrid
            products={visibleProducts}
            loading={false}
            columns={3}
            showResultCount
            totalCount={filteredProducts.length}
            sortLabel={sortLabel}
            emptyMessage="No products match your current filters. Try adjusting or clearing them."
            onClearFilters={handleClearFilters}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            loadingMore={loading}
          />
        </div>
      </div>

      {/* ── Mobile Filters Drawer ─────────────────────── */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{    x: '-100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-80 bg-brand-black border-r border-brand-accent/20 z-50 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-brand-accent/15">
                <span className="text-[11px] tracking-[0.25em] uppercase text-brand-white font-medium">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-brand-gray hover:text-brand-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-6 pb-10">
                <FilterSidebar
                  filters={filters}
                  onChange={(f) => { handleFilterChange(f); setMobileFiltersOpen(false) }}
                  onClear={() => { handleClearFilters(); setMobileFiltersOpen(false) }}
                  totalActive={activeFilterCount}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}