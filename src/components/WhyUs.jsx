import { motion } from 'framer-motion'
import { Leaf, Brain, MapPin, Shield } from 'lucide-react'

const cards = [
  {
    icon: <Leaf size={24} />,
    iconClass: 'text-green-600',
    bgClass: 'bg-green-50',
    borderColor: 'border-green-500',
    title: 'Classical Approach',
    desc: 'Treats root cause, not symptoms. Every prescription is individual — no two patients get the same medicine.',
  },
  {
    icon: <Brain size={24} />,
    iconClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    borderColor: 'border-purple-500',
    title: 'Mind-Body Healing',
    desc: 'Unique M.Sc in Psychology combined with homoeopathy for a truly holistic treatment approach.',
  },
  {
    icon: <MapPin size={24} />,
    iconClass: 'text-amber-600',
    bgClass: 'bg-amber-50',
    borderColor: 'border-amber-500',
    title: '2 Convenient Clinics',
    desc: 'Located in Yakutpura and Mallepally — both accessible areas of Hyderabad.',
  },
  {
    icon: <Shield size={24} />,
    iconClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderColor: 'border-blue-500',
    title: 'Safe & Natural',
    desc: '100% natural homoeopathic medicines. Zero side effects, safe for all ages including children.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function WhyUs() {
  return (
    <section id="services" className="relative" style={{ backgroundColor: '#FDFAF4' }}>
      {/* Dark top half */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 z-0"
        style={{ backgroundColor: '#1A4A2E' }}
      />

      {/* Header on dark bg */}
      <div className="relative z-10 text-center pt-16 pb-32 px-6">
        <span className="inline-block border border-green-400 text-green-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          Why Choose Us
        </span>
        <h2 className="mt-4 text-4xl font-black text-white">
          The Advanced Homeo{' '}
          <span style={{ color: '#C9922A' }}>Difference.</span>
        </h2>
      </div>

      {/* Cards overlapping both halves */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 -mt-16 pb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            className={`group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:${card.borderColor}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${card.bgClass} ${card.iconClass}`}>
              {card.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
