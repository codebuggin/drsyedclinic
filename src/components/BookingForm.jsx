import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { supabase } from '../supabase'

const today = new Date().toISOString().split('T')[0]

const branchSchedule = {
  Yakutpura: {
    availableDays: [1, 3, 6],
    note: 'Monday, Wednesday & Saturday',
    slots: [
      { label: 'Morning',   start: 10, end: 12, display: '10:00 AM – 12:00 PM' },
      { label: 'Afternoon', start: 12, end: 16, display: '12:00 PM – 4:00 PM' },
      { label: 'Evening',   start: 16, end: 20, display: '4:00 PM – 8:00 PM' },
    ],
  },
  Mallepally: {
    availableDays: [0, 2, 4],
    note: 'Sunday, Tuesday & Thursday',
    slots: [
      { label: 'Morning', start: 11, end: 15, display: '11:00 AM – 3:00 PM' },
      { label: 'Evening', start: 17, end: 20, display: '5:00 PM – 8:00 PM' },
    ],
  },
}

function isDateAvailable(dateStr, location) {
  if (!dateStr || !location) return false
  const [y, m, d] = dateStr.split('-').map(Number)
  const day = new Date(y, m - 1, d).getDay()
  return branchSchedule[location]?.availableDays.includes(day) ?? false
}

function generate30MinTimes(start, end) {
  const times = []
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
      const ampm = h < 12 ? 'AM' : 'PM'
      times.push({ label: `${hour12}:${m === 0 ? '00' : '30'} ${ampm}`, hour: h, minute: m })
    }
  }
  return times
}

const initialForm = { name: '', phone: '', location: '', condition: '', date: '', message: '' }

const baseInput = 'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 transition mb-1'
const normalInput = `${baseInput} border-gray-200 focus:border-green-500`
const errorInput  = `${baseInput} border-red-400 focus:border-red-400 bg-red-50`
const labelClass  = 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block'

export default function BookingForm() {
  const [form, setForm]               = useState(initialForm)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [submitted, setSubmitted]     = useState(false)
  const [tokenNumber, setTokenNumber] = useState(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  /* ── Derived values (recalculated each render for live time accuracy) ── */
  const now           = new Date()
  const currentHour   = now.getHours()
  const currentMinute = now.getMinutes()
  const isSelectedToday = form.date === today
  const schedule        = branchSchedule[form.location] ?? null
  const dateValid       = isDateAvailable(form.date, form.location)

  const availableSlots = schedule
    ? schedule.slots.filter(s => !isSelectedToday || currentHour < s.end)
    : []

  const allSlotsOver = isSelectedToday && !!schedule && availableSlots.length === 0

  const isOngoing = (slot) =>
    isSelectedToday && currentHour >= slot.start && currentHour < slot.end

  const allSpecificTimes = selectedSlot
    ? generate30MinTimes(selectedSlot.start, selectedSlot.end)
    : []

  const specificTimes = allSpecificTimes.filter(t => {
    if (!isSelectedToday) return true
    return t.hour > currentHour || (t.hour === currentHour && t.minute > currentMinute)
  })

  const noTimesLeft = isSelectedToday && !!selectedSlot && specificTimes.length === 0

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'location') {
      setForm(prev => ({ ...prev, location: value, date: '' }))
      setSelectedSlot(null)
      setSelectedTime(null)
    } else if (name === 'date') {
      setForm(prev => ({ ...prev, date: value }))
      setSelectedSlot(null)
      setSelectedTime(null)
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
    setSelectedTime(null)
    if (fieldErrors.slot) setFieldErrors(prev => ({ ...prev, slot: false }))
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    if (fieldErrors.time) setFieldErrors(prev => ({ ...prev, time: false }))
  }

  /* ── Validation ── */
  const validate = () => {
    const errs = {}
    if (!form.name)      errs.name = true
    if (!form.phone)     errs.phone = true
    if (!form.location)  errs.location = true
    if (!form.date)                          errs.date = true
    else if (!dateValid)                     errs.dateUnavailable = true
    if (!selectedSlot)   errs.slot = true
    if (!selectedTime)   errs.time = true
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  /* ── Submit ── */
  const timeSlotValue = selectedSlot && selectedTime
    ? `${selectedSlot.label} (${selectedSlot.display}) — ${selectedTime}`
    : ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setError(null)
    try {
      const { data: inserted, error: insertError } = await supabase.from('bookings').insert([{
        name:           form.name,
        phone:          form.phone,
        location:       form.location,
        condition:      form.condition,
        preferred_date: form.date,
        time_slot:      timeSlotValue,
        message:        form.message,
        status:         'pending',
      }]).select().single()
      if (insertError) throw insertError
      setTokenNumber(inserted?.token_number ?? null)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us directly at 09912384430')
    } finally {
      setLoading(false)
    }
  }

  /* ── WhatsApp ── */
  const openWhatsApp = () => {
    const [y, m, d] = form.date.split('-').map(Number)
    const dayName = new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'long' })
    const msg =
      `Assalamu Alaikum! 🌿\n\n` +
      `I've just submitted an appointment request at *Dr. Syed's Advanced Homeo Clinics*.\n\n` +
      `*My Details:*\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📍 Branch: ${form.location}\n` +
      `🏥 Condition: ${form.condition}\n` +
      (tokenNumber ? `🎫 Token Number: #${tokenNumber}\n` : '') +
      `📅 Date: ${form.date} (${dayName})\n` +
      `⏰ Time: ${selectedSlot?.label} — ${selectedTime}\n\n` +
      `Kindly confirm my appointment. JazakAllah!`
    window.open(`https://wa.me/919912384430?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const field = (name) => ({
    className: fieldErrors[name] ? errorInput : normalInput,
    name,
    value: form[name],
    onChange: handleChange,
  })

  const pillStyle = (active) =>
    `border rounded-xl px-4 py-2 text-sm cursor-pointer transition-colors ${
      active
        ? 'bg-[#1A4A2E] text-white border-[#1A4A2E]'
        : 'bg-white text-gray-700 border-gray-200 hover:border-[#1A4A2E]'
    }`

  return (
    <section id="booking" className="py-12 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#FDFAF4' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">

        {/* ── LEFT: info panel ── */}
        <div
          className="rounded-3xl p-6 sm:p-10 text-white flex flex-col justify-between"
          style={{ backgroundColor: '#1A4A2E', minHeight: '520px' }}
        >
          <div>
            <span className="inline-block border border-green-500 text-green-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Book Appointment
            </span>
            <h2 className="text-4xl font-black leading-tight">
              Ready to Start
              <br />
              <span style={{ color: '#C9922A' }}>Your Healing</span>
              <br />
              Journey?
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#86efac' }}>
              Fill in the form and we'll contact you to confirm your appointment. Personalised
              one-on-one consultation with Dr. Sayed Tamizuddin.
            </p>
            <div className="mt-10 space-y-4">
              {[
                'Consultation by Appointment Only',
                'Personalised Treatment Plan',
                'Safe, Natural, Zero Side Effects',
                'Yakutpura: Mon, Wed & Sat · Mallepally: Sun, Tue & Thu',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-lg font-bold leading-snug" style={{ color: '#C9922A' }}>✅</span>
                  <span className="text-sm text-green-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-green-700 pt-6 mt-10">
            <p className="text-xs text-green-400 uppercase tracking-wider mb-2">Or call us directly:</p>
            <a href="tel:09912384430" className="block text-2xl font-black text-white hover:text-green-200 transition-colors">09912384430</a>
            <a href="tel:09493861087" className="block text-sm text-green-300 mt-1 hover:text-white transition-colors">09493861087</a>
          </div>
        </div>

        {/* ── RIGHT: form / success ── */}
        <div className="bg-white rounded-3xl p-5 sm:p-10 shadow-xl border border-gray-100">

          {submitted ? (
            /* ── SUCCESS ── */
            <div className="flex flex-col items-center text-center gap-4">
              <CheckCircle size={64} className="text-green-500" />
              <h3 className="text-2xl font-black text-gray-900">Booking Submitted!</h3>
              {tokenNumber && (
                <div className="w-full">
                  <div
                    className="rounded-2xl px-8 py-5 text-white text-center"
                    style={{ backgroundColor: '#1A4A2E' }}
                  >
                    <p className="text-xs uppercase tracking-widest" style={{ color: '#86efac' }}>Your Token Number</p>
                    <p className="text-5xl font-black mt-1">#{tokenNumber}</p>
                  </div>
                  <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <span className="text-lg leading-none mt-0.5">📸</span>
                    <p className="text-xs text-amber-800 font-medium">Please screenshot your token number. You'll need it when you arrive at the clinic.</p>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500 max-w-xs">
                Tap the button below to notify us on WhatsApp — we'll confirm your appointment shortly.
              </p>
              <div className="w-full border-t border-gray-100 my-1" />
              <div className="w-full bg-green-50 rounded-xl p-4 text-sm text-left space-y-1.5 text-gray-700">
                <p>👤 <strong>{form.name}</strong></p>
                <p>📞 {form.phone}</p>
                <p>📍 {form.location}</p>
                <p>🏥 {form.condition}</p>
                <p>📅 {form.date} — {selectedSlot?.label} ({selectedSlot?.display})</p>
                <p>⏰ {selectedTime}</p>
              </div>
              <button
                onClick={openWhatsApp}
                className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#25D366' }}
              >
                📲 Notify Clinic on WhatsApp
              </button>
              <p className="text-xs text-gray-400">Or call us directly: 09912384430 / 09493861087</p>
              <button
                onClick={() => {
                  setForm(initialForm)
                  setSelectedSlot(null)
                  setSelectedTime(null)
                  setSubmitted(false)
                  setTokenNumber(null)
                }}
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            /* ── FORM ── */
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your Details</h3>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" placeholder="Mohammed Ali" {...field('name')} />
                  {fieldErrors.name && <p className="text-red-500 text-xs mb-3">Required</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input type="tel" placeholder="09912384430" {...field('phone')} />
                  {fieldErrors.phone && <p className="text-red-500 text-xs mb-3">Required</p>}
                </div>
              </div>

              {/* Location */}
              <label className={labelClass}>Preferred Location *</label>
              <select {...field('location')}>
                <option value="" disabled>Select a clinic</option>
                <option value="Yakutpura">Yakutpura — Near Islamia College</option>
                <option value="Mallepally">Mallepally — Near Anwar-ul-uloom College</option>
              </select>
              {fieldErrors.location && <p className="text-red-500 text-xs mb-3">Required</p>}

              {/* Condition */}
              <label className={labelClass}>Condition / Complaint <span className="normal-case text-gray-400 font-normal">(Optional)</span></label>
              <input type="text" placeholder="e.g. Diabetes, Migraine, Skin Disease…" {...field('condition')} />

              {/* Date */}
              <div className="mb-4">
                <label className={labelClass}>Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  onKeyDown={(e) => e.preventDefault()}
                  className={!form.date && fieldErrors.date ? errorInput : normalInput}
                />
                {schedule && (
                  <p className="text-xs text-gray-400 italic mt-1">
                    📅 Available: {schedule.note}
                  </p>
                )}
                {!form.date && fieldErrors.date && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
                {form.date && form.location && !dateValid && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠️ Dr. Tamizuddin is not available on this day at {form.location}.
                    Please select a Mon/Wed/Sat for Yakutpura or Sun/Tue/Thu for Mallepally.
                  </p>
                )}
                {form.date && form.location && dateValid && (
                  <p className="text-green-600 text-xs mt-1 font-semibold">✓ Available</p>
                )}
              </div>

              {/* Time slot section — only shown when date is valid */}
              {dateValid && (
                <div className="mb-4">
                  <label className={labelClass}>Preferred Time Slot *</label>

                  {allSlotsOver ? (
                    <p className="text-red-500 text-sm mt-1">
                      ❌ No more slots available today at this branch. Please select another date.
                    </p>
                  ) : (
                    <>
                      {/* Level 1 — slot pills */}
                      <div className="flex gap-3 flex-wrap mt-2">
                        {availableSlots.map(slot => (
                          <button
                            key={slot.label}
                            type="button"
                            onClick={() => handleSlotSelect(slot)}
                            className={pillStyle(selectedSlot?.label === slot.label)}
                          >
                            <span>{slot.label}{isOngoing(slot) ? ' (ongoing)' : ''}</span>
                            <span className="block text-xs opacity-70">{slot.display}</span>
                          </button>
                        ))}
                      </div>

                      {selectedSlot && isOngoing(selectedSlot) && (
                        <p className="text-amber-600 text-xs mt-2">
                          ⏰ This slot is currently ongoing. Please arrive as soon as possible.
                        </p>
                      )}

                      {fieldErrors.slot && !selectedSlot && (
                        <p className="text-red-500 text-xs mt-1">Please select a time slot</p>
                      )}

                      {/* Level 2 — specific time pills */}
                      {selectedSlot && (
                        <div className="mt-4">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                            Select Your Preferred Time
                          </p>
                          {noTimesLeft ? (
                            <p className="text-red-500 text-xs">
                              ❌ All times in this slot have passed for today.
                            </p>
                          ) : (
                            <div className="flex gap-2 flex-wrap">
                              {specificTimes.map(t => (
                                <button
                                  key={t.label}
                                  type="button"
                                  onClick={() => handleTimeSelect(t.label)}
                                  className={pillStyle(selectedTime === t.label)}
                                >
                                  {t.label}
                                </button>
                              ))}
                            </div>
                          )}
                          {fieldErrors.time && !selectedTime && !noTimesLeft && (
                            <p className="text-red-500 text-xs mt-1">Please select a specific time</p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Message */}
              <label className={labelClass}>
                Message <span className="normal-case text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Any additional details…"
                className={`${normalInput} resize-none`}
              />

              <button
                type="submit"
                disabled={loading || allSlotsOver || noTimesLeft}
                className="w-full text-white py-4 rounded-xl font-bold text-sm mt-3 transition-all duration-200 hover:bg-green-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1A4A2E' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  'Send Appointment Request →'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
