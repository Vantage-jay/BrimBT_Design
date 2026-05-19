// ══════════════════════════════════════════════════════════════
// FILE: src/app/faq/page.tsx
// ══════════════════════════════════════════════════════════════
/*
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import clsx from 'clsx'

const FAQ_DATA = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does standard shipping take?', a: 'Standard shipping takes 5–7 business days within the US. Express (2–3 days) and next-day delivery are available at checkout.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries. International shipping takes 7–14 business days. Duties and taxes may apply.' },
      { q: 'How do I track my order?', a: 'Once your order ships you will receive a tracking number by email. You can also track from your account dashboard.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be modified within 1 hour of placement. After that the order enters processing. Contact us immediately if needed.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, in original condition with all tags attached.' },
      { q: 'How do I start a return?', a: 'Log in to your account, go to Order History, select the order and click Return Items. A prepaid label will be emailed within 24 hours.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5–7 business days of receiving your return to your original payment method.' },
      { q: 'Can I exchange for a different size?', a: 'Yes. During the return process select Exchange instead of Refund. Exchanges are subject to stock availability.' },
    ],
  },
  {
    category: 'Products & Sizing',
    items: [
      { q: 'How do I find my size?', a: 'Each product page includes a size guide with detailed measurements. We recommend measuring yourself and comparing to our size chart.' },
      { q: 'Are your products true to size?', a: 'Most clothing is true to size. Oversized styles are labelled as such. For footwear, go up half a size if between sizes.' },
      { q: 'What materials do you use?', a: 'We use premium natural materials including pure silk, Belgian linen, organic cotton and full-grain leather. Details are on every product page.' },
    ],
  },
  {
    category: 'Payments & Security',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay and Google Pay. All transactions are secured with 256-bit SSL encryption.' },
      { q: 'Is my payment information safe?', a: 'Yes. We never store full card details. Payments are processed through Stripe, a PCI-DSS Level 1 certified processor.' },
    ],
  },
]

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-accent/12">
      <button onClick={() => setOpen((o) => !o)} className="flex items-start justify-between w-full py-5 text-left gap-4">
        <span className={clsx('text-[14px] leading-snug transition-colors', open ? 'text-brand-accent' : 'text-brand-white')}>{question}</span>
        <ChevronDown size={16} className={clsx('text-brand-gray flex-shrink-0 mt-0.5 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} className="overflow-hidden">
            <p className="text-[13px] text-brand-gray leading-[1.9] pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('All')
  const categories = ['All', ...FAQ_DATA.map((c) => c.category)]
  const filtered = FAQ_DATA
    .map((cat) => ({ ...cat, items: cat.items.filter((i) => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())) }))
    .filter((cat) => (active === 'All' || cat.category === active) && cat.items.length > 0)
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-3">Help Centre</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-white mb-6">Frequently Asked <em className="italic text-brand-accent">Questions</em></h1>
        <div className="flex items-center border border-brand-accent/25 focus-within:border-brand-accent/60 transition-colors px-5">
          <Search size={16} className="text-brand-gray" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..."
            className="flex-1 bg-transparent px-4 py-3.5 text-[13px] text-brand-white placeholder:text-brand-gray/40 outline-none" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}
            className={clsx('text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors',
              active === cat ? 'border-brand-accent text-brand-accent bg-brand-accent/10' : 'border-brand-accent/20 text-brand-gray hover:border-brand-accent/50 hover:text-brand-white')}>
            {cat}
          </button>
        ))}
      </div>
      <div className="max-w-3xl mx-auto space-y-12">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <p className="eyebrow mb-6">{cat.category}</p>
            {cat.items.map((item) => <AccordionItem key={item.q} question={item.q} answer={item.a} />)}
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto mt-20 border border-brand-accent/20 p-10 text-center">
        <p className="font-display text-2xl font-light text-brand-white mb-3">Still need help?</p>
        <p className="text-[13px] text-brand-gray mb-8">Our support team is ready to assist you.</p>
        <Link href="/contact" className="btn-primary">Contact Us</Link>
      </div>
    </div>
  )
}
*/
