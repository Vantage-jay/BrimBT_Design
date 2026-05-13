'use client'

/* ============================================================
   BrimBT Design — Account Page
   File: src/app/account/page.tsx
   ============================================================ */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Package, MapPin, Heart,
  ChevronRight, LogOut, Edit2, Plus, Trash2,
} from 'lucide-react'
import clsx from 'clsx'

// ── 1. TYPES ───────────────────────────────────────────────

type AccountTab = 'profile' | 'orders' | 'addresses' | 'wishlist'

// ── 2. MOCK DATA ───────────────────────────────────────────

const MOCK_USER = {
  firstName: 'Jane',
  lastName:  'Doe',
  email:     'jane@example.com',
  phone:     '+1 234 567 8900',
  joinDate:  'January 2026',
}

const MOCK_ORDERS = [
  { id: 'BT-001234', date: 'May 2, 2026',   status: 'delivered',  total: 354, items: 2 },
  { id: 'BT-001198', date: 'Apr 18, 2026',  status: 'shipped',    total: 189, items: 1 },
  { id: 'BT-001102', date: 'Mar 30, 2026',  status: 'processing', total: 507, items: 3 },
]

const MOCK_ADDRESSES = [
  { id: '1', label: 'Home',   line1: '123 Main Street', city: 'New York',    state: 'NY', postalCode: '10001', country: 'United States', isDefault: true  },
  { id: '2', label: 'Office', line1: '456 Park Avenue', city: 'New York',    state: 'NY', postalCode: '10022', country: 'United States', isDefault: false },
]

const MOCK_WISHLIST = [
  { id: '1', name: 'Silk Body Wrap Dress',  brand: 'BrimBT Studio',   price: 189, category: 'clothing', slug: 'silk-body-wrap-dress'  },
  { id: '4', name: 'Sculptured Heel Mule',  brand: 'BrimBT Footwear', price: 165, category: 'footwear', slug: 'sculptured-heel-mule'   },
  { id: '7', name: 'Oversized Blazer',      brand: 'BrimBT Studio',   price: 265, category: 'clothing', slug: 'oversized-blazer'       },
]

// ── 3. STATUS BADGE ────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    delivered:  'bg-green-500/10 text-green-400 border-green-500/20',
    shipped:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    processing: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    cancelled:  'bg-red-500/10 text-red-400 border-red-500/20',
  }
  return (
    <span className={clsx('text-[9px] tracking-[0.15em] uppercase border px-2.5 py-1', styles[status] ?? '')}>
      {status}
    </span>
  )
}

// ── 4. PROFILE TAB ─────────────────────────────────────────

function ProfileTab() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(MOCK_USER)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl font-light text-brand-white">My Profile</h2>
        <button
          onClick={() => setEditing((e) => !e)}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-gray hover:text-brand-accent transition-colors"
        >
          <Edit2 size={13} /> {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5 mb-10 pb-10 border-b border-brand-accent/12">
        <div className="w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center">
          <span className="font-display text-2xl text-brand-accent">
            {form.firstName[0]}{form.lastName[0]}
          </span>
        </div>
        <div>
          <p className="text-brand-white font-medium">{form.firstName} {form.lastName}</p>
          <p className="text-[12px] text-brand-gray mt-0.5">Member since {form.joinDate}</p>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { label: 'First Name', key: 'firstName', value: form.firstName },
          { label: 'Last Name',  key: 'lastName',  value: form.lastName  },
          { label: 'Email',      key: 'email',      value: form.email     },
          { label: 'Phone',      key: 'phone',      value: form.phone     },
        ].map(({ label, key, value }) => (
          <div key={key}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-2">{label}</p>
            {editing ? (
              <input
                value={value}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full bg-transparent border border-brand-accent/20 focus:border-brand-accent/60 px-4 py-3 text-[13px] text-brand-white outline-none transition-colors"
              />
            ) : (
              <p className="text-[14px] text-brand-white">{value}</p>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <button
          onClick={() => setEditing(false)}
          className="btn-primary mt-8 px-10 py-3"
        >
          Save Changes
        </button>
      )}

      {/* Danger zone */}
      <div className="mt-12 pt-8 border-t border-brand-accent/12">
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-4">Account Actions</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-[12px] text-brand-gray hover:text-brand-white transition-colors border border-brand-accent/15 px-5 py-2.5 hover:border-brand-accent">
            <LogOut size={13} /> Sign Out
          </button>
          <button className="flex items-center gap-2 text-[12px] text-red-400/70 hover:text-red-400 transition-colors border border-red-500/10 px-5 py-2.5 hover:border-red-500/30">
            <Trash2 size={13} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 5. ORDERS TAB ──────────────────────────────────────────

function OrdersTab() {
  return (
    <div>
      <h2 className="font-display text-2xl font-light text-brand-white mb-8">Order History</h2>

      {MOCK_ORDERS.length === 0 ? (
        <div className="text-center py-20">
          <Package size={40} className="text-brand-accent/20 mx-auto mb-4" strokeWidth={1} />
          <p className="font-display text-xl text-brand-white mb-2">No orders yet</p>
          <p className="text-[13px] text-brand-gray mb-8">Your order history will appear here.</p>
          <Link href="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="border border-brand-accent/15 p-6 hover:border-brand-accent/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-1">Order</p>
                  <p className="font-display text-lg text-brand-accent tracking-widest">{order.id}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-accent/10">
                <div>
                  <p className="text-[10px] text-brand-gray mb-1">Date</p>
                  <p className="text-[13px] text-brand-white">{order.date}</p>
                </div>
                <div>
                  <p className="text-[10px] text-brand-gray mb-1">Items</p>
                  <p className="text-[13px] text-brand-white">{order.items} item{order.items > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-[10px] text-brand-gray mb-1">Total</p>
                  <p className="text-[13px] text-brand-white">${order.total}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-brand-gray hover:text-brand-accent transition-colors mt-4">
                View Details <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── 6. ADDRESSES TAB ───────────────────────────────────────

function AddressesTab() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES)

  const remove = (id: string) =>
    setAddresses((a) => a.filter((addr) => addr.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl font-light text-brand-white">Saved Addresses</h2>
        <button className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-accent border border-brand-accent/30 px-4 py-2.5 hover:bg-brand-accent/10 transition-colors">
          <Plus size={13} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className={clsx(
            'border p-6 relative',
            addr.isDefault ? 'border-brand-accent/40' : 'border-brand-accent/15'
          )}>
            {addr.isDefault && (
              <span className="absolute top-4 right-4 text-[9px] tracking-[0.15em] uppercase text-brand-accent border border-brand-accent/30 px-2 py-1">
                Default
              </span>
            )}
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-3">{addr.label}</p>
            <p className="text-[13px] text-brand-white leading-relaxed">
              {addr.line1}<br />
              {addr.city}, {addr.state} {addr.postalCode}<br />
              {addr.country}
            </p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-brand-accent/10">
              <button className="text-[11px] text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-1.5">
                <Edit2 size={11} /> Edit
              </button>
              <button
                onClick={() => remove(addr.id)}
                className="text-[11px] text-brand-gray hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={11} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 7. WISHLIST TAB ────────────────────────────────────────

function WishlistTab() {
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST)
  const remove = (id: string) => setWishlist((w) => w.filter((p) => p.id !== id))

  return (
    <div>
      <h2 className="font-display text-2xl font-light text-brand-white mb-8">
        Wishlist <span className="text-brand-gray text-lg">({wishlist.length})</span>
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={40} className="text-brand-accent/20 mx-auto mb-4" strokeWidth={1} />
          <p className="font-display text-xl text-brand-white mb-2">Your wishlist is empty</p>
          <p className="text-[13px] text-brand-gray mb-8">Save items you love for later.</p>
          <Link href="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((item) => (
            <div key={item.id} className="border border-brand-accent/15 hover:border-brand-accent/30 transition-colors">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#161412] to-[#221e1a] flex items-center justify-center">
                <span className="text-5xl opacity-10 font-display">
                  {item.category === 'footwear' ? '👟' : '👗'}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-1">{item.brand}</p>
                <p className="font-display text-[15px] text-brand-white mb-2">{item.name}</p>
                <p className="text-[14px] text-brand-accent mb-4">${item.price}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex-1 text-center text-[10px] tracking-[0.15em] uppercase bg-brand-accent text-brand-black py-2.5 hover:bg-brand-accent-dark transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => remove(item.id)}
                    className="w-10 flex items-center justify-center border border-brand-accent/20 text-brand-gray hover:text-red-400 hover:border-red-400/30 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── 8. MAIN PAGE ───────────────────────────────────────────

const TABS: { id: AccountTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile',   label: 'Profile',   icon: User    },
  { id: 'orders',    label: 'Orders',    icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin  },
  { id: 'wishlist',  label: 'Wishlist',  icon: Heart   },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile')

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow mb-2">BrimBT Design</p>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">
          My Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">

        {/* Sidebar */}
        <aside>
          <nav className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3.5 text-left text-[12px] tracking-[0.15em] uppercase transition-all',
                  activeTab === id
                    ? 'bg-brand-accent/10 border-l-2 border-brand-accent text-brand-accent'
                    : 'text-brand-gray hover:text-brand-white border-l-2 border-transparent'
                )}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile'   && <ProfileTab   />}
              {activeTab === 'orders'    && <OrdersTab    />}
              {activeTab === 'addresses' && <AddressesTab />}
              {activeTab === 'wishlist'  && <WishlistTab  />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
