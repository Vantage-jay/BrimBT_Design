// ══════════════════════════════════════════════════════════════
// FILE: src/app/orders/page.tsx
// ══════════════════════════════════════════════════════════════

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Package } from 'lucide-react'

export default function OrdersPage() {
  const [orderNum, setOrderNum] = useState('')
  const [email, setEmail] = useState('')
  const [searched, setSearched] = useState(false)

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12">
        <p className="eyebrow mb-2">Delivery</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white">Track Your Order</h1>
      </div>
      <div className="max-w-lg">
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-brand-gray block mb-2">Order Number</label>
            <input value={orderNum} onChange={(e) => setOrderNum(e.target.value)} placeholder="e.g. BT-001234"
              className="w-full bg-transparent border border-brand-accent/20 focus:border-brand-accent/60 px-4 py-3 text-[13px] text-brand-white placeholder:text-brand-gray/40 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-brand-gray block mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full bg-transparent border border-brand-accent/20 focus:border-brand-accent/60 px-4 py-3 text-[13px] text-brand-white placeholder:text-brand-gray/40 outline-none transition-colors" />
          </div>
        </div>
        <button onClick={() => setSearched(true)} className="btn-primary w-full py-4 flex items-center justify-center gap-2">
          <Search size={15} /> Track Order
        </button>
        {searched && (
          <div className="mt-8 border border-brand-accent/20 p-6 text-center">
            <Package size={32} className="text-brand-accent/30 mx-auto mb-4" strokeWidth={1} />
            <p className="font-display text-lg text-brand-white mb-2">Order Not Found</p>
            <p className="text-[13px] text-brand-gray mb-4">Please check your order number and email address and try again.</p>
            <Link href="/contact" className="text-[11px] text-brand-accent underline underline-offset-2">Contact Support</Link>
          </div>
        )}
        <p className="mt-6 text-[12px] text-brand-gray text-center">
          Have an account?{' '}
          <Link href="/auth" className="text-brand-accent hover:underline">Sign in to view all orders</Link>
        </p>
      </div>
    </div>
  )
}
