import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Locations', href: '#locations' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo wordmark */}
        <a href="#home" className="flex flex-col leading-none">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9922A' }}>
            Dr. Syed's
          </span>
          <span className="text-lg font-black leading-tight" style={{ color: '#1A4A2E' }}>
            Advanced Homeo Clinics
          </span>
        </a>

        {/* Desktop center nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-[#1A4A2E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs font-medium text-gray-500">📞 09912384430</span>
          <a
            href="#booking"
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-colors duration-200 hover:bg-green-900"
            style={{ backgroundColor: '#1A4A2E' }}
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#1A4A2E] hover:bg-gray-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="text-sm font-medium text-gray-700 hover:text-[#1A4A2E] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={handleLinkClick}
            className="block text-center text-sm font-semibold text-white px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: '#1A4A2E' }}
          >
            Book Appointment
          </a>
        </div>
      )}
    </header>
  )
}
