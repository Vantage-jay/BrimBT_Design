'use client'

/* ============================================================
   BrimBT Design — About Page
   File: src/app/about/page.tsx
   ============================================================ */

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.8, ease:[0.22,1,0.36,1], delay }}>
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="min-h-[60vh] flex flex-col justify-end px-6 lg:px-15 pb-20 relative overflow-hidden bg-gradient-to-br from-[#1c1611] via-[#0a0a0a] to-[#0a0a0a]">
        <span aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] font-semibold text-brand-accent/[0.03] leading-none select-none pointer-events-none whitespace-nowrap">
          BRIMBT
        </span>
        <div className="relative z-10 max-w-3xl">
          <motion.p className="eyebrow mb-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}>
            Our Story
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(40px,6vw,88px)] font-light text-brand-white leading-[1.05]"
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8, ease:[0.22,1,0.36,1] }}
          >
            Where <em className="italic text-brand-accent">Confidence</em><br />
            Meets Craft
          </motion.h1>
        </div>
      </section>

      {/* ── Origin Story ──────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-15 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <Reveal>
          <p className="eyebrow mb-4">How It Started</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white leading-tight mb-8">
            Born from a belief that <em className="italic text-brand-accent">what you wear</em> shapes how you move through the world.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[14px] text-brand-gray leading-[2] mb-6">
            BrimBT Design was founded with a single conviction that clothing is not just fabric, it is armour. It is the first thing you put on in the morning and the last thing you take off at night. It shapes your posture, your confidence, and your presence in every room you walk into.
          </p>
          <p className="text-[14px] text-brand-gray leading-[2] mb-6">
            We started by asking a simple question: why should premium quality and everyday wearability be mutually exclusive? The answer drove us to build a collection that lives at the intersection of luxury and real life.
          </p>
          <p className="text-[14px] text-brand-gray leading-[2]">
            Every piece in our collection from our silk bodywear to our performance footwear is designed with that philosophy at its core. We do not chase trends. We build wardrobes.
          </p>
        </Reveal>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="border-y border-brand-accent/12 bg-brand-accent/[0.02]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-24">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">
              Our <em className="italic text-brand-accent">Values</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Intentional Design',
                body: 'Every silhouette is sketched, revised and refined until it earns its place in the collection. We never add without purpose.',
              },
              {
                num: '02',
                title: 'Sustainable Craft',
                body: 'We source responsibly, produce in limited quantities and partner only with manufacturers who share our standards for people and planet.',
              },
              {
                num: '03',
                title: 'Radical Inclusivity',
                body: 'Our sizing, our imagery and our community reflect the full range of the people who wear us. Style has no single shape.',
              },
            ].map((v, i) => (
              <Reveal key={v.num} delay={i * 0.1}>
                <div className="border border-brand-accent/15 p-8 hover:border-brand-accent/40 transition-colors">
                  <p className="font-display text-4xl text-brand-accent/30 font-light mb-6">{v.num}</p>
                  <h3 className="font-display text-xl text-brand-white mb-4">{v.title}</h3>
                  <p className="text-[13px] text-brand-gray leading-[1.9]">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-15 py-24">
        <Reveal className="mb-16">
          <p className="eyebrow mb-3">The People Behind It</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-light text-brand-white">
            Our <em className="italic text-brand-accent">Team</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Amara Osei',      role: 'Creative Director'  },
            { name: 'Oluwatobiloba Ojatunwase',     role: 'Head of Brand'     },
            { name: 'Kofi Asante',     role: 'Brand Director'     },
            { name: 'Vantage Jay',      role: 'Software Developer' },
          ].map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group">
                <div className="aspect-[3/4] bg-gradient-to-br from-[#161412] to-[#221e1a] flex items-center justify-center mb-4 border border-brand-accent/10 group-hover:border-brand-accent/30 transition-colors">
                  <span className="font-display text-4xl text-brand-accent/10 select-none">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <p className="font-display text-[16px] text-brand-white">{member.name}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-brand-gray mt-1">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="border-t border-brand-accent/12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '2022',  label: 'Year Founded'     },
            { num: '12K+',  label: 'Happy Customers'  },
            { num: '380+',  label: 'Products'         },
            { num: '4.9★',  label: 'Average Rating'   },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-[clamp(36px,4vw,56px)] font-light text-brand-accent leading-none mb-3">
                {stat.num}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-brand-gray">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1c1611] to-[#0a0a0a] px-6 lg:px-15 py-24 text-center relative overflow-hidden">
        <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-[18vw] font-semibold text-brand-accent/[0.03] select-none pointer-events-none leading-none">
          BT
        </span>
        <div className="relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Ready to Explore?</p>
            <h2 className="font-display text-[clamp(32px,4vw,56px)] font-light text-brand-white mb-6">
              Wear Your <em className="italic text-brand-accent">Confidence</em>
            </h2>
            <p className="text-[14px] text-brand-gray max-w-md mx-auto mb-10 leading-[1.9]">
              Browse our latest collection and find pieces that move with you — from morning to midnight.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products" className="btn-primary">Shop Now</Link>
              <Link href="/products?badge=new"
                className="text-[11px] tracking-[0.18em] uppercase text-brand-gray border border-brand-accent/20 px-8 py-4 hover:border-brand-accent hover:text-brand-white transition-colors">
                New Arrivals
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
