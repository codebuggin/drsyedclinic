import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ backgroundColor: '#FDFAF4' }}>
      {/* Section label — centered above columns */}
      <div className="text-center mb-12">
        <span className="inline-block border border-green-700 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          About the Doctor
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        {/* ── LEFT: visual panel ── */}
        <motion.div
          className="relative pb-12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {/* Main photo box */}
          <div
            className="w-full rounded-3xl relative overflow-hidden flex items-end"
            style={{
              aspectRatio: '4/5',
              background: 'linear-gradient(135deg, #E8F0E0, #C8DDB8)',
            }}
          >
            {/* Botanical leaf decoration */}
            <svg
              viewBox="0 0 200 280"
              fill="currentColor"
              className="absolute bottom-0 right-0 w-40 h-40 text-green-700 opacity-20 pointer-events-none"
              aria-hidden
            >
              <path d="M100 260 L100 40 M100 200 C100 200 60 160 30 130 C60 150 90 170 100 190 M100 180 C100 180 140 140 170 110 C140 130 110 150 100 170 M100 150 C100 150 55 110 25 80 C55 100 85 125 100 140 M100 130 C100 130 145 90 175 60 C145 80 115 105 100 120 M100 100 C100 100 65 65 40 35 C65 55 90 80 100 92 M100 82 C100 82 135 47 160 17 C135 37 110 62 100 74" strokeWidth="5" stroke="currentColor" fill="none" strokeLinecap="round" />
            </svg>

            {/* Doctor photo */}
            <img
              src="/doctor.jpeg"
              alt="Dr. Sayed Tamizuddin"
              className="absolute inset-0 w-full h-full object-cover object-top z-10"
            />

            {/* Bottom overlay */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl z-10"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
            />
            <div className="absolute bottom-6 left-6 text-white z-20 mb-2">
              <p className="font-bold text-xl">Dr. Sayed Tamizuddin</p>
              <p className="text-sm" style={{ color: '#86efac' }}>Classical Homoeopath</p>
            </div>

            {/* Inner decorative frame */}
            <div className="absolute inset-4 border-2 border-white/20 rounded-2xl pointer-events-none z-10" />
          </div>

          {/* Badge: top-right */}
          <div
            className="absolute -top-4 -right-4 text-white rounded-2xl px-5 py-3 shadow-xl text-center z-30"
            style={{ backgroundColor: '#C9922A' }}
          >
            <span className="text-3xl font-black block leading-none">15+</span>
            <span className="text-xs">Years of Practice</span>
          </div>

          {/* Badge: bottom-left */}
          <div
            className="absolute -bottom-16 -left-4 text-white rounded-2xl px-5 py-3 shadow-xl z-30"
            style={{ backgroundColor: '#1A4A2E' }}
          >
            <span className="text-xl font-black block leading-none">2 Clinics</span>
            <span className="text-xs" style={{ color: '#86efac' }}>Yakutpura · Mallepally</span>
          </div>
        </motion.div>

        {/* ── RIGHT: text ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        >
          {/* Gold left border accent wrapping all right content */}
          <div className="border-l-4 pl-6" style={{ borderColor: '#C9922A' }}>
            <h2 className="text-4xl font-black text-gray-900">Dr. Sayed Tamizuddin</h2>
            <p className="text-lg font-semibold mt-1" style={{ color: '#C9922A' }}>
              Classical Homoeopath &amp; Physician
            </p>

            {/* Credentials — softer green bg, no border */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['M.D. (Medicine) Homoeo', 'M.Sc Applied Psychology', 'Classical Homoeopath'].map((c) => (
                <span
                  key={c}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ backgroundColor: '#E8F0E0', color: '#1A4A2E' }}
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-100" />

            {/* Paragraphs */}
            <div className="mt-6 text-gray-600 leading-relaxed space-y-4" style={{ fontSize: '15px' }}>
              <p>
                Dr. Sayed Tamizuddin is a distinguished classical homoeopath with over 15 years of
                dedicated practice in Hyderabad. Holding a Medical Degree in Homoeopathy along with a
                Master's in Applied Psychology, he brings a truly holistic perspective to healing —
                treating the whole person, not just the disease.
              </p>
              <p>
                His approach is firmly rooted in the principles of classical homoeopathy — identifying
                and treating the root cause of illness through individualised, constitutional prescribing.
                Every patient receives undivided attention and a carefully tailored treatment plan.
              </p>
            </div>

            {/* Quote — thicker gold border + amber bg */}
            <blockquote
              className="mt-6 pl-4 italic text-sm text-gray-600 bg-amber-50 rounded-r-xl p-4"
              style={{ borderLeft: '4px solid #C9922A' }}
            >
              "Almighty has not sent down a disease except that He has also sent down a cure for it."
            </blockquote>

            {/* Action buttons */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="#booking"
                className="inline-block px-6 py-3 rounded-xl font-semibold text-sm text-white transition-colors duration-200 hover:bg-green-900"
                style={{ backgroundColor: '#1A4A2E' }}
              >
                Book Consultation →
              </a>
              <a
                href="tel:09912384430"
                className="inline-block px-6 py-3 rounded-xl text-sm text-gray-600 border border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                📞 09912384430
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
