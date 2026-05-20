import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Locations', href: '#locations' },
  { label: 'Book Appointment', href: '#booking' },
]

export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: '#0F2A1A' }}>
        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1 — Brand (span 2) */}
          <div className="md:col-span-2">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9922A' }}>
                Dr. Syed's
              </p>
              <p className="text-2xl font-black text-white leading-tight">Advanced Homeo Clinics</p>
            </div>
            <p className="text-sm mt-1" style={{ color: '#4ade80' }}>The Multi Speciality Consultancy</p>

            <p className="mt-4 text-sm leading-relaxed max-w-sm" style={{ color: '#86efac' }}>
              Classical homoeopathic treatment for acute and chronic conditions by Dr. Sayed
              Tamizuddin — M.D.(Medicine) Homoeo, M.Sc (Applied Psychology).
            </p>

            {/* Quote */}
            <blockquote
              className="mt-6 pl-4 italic text-xs"
              style={{ borderLeft: '2px solid #C9922A', color: '#6ee7b7' }}
            >
              "Almighty has not sent down a disease except that He has also sent down a cure for it."
            </blockquote>

            {/* Phone links */}
            <div className="mt-6 flex flex-col gap-1.5">
              {['09912384430', '09493861087'].map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#86efac' }}
                >
                  📞 {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#C9922A' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                    style={{ color: '#86efac' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Clinics */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#C9922A' }}>
              Our Clinics
            </h4>
            <div>
              <p className="text-white font-semibold text-sm">Yakutpura</p>
              <p className="text-xs mt-1" style={{ color: '#6ee7b7' }}>
                Srt Colony, Near Islamia College, Opp. Community Hall, Hyderabad
              </p>
            </div>
            <div className="mt-5">
              <p className="text-white font-semibold text-sm">Mallepally</p>
              <p className="text-xs mt-1" style={{ color: '#6ee7b7' }}>
                Near Anwar-ul-uloom College, Beside Ghatala Masjid, Hyderabad
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: '#1a3d28' }}
        >
          <p className="text-xs" style={{ color: '#4ade80' }}>
            © 2025 Dr. Syed's Advanced Homeo Clinics. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#4ade80' }}>
            Crafted with ❤️ by{' '}
            <a
              href="https://avlinnovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
              style={{ color: '#C9922A' }}
            >
              AVL Innovations
            </a>
          </p>
        </div>

        {/* Admin link */}
        <div className="border-t border-green-800 pt-4 mt-6 text-center">
          <a href="/admin" className="text-green-400 text-xs hover:text-white transition-colors">
            🔐 Staff Login — Admin Portal
          </a>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/919912384430"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:bg-green-600 transition-colors"
        style={{ backgroundColor: '#22c55e' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
      </motion.a>
    </>
  )
}
