'use client'

/* ============================================================
   BrimBT Design — Checkout Page
   File: src/app/checkout/page.tsx
   ============================================================ */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, Lock, CheckCircle2,
  CreditCard, Truck, MapPin, ArrowLeft,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Address } from '@/types'
import clsx from 'clsx'

// ── 1. CONSTANTS ───────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 150
const TAX_RATE                = 0.08

// ── 2. TYPES ───────────────────────────────────────────────

type Step = 1 | 2 | 3

interface PaymentDetails {
  cardName:   string
  cardNumber: string
  expiry:     string
  cvv:        string
}

// ── 3. FORM FIELD ──────────────────────────────────────────

interface FieldProps {
  label:        string
  name:         string
  type?:        string
  value:        string
  onChange:     (v: string) => void
  placeholder?: string
  required?:    boolean
  maxLength?:   number
  half?:        boolean
  error?:       string
}

function Field({
  label, name, type = 'text', value, onChange,
  placeholder, required, maxLength, half, error,
}: FieldProps) {
  return (
    <div className={clsx('flex flex-col gap-1.5', half ? 'col-span-1' : 'col-span-2')}>
      <label
        htmlFor={name}
        className="text-[10px] tracking-[0.2em] uppercase text-brand-gray font-medium"
      >
        {label}{required && <span className="text-brand-accent ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={clsx(
          'bg-transparent border px-4 py-3 text-[13px] text-brand-white placeholder:text-brand-gray/40 transition-colors focus:outline-none',
          error
            ? 'border-red-500/60 focus:border-red-500'
            : 'border-brand-accent/20 focus:border-brand-accent/60'
        )}
      />
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  )
}

// ── 4. STEP INDICATOR ──────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: 'Shipping', icon: MapPin   },
    { n: 2, label: 'Payment',  icon: CreditCard },
    { n: 3, label: 'Confirm',  icon: CheckCircle2 },
  ]
  return (
    <div className="flex items-center gap-0 mb-12">
      {steps.map((step, i) => {
        const done    = current > step.n
        const active  = current === step.n
        const Icon    = step.icon
        return (
          <div key={step.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div className={clsx(
                'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-400',
                done   ? 'bg-brand-accent border-brand-accent text-brand-black'
                  : active ? 'border-brand-accent text-brand-accent bg-brand-accent/10'
                  : 'border-brand-gray/20 text-brand-gray'
              )}>
                {done
                  ? <CheckCircle2 size={16} className="fill-brand-black stroke-brand-black" />
                  : <Icon size={15} />
                }
              </div>
              <span className={clsx(
                'text-[9px] tracking-[0.15em] uppercase whitespace-nowrap',
                active ? 'text-brand-accent' : done ? 'text-brand-white' : 'text-brand-gray'
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={clsx(
                'flex-1 h-px mx-3 mb-5 transition-colors duration-400',
                done ? 'bg-brand-accent' : 'bg-brand-gray/20'
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── 5. ORDER SUMMARY PANEL ─────────────────────────────────

function OrderSummary() {
  const items    = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99
  const tax      = subtotal * TAX_RATE
  const total    = subtotal + shipping + tax
  const fmt      = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  return (
    <div className="bg-brand-accent/[0.03] border border-brand-accent/15 p-6 sticky top-28">
      <p className="eyebrow mb-6">Order Summary</p>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="text-[12px] text-brand-gray">No items in cart.</p>
        ) : items.map((item) => (
          <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
            {/* Thumbnail */}
            <div className="w-14 h-16 flex-shrink-0 bg-gradient-to-br from-[#161412] to-[#221e1a] flex items-center justify-center">
              <span className="text-xl opacity-10 font-display">
                {item.product.category === 'footwear' ? '👟' : '👗'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-brand-white leading-snug truncate font-display">
                {item.product.name}
              </p>
              <p className="text-[10px] text-brand-gray mt-0.5">
                Size: {item.selectedSize} · Qty: {item.quantity}
              </p>
              <p className="text-[12px] text-brand-accent mt-1">
                {fmt(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-brand-accent/12 pt-4 space-y-2 mb-4">
        {[
          { label: 'Subtotal',  value: fmt(subtotal),  highlight: false },
          { label: 'Shipping',  value: shipping === 0 ? 'Free' : fmt(shipping), highlight: shipping === 0 },
          { label: 'Est. Tax',  value: fmt(tax),        highlight: false },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="flex justify-between text-[12px]">
            <span className="text-brand-gray">{label}</span>
            <span className={highlight ? 'text-green-400' : 'text-brand-white'}>{value}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-brand-accent/12 pt-4 flex justify-between">
        <span className="text-[12px] tracking-[0.15em] uppercase text-brand-white font-medium">Total</span>
        <span className="font-display text-xl font-light text-brand-white">{fmt(total)}</span>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-brand-accent/10">
        <Lock size={12} className="text-brand-gray flex-shrink-0" />
        <p className="text-[10px] text-brand-gray leading-snug">
          Secured with 256-bit SSL encryption. Your data is safe.
        </p>
      </div>
    </div>
  )
}

// ── 6. STEP 1 — SHIPPING ───────────────────────────────────

interface Step1Props {
  data:     Address
  onChange: (data: Address) => void
  onNext:   () => void
}

function ShippingStep({ data, onChange, onNext }: Step1Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({})

  const set = (key: keyof Address) => (v: string) =>
    onChange({ ...data, [key]: v })

  const validate = () => {
    const e: typeof errors = {}
    if (!data.fullName)   e.fullName   = 'Full name is required'
    if (!data.line1)      e.line1      = 'Address is required'
    if (!data.city)       e.city       = 'City is required'
    if (!data.state)      e.state      = 'State is required'
    if (!data.postalCode) e.postalCode = 'Postal code is required'
    if (!data.country)    e.country    = 'Country is required'
    if (!data.phone)      e.phone      = 'Phone number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) onNext() }

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{    opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <Truck size={18} className="text-brand-accent" />
        <h2 className="font-display text-2xl font-light text-brand-white">Shipping Address</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Field label="Full Name"    name="fullName"   value={data.fullName}   onChange={set('fullName')}   placeholder="Jane Doe"          required error={errors.fullName} />
        <Field label="Phone"        name="phone"      value={data.phone}      onChange={set('phone')}      placeholder="+1 000 000 0000"    required half error={errors.phone} />
        <Field label="Address Line 1" name="line1"   value={data.line1}      onChange={set('line1')}      placeholder="123 Main Street"   required error={errors.line1} />
        <Field label="Address Line 2 (optional)" name="line2" value={data.line2 ?? ''} onChange={set('line2')} placeholder="Apt, Suite, Floor" />
        <Field label="City"         name="city"       value={data.city}       onChange={set('city')}       placeholder="New York"          required half error={errors.city} />
        <Field label="State / Province" name="state" value={data.state}      onChange={set('state')}      placeholder="NY"                required half error={errors.state} />
        <Field label="Postal Code"  name="postalCode" value={data.postalCode} onChange={set('postalCode')} placeholder="10001"             required half error={errors.postalCode} />
        <Field label="Country"      name="country"    value={data.country}    onChange={set('country')}    placeholder="United States"     required half error={errors.country} />
      </div>

      {/* Shipping method */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray font-medium mb-4">Shipping Method</p>
        <div className="space-y-3">
          {[
            { id: 'standard', label: 'Standard Shipping', sub: '5–7 business days', price: 'Free over $150' },
            { id: 'express',  label: 'Express Shipping',  sub: '2–3 business days', price: '$14.99'         },
            { id: 'next-day', label: 'Next-Day Delivery', sub: 'Order by 12pm',     price: '$29.99'         },
          ].map((m) => (
            <label
              key={m.id}
              className="flex items-center justify-between border border-brand-accent/20 px-5 py-4 cursor-pointer hover:border-brand-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <input type="radio" name="shipping" defaultChecked={m.id === 'standard'}
                  className="accent-brand-accent w-4 h-4" />
                <div>
                  <p className="text-[13px] text-brand-white group-hover:text-brand-accent transition-colors">{m.label}</p>
                  <p className="text-[10px] text-brand-gray mt-0.5">{m.sub}</p>
                </div>
              </div>
              <span className="text-[12px] text-brand-accent">{m.price}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
        Continue to Payment <ChevronRight size={16} />
      </button>
    </motion.div>
  )
}

// ── 7. STEP 2 — PAYMENT ────────────────────────────────────

interface Step2Props {
  data:     PaymentDetails
  onChange: (data: PaymentDetails) => void
  onNext:   () => void
  onBack:   () => void
}

function PaymentStep({ data, onChange, onNext, onBack }: Step2Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentDetails, string>>>({})

  const set = (key: keyof PaymentDetails) => (v: string) =>
    onChange({ ...data, [key]: v })

  // Format card number with spaces every 4 digits
  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  // Format expiry MM/YY
  const formatExpiry = (v: string) => {
    const clean = v.replace(/\D/g, '').slice(0, 4)
    return clean.length >= 3 ? `${clean.slice(0,2)}/${clean.slice(2)}` : clean
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!data.cardName)                    e.cardName   = 'Cardholder name is required'
    if (data.cardNumber.replace(/\s/g,'').length < 16) e.cardNumber = 'Enter a valid 16-digit card number'
    if (!data.expiry || data.expiry.length < 5)        e.expiry     = 'Enter a valid expiry date'
    if (!data.cvv || data.cvv.length < 3)              e.cvv        = 'Enter a valid CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) onNext() }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{    opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <CreditCard size={18} className="text-brand-accent" />
        <h2 className="font-display text-2xl font-light text-brand-white">Payment Details</h2>
      </div>

      {/* Accepted cards */}
      <div className="flex items-center gap-2 mb-8">
        <p className="text-[10px] text-brand-gray tracking-wide mr-2">Accepted:</p>
        {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((c) => (
          <span key={c} className="text-[9px] tracking-wide uppercase border border-brand-gray/20 text-brand-gray/60 px-2 py-1">{c}</span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Field
          label="Cardholder Name" name="cardName"
          value={data.cardName} onChange={set('cardName')}
          placeholder="Jane Doe" required error={errors.cardName}
        />
        <Field
          label="Card Number" name="cardNumber"
          value={data.cardNumber}
          onChange={(v) => set('cardNumber')(formatCard(v))}
          placeholder="1234 5678 9012 3456"
          required maxLength={19} error={errors.cardNumber}
        />
        <Field
          label="Expiry Date" name="expiry" half
          value={data.expiry}
          onChange={(v) => set('expiry')(formatExpiry(v))}
          placeholder="MM/YY" required maxLength={5} error={errors.expiry}
        />
        <Field
          label="CVV" name="cvv" type="password" half
          value={data.cvv} onChange={set('cvv')}
          placeholder="•••" required maxLength={4} error={errors.cvv}
        />
      </div>

      {/* Billing address option */}
      <label className="flex items-center gap-3 mb-8 cursor-pointer group">
        <input type="checkbox" defaultChecked className="accent-brand-accent w-4 h-4" />
        <span className="text-[12px] text-brand-gray group-hover:text-brand-white transition-colors">
          Billing address same as shipping address
        </span>
      </label>

      {/* Security note */}
      <div className="flex items-start gap-3 bg-brand-accent/[0.04] border border-brand-accent/15 px-5 py-4 mb-8">
        <Lock size={14} className="text-brand-accent flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-brand-gray leading-relaxed">
          Your payment information is encrypted with 256-bit SSL. We never store your full card details.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-gray border border-brand-accent/20 px-6 py-4 hover:border-brand-accent hover:text-brand-white transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button onClick={handleNext} className="btn-primary flex-1 flex items-center justify-center gap-2 py-4">
          <Lock size={14} /> Place Order
        </button>
      </div>
    </motion.div>
  )
}

// ── 8. STEP 3 — CONFIRMATION ───────────────────────────────

function ConfirmationStep({ address }: { address: Address }) {
  const clearCart = useCartStore((s) => s.clearCart)
  const orderNum  = `BT-${Date.now().toString().slice(-6)}`

  // Clear cart on confirmation mount
  useState(() => { clearCart() })

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-8"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle2 size={36} className="text-green-400" />
      </motion.div>

      <p className="eyebrow mb-3">Order Confirmed</p>
      <h2 className="font-display text-[clamp(28px,4vw,44px)] font-light text-brand-white mb-4">
        Thank you for your order!
      </h2>
      <p className="text-[13px] text-brand-gray mb-2 max-w-sm mx-auto leading-relaxed">
        Your order has been placed and is being prepared. A confirmation email will be sent shortly.
      </p>

      {/* Order number */}
      <div className="inline-block border border-brand-accent/30 px-6 py-3 my-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-brand-gray mb-1">Order Number</p>
        <p className="font-display text-2xl text-brand-accent tracking-widest">{orderNum}</p>
      </div>

      {/* Delivery address */}
      {address.fullName && (
        <div className="bg-brand-accent/[0.04] border border-brand-accent/15 px-6 py-5 max-w-sm mx-auto mb-10 text-left">
          <p className="eyebrow mb-3">Delivering to</p>
          <p className="text-[13px] text-brand-white">{address.fullName}</p>
          <p className="text-[12px] text-brand-gray mt-1 leading-relaxed">
            {address.line1}{address.line2 ? `, ${address.line2}` : ''}<br />
            {address.city}, {address.state} {address.postalCode}<br />
            {address.country}
          </p>
        </div>
      )}

      {/* Estimated delivery */}
      <div className="flex items-center justify-center gap-3 text-[12px] text-brand-gray mb-10">
        <Truck size={15} className="text-brand-accent" />
        Estimated delivery: <span className="text-brand-white">5–7 business days</span>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/products" className="btn-primary">Continue Shopping</Link>
        <Link
          href="/"
          className="text-[11px] tracking-[0.15em] uppercase text-brand-gray border border-brand-accent/20 px-6 py-4 hover:border-brand-accent hover:text-brand-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  )
}

// ── 9. MAIN PAGE ───────────────────────────────────────────

const EMPTY_ADDRESS: Address = {
  fullName: '', line1: '', line2: '', city: '',
  state: '', postalCode: '', country: '', phone: '',
}

const EMPTY_PAYMENT: PaymentDetails = {
  cardName: '', cardNumber: '', expiry: '', cvv: '',
}

export default function CheckoutPage() {
  const items    = useCartStore((s) => s.items)
  const [step,    setStep]    = useState<Step>(1)
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS)
  const [payment, setPayment] = useState<PaymentDetails>(EMPTY_PAYMENT)

  // Redirect if cart is empty (and not on confirmation step)
  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-40 text-center">
        <p className="font-display text-4xl text-brand-white mb-4">Your cart is empty</p>
        <p className="text-brand-gray mb-10">Add some items before checking out.</p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-10 text-[11px] text-brand-gray">
        <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
        <span className="opacity-30">/</span>
        <Link href="/cart" className="hover:text-brand-white transition-colors">Cart</Link>
        <span className="opacity-30">/</span>
        <span className="text-brand-accent">Checkout</span>
      </nav>

      {/* Page title */}
      <div className="mb-10">
        <p className="eyebrow mb-2">BrimBT Design</p>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">
          {step === 3 ? 'Order Confirmed' : 'Secure Checkout'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">

        {/* ── Left — Form steps ───────────────────────── */}
        <div>
          {step !== 3 && <StepIndicator current={step} />}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <ShippingStep
                key="s1"
                data={address}
                onChange={setAddress}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <PaymentStep
                key="s2"
                data={payment}
                onChange={setPayment}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <ConfirmationStep key="s3" address={address} />
            )}
          </AnimatePresence>
        </div>

        {/* ── Right — Order summary ────────────────────── */}
        {step !== 3 && (
          <div className="hidden lg:block">
            <OrderSummary />
          </div>
        )}

      </div>
    </div>
  )
}
