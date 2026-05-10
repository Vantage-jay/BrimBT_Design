/* ============================================================
   BrimBT Design — Cart Store
   File: src/store/cartStore.ts
   ============================================================ */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

// ── 1. STATE SHAPE ─────────────────────────────────────────

interface CartState {
  items: CartItem[]

  // ── Computed values (derived from items) ─────────────────
  totalItems: number
  subtotal: number

  // ── UI state ─────────────────────────────────────────────
  isCartOpen: boolean

  // ── Actions ──────────────────────────────────────────────
  addItem:        (product: Product, selectedSize: string, quantity?: number) => void
  removeItem:     (productId: string, selectedSize: string) => void
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void
  clearCart:      () => void
  toggleCart:     () => void
  openCart:       () => void
  closeCart:      () => void
}

// ── 2. HELPERS ─────────────────────────────────────────────

/** Recalculate totalItems and subtotal from the items array */
function computeTotals(items: CartItem[]): { totalItems: number; subtotal: number } {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal   = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return { totalItems, subtotal }
}

/** Round to 2 decimal places to avoid floating point errors */
function round(value: number): number {
  return Math.round(value * 100) / 100
}

// ── 3. STORE DEFINITION ────────────────────────────────────

export const useCartStore = create<CartState>()(
  // persist middleware saves cart to localStorage automatically
  persist(
    (set, get) => ({
      // ── Initial state ───────────────────────────────────
      items:       [],
      totalItems:  0,
      subtotal:    0,
      isCartOpen:  false,

      // ── addItem ─────────────────────────────────────────
      // Adds a product to cart. If the same product+size already
      // exists, it increments the quantity instead of duplicating.
      addItem: (product, selectedSize, quantity = 1) => {
        const { items } = get()

        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize
        )

        let updatedItems: CartItem[]

        if (existingIndex >= 0) {
          // Product+size already in cart — just bump quantity
          updatedItems = items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          // New entry
          updatedItems = [...items, { product, selectedSize, quantity }]
        }

        const { totalItems, subtotal } = computeTotals(updatedItems)

        set({
          items: updatedItems,
          totalItems,
          subtotal: round(subtotal),
          isCartOpen: true,   // auto-open cart drawer on add
        })
      },

      // ── removeItem ──────────────────────────────────────
      // Removes a specific product+size combo from the cart entirely
      removeItem: (productId, selectedSize) => {
        const updatedItems = get().items.filter(
          (item) =>
            !(item.product.id === productId && item.selectedSize === selectedSize)
        )

        const { totalItems, subtotal } = computeTotals(updatedItems)

        set({
          items: updatedItems,
          totalItems,
          subtotal: round(subtotal),
        })
      },

      // ── updateQuantity ──────────────────────────────────
      // Sets a specific quantity for a product+size.
      // If quantity reaches 0, the item is removed.
      updateQuantity: (productId, selectedSize, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize)
          return
        }

        const updatedItems = get().items.map((item) =>
          item.product.id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity }
            : item
        )

        const { totalItems, subtotal } = computeTotals(updatedItems)

        set({
          items: updatedItems,
          totalItems,
          subtotal: round(subtotal),
        })
      },

      // ── clearCart ───────────────────────────────────────
      // Empties the cart completely (called after successful order)
      clearCart: () => {
        set({
          items:      [],
          totalItems: 0,
          subtotal:   0,
        })
      },

      // ── Cart drawer UI ──────────────────────────────────
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart:   () => set({ isCartOpen: true }),
      closeCart:  () => set({ isCartOpen: false }),
    }),

    // ── Persist config ────────────────────────────────────
    {
      name:    'brimbt-cart',          // localStorage key
      storage: createJSONStorage(() => localStorage),

      // Only persist the cart items — not the UI state (isCartOpen)
      partialize: (state) => ({ items: state.items }),

      // After rehydrating from localStorage, recompute totals
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { totalItems, subtotal } = computeTotals(state.items)
          state.totalItems = totalItems
          state.subtotal   = round(subtotal)
        }
      },
    }
  )
)

// ── 4. SELECTOR HOOKS ──────────────────────────────────────
// These are convenience hooks so components don't re-render
// unless the specific value they care about changes.

/** Returns true if a specific product+size is already in the cart */
export function useIsInCart(productId: string, selectedSize: string): boolean {
  return useCartStore((state) =>
    state.items.some(
      (item) => item.product.id === productId && item.selectedSize === selectedSize
    )
  )
}

/** Returns the quantity of a specific product+size in the cart */
export function useItemQuantity(productId: string, selectedSize: string): number {
  return useCartStore((state) => {
    const item = state.items.find(
      (i) => i.product.id === productId && i.selectedSize === selectedSize
    )
    return item?.quantity ?? 0
  })
}

/** Returns formatted subtotal string e.g. "$142.00" */
export function useFormattedSubtotal(): string {
  return useCartStore((state) =>
    new Intl.NumberFormat('en-US', {
      style:    'currency',
      currency: 'USD',
    }).format(state.subtotal)
  )
}
