import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    initials: 'A.K.',
    name: 'Asma Khan',
    condition: 'Chronic Asthma',
    gradientFrom: '#4ade80',
    gradientTo: '#16a34a',
    review:
      'I suffered from asthma for over 12 years and tried every conventional treatment. After just 4 months with Dr. Tamizuddin, my attacks reduced drastically. Truly life-changing.',
  },
  {
    initials: 'S.R.',
    name: 'Srinivas Rao',
    condition: 'Diabetes & BP',
    gradientFrom: '#60a5fa',
    gradientTo: '#2563eb',
    review:
      "My sugar levels and blood pressure are now under control without heavy allopathic medications. Dr. Sayed's approach is very thorough — he listens to every symptom carefully.",
  },
  {
    initials: 'M.F.',
    name: 'Mehnaz Fatima',
    condition: 'Psoriasis',
    gradientFrom: '#c084fc',
    gradientTo: '#9333ea',
    review:
      'Psoriasis had made my life miserable for years. After 6 months here, my skin is almost completely clear. The doctor is knowledgeable and the staff is warm and welcoming.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FDFAF4' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block border border-green-700 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          Patient Stories
        </span>
        <h2 className="mt-4 text-4xl font-black text-gray-900">What Patients Say</h2>
        <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
          Real experiences from patients who found lasting relief through classical homoeopathy.
        </p>
      </div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={cardVariants}
            className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
          >
            {/* Decorative quote mark */}
            <span className="absolute top-4 right-6 text-8xl font-black text-green-50 leading-none select-none pointer-events-none">
              "
            </span>

            {/* Header row */}
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                }}
              >
                {t.initials}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
              </div>
              <span className="ml-auto bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                {t.condition}
              </span>
            </div>

            {/* Stars */}
            <div className="mt-4 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Review */}
            <p className="mt-3 text-gray-600 text-sm leading-relaxed italic">"{t.review}"</p>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-10 text-center text-xs text-gray-400 italic">
        * Reviews are representative patient experiences. Results may vary.
      </p>
    </section>
  )
}
