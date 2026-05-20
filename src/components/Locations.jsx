import { motion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'

const locations = [
  {
    badge: 'Yakutpura',
    name: 'Yakutpura Clinic',
    address: 'Srt Colony, Near Islamia College, Opp. Community Hall, Yakutpura, Hyderabad',
    phones: ['09912384430', '09493861087'],
    timings: ['Monday, Wednesday & Saturday: 10:00 AM – 8:00 PM'],
  },
  {
    badge: 'Mallepally',
    name: 'Mallepally Clinic',
    address: 'Near Anwar-ul-uloom College, Beside Ghatala Masjid, Mallepally, Hyderabad',
    phones: ['09912384430', '09493861087'],
    timings: [
      'Sunday, Tuesday & Thursday: 11:00 AM – 3:00 PM',
      'Sunday, Tuesday & Thursday: 5:00 PM – 8:00 PM',
    ],
  },
]

export default function Locations() {
  return (
    <section id="locations" className="py-24" style={{ backgroundColor: '#1A4A2E' }}>
      {/* Header */}
      <div className="text-center text-white mb-16 px-6">
        <span className="inline-block border border-green-500 text-green-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          Our Locations
        </span>
        <h2 className="mt-4 text-4xl font-black">
          Visit Us In{' '}
          <span style={{ color: '#C9922A' }}>Hyderabad</span>
        </h2>
        <p className="mt-2 text-sm" style={{ color: '#86efac' }}>
          Two conveniently located clinics across the city
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.badge}
            initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            className="bg-white rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-[4rem]" />

            {/* Badge */}
            <span
              className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: '#C9922A' }}
            >
              {loc.badge.toUpperCase()}
            </span>

            <h3 className="text-2xl font-black text-gray-900 mt-3">{loc.name}</h3>

            {/* Address */}
            <div className="mt-3 flex items-start gap-2 text-gray-500 text-sm">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#1A4A2E' }} />
              <span>{loc.address}</span>
            </div>

            {/* Phones */}
            <div className="mt-4 space-y-2">
              {loc.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-800 transition-colors"
                >
                  <Phone size={14} style={{ color: '#1A4A2E' }} className="flex-shrink-0" />
                  {phone}
                </a>
              ))}
            </div>

            {/* Clinic Timings */}
            <div className="bg-green-50 rounded-xl p-3 mt-3">
              <p className="text-xs font-bold text-[#1A4A2E] uppercase tracking-wide mb-1.5">🕐 Clinic Timings</p>
              {loc.timings.map((t) => (
                <p key={t} className="text-sm text-gray-600">{t}</p>
              ))}
            </div>

            <div className="mt-5 border-t border-gray-100" />

            {/* Action buttons */}
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${loc.phones[0]}`}
                className="flex-1 text-center border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm hover:border-gray-300 transition-colors"
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/919912384430"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-white rounded-xl px-4 py-2.5 text-sm hover:bg-green-600 transition-colors"
                style={{ backgroundColor: '#22c55e' }}
              >
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
