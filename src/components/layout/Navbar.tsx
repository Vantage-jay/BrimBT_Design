'use client'

/* ============================================================
   BrinmBT Design — Navbar Component
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

// ── 1. NAV DATA ────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'New Arrivals', href: '/products?badge=new' },
      { label: 'SS 2026',      href: '/products?collection=ss2026' },
      { label: 'Essentials',   href: '/products?category=essentials' },
    ],
  },
  {
    label: 'Clothing',
    href: '/products?category=clothing',
    children: [
      { label: 'Dresses',    href: '/products?category=clothing&type=dresses' },
      { label: 'Sets',       href: '/products?category=clothing&type=sets' },
      { label: 'Tops',       href: '/products?category=clothing&type=tops' },
      { label: 'Bottoms',    href: '/products?category=clothing&type=bottoms' },
    ],
  },
  {
    label: 'Footwear',
    href: '/products?category=footwear',
    children: [
      { label: 'Sneakers', href: '/products?category=footwear&type=sneakers' },
      { label: 'Heels',    href: '/products?category=footwear&type=heels' },
      { label: 'Flats',    href: '/products?category=footwear&type=flats' },
      { label: 'Boots',    href: '/products?category=footwear&type=boots' },
    ],
  },
  { label: 'Accessories', href: '/products?category=accessories' },
  { label: 'Sale',        href: '/products?badge=sale' },
]

// ── 2. CURSOR COMPONENT ────────────────────────────────────

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    // Smooth ring follow using requestAnimationFrame
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animateRing)
    }

    // Grow cursor ring on hoverable elements
    const onMouseEnter = () => ring.classList.add('hovered')
    const onMouseLeave = () => ring.classList.remove('hovered')

    const hoverables = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, label'
    )
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    document.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}

// ── 3. DROPDOWN MENU ───────────────────────────────────────

interface DropdownProps {
  links: NavLink[]
  isOpen: boolean
}

function Dropdown({ links, isOpen }: DropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{    opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-4 min-w-[180px] bg-brand-black border border-brand-accent/20 py-4 z-50"
        >
          {links.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-6 py-2.5 text-[11px] tracking-[0.18em] uppercase text-brand-gray hover:text-brand-accent hover:bg-brand-accent/5 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── 4. MOBILE MENU ─────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{    x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 bg-brand-black border-l border-brand-accent/20 z-50 flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-brand-accent/15">
              <span className="font-display text-xl tracking-[0.2em] text-brand-white">
                Brinm<span className="text-brand-accent">BT</span> Design
              </span>
              <button onClick={onClose} className="text-brand-gray hover:text-brand-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-8 px-6">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="mb-1">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={clsx(
                      'block py-3 text-[13px] tracking-[0.15em] uppercase border-b border-brand-accent/10 transition-colors',
                      pathname === link.href
                        ? 'text-brand-accent'
                        : 'text-brand-light-gray hover:text-brand-white'
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Sub-links */}
                  {link.children && (
                    <div className="pl-4 pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2 text-[11px] tracking-[0.12em] uppercase text-brand-gray hover:text-brand-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-brand-accent/15 flex gap-6">
              <Link href="/auth" onClick={onClose} className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-gray hover:text-brand-white transition-colors">
                <User size={14} /> Account
              </Link>
              <Link href="/search" onClick={onClose} className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-brand-gray hover:text-brand-white transition-colors">
                <Search size={14} /> Search
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── 5. MAIN NAVBAR ─────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname()

  // Scroll state — nav background changes after 60px
  const [scrolled,     setScrolled]     = useState(false)
  // Active dropdown — tracks which nav item is hovered
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  // Mobile menu
  const [mobileOpen,   setMobileOpen]   = useState(false)

  // Cart state from global store
  const totalItems = useCartStore((s) => s.totalItems)
  const openCart   = useCartStore((s) => s.openCart)

  // ── Scroll listener ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Close mobile menu on route change ─────────────────
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <CustomCursor />

      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-400',
          scrolled
            ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-accent/15 py-4'
            : 'bg-transparent py-7'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-15 flex items-center justify-between">

          {/* ── Logo ──────────────────────────────────── */}
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-[0.22em] text-brand-white uppercase z-10"
          >
            Brinm<span className="text-brand-accent">BT</span> Design
          </Link>

          {/* ── Desktop Nav Links ──────────────────────── */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={clsx(
                    'nav-link',
                    pathname === link.href && 'text-brand-accent'
                  )}
                >
                  {link.label}
                </Link>

                {link.children && (
                  <Dropdown
                    links={link.children}
                    isOpen={activeDropdown === link.label}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* ── Desktop Actions ────────────────────────── */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/search"
              aria-label="Search"
              className="text-brand-gray hover:text-brand-accent transition-colors"
            >
              <Search size={18} />
            </Link>

            <Link
              href="/auth"
              aria-label="Account"
              className="text-brand-gray hover:text-brand-accent transition-colors"
            >
              <User size={18} />
            </Link>

            {/* Cart button — opens slide-out drawer */}
            <button
              onClick={openCart}
              aria-label={`Cart — ${totalItems} items`}
              className="relative text-brand-gray hover:text-brand-accent transition-colors"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{    scale: 0 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-accent text-brand-black text-[9px] font-medium flex items-center justify-center"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ── Mobile Actions ─────────────────────────── */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative text-brand-gray hover:text-brand-accent transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-accent text-brand-black text-[9px] font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="text-brand-gray hover:text-brand-white transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────── */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
