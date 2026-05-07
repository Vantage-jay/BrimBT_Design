'use client'

/* ============================================================
   BrinmBT Design — ProductGrid Component
   File: src/components/products/ProductGrid.tsx
   ============================================================ */

import { motion } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/types'
import clsx from 'clsx'

// ── 1. SKELETON CARD ───────────────────────────────────────
// Shown while products are loading — matches ProductCard layout

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[3/4] bg-white/5 mb-5" />

      {/* Brand line */}
      <div className="h-2.5 w-1/3 bg-white/5 rounded mb-3" />

      {/* Name lines */}
      <div className="h-4 w-3/4 bg-white/5 rounded mb-2" />
      <div className="h-4 w-1/2 bg-white/5 rounded mb-4" />

      {/* Price + rating row */}
      <div className="flex justify-between items-center mb-3">
        <div className="h-3.5 w-16 bg-white/5 rounded" />
        <div className="h-3 w-20 bg-white/5 rounded" />
      </div>

      {/* Size dots */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-5 w-8 bg-white/5 rounded" />
        ))}
      </div>
    </div>
  )
}

// ── 2. EMPTY STATE ─────────────────────────────────────────
// Shown when filters return no results

interface EmptyStateProps {
  message?:     string
  onClearFilters?: () => void
}

function EmptyState({
  message = 'No products found.',
  onClearFilters,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center py-32 text-center"
    >
      {/* Icon */}
      <span className="font-display text-[80px] text-brand-accent/10 leading-none mb-8 select-none">
        ∅
      </span>

      <p className="font-display text-2xl font-light text-brand-white mb-3">
        Nothing here yet
      </p>
      <p className="text-sm text-brand-gray mb-10 max-w-xs leading-relaxed">
        {message}
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="btn-primary"
        >
          Clear Filters
        </button>
      )}
    </motion.div>
  )
}

// ── 3. GRID VARIANTS ───────────────────────────────────────

const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}

// Framer Motion stagger for grid items appearing
const gridVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren:   0.1,
    },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── 4. RESULT COUNT BAR ────────────────────────────────────

interface ResultCountProps {
  total:       number
  showing:     number
  sortLabel?:  string
}

function ResultCount({ total, showing, sortLabel }: ResultCountProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-5 border-b border-brand-accent/12">
      <p className="text-[12px] text-brand-gray tracking-wide">
        Showing{' '}
        <span className="text-brand-white font-medium">{showing}</span>
        {' '}of{' '}
        <span className="text-brand-white font-medium">{total}</span>
        {' '}products
      </p>
      {sortLabel && (
        <p className="text-[11px] text-brand-gray tracking-wide">
          Sorted by:{' '}
          <span className="text-brand-accent">{sortLabel}</span>
        </p>
      )}
    </div>
  )
}

// ── 5. LOAD MORE BUTTON ────────────────────────────────────

interface LoadMoreProps {
  onLoadMore:  () => void
  loading:     boolean
  hasMore:     boolean
}

function LoadMore({ onLoadMore, loading, hasMore }: LoadMoreProps) {
  if (!hasMore) {
    return (
      <p className="text-center text-[11px] tracking-[0.2em] uppercase text-brand-gray mt-16">
        — All products loaded —
      </p>
    )
  }

  return (
    <div className="flex justify-center mt-16">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className={clsx(
          'btn-primary min-w-[180px]',
          loading && 'opacity-60 cursor-wait'
        )}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-brand-black/40 border-t-brand-black rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  )
}

// ── 6. MAIN PRODUCT GRID ───────────────────────────────────

interface ProductGridProps {
  products:        Product[]
  loading?:        boolean
  skeletonCount?:  number          // how many skeleton cards to show while loading
  columns?:        2 | 3 | 4      // grid column count
  showResultCount?: boolean
  totalCount?:     number          // total from DB (may differ from products.length after pagination)
  sortLabel?:      string
  emptyMessage?:   string
  onClearFilters?: () => void
  hasMore?:        boolean
  onLoadMore?:     () => void
  loadingMore?:    boolean
  className?:      string
}

export default function ProductGrid({
  products,
  loading        = false,
  skeletonCount  = 8,
  columns        = 4,
  showResultCount = false,
  totalCount,
  sortLabel,
  emptyMessage,
  onClearFilters,
  hasMore        = false,
  onLoadMore,
  loadingMore    = false,
  className      = '',
}: ProductGridProps) {

  const gridClass = GRID_COLS[columns] ?? GRID_COLS[4]

  return (
    <div className={className}>

      {/* ── Result Count ─────────────────────────────────── */}
      {showResultCount && !loading && (
        <ResultCount
          total={totalCount ?? products.length}
          showing={products.length}
          sortLabel={sortLabel}
        />
      )}

      {/* ── Grid ─────────────────────────────────────────── */}
      <div className={clsx('grid gap-x-6 gap-y-12', gridClass)}>

        {/* Loading state — skeleton cards */}
        {loading && (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <EmptyState
            message={emptyMessage}
            onClearFilters={onClearFilters}
          />
        )}

        {/* Populated state — real product cards */}
        {!loading && products.length > 0 && (
          <motion.div
            className={clsx('contents')}   // transparent wrapper preserving grid layout
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      {/* ── Load More ────────────────────────────────────── */}
      {!loading && products.length > 0 && onLoadMore && (
        <LoadMore
          onLoadMore={onLoadMore}
          loading={loadingMore}
          hasMore={hasMore}
        />
      )}

    </div>
  )
}
