/* ============================================================
   BrimBT Design — TypeScript Types
   File: src/types/index.ts
   ============================================================ */

// ── 1. PRODUCT ─────────────────────────────────────────────

export type ProductCategory =
  | 'clothing'
  | 'footwear'
  | 'bags'
  | 'accessories'
  | 'essentials'

export type ProductBadge = 'new' | 'sale' | 'hot' | 'limited' | null

export interface ProductImage {
  url: string
  alt: string
}

export interface ProductVariant {
  size: string
  stock: number       // 0 = out of stock
}

export interface Product {
  id: string
  name: string
  brand: string       // e.g. "BrimBT Studio" | "BrimBT Footwear"
  slug: string        // used in URL: /products/silk-wrap-dress
  category: ProductCategory
  description: string
  price: number
  originalPrice?: number    // set only if item is on sale
  badge: ProductBadge
  images: ProductImage[]
  variants: ProductVariant[]
  rating: number            // 0–5
  reviewCount: number
  isFeatured: boolean
  isNew: boolean
  createdAt: string         // ISO date string
}

// ── 2. CART ────────────────────────────────────────────────

export interface CartItem {
  product: Product
  selectedSize: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  subtotal: number
}

// ── 3. USER / AUTH ─────────────────────────────────────────

export interface Address {
  fullName: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  addresses: Address[]
  wishlist: string[]    // array of product IDs
  createdAt: string
}

// ── 4. ORDER ───────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus =
  | 'unpaid'
  | 'paid'
  | 'refunded'
  | 'failed'

export interface OrderItem {
  product: Product
  selectedSize: string
  quantity: number
  priceAtPurchase: number   // snapshot price, in case product price changes later
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shippingAddress: Address
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  createdAt: string
  updatedAt: string
}

// ── 5. FILTERS (for Product Listings page) ─────────────────

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'best-selling'

export interface ProductFilters {
  category: ProductCategory | 'all'
  priceRange: [number, number]   // [min, max]
  sizes: string[]
  sort: SortOption
  badge: ProductBadge | 'all'
}

// ── 6. NAVIGATION ──────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]    // for dropdown menus
}

// ── 7. NEWSLETTER / FORMS ──────────────────────────────────

export interface NewsletterForm {
  email: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// ── 8. API RESPONSE WRAPPERS ───────────────────────────────

export interface ApiSuccess<T> {
  success: true
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  statusCode: number
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

// ── 9. COMPONENT PROP HELPERS ──────────────────────────────

// Makes all keys of T optional — useful for partial updates
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Extract just the keys of T whose values are strings
export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]
