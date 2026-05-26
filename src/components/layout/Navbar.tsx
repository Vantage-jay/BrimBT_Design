'use client'

/* ============================================================
   BrimBT Design — Navbar (Light Theme)
   File: src/components/layout/Navbar.tsx
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, X, Menu, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { NavLink } from '@/types'
import clsx from 'clsx'

const NAV_LINKS: NavLink[] = [
  {
    label:'Collections', href:'/collections',
    children:[
      { label:'New Arrivals', href:'/products?badge=new' },
      { label:'SS 2026',      href:'/products?collection=ss2026' },
      { label:'Essentials',   href:'/products?category=essentials' },
    ],
  },
  {
    label:'Clothing', href:'/products?category=clothing',
    children:[
      { label:'Dresses', href:'/products?category=clothing&type=dresses' },
      { label:'Sets',    href:'/products?category=clothing&type=sets' },
      { label:'Tops',    href:'/products?category=clothing&type=tops' },
      { label:'Bottoms', href:'/products?category=clothing&type=bottoms' },
    ],
  },
  {
    label:'Footwear', href:'/products?category=footwear',
    children:[
      { label:'Sneakers', href:'/products?category=footwear&type=sneakers' },
      { label:'Heels',    href:'/products?category=footwear&type=heels' },
      { label:'Flats',    href:'/products?category=footwear&type=flats' },
      { label:'Boots',    href:'/products?category=footwear&type=boots' },
    ],
  },
  { label:'Accessories', href:'/products?category=accessories' },
  { label:'Sale',        href:'/products?badge=sale' },
]

// ── Custom Cursor ──────────────────────────────────────────

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`
    }
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`
      rafId = requestAnimationFrame(animate)
    }
    const onEnter = () => ring.classList.add('hovered')
    const onLeave = () => ring.classList.remove('hovered')
    const els = document.querySelectorAll('a,button,[role="button"],input,select,textarea,label')
    els.forEach((el) => { el.addEventListener('mouseenter',onEnter); el.addEventListener('mouseleave',onLeave) })
    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      els.forEach((el) => { el.removeEventListener('mouseenter',onEnter); el.removeEventListener('mouseleave',onLeave) })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}

// ── Dropdown ───────────────────────────────────────────────

function Dropdown({ links, isOpen }: { links: NavLink[]; isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
          transition={{ duration:0.18 }}
          className="absolute top-full left-0 mt-3 min-w-[180px] bg-brand-white border border-brand-accent/15 shadow-brand py-3 z-50"
        >
          {links.map((child) => (
            <Link key={child.href} href={child.href}
              className="block px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase text-brand-text-secondary hover:text-brand-accent hover:bg-brand-accent-bg transition-colors">
              {child.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Mobile Menu ────────────────────────────────────────────

function MobileMenu({ isOpen, onClose, pathname }: { isOpen:boolean; onClose:()=>void; pathname:string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 bg-brand-black/40 z-40 md:hidden" onClick={onClose} />
          <motion.div
            initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
            transition={{ type:'tween', duration:0.32, ease:'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 bg-brand-white border-l border-brand-accent/15 z-50 flex flex-col shadow-brand-lg md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-brand-accent/12">
              <span className="font-display text-xl tracking-[0.2em] text-brand-black">
                Brim<span className="text-brand-accent">BT</span> Design
              </span>
              <button onClick={onClose} className="text-brand-text-muted hover:text-brand-black transition-colors">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="mb-1">
                  <Link href={link.href} onClick={onClose}
                    className={clsx(
                      'block py-3 text-[12px] tracking-[0.15em] uppercase border-b border-brand-accent/10 transition-colors',
                      pathname === link.href ? 'text-brand-accent' : 'text-brand-text-secondary hover:text-brand-black'
                    )}>
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 pb-1">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={onClose}
                          className="block py-2 text-[11px] tracking-[0.12em] uppercase text-brand-text-muted hover:text-brand-accent transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="px-6 py-5 border-t border-brand-accent/12 flex gap-6">
              <Link href="/account" onClick={onClose} className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-text-muted hover:text-brand-black transition-colors">
                <User size={14} /> Account
              </Link>
              <Link href="/search" onClick={onClose} className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-text-muted hover:text-brand-black transition-colors">
                <Search size={14} /> Search
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Main Navbar ────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled,        setScrolled]        = useState(false)
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null)
  const [mobileOpen,      setMobileOpen]      = useState(false)

  const totalItems = useCartStore((s) => s.totalItems)
  const openCart   = useCartStore((s) => s.openCart)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handle, { passive:true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <CustomCursor />

      <header className={clsx(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-400',
        scrolled
          ? 'bg-brand-white/95 backdrop-blur-md border-b border-brand-accent/15 shadow-brand py-4'
          : 'bg-brand-white/80 backdrop-blur-sm border-b border-brand-accent/8 py-6'
      )}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-15 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-semibold tracking-[0.22em] text-brand-black uppercase z-10">
            Brim<span className="text-brand-accent">BT</span> Design
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={link.href}
                  className={clsx('nav-link', pathname === link.href && 'text-brand-accent')}>
                  {link.label}
                </Link>
                {link.children && <Dropdown links={link.children} isOpen={activeDropdown === link.label} />}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/search" aria-label="Search"
              className="text-brand-text-muted hover:text-brand-accent transition-colors">
              <Search size={18} />
            </Link>
            <Link href="/account" aria-label="Account"
              className="text-brand-text-muted hover:text-brand-accent transition-colors">
              <User size={18} />
            </Link>
            <button onClick={openCart} aria-label={`Cart — ${totalItems} items`}
              className="relative text-brand-text-muted hover:text-brand-accent transition-colors">
              <ShoppingBag size={18} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span key="badge" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-accent text-white text-[9px] font-medium flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={openCart} className="relative text-brand-text-muted hover:text-brand-accent transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-accent text-white text-[9px] font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="text-brand-text-muted hover:text-brand-black transition-colors">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  )
}
