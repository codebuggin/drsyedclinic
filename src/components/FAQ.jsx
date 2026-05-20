import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "Is homoeopathy safe? Are there any side effects?",
    a: "Homoeopathic medicines are derived from natural substances and prepared through extreme dilution, making them completely safe with zero side effects. They are safe for all ages — from newborns to elderly patients."
  },
  {
    q: "How long does homoeopathic treatment take?",
    a: "Treatment duration varies by condition. Acute conditions like fever may resolve in days. Chronic conditions like diabetes, arthritis, or skin diseases may require months. Dr. Tamizuddin will give you a realistic timeline during your first consultation."
  },
  {
    q: "Can I take homoeopathy alongside my current medicines?",
    a: "Yes, in most cases homoeopathic medicines can be taken alongside conventional medicines without any interaction. Please inform Dr. Tamizuddin about all medications you are currently taking."
  },
  {
    q: "Do I need to follow any diet restrictions during treatment?",
    a: "Classical homoeopathy recommends avoiding strong-smelling substances like camphor, coffee, and raw onion as they may interfere with the medicines. Dr. Tamizuddin will give specific dietary guidance based on your prescription."
  },
  {
    q: "How is classical homoeopathy different from regular homoeopathy?",
    a: "Classical homoeopathy follows the original principles of Dr. Samuel Hahnemann — one medicine at a time, chosen based on the complete symptom picture of the patient. This treats the root cause rather than just suppressing symptoms."
  },
  {
    q: "What should I expect in my first consultation?",
    a: "Your first consultation is detailed and thorough — lasting 30-45 minutes. Dr. Tamizuddin will ask about your symptoms, medical history, lifestyle, and personality traits. This holistic assessment helps find the most accurate remedy for you."
  },
  {
    q: "Do you treat children with homoeopathy?",
    a: "Absolutely. Homoeopathy is especially gentle and effective for children. Dr. Tamizuddin regularly treats children for recurrent colds, asthma, skin issues, behavioural concerns, and developmental challenges."
  },
  {
    q: "How do I book an appointment?",
    a: "Book directly through our website using the booking form, or call us at 09912384430 / 09493861087. We have two clinics in Yakutpura and Mallepally, Hyderabad. Consultation is by appointment only."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#0f172a] py-24 px-6" ref={ref}>
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block border border-green-500 text-green-400 text-xs px-4 py-1 rounded-full tracking-widest uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl font-black text-white mt-4">Everything You Need to Know</h2>
          <p className="text-slate-400 mt-3">Answers to common questions about homoeopathic treatment</p>
        </motion.div>

        {/* Accordion items */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-[#1e293b] border rounded-2xl mb-3 overflow-hidden transition-colors duration-200 hover:border-green-500/50 ${isOpen ? 'border-green-500/50' : 'border-[#334155]'}`}
              >
                {/* Question row */}
                <button
                  className="w-full flex justify-between items-center cursor-pointer py-5 px-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="text-white font-semibold text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-green-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="text-slate-400 text-sm leading-relaxed px-6 pb-5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
