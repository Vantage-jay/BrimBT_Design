'use client'

/* ============================================================
   BrimBT Design — Sizing Guide Page
   File: src/app/sizing/page.tsx
   ============================================================ */

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Ruler, ChevronDown, ChevronUp, Info } from 'lucide-react'
import clsx from 'clsx'

type Category = 'clothing' | 'footwear' | 'accessories'

const CLOTHING_SIZES = [
  { size:'XS', uk:'6–8',   us:'2–4',   eu:'34–36', bust:'80–84', waist:'60–64', hips:'86–90'   },
  { size:'S',  uk:'8–10',  us:'4–6',   eu:'36–38', bust:'84–88', waist:'64–68', hips:'90–94'   },
  { size:'M',  uk:'10–12', us:'6–8',   eu:'38–40', bust:'88–92', waist:'68–72', hips:'94–98'   },
  { size:'L',  uk:'12–14', us:'8–10',  eu:'40–42', bust:'92–96', waist:'72–76', hips:'98–102'  },
  { size:'XL', uk:'14–16', us:'10–12', eu:'42–44', bust:'96–100',waist:'76–80', hips:'102–106' },
]

const FOOTWEAR_SIZES = [
  { eu:'36', uk:'3',   us:'5.5', cm:'23.0' },
  { eu:'37', uk:'4',   us:'6.5', cm:'23.5' },
  { eu:'38', uk:'5',   us:'7.5', cm:'24.0' },
  { eu:'39', uk:'6',   us:'8.5', cm:'24.5' },
  { eu:'40', uk:'6.5', us:'9',   cm:'25.5' },
  { eu:'41', uk:'7.5', us:'10',  cm:'26.0' },
  { eu:'42', uk:'8',   us:'10.5',cm:'26.5' },
]

const ACCESSORY_SIZES = [
  { item:'Necklace — Short',  length:'40cm / 16in', style:'Sits at collarbone'          },
  { item:'Necklace — Medium', length:'45cm / 18in', style:'Falls just below neckline'   },
  { item:'Necklace — Long',   length:'60cm / 24in', style:'Chest length'                },
  { item:'Bracelet — XS/S',   length:'16cm / 6.3in',style:'Slim wrists'                 },
  { item:'Bracelet — M/L',    length:'18cm / 7in',  style:'Standard fit'                },
  { item:'Ring — One Size',   length:'Adjustable',  style:'Fits most'                   },
]

const HOW_TO_MEASURE = [
  { label:'Bust',        instruction:'Measure around the fullest part of your chest, keeping the tape parallel to the floor. Keep one finger between the tape and your body for a comfortable fit.'       },
  { label:'Waist',       instruction:'Measure around the narrowest part of your natural waist — usually about 2 inches above your belly button. Keep the tape comfortably loose.'                         },
  { label:'Hips',        instruction:'Stand with feet together. Measure around the fullest part of your hips and seat, approximately 8 inches below your natural waist.'                                 },
  { label:'Foot Length', instruction:'Place your foot on a piece of paper and trace around it. Measure from the heel to the longest toe in centimetres. Always use the larger foot if they differ.'      },
]

function Reveal({ children, delay=0, className='' }: { children:React.ReactNode; delay?:number; className?:string }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay }}>
      {children}
    </motion.div>
  )
}

function Accordion({ title, children }: { title:string; children:React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-accent/15">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full py-4 text-left">
        <span className="text-[13px] text-brand-black font-medium">{title}</span>
        {open ? <ChevronUp size={15} className="text-brand-text-muted" /> : <ChevronDown size={15} className="text-brand-text-muted" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} className="overflow-hidden">
            <p className="pb-5 text-[13px] text-brand-text-secondary leading-[1.9]">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SizingPage() {
  const [activeTab, setActiveTab] = useState<Category>('clothing')
  const TABS: { id:Category; label:string }[] = [
    { id:'clothing',    label:'Clothing & Bodywear' },
    { id:'footwear',    label:'Footwear'            },
    { id:'accessories', label:'Accessories'         },
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-15 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-10 text-[11px] text-brand-text-muted">
        <Link href="/" className="hover:text-brand-black transition-colors">Home</Link>
        <span className="opacity-40">/</span>
        <span className="text-brand-accent">Sizing Guide</span>
      </nav>

      {/* Header */}
      <Reveal className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Ruler size={22} className="text-brand-accent" />
          <p className="eyebrow">Find Your Perfect Fit</p>
        </div>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-brand-black leading-none mb-5">
          Size <em className="italic text-brand-accent">Guide</em>
        </h1>
        <p className="text-[14px] text-brand-text-secondary max-w-xl leading-[1.9]">
          All measurements are in centimetres unless stated otherwise. If you&apos;re between sizes we recommend sizing up for a relaxed fit or sizing down for a closer fit.
        </p>
      </Reveal>

      {/* Tip */}
      <Reveal className="mb-10">
        <div className="flex items-start gap-3 bg-brand-accent-bg border border-brand-accent/20 px-5 py-4 max-w-xl">
          <Info size={15} className="text-brand-accent flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-brand-text-secondary leading-relaxed">
            Our models are typically 5&apos;9&quot; and wear size S in clothing and EU 38 in footwear. Fit notes are included on each product page.
          </p>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal className="mb-8">
        <div className="flex border-b border-brand-accent/15">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'px-6 py-3.5 text-[11px] tracking-[0.15em] uppercase transition-all border-b-2 -mb-px',
                activeTab === tab.id ? 'border-brand-accent text-brand-accent' : 'border-transparent text-brand-text-muted hover:text-brand-black'
              )}>
              {tab.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Tables */}
      <Reveal className="mb-16">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.25 }}
            className="bg-brand-white border border-brand-accent/15 p-6 lg:p-8 shadow-brand overflow-x-auto">
            {activeTab === 'clothing' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand-accent/20">
                    {['Size','UK','US','EU','Bust (cm)','Waist (cm)','Hips (cm)'].map((h) => (
                      <th key={h} className="pb-3 pr-6 text-[10px] tracking-[0.2em] uppercase text-brand-accent font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CLOTHING_SIZES.map((row, i) => (
                    <tr key={row.size} className={clsx('border-b border-brand-accent/10', i%2===0 ? 'bg-brand-accent-bg/50':'')}>
                      <td className="py-3.5 pr-6 font-display text-lg text-brand-accent font-semibold">{row.size}</td>
                      <td className="py-3.5 pr-6 text-[13px] text-brand-black">{row.uk}</td>
                      <td className="py-3.5 pr-6 text-[13px] text-brand-black">{row.us}</td>
                      <td className="py-3.5 pr-6 text-[13px] text-brand-black">{row.eu}</td>
                      <td className="py-3.5 pr-6 text-[13px] text-brand-text-secondary">{row.bust}</td>
                      <td className="py-3.5 pr-6 text-[13px] text-brand-text-secondary">{row.waist}</td>
                      <td className="py-3.5 pr-6 text-[13px] text-brand-text-secondary">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'footwear' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand-accent/20">
                    {['EU','UK','US','Foot Length (cm)'].map((h) => (
                      <th key={h} className="pb-3 pr-10 text-[10px] tracking-[0.2em] uppercase text-brand-accent font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FOOTWEAR_SIZES.map((row, i) => (
                    <tr key={row.eu} className={clsx('border-b border-brand-accent/10', i%2===0 ? 'bg-brand-accent-bg/50':'')}>
                      <td className="py-3.5 pr-10 font-display text-lg text-brand-accent font-semibold">{row.eu}</td>
                      <td className="py-3.5 pr-10 text-[13px] text-brand-black">{row.uk}</td>
                      <td className="py-3.5 pr-10 text-[13px] text-brand-black">{row.us}</td>
                      <td className="py-3.5 pr-10 text-[13px] text-brand-text-secondary">{row.cm} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'accessories' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-brand-accent/20">
                    {['Item','Length','Style Notes'].map((h) => (
                      <th key={h} className="pb-3 pr-10 text-[10px] tracking-[0.2em] uppercase text-brand-accent font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ACCESSORY_SIZES.map((row, i) => (
                    <tr key={row.item} className={clsx('border-b border-brand-accent/10', i%2===0 ? 'bg-brand-accent-bg/50':'')}>
                      <td className="py-3.5 pr-10 text-[13px] text-brand-black font-medium">{row.item}</td>
                      <td className="py-3.5 pr-10 text-[13px] text-brand-text-secondary">{row.length}</td>
                      <td className="py-3.5 pr-10 text-[13px] text-brand-text-secondary">{row.style}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </AnimatePresence>
      </Reveal>

      {/* How to measure */}
      <Reveal className="mb-16">
        <h2 className="font-display text-3xl font-light text-brand-black mb-8">
          How to <em className="italic text-brand-accent">Measure</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOW_TO_MEASURE.map((item, i) => (
            <div key={item.label} className="bg-brand-white border border-brand-accent/15 p-6 shadow-brand">
              <p className="eyebrow mb-2">{String(i+1).padStart(2,'0')}</p>
              <h3 className="font-display text-xl text-brand-black mb-3">{item.label}</h3>
              <p className="text-[13px] text-brand-text-secondary leading-[1.9]">{item.instruction}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* FAQs */}
      <Reveal className="mb-16 max-w-2xl">
        <h2 className="font-display text-3xl font-light text-brand-black mb-6">
          Sizing <em className="italic text-brand-accent">FAQs</em>
        </h2>
        <Accordion title="What if I am between sizes?">
          We recommend sizing up for a relaxed fit. If you prefer a closer silhouette, size down. Each product page includes specific fit notes to help guide your choice.
        </Accordion>
        <Accordion title="Do your sizes run true to size?">
          Our clothing generally runs true to size. Our footwear runs slightly narrow — if you have wider feet, we recommend going up half a size.
        </Accordion>
        <Accordion title="Can I exchange for a different size?">
          Yes. We offer free size exchanges within 30 days of delivery. Items must be unworn and in original packaging. Visit our returns page for full details.
        </Accordion>
        <Accordion title="Do you offer plus sizes?">
          We currently size up to XL in clothing and EU 42 in footwear. We are actively working to expand our size range — sign up to our newsletter to be notified when new sizes launch.
        </Accordion>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="bg-brand-black px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="eyebrow mb-2">Still unsure?</p>
            <h3 className="font-display text-2xl text-brand-white font-light">Our team is happy to help you find the right size.</h3>
          </div>
          <Link href="/contact" className="btn-primary flex-shrink-0">Contact Us</Link>
        </div>
      </Reveal>

    </div>
  )
}
