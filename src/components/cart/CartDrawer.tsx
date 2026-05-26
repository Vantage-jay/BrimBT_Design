'use client'

/* ============================================================
   BrimBT Design — Cart Drawer
   File: src/components/cart/CartDrawer.tsx
   ============================================================ */

import { useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { CartItem } from '@/types'

// ── 1. CONSTANTS ───────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 150
const ESTIMATED_TAX_RATE      = 0.08

// ── 2. CART ITEM ROW ───────────────────────────────────────

function CartItemRow({ item, index }: { item: CartItem; index: number }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem     = useCartStore((s) => s.removeItem)
  const { product, selectedSize, quantity } = item

  const linePrice = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
  }).format(product.price * quantity)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{    opacity: 0, x: 16 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className="flex gap-4 py-5 border-b border-brand-accent/10 last:border-0"
    >
      {/* Image placeholder */}
      <div className="w-20 h-24 flex-shrink-0 bg-gradient-to-br from-[#161412] to-[#221e1a] flex items-center justify-center">
        <span className="text-3xl opacity-[0.08] font-display select-none">
          {product.category === 'footwear' ? '👟' : '👗'}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.2em] uppercase text-brand-text-secondary mb-0.5">
          {product.brand}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-[14px] text-brand-black hover:text-brand-accent transition-colors leading-snug block mb-1"
        >
          {product.name}
        </Link>
        <p className="text-[10px] text-brand-text-secondary mb-3">
          Size: <span className="text-brand-black">{selectedSize}</span>
        </p>

        <div className="flex items-center justify-between">
          {/* Qty controls */}
          <div className="flex items-center border border-brand-accent/25 h-8">
            <button
              onClick={() => updateQuantity(product.id, selectedSize, quantity - 1)}
              className="w-8 h-full flex items-center justify-center text-brand-text-secondary hover:text-brand-black transition-colors"
            >
              <Minus size={11} />
            </button>
            <span className="w-6 text-center text-[12px] text-brand-black">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, selectedSize, quantity + 1)}
              className="w-8 h-full flex items-center justify-center text-brand-text-secondary hover:text-brand-black transition-colors"
            >
              <Plus size={11} />
            </button>
          </div>
          <span className="text-[14px] text-brand-black font-light">{linePrice}</span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(product.id, selectedSize)}
        className="text-brand-text-secondary hover:text-red-400 transition-colors self-start mt-0.5 flex-shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  )
}

// ── 3. EMPTY STATE ─────────────────────────────────────────

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 text-center px-6">
      <ShoppingBag size={48} className="text-brand-accent/20 mb-6" strokeWidth={1} />
      <p className="font-display text-2xl font-light text-brand-black mb-3">Your cart is empty</p>
      <p className="text-[13px] text-brand-text-secondary leading-relaxed mb-10 max-w-[200px]">
        Discover our collections and add your favourites here.
      </p>
      <button onClick={onClose} className="btn-primary">Continue Shopping</button>
    </div>
  )
}

// ── 4. SHIPPING PROGRESS ───────────────────────────────────

function ShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress  = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const achieved  = subtotal >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="px-6 py-4 border-b border-brand-accent/15 bg-brand-accent/[0.03]">
      <p className="text-[11px] text-brand-text-secondary mb-2">
        {achieved
          ? <span className="text-green-400">✓ You&apos;ve unlocked free shipping!</span>
          : <><span className="text-brand-accent font-medium">${remaining.toFixed(0)}</span> away from free shipping</>
        }
      </p>
      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ── 5. ORDER SUMMARY ───────────────────────────────────────

function OrderSummary({ subtotal, closeCart }: { subtotal: number; closeCart: () => void }) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99
  const tax      = subtotal * ESTIMATED_TAX_RATE
  const total    = subtotal + shipping + tax
  const fmt      = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  return (
    <div className="border-t border-brand-accent/20 px-6 pt-5 pb-6">
      {/* Line items */}
      <div className="space-y-2 mb-4">
        {[
          { label: 'Subtotal',  value: fmt(subtotal),  accent: false },
          { label: 'Shipping',  value: shipping === 0 ? 'Free' : fmt(shipping), accent: shipping === 0 },
          { label: 'Est. Tax',  value: fmt(tax),        accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} className="flex justify-between text-[12px]">
            <span className="text-brand-text-secondary">{label}</span>
            <span className={accent ? 'text-green-400' : 'text-brand-black'}>{value}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center border-t border-brand-accent/10 pt-4 mb-1">
        <span className="text-[12px] tracking-[0.15em] uppercase text-brand-black font-medium">Total</span>
        <span className="font-display text-xl font-light text-brand-black">{fmt(total)}</span>
      </div>
      <p className="text-[10px] text-brand-text-secondary mb-5">Tax calculated at checkout. Final amount may vary.</p>

      {/* Checkout */}
      <Link
        href="/checkout"
        onClick={closeCart}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 mb-3"
      >
        Proceed to Checkout <ArrowRight size={15} />
      </Link>

      <button
        onClick={closeCart}
        className="w-full text-center text-[11px] tracking-[0.15em] uppercase text-brand-text-secondary hover:text-brand-black transition-colors py-1"
      >
        Continue Shopping
      </button>
    </div>
  )
}

// ── 6. MAIN DRAWER ─────────────────────────────────────────

export default function CartDrawer() {
  const items      = useCartStore((s) => s.items)
  const subtotal   = useCartStore((s) => s.subtotal)
  const totalItems = useCartStore((s) => s.totalItems)
  const isOpen     = useCartStore((s) => s.isCartOpen)
  const closeCart  = useCartStore((s) => s.closeCart)
  const backdropRef = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            onClick={(e) => { if (e.target === backdropRef.current) closeCart() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-black/30 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{    x: '100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-brand-white border-l border-brand-accent/25 z-50 flex flex-col shadow-brand-lg"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-accent/20">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-brand-accent" />
                <span className="font-display text-lg text-brand-black">Your Cart</span>
                {totalItems > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-accent text-brand-black text-[10px] font-medium flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button onClick={closeCart} aria-label="Close cart" className="text-brand-text-secondary hover:text-brand-black transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Shipping progress */}
            {items.length > 0 && <ShippingProgress subtotal={subtotal} />}

            {/* Items or empty */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0
                ? <EmptyCart onClose={closeCart} />
                : (
                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <CartItemRow
                        key={`${item.product.id}-${item.selectedSize}`}
                        item={item}
                        index={i}
                      />
                    ))}
                  </AnimatePresence>
                )
              }
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <OrderSummary subtotal={subtotal} closeCart={closeCart} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
