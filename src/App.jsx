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
