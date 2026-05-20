import { motion } from 'framer-motion'

const conditions = [
  'Allergy', 'Diabetes', 'Asthma', 'Arthritis', 'Obesity', 'Migraine',
  'Gynec & Obstetric Problems', 'Piles', 'Sinusitis', 'Blood Pressure',
  'Liver Disease', 'Jaundice', 'Skin Diseases', "Children's Diseases",
  'Hair Problems', 'Kidney Stones', 'Infertility', 'Impotency',
  'Organ Diseases', 'Chronic Diseases', 'Genetic Diseases',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Conditions() {
  return (
    <section id="conditions" className="py-24 px-6" style={{ backgroundColor: '#FDFAF4' }}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Label */}
        <span className="inline-block border border-green-700 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          Conditions We Treat
        </span>
        <h2 className="mt-4 text-4xl font-black text-gray-900">Conditions We Treat</h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
          Effective homoeopathic treatment for a wide range of acute and chronic conditions.
        </p>

        {/* Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {conditions.map((name) => (
            <motion.span
              key={name}
              variants={pillVariants}
              className="border-2 font-semibold text-sm px-5 py-2.5 rounded-full cursor-default transition-all duration-200 hover:text-white"
              style={{ borderColor: '#1A4A2E', color: '#1A4A2E' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1A4A2E'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A4A2E' }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>

        {/* Note */}
        <p className="mt-8 italic text-sm text-gray-400">
          Don't see your condition? Consult with Dr. Tamizuddin — classical homoeopathy addresses a
          vast spectrum of health concerns.
        </p>
      </div>
    </section>
  )
}
