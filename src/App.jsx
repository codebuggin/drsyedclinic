import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhyUs from './components/WhyUs'
import Conditions from './components/Conditions'
import FAQ from './components/FAQ'
import BookingForm from './components/BookingForm'
import Locations from './components/Locations'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Admin from './pages/Admin'

function StickyBookBtn() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <a
      href="#booking"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-green-900/40"
      style={{ backgroundColor: '#1A4A2E' }}
    >
      📅 Book Appointment
    </a>
  )
}

function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <BookingForm />
      <WhyUs />
      <Conditions />
      <FAQ />
      <Locations />
      <Testimonials />
      <Footer />
      <StickyBookBtn />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
