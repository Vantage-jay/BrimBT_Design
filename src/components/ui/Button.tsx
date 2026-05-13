'use client'

/* ============================================================
   BrimBT Design — Button Component
   File: src/components/ui/Button.tsx
   ============================================================ */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// ── 1. TYPES ───────────────────────────────────────────────

type Variant = 'primary' | 'ghost' | 'outline' | 'danger' | 'link'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  loading?:  boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

// ── 2. STYLES ──────────────────────────────────────────────

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-brand-accent text-brand-black hover:bg-brand-accent-dark',
  ghost:   'text-brand-gray hover:text-brand-white',
  outline: 'border border-brand-accent/30 text-brand-gray hover:border-brand-accent hover:text-brand-white',
  danger:  'border border-red-500/20 text-red-400/70 hover:border-red-500/40 hover:text-red-400',
  link:    'text-brand-accent underline underline-offset-2 hover:text-brand-white',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'text-[10px] tracking-[0.18em] px-4 py-2',
  md: 'text-[11px] tracking-[0.2em] px-6 py-3',
  lg: 'text-[11px] tracking-[0.2em] px-10 py-4',
}

// ── 3. COMPONENT ───────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant   = 'primary',
    size      = 'md',
    loading   = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    disabled,
    children,
    className,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        disabled={isDisabled}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-body font-medium uppercase transition-all duration-300',
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {iconLeft}
            {children}
            {iconRight}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button

/*
  ── USAGE EXAMPLES ───────────────────────────────────────

  import Button from '@/components/ui/Button'
  import { ArrowRight, Trash2 } from 'lucide-react'

  // Primary
  <Button>Shop Now</Button>

  // With icon
  <Button iconRight={<ArrowRight size={14} />}>
    Continue to Payment
  </Button>

  // Ghost
  <Button variant="ghost">Cancel</Button>

  // Outline
  <Button variant="outline" size="sm">Filter</Button>

  // Danger
  <Button variant="danger" iconLeft={<Trash2 size={13} />}>
    Delete Account
  </Button>

  // Loading state
  <Button loading>Saving...</Button>

  // Full width
  <Button fullWidth size="lg">Add to Cart</Button>
*/
