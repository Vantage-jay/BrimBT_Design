'use client'

/* ============================================================
   BrimBT Design — Badge Component
   File: src/components/ui/Badge.tsx
   ============================================================ */

import clsx from 'clsx'

// ── 1. TYPES ───────────────────────────────────────────────

type BadgeVariant = 'new' | 'sale' | 'hot' | 'limited' | 'default' | 'success' | 'warning' | 'error'

interface BadgeProps {
  variant?:  BadgeVariant
  children:  React.ReactNode
  className?: string
  dot?:      boolean   // show a small dot indicator instead of text
}

// ── 2. STYLES ──────────────────────────────────────────────

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  new:     'bg-brand-accent text-brand-black',
  sale:    'bg-red-500 text-white',
  hot:     'bg-orange-500 text-white',
  limited: 'bg-purple-600 text-white',
  default: 'border border-brand-accent/30 text-brand-accent',
  success: 'bg-green-500/10 border border-green-500/20 text-green-400',
  warning: 'bg-orange-500/10 border border-orange-500/20 text-orange-400',
  error:   'bg-red-500/10 border border-red-500/20 text-red-400',
}

// ── 3. COMPONENT ───────────────────────────────────────────

export default function Badge({
  variant   = 'default',
  children,
  className,
  dot       = false,
}: BadgeProps) {
  if (dot) {
    const dotColors: Partial<Record<BadgeVariant, string>> = {
      success: 'bg-green-400',
      warning: 'bg-orange-400',
      error:   'bg-red-400',
      default: 'bg-brand-accent',
    }
    return (
      <span className={clsx('inline-flex items-center gap-1.5', className)}>
        <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant] ?? 'bg-brand-accent')} />
        <span className="text-[11px] text-brand-gray">{children}</span>
      </span>
    )
  }

  return (
    <span
      className={clsx(
        'inline-block text-[9px] font-medium tracking-[0.15em] uppercase px-3 py-1.5',
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

/*
  ── USAGE EXAMPLES ───────────────────────────────────────

  import Badge from '@/components/ui/Badge'

  // Product badges
  <Badge variant="new">New</Badge>
  <Badge variant="sale">Sale</Badge>
  <Badge variant="hot">Hot</Badge>
  <Badge variant="limited">Limited</Badge>

  // Status badges
  <Badge variant="success">Delivered</Badge>
  <Badge variant="warning">Processing</Badge>
  <Badge variant="error">Cancelled</Badge>

  // Dot indicator
  <Badge variant="success" dot>In Stock</Badge>
  <Badge variant="error" dot>Out of Stock</Badge>
*/
