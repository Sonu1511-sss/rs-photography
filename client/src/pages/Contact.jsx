import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import api from '../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    city: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)

    try {
      await api.post('/contact', formData)
      setSubmitStatus('success')
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        city: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const phoneNumber = '916264620716'
    const message = `Hello! I am interested in booking RS Photography.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEvent Date: ${formData.eventDate}\nCity: ${formData.city}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-wedding-gold">
            Let's capture your special day together
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-elegant font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wedding-gold"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wedding-gold"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wedding-gold"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-semibold mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wedding-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wedding-gold"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-wedding-gold"
                  />
                </div>
                {submitStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Thank you! We'll contact you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-elegant font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-wedding-gold p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-wedding-black" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">Balaghat, Madhya Pradesh, India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-wedding-gold p-3 rounded-lg">
                    <FaPhone className="text-wedding-black" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:+916264620716" className="text-gray-600 hover:text-wedding-gold">
                      +91 62646 20716
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-wedding-gold p-3 rounded-lg">
                    <FaEnvelope className="text-wedding-black" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:info@rsphotography.com" className="text-gray-600 hover:text-wedding-gold">
                      info@rsphotography.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Find Us</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1234567890!2d80.1849!3d21.8129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ4JzQ2LjQiTiA4MMKwMTEnMDUuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RS Photography Location"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

