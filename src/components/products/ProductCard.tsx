'use client'

/* ============================================================
   BrinmBT Design — ProductCard Component
   File: src/components/products/ProductCard.tsx
   ============================================================ */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'
import clsx from 'clsx'

// ── 1. BADGE ───────────────────────────────────────────────

function ProductBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    new:     'bg-brand-accent text-brand-black',
    sale:    'bg-red-500 text-white',
    hot:     'bg-orange-500 text-white',
    limited: 'bg-purple-600 text-white',
  }
  return (
    <span
      className={clsx(
        'absolute top-4 left-4 z-10 text-[9px] font-medium tracking-[0.15em] uppercase px-3 py-1.5',
        styles[type]
      )}
    >
      {type}
    </span>
  )
}

// ── 2. SIZE SELECTOR ───────────────────────────────────────

interface SizeSelectorProps {
  variants:      Product['variants']
  selectedSize:  string
  onSelect:      (size: string) => void
}

function SizeSelector({ variants, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {variants.map((v) => {
        const outOfStock = v.stock === 0
        return (
          <button
            key={v.size}
            onClick={(e) => {
              e.preventDefault()   // prevent Link navigation
              if (!outOfStock) onSelect(v.size)
            }}
            disabled={outOfStock}
            aria-label={`Size ${v.size}${outOfStock ? ' — out of stock' : ''}`}
            className={clsx(
              'text-[9px] px-2 py-1 border transition-all duration-200',
              outOfStock
                ? 'border-white/5 text-brand-gray/30 cursor-not-allowed line-through'
                : selectedSize === v.size
                  ? 'border-brand-accent text-brand-accent bg-brand-accent/10'
                  : 'border-white/10 text-brand-gray hover:border-brand-accent hover:text-brand-accent'
            )}
          >
            {v.size}
          </button>
        )
      })}
    </div>
  )
}

// ── 3. PRODUCT IMAGE ───────────────────────────────────────

interface ProductImageProps {
  product:      Product
  selectedSize: string
  isWishlisted: boolean
  onWishlist:   (e: React.MouseEvent) => void
  onQuickAdd:   (e: React.MouseEvent) => void
  addedToCart:  boolean
}

function ProductImage({
  product,
  selectedSize,
  isWishlisted,
  onWishlist,
  onQuickAdd,
  addedToCart,
}: ProductImageProps) {
  return (
    <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#161412] to-[#221e1a] flex items-center justify-center mb-5">

      {/* Badge */}
      {product.badge && <ProductBadge type={product.badge} />}

      {/* Wishlist button */}
      <button
        onClick={onWishlist}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={clsx(
          'absolute top-4 right-4 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300',
          isWishlisted
            ? 'border-brand-accent bg-brand-accent/20 text-brand-accent'
            : 'border-white/15 text-brand-gray hover:border-brand-accent hover:text-brand-accent'
        )}
      >
        <Heart
          size={13}
          fill={isWishlisted ? 'currentColor' : 'none'}
        />
      </button>

      {/* Image placeholder — replace with next/image when you have photos */}
      <span className="text-7xl opacity-[0.07] font-display select-none pointer-events-none">
        {product.category === 'footwear' ? '👟' : '👗'}
      </span>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Quick Add button */}
      <AnimatePresence mode="wait">
        {addedToCart ? (
          <motion.div
            key="added"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{    y: 12, opacity: 0 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-medium tracking-[0.15em] uppercase px-7 py-3 whitespace-nowrap"
          >
            ✓ Added to Cart
          </motion.div>
        ) : (
          <motion.button
            key="add"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0,  opacity: 0 }}   // invisible until hover
            whileHover={{ opacity: 1 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-brand-white text-brand-black text-[10px] font-medium tracking-[0.2em] uppercase px-7 py-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={onQuickAdd}
          >
            Quick Add — {selectedSize}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── 4. MAIN PRODUCT CARD ───────────────────────────────────

interface ProductCardProps {
  product:    Product
  className?: string
  /** Show a larger card variant (used on detail-adjacent grids) */
  featured?:  boolean
}

export default function ProductCard({
  product,
  className = '',
  featured  = false,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  // ── Local state ─────────────────────────────────────────
  // Default to first in-stock size
  const firstInStock = product.variants.find((v) => v.stock > 0)
  const [selectedSize,  setSelectedSize]  = useState(firstInStock?.size ?? '')
  const [isWishlisted,  setIsWishlisted]  = useState(false)
  const [addedToCart,   setAddedToCart]   = useState(false)

  // ── Handlers ────────────────────────────────────────────

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted((prev) => !prev)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selectedSize) return

    addItem(product, selectedSize, 1)

    // Show "Added" confirmation for 1.8s
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  // ── Price display ────────────────────────────────────────
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: 'USD',
  }).format(product.price)

  const formattedOriginal = product.originalPrice
    ? new Intl.NumberFormat('en-US', {
        style:    'currency',
        currency: 'USD',
      }).format(product.originalPrice)
    : null

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className={clsx('group', className)}>

      {/* ── Image Block ──────────────────────────────────── */}
      <Link href={`/products/${product.slug}`} className="block">
        <ProductImage
          product={product}
          selectedSize={selectedSize}
          isWishlisted={isWishlisted}
          onWishlist={handleWishlist}
          onQuickAdd={handleQuickAdd}
          addedToCart={addedToCart}
        />
      </Link>

      {/* ── Info Block ───────────────────────────────────── */}
      <div className={clsx('px-1', featured && 'px-0')}>

        {/* Brand */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-1.5">
          {product.brand}
        </p>

        {/* Name — links to product page */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className={clsx(
              'font-display font-light text-brand-white leading-tight mb-3 hover:text-brand-accent transition-colors',
              featured ? 'text-2xl' : 'text-xl'
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-brand-white font-light">
              {formattedPrice}
            </span>
            {formattedOriginal && (
              <span className="text-[12px] text-brand-gray line-through">
                {formattedOriginal}
              </span>
            )}
            {discountPercent && (
              <span className="text-[10px] text-red-400 font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <span className="text-[10px] text-brand-gray tracking-wide">
              ★ {product.rating} ({product.reviewCount})
            </span>
          )}
        </div>

        {/* Size selector */}
        <SizeSelector
          variants={product.variants}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />

      </div>
    </div>
  )
}
