'use client'

/* ============================================================
   BrimBT Design — Orders Page
   File: src/app/orders/page.tsx
   ============================================================ */

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Package, Truck, CheckCircle2, Clock,
  ChevronDown, ChevronUp, Search, XCircle,
} from 'lucide-react'
import clsx from 'clsx'

// ── 1. TYPES ───────────────────────────────────────────────

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface OrderItem {
  name: string; brand: string; size: string
  qty: number; price: number; category: string
}

interface Order {
  id: string; date: string; status: OrderStatus
  items: OrderItem[]; subtotal: number
  shipping: number; total: number
  address: string; tracking?: string; eta?: string
}

// ── 2. MOCK DATA ───────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id:'BT-001234', date:'May 2, 2026', status:'delivered',
    tracking:'TRK928374651', address:'123 Main Street, New York, NY 10001',
    subtotal:331, shipping:0, total:331,
    items:[
      { name:'Silk Body Wrap Dress', brand:'BrimBT Studio',   size:'S',        qty:1, price:189, category:'clothing'     },
      { name:'Gold Chain Necklace',  brand:'BrimBT Studio',   size:'One Size', qty:1, price:79,  category:'accessories'  },
      { name:'Seamless Bike Shorts', brand:'BrimBT Studio',   size:'M',        qty:1, price:63,  category:'essentials'   },
    ],
  },
  {
    id:'BT-001198', date:'Apr 18, 2026', status:'shipped',
    tracking:'TRK827364510', eta:'May 14, 2026',
    address:'123 Main Street, New York, NY 10001',
    subtotal:189, shipping:0, total:189,
    items:[
      { name:'Silk Body Wrap Dress', brand:'BrimBT Studio', size:'M', qty:1, price:189, category:'clothing' },
    ],
  },
  {
    id:'BT-001102', date:'Mar 30, 2026', status:'processing',
    address:'456 Park Avenue, New York, NY 10022',
    subtotal:497, shipping:9.99, total:506.99,
    items:[
      { name:'Oversized Blazer',      brand:'BrimBT Studio',   size:'S',  qty:1, price:265, category:'clothing' },
      { name:'Cloud Runner Sneakers', brand:'BrimBT Footwear', size:'39', qty:1, price:142, category:'footwear' },
      { name:'Woven Tote Bag',        brand:'BrimBT Studio',   size:'One Size', qty:1, price:90, category:'bags' },
    ],
  },
  {
    id:'BT-000987', date:'Feb 11, 2026', status:'cancelled',
    address:'123 Main Street, New York, NY 10001',
    subtotal:165, shipping:0, total:165,
    items:[
      { name:'Sculptured Heel Mule', brand:'BrimBT Footwear', size:'37', qty:1, price:165, category:'footwear' },
    ],
  },
]

// ── 3. STATUS CONFIG ───────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { label:string; color:string; bg:string; icon: React.ElementType }> = {
  pending:    { label:'Pending',    color:'text-yellow-600', bg:'bg-yellow-50 border-yellow-200',  icon:Clock        },
  processing: { label:'Processing', color:'text-orange-600', bg:'bg-orange-50 border-orange-200',  icon:Package      },
  shipped:    { label:'Shipped',    color:'text-blue-600',   bg:'bg-blue-50   border-blue-200',    icon:Truck        },
  delivered:  { label:'Delivered',  color:'text-green-600',  bg:'bg-green-50  border-green-200',   icon:CheckCircle2 },
  cancelled:  { label:'Cancelled',  color:'text-red-500',    bg:'bg-red-50    border-red-200',     icon:XCircle      },
}

// ── 4. TRACKING TIMELINE ───────────────────────────────────

function TrackingTimeline({ status }: { status: OrderStatus }) {
  const steps = [
    { key:'pending',    label:'Order Placed', sub:'We received your order'  },
    { key:'processing', label:'Processing',   sub:'Preparing your items'    },
    { key:'shipped',    label:'Shipped',      sub:'On its way to you'       },
    { key:'delivered',  label:'Delivered',    sub:'Enjoy your new pieces!'  },
  ]
  const ORDER: OrderStatus[] = ['pending','processing','shipped','delivered']
  const currentIndex = ORDER.indexOf(status)

  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 py-4 px-5 bg-red-50 border border-red-200">
        <XCircle size={16} className="text-red-500 flex-shrink-0" />
        <p className="text-[12px] text-red-600">This order was cancelled. If you were charged, a refund will appear within 5–7 business days.</p>
      </div>
    )
  }

  return (
    <div className="flex items-start mt-4">
      {steps.map((step, i) => {
        const done   = i <= currentIndex
        const active = i === currentIndex
        return (
          <div key={step.key} className="flex-1 flex flex-col items-center">
            <div className="flex items-center w-full">
              <div className={clsx('flex-1 h-0.5', i===0 ? 'invisible' : done ? 'bg-brand-accent' : 'bg-brand-accent/15')} />
              <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all',
                done ? 'bg-brand-accent border-brand-accent text-white' : 'border-brand-accent/20 text-brand-text-muted bg-brand-white'
              )}>
                {done ? <CheckCircle2 size={14} /> : i === 2 ? <Truck size={13} /> : <Package size={13} />}
              </div>
              <div className={clsx('flex-1 h-0.5', i===steps.length-1 ? 'invisible' : done && i<currentIndex ? 'bg-brand-accent' : 'bg-brand-accent/15')} />
            </div>
            <div className="text-center mt-2 px-1">
              <p className={clsx('text-[10px] font-medium tracking-wide', active ? 'text-brand-accent' : done ? 'text-brand-black' : 'text-brand-text-muted')}>
                {step.label}
              </p>
              <p className="text-[9px] text-brand-text-muted mt-0.5 hidden sm:block">{step.sub}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── 5. ORDER CARD ──────────────────────────────────────────

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false)
  const config    = STATUS_CONFIG[order.status]
  const StatusIcon = config.icon
  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(n)

  return (
    <motion.div layout className="bg-brand-white border border-brand-accent/15 shadow-brand overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-6 gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="font-display text-xl text-brand-accent tracking-widest">{order.id}</span>
            <span className={clsx('flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase border px-2.5 py-1', config.bg, config.color)}>
              <StatusIcon size={11} /> {config.label}
            </span>
          </div>
          <p className="text-[12px] text-brand-text-muted">Placed on {order.date}</p>
          {order.eta && <p className="text-[12px] text-brand-accent mt-1">Est. delivery: <span className="font-medium">{order.eta}</span></p>}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-display text-2xl font-light text-brand-black">{fmt(order.total)}</p>
          <p className="text-[11px] text-brand-text-muted">{order.items.length} item{order.items.length > 1 ? 's':''}</p>
          <button onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1 text-[11px] tracking-[0.12em] uppercase text-brand-accent hover:text-brand-accent-dark transition-colors mt-2 ml-auto">
            {expanded ? 'Hide' : 'Details'}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 pb-5 border-t border-brand-accent/10 pt-5">
        <TrackingTimeline status={order.status} />
      </div>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}
            className="overflow-hidden border-t border-brand-accent/10"
          >
            <div className="p-6 space-y-6">
              {/* Items */}
              <div>
                <p className="eyebrow mb-4">Items in this Order</p>
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-14 h-16 flex-shrink-0 bg-brand-surface-2 flex items-center justify-center">
                        <span className="text-xl opacity-30">{item.category==='footwear'?'👟':item.category==='bags'?'👜':'👗'}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-brand-text-muted mb-0.5">{item.brand}</p>
                        <p className="text-[13px] text-brand-black font-display">{item.name}</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                      </div>
                      <p className="text-[14px] text-brand-black font-medium flex-shrink-0">{fmt(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary + Address */}
              <div className="border-t border-brand-accent/10 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="eyebrow mb-3">Delivery Address</p>
                  <p className="text-[13px] text-brand-text-secondary leading-relaxed">{order.address}</p>
                  {order.tracking && (
                    <div className="mt-3">
                      <p className="eyebrow mb-1">Tracking</p>
                      <p className="text-[13px] text-brand-accent font-medium tracking-wider">{order.tracking}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="eyebrow mb-3">Order Summary</p>
                  <div className="space-y-2">
                    {[
                      { label:'Subtotal', value:fmt(order.subtotal), bold:false },
                      { label:'Shipping', value:order.shipping===0?'Free':fmt(order.shipping), bold:false },
                      { label:'Total',    value:fmt(order.total), bold:true },
                    ].map(({ label, value, bold }) => (
                      <div key={label} className="flex justify-between text-[12px]">
                        <span className="text-brand-text-muted">{label}</span>
                        <span className={bold ? 'text-brand-black font-medium' : 'text-brand-black'}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-brand-accent/10">
                {order.status === 'delivered' && (
                  <Link href="/returns" className="text-[11px] tracking-[0.15em] uppercase border border-brand-accent/25 text-brand-text-secondary px-5 py-2.5 hover:border-brand-accent hover:text-brand-accent transition-colors">
                    Return Items
                  </Link>
                )}
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <button className="text-[11px] tracking-[0.15em] uppercase border border-red-200 text-red-400 px-5 py-2.5 hover:bg-red-50 transition-colors">
                    Cancel Order
                  </button>
                )}
                <Link href="/contact" className="text-[11px] tracking-[0.15em] uppercase border border-brand-accent/25 text-brand-text-secondary px-5 py-2.5 hover:border-brand-accent hover:text-brand-accent transition-colors">
                  Need Help?
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── 6. REVEAL ──────────────────────────────────────────────

function Reveal({ children, className='' }: { children:React.ReactNode; className?:string }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  )
}

// ── 7. MAIN PAGE ───────────────────────────────────────────

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    const matchesFilter = filter === 'all' || o.status === filter
    return matchesSearch && matchesFilter
  })

  const FILTERS: { value:OrderStatus|'all'; label:string }[] = [
    { value:'all',        label:'All'        },
    { value:'processing', label:'Processing' },
    { value:'shipped',    label:'Shipped'    },
    { value:'delivered',  label:'Delivered'  },
    { value:'cancelled',  label:'Cancelled'  },
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-10 text-[11px] text-brand-text-muted">
        <Link href="/" className="hover:text-brand-black transition-colors">Home</Link>
        <span className="opacity-40">/</span>
        <Link href="/account" className="hover:text-brand-black transition-colors">Account</Link>
        <span className="opacity-40">/</span>
        <span className="text-brand-accent">Orders</span>
      </nav>

      {/* Header */}
      <Reveal className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Package size={22} className="text-brand-accent" />
          <p className="eyebrow">Your Purchases</p>
        </div>
        <h1 className="font-display text-[clamp(36px,5vw,60px)] font-light text-brand-black leading-none">
          Order <em className="italic text-brand-accent">History</em>
        </h1>
      </Reveal>

      {/* Search + Filter */}
      <Reveal className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID or product..."
              className="w-full bg-brand-white border border-brand-accent/20 pl-10 pr-4 py-3 text-[13px] text-brand-black placeholder:text-brand-text-muted focus:border-brand-accent/50 focus:outline-none transition-colors shadow-brand"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={clsx('text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 border transition-all',
                  filter === f.value
                    ? 'bg-brand-accent text-white border-brand-accent'
                    : 'border-brand-accent/20 text-brand-text-muted hover:border-brand-accent hover:text-brand-accent bg-brand-white'
                )}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Orders */}
      {filtered.length === 0 ? (
        <Reveal>
          <div className="text-center py-24 bg-brand-white border border-brand-accent/15 shadow-brand">
            <Package size={44} className="text-brand-accent/20 mx-auto mb-5" strokeWidth={1} />
            <p className="font-display text-2xl text-brand-black mb-3">No orders found</p>
            <p className="text-[13px] text-brand-text-muted mb-8">{search ? `No results for "${search}"` : 'You have no orders yet.'}</p>
            <Link href="/products" className="btn-primary">Start Shopping</Link>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-5">
          {filtered.map((order) => (
            <Reveal key={order.id}><OrderCard order={order} /></Reveal>
          ))}
        </div>
      )}

      {/* Help */}
      <Reveal className="mt-14">
        <div className="bg-brand-accent-bg border border-brand-accent/20 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[13px] text-brand-black font-medium mb-1">Need help with an order?</p>
            <p className="text-[12px] text-brand-text-secondary">Our team responds within 24 hours on business days.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact" className="text-[11px] tracking-[0.15em] uppercase bg-brand-accent text-white px-6 py-3 hover:bg-brand-accent-dark transition-colors shadow-brand">
              Contact Support
            </Link>
            <Link href="/faq" className="text-[11px] tracking-[0.15em] uppercase border border-brand-accent/30 text-brand-text-secondary px-6 py-3 hover:border-brand-accent hover:text-brand-accent transition-colors">
              View FAQ
            </Link>
          </div>
        </div>
      </Reveal>

    </div>
  )
}
