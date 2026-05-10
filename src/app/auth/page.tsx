'use client'

/* ============================================================
   BrimBT Design — Auth Page (Login & Register)
   File: src/app/auth/page.tsx
   ============================================================ */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, Mail, Lock, User,
  ArrowRight, CheckCircle2, AlertCircle,
} from 'lucide-react'
import clsx from 'clsx'

// ── 1. TYPES ───────────────────────────────────────────────

type Tab = 'login' | 'register'

interface LoginForm {
  email:      string
  password:   string
  remember:   boolean
}

interface RegisterForm {
  firstName:       string
  lastName:        string
  email:           string
  password:        string
  confirmPassword: string
  agreeToTerms:    boolean
}

// ── 2. PASSWORD STRENGTH ───────────────────────────────────

interface PasswordStrength {
  score:  0 | 1 | 2 | 3 | 4
  label:  string
  color:  string
}

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '',        color: '' }

  let score = 0
  if (password.length >= 8)              score++
  if (/[A-Z]/.test(password))           score++
  if (/[0-9]/.test(password))           score++
  if (/[^A-Za-z0-9]/.test(password))   score++

  const map: Record<number, Omit<PasswordStrength, 'score'>> = {
    1: { label: 'Weak',      color: 'bg-red-500'    },
    2: { label: 'Fair',      color: 'bg-orange-400' },
    3: { label: 'Good',      color: 'bg-yellow-400' },
    4: { label: 'Strong',    color: 'bg-green-500'  },
  }

  return { score: score as PasswordStrength['score'], ...(map[score] ?? map[1]) }
}

// ── 3. FORM FIELD ──────────────────────────────────────────

interface InputFieldProps {
  label:        string
  name:         string
  type?:        string
  value:        string
  onChange:     (v: string) => void
  placeholder?: string
  icon?:        React.ReactNode
  rightElement?: React.ReactNode
  error?:       string
  hint?:        string
}

function InputField({
  label, name, type = 'text', value, onChange,
  placeholder, icon, rightElement, error, hint,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[10px] tracking-[0.2em] uppercase text-brand-gray font-medium"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={name}
          className={clsx(
            'w-full bg-transparent border py-3 text-[13px] text-brand-white placeholder:text-brand-gray/40 transition-colors focus:outline-none',
            icon    ? 'pl-11 pr-4' : 'px-4',
            rightElement ? 'pr-11' : '',
            error
              ? 'border-red-500/60 focus:border-red-500'
              : 'border-brand-accent/20 focus:border-brand-accent/60'
          )}
        />
        {rightElement && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-[10px] text-red-400">
          <AlertCircle size={10} /> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[10px] text-brand-gray">{hint}</p>
      )}
    </div>
  )
}

// ── 4. PASSWORD FIELD ──────────────────────────────────────

function PasswordField({
  label, name, value, onChange, error, hint, showStrength,
}: {
  label:         string
  name:          string
  value:         string
  onChange:      (v: string) => void
  error?:        string
  hint?:         string
  showStrength?: boolean
}) {
  const [visible, setVisible] = useState(false)
  const strength = showStrength ? getPasswordStrength(value) : null

  return (
    <div className="flex flex-col gap-1.5">
      <InputField
        label={label}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        icon={<Lock size={15} />}
        rightElement={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-brand-gray hover:text-brand-accent transition-colors"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
        error={error}
        hint={hint}
      />

      {/* Strength meter */}
      {showStrength && value && strength && (
        <div className="mt-1">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={clsx(
                  'h-0.5 flex-1 rounded-full transition-all duration-300',
                  bar <= strength.score ? strength.color : 'bg-white/10'
                )}
              />
            ))}
          </div>
          <p className={clsx('text-[10px] transition-colors', strength.color.replace('bg-', 'text-'))}>
            Password strength: {strength.label}
          </p>
        </div>
      )}
    </div>
  )
}

// ── 5. SOCIAL LOGIN ────────────────────────────────────────

function SocialLogin() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-brand-accent/15" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-brand-gray">or continue with</span>
        <div className="flex-1 h-px bg-brand-accent/15" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Google',   emoji: 'G' },
          { label: 'Facebook', emoji: 'f' },
        ].map(({ label, emoji }) => (
          <button
            key={label}
            className="flex items-center justify-center gap-2 border border-brand-accent/20 py-3 text-[12px] tracking-wide text-brand-gray hover:border-brand-accent hover:text-brand-white transition-all"
          >
            <span className="font-bold text-brand-accent">{emoji}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── 6. SUCCESS TOAST ───────────────────────────────────────

function SuccessToast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{    opacity: 0, y: -10 }}
      className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 px-5 py-4 mb-6"
    >
      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
      <p className="text-[13px] text-green-400">{message}</p>
    </motion.div>
  )
}

// ── 7. LOGIN FORM ──────────────────────────────────────────

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [form,    setForm]    = useState<LoginForm>({ email: '', password: '', remember: false })
  const [errors,  setErrors]  = useState<Partial<Record<keyof LoginForm, string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (key: keyof LoginForm) => (v: string | boolean) =>
    setForm((f) => ({ ...f, [key]: v }))

  const validate = () => {
    const e: typeof errors = {}
    if (!form.email)                              e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))   e.email    = 'Enter a valid email address'
    if (!form.password)                           e.password = 'Password is required'
    else if (form.password.length < 6)            e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    // Simulate API call — replace with real auth later
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSuccess(true)
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{    opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <AnimatePresence>
        {success && <SuccessToast message="Welcome back! Redirecting you to your account..." />}
      </AnimatePresence>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={set('email') as (v: string) => void}
        placeholder="you@example.com"
        icon={<Mail size={15} />}
        error={errors.email}
      />

      <PasswordField
        label="Password"
        name="password"
        value={form.password}
        onChange={set('password') as (v: string) => void}
        error={errors.password}
      />

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => set('remember')(e.target.checked)}
            className="accent-brand-accent w-3.5 h-3.5"
          />
          <span className="text-[12px] text-brand-gray group-hover:text-brand-white transition-colors">
            Remember me
          </span>
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-[11px] text-brand-gray hover:text-brand-accent transition-colors underline underline-offset-2"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading || success}
        whileTap={{ scale: 0.98 }}
        className={clsx(
          'btn-primary w-full flex items-center justify-center gap-2 py-4',
          (loading || success) && 'opacity-70 cursor-wait'
        )}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-black/40 border-t-brand-black rounded-full animate-spin" />
            Signing in...
          </>
        ) : (
          <>Sign In <ArrowRight size={15} /></>
        )}
      </motion.button>

      <SocialLogin />

      {/* Switch to register */}
      <p className="text-center text-[12px] text-brand-gray">
        Don&apos;t have an account?{' '}
        <button
          onClick={onSwitch}
          className="text-brand-accent hover:text-brand-white transition-colors underline underline-offset-2"
        >
          Create one
        </button>
      </p>
    </motion.div>
  )
}

// ── 8. REGISTER FORM ───────────────────────────────────────

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [form, setForm] = useState<RegisterForm>({
    firstName: '', lastName: '', email: '',
    password: '', confirmPassword: '', agreeToTerms: false,
  })
  const [errors,  setErrors]  = useState<Partial<Record<keyof RegisterForm, string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (key: keyof RegisterForm) => (v: string | boolean) =>
    setForm((f) => ({ ...f, [key]: v }))

  const validate = () => {
    const e: typeof errors = {}
    if (!form.firstName)                            e.firstName       = 'First name is required'
    if (!form.lastName)                             e.lastName        = 'Last name is required'
    if (!form.email)                                e.email           = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))     e.email           = 'Enter a valid email address'
    if (!form.password)                             e.password        = 'Password is required'
    else if (form.password.length < 8)              e.password        = 'Password must be at least 8 characters'
    if (!form.confirmPassword)                      e.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.agreeToTerms)                         e.agreeToTerms   = 'You must agree to the terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSuccess(true)
  }

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{    opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <AnimatePresence>
        {success && <SuccessToast message="Account created! Welcome to BrimBT Design." />}
      </AnimatePresence>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name" name="firstName"
          value={form.firstName} onChange={set('firstName') as (v: string) => void}
          placeholder="Jane" icon={<User size={15} />} error={errors.firstName}
        />
        <InputField
          label="Last Name" name="lastName"
          value={form.lastName} onChange={set('lastName') as (v: string) => void}
          placeholder="Doe" icon={<User size={15} />} error={errors.lastName}
        />
      </div>

      <InputField
        label="Email Address" name="email" type="email"
        value={form.email} onChange={set('email') as (v: string) => void}
        placeholder="you@example.com" icon={<Mail size={15} />} error={errors.email}
      />

      <PasswordField
        label="Password" name="password"
        value={form.password} onChange={set('password') as (v: string) => void}
        error={errors.password}
        hint="Minimum 8 characters"
        showStrength
      />

      <PasswordField
        label="Confirm Password" name="confirmPassword"
        value={form.confirmPassword} onChange={set('confirmPassword') as (v: string) => void}
        error={errors.confirmPassword}
      />

      {/* Terms */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.agreeToTerms}
            onChange={(e) => set('agreeToTerms')(e.target.checked)}
            className="accent-brand-accent w-3.5 h-3.5 mt-0.5 flex-shrink-0"
          />
          <span className="text-[12px] text-brand-gray group-hover:text-brand-white transition-colors leading-relaxed">
            I agree to BrimBT Design&apos;s{' '}
            <Link href="/terms" className="text-brand-accent hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-brand-accent hover:underline">Privacy Policy</Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="flex items-center gap-1.5 text-[10px] text-red-400 mt-1.5 ml-6">
            <AlertCircle size={10} /> {errors.agreeToTerms}
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading || success}
        whileTap={{ scale: 0.98 }}
        className={clsx(
          'btn-primary w-full flex items-center justify-center gap-2 py-4',
          (loading || success) && 'opacity-70 cursor-wait'
        )}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-black/40 border-t-brand-black rounded-full animate-spin" />
            Creating account...
          </>
        ) : (
          <>Create Account <ArrowRight size={15} /></>
        )}
      </motion.button>

      <SocialLogin />

      {/* Switch to login */}
      <p className="text-center text-[12px] text-brand-gray">
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          className="text-brand-accent hover:text-brand-white transition-colors underline underline-offset-2"
        >
          Sign in
        </button>
      </p>
    </motion.div>
  )
}

// ── 9. MAIN PAGE ───────────────────────────────────────────

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>('login')

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left — Branding Panel ──────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#1c1611] via-[#201a14] to-[#0a0a0a] p-16 border-r border-brand-accent/12 relative overflow-hidden">

        {/* Watermark */}
        <span
          aria-hidden
          className="absolute bottom-[-40px] right-[-60px] font-display text-[220px] font-semibold text-brand-accent/[0.04] leading-none select-none pointer-events-none"
        >
          BT
        </span>

        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-semibold tracking-[0.22em] text-brand-white uppercase">
          Brim<span className="text-brand-accent">BT</span> Design
        </Link>

        {/* Quote */}
        <div>
          <p className="font-display text-[clamp(28px,3vw,44px)] font-light text-brand-white leading-[1.2] mb-6">
            "Style is a way to say who you are without having to{' '}
            <em className="italic text-brand-accent">speak.</em>"
          </p>
          <p className="text-[12px] text-brand-gray tracking-[0.15em]">— BrimBT Design</p>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {[
            'Early access to new collections',
            'Exclusive member-only discounts',
            'Track orders & manage returns easily',
            'Save your wishlist across devices',
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <CheckCircle2 size={15} className="text-brand-accent flex-shrink-0" />
              <p className="text-[13px] text-brand-gray">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right — Form Panel ─────────────────────────── */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16">
        <div className="w-full max-w-[420px] mx-auto">

          {/* Mobile logo */}
          <Link href="/" className="font-display text-xl font-semibold tracking-[0.2em] text-brand-white uppercase block mb-10 lg:hidden">
            Brim<span className="text-brand-accent">BT</span> Design
          </Link>

          {/* Tab switcher */}
          <div className="flex border border-brand-accent/20 mb-10">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={clsx(
                  'flex-1 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300',
                  tab === t
                    ? 'bg-brand-accent text-brand-black'
                    : 'text-brand-gray hover:text-brand-white'
                )}
              >
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="eyebrow mb-2">BrimBT Design</p>
            <h1 className="font-display text-[clamp(26px,3vw,36px)] font-light text-brand-white">
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <LoginForm    key="login"    onSwitch={() => setTab('register')} />
            ) : (
              <RegisterForm key="register" onSwitch={() => setTab('login')}    />
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}
