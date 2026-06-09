import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

/* ─── Animation helpers ─────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const cardReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18, delay: 0.4 },
  },
}

const float = (duration, delay = 0) => ({
  animate: {
    y: [0, -10, 0],
    transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
  },
})

/* ─── Botanical SVG shapes ──────────────────────────────── */
function LeafLarge({ className }) {
  return (
    <svg viewBox="0 0 300 400" fill="currentColor" className={className} aria-hidden>
      <path d="M150 20 C220 20 280 80 280 160 C280 260 220 350 150 380 C80 350 20 260 20 160 C20 80 80 20 150 20 Z M150 60 C100 60 55 100 55 160 C55 240 100 320 150 345 C200 320 245 240 245 160 C245 100 200 60 150 60 Z" />
      <path d="M150 80 L150 340 M100 120 C120 160 140 200 150 250 M200 120 C180 160 160 200 150 250" strokeWidth="3" stroke="currentColor" fill="none" />
    </svg>
  )
}

function FernShape({ className }) {
  return (
    <svg viewBox="0 0 200 280" fill="currentColor" className={className} aria-hidden>
      <path d="M100 260 L100 40 M100 200 C100 200 60 160 30 130 C60 150 90 170 100 190 M100 180 C100 180 140 140 170 110 C140 130 110 150 100 170 M100 150 C100 150 55 110 25 80 C55 100 85 125 100 140 M100 130 C100 130 145 90 175 60 C145 80 115 105 100 120 M100 100 C100 100 65 65 40 35 C65 55 90 80 100 92 M100 82 C100 82 135 47 160 17 C135 37 110 62 100 74" strokeWidth="5" stroke="currentColor" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function CircleLeaf({ className }) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" className={className} aria-hidden>
      <ellipse cx="60" cy="60" rx="55" ry="40" transform="rotate(-30 60 60)" />
      <ellipse cx="60" cy="60" rx="35" ry="20" fill="#E8F0E0" transform="rotate(-30 60 60)" />
      <line x1="60" y1="25" x2="60" y2="95" stroke="#2D6A4F" strokeWidth="2" transform="rotate(-30 60 60)" strokeLinecap="round" />
    </svg>
  )
}

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      {/* ════════════════ HERO SECTION ════════════════ */}
      <section
        id="home"
        className="min-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        style={{ backgroundColor: '#FDFAF4' }}
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="relative flex-1 overflow-hidden flex flex-col justify-center px-5 sm:px-12 lg:px-16 xl:px-20 py-10 md:py-0 md:basis-1/2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Watermark */}
          <span
            className="absolute top-4 left-0 font-black leading-none select-none pointer-events-none z-0"
            style={{ fontSize: '180px', color: '#e6f0e8', opacity: 0.6 }}
            aria-hidden
          >
            HEAL
          </span>

          {/* All content above watermark */}
          <div className="relative z-10 flex flex-col max-w-xl">
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 border border-green-700 text-green-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2 4-8 13-2 13-2C33 3 28 16 17 8z" />
                </svg>
                Hyderabad's Classical Homoeopath
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-black leading-[1.05] text-gray-900"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)' }}
            >
              Heal From
              <br />
              <span style={{ color: '#1A4A2E' }}>The Root.</span>
              <span className="block text-2xl font-semibold text-gray-400 mt-2">
                Not The Symptom.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base text-gray-500 leading-relaxed max-w-md"
            >
              Dr. Sayed Tamizuddin brings over 20 years of classical homoeopathic expertise —
              treating chronic and acute conditions with precision, care, and zero side effects.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              variants={fadeUp}
              className="mt-6 pl-4 italic text-sm text-gray-500"
              style={{ borderLeft: '4px solid #C9922A' }}
            >
              "Almighty has not sent down a disease except that He has also sent down a cure for it."
            </motion.blockquote>

            {/* Credentials single row */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm font-semibold"
              style={{ color: '#1A4A2E' }}
            >
              M.D. Homoeo · M.Sc Psychology · Classical Homoeopath
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="#booking"
                className="flex-1 text-center px-6 py-4 rounded-2xl font-semibold text-sm text-white transition-colors duration-200 hover:bg-green-900"
                style={{ backgroundColor: '#1A4A2E' }}
              >
                Book Appointment →
              </a>
              <a
                href="tel:09912384430"
                className="flex-1 text-center px-6 py-4 rounded-2xl font-semibold text-sm text-white transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#C9922A' }}
              >
                📞 Call Now
              </a>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={fadeUp}
              className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-2 bg-green-50/50 rounded-2xl p-3 sm:p-4"
            >
              {[
                { num: '20+', label: 'Years of Practice' },
                { num: '2', label: 'Locations in Hyd' },
                { num: '20+', label: 'Conditions Treated' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl sm:text-4xl font-black" style={{ color: '#1A4A2E' }}>
                    {num}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <div
          className="hidden md:flex relative flex-1 md:basis-1/2 overflow-visible items-center justify-center md:min-h-[90vh] max-h-[90vh] py-16 border-l border-green-200"
          style={{
            background:
              'radial-gradient(ellipse at center, #d4e9c2 0%, #c0d9a8 60%, #a8c990 100%)',
          }}
        >
          {/* Botanical decorations */}
          <LeafLarge className="absolute -top-8 -right-8 w-64 h-64 text-green-700 opacity-25 rotate-12 pointer-events-none" />
          <FernShape className="absolute -bottom-4 -left-4 w-48 h-48 text-green-700 opacity-20 -rotate-6 pointer-events-none" />
          <CircleLeaf className="absolute top-1/2 right-6 w-32 h-32 text-green-700 opacity-15 pointer-events-none -translate-y-1/2" />
          <CircleLeaf className="absolute bottom-24 left-10 w-20 h-20 text-green-600 opacity-10 rotate-45 pointer-events-none" />

          {/* ── Main doctor card ── */}
          <motion.div
            variants={cardReveal}
            initial="hidden"
            animate="visible"
            className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 w-72"
          >
            {/* Dark header box */}
            <div
              className="rounded-2xl p-4 mb-4 text-white text-center"
              style={{
                background: 'linear-gradient(135deg, #1A4A2E 0%, #2D6A4F 100%)',
              }}
            >
              <p className="text-xl font-black">Dr. Sayed Tamizuddin</p>
              <p className="text-xs mt-1" style={{ color: '#86efac' }}>
                M.D. Homoeo · Classical Homoeopath
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {['20+ Yrs', '2 Clinics', '20+ Conditions'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinic label */}
            <p className="text-xs font-bold tracking-widest text-green-700 uppercase text-center mb-3">
              Dr. Syed's Advanced Homeo Clinics
            </p>

            {/* Locations */}
            <div className="space-y-2">
              {['Yakutpura, Hyderabad', 'Mallepally, Hyderabad'].map((loc) => (
                <div key={loc} className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} style={{ color: '#1A4A2E' }} className="flex-shrink-0" />
                  {loc}
                </div>
              ))}
            </div>

            {/* Appointment note + Book button */}
            <p className="text-xs text-gray-400 text-center mt-4">
              Consultation by Appointment
            </p>
            <a
              href="#booking"
              className="block w-full mt-3 text-center text-white text-sm font-semibold rounded-xl py-2.5 transition-colors duration-200 hover:bg-green-900"
              style={{ backgroundColor: '#1A4A2E' }}
            >
              Book Now →
            </a>
          </motion.div>

          {/* ── Floating: top-left — 100% Natural ── */}
          <motion.div
            {...float(3, 0)}
            className="hidden md:block absolute top-20 left-4 bg-white shadow-lg rounded-2xl p-3 w-36 z-20"
          >
            <div className="text-2xl mb-1">🌿</div>
            <p className="font-bold text-sm text-gray-800">100% Natural</p>
            <p className="text-xs text-gray-400 mt-0.5">Zero side effects</p>
          </motion.div>

          {/* ── Floating: top-right — Hours ── */}
          <motion.div
            {...float(3.5, 1.2)}
            className="hidden md:flex flex-col gap-1 absolute top-28 right-2 bg-white shadow-lg rounded-2xl p-3 w-28 z-20"
          >
            <Clock size={16} style={{ color: '#1A4A2E' }} />
            <p className="font-bold text-sm text-gray-800">Mon – Sat</p>
            <p className="text-xs text-gray-400">9am – 7pm</p>
          </motion.div>

          {/* ── Floating: bottom-right — Rating ── */}
          <motion.div
            {...float(4, 0.7)}
            className="hidden md:block absolute bottom-16 right-4 bg-white shadow-lg rounded-2xl p-3 w-36 z-20"
          >
            <p className="font-bold text-sm text-yellow-500">⭐ 4.9 / 5.0</p>
            <p className="text-xs text-gray-400 mt-0.5">Patient Rating</p>
          </motion.div>

          {/* ── Floating: bottom-left — Appointment badge ── */}
          <motion.div
            {...float(3.8, 0.4)}
            className="hidden md:block absolute bottom-8 left-6 text-white rounded-full px-4 py-2 text-xs font-bold shadow-lg z-20"
            style={{ backgroundColor: '#C9922A' }}
          >
            ✓ Consultation by Appointment
          </motion.div>
        </div>
      </section>

      {/* ════════════════ MARQUEE STRIP ════════════════ */}
      <div
        className="w-full overflow-hidden py-3 border-t-2 max-w-[100vw]"
        style={{ backgroundColor: '#1A4A2E', borderColor: '#C9922A' }}
      >
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
        `}</style>
        <div className="marquee-track">
          {[1, 2].map((n) => (
            <span key={n} className="text-sm font-medium tracking-wide text-green-200 whitespace-nowrap pr-8">
              🌿 Allergy &nbsp;·&nbsp; Diabetes &nbsp;·&nbsp; Asthma &nbsp;·&nbsp; Arthritis &nbsp;·&nbsp;
              Obesity &nbsp;·&nbsp; Migraine &nbsp;·&nbsp; Skin Diseases &nbsp;·&nbsp; Hair Problems &nbsp;·&nbsp;
              Infertility &nbsp;·&nbsp; Blood Pressure &nbsp;·&nbsp; Kidney Stones &nbsp;·&nbsp;
              Chronic Diseases &nbsp;·&nbsp; Children's Diseases &nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
