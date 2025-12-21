import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaUser, FaCity } from 'react-icons/fa'
import api from '../utils/api'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    city: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.eventDate || !formData.city) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      await api.post('/contact', formData)
      setSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        city: '',
        message: ''
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact Us - RS Photography | Book Your Wedding Date"
        description="Contact RS Photography for your wedding photography needs in Balaghat and Katangi. Book your date today and let us capture your special moments."
        keywords="contact rs photography, book wedding photographer, wedding photography booking, contact photographer balaghat, contact photographer katangi"
      />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-wedding-black text-white py-20">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/80 to-wedding-gold/60" />
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4 text-wedding-gold">
                Contact Us
              </h1>
              <p className="text-xl text-gray-300">
                Let's capture your special moments together
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-elegant font-bold mb-6 text-wedding-black">
                  Book Your Date
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible to discuss your wedding photography needs.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                      Thank you for your enquiry! We will contact you soon.
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      <FaUser className="inline mr-2" /> Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-wedding-gold focus:ring-wedding-gold"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      <FaPhone className="inline mr-2" /> Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-wedding-gold focus:ring-wedding-gold"
                      placeholder="+91 12345 67890"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      <FaEnvelope className="inline mr-2" /> Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-wedding-gold focus:ring-wedding-gold"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-semibold mb-2">
                      <FaCalendarAlt className="inline mr-2" /> Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-wedding-gold focus:ring-wedding-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2">
                      <FaCity className="inline mr-2" /> City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-wedding-gold focus:ring-wedding-gold"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-wedding-gold focus:ring-wedding-gold"
                      placeholder="Tell us about your event or any special requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-red-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-elegant font-bold mb-6 text-wedding-black">
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We'd love to hear from you. Reach out to us through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-wedding-gold p-4 rounded-lg">
                      <FaMapMarkerAlt className="text-wedding-black text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Address</h3>
                      <p className="text-gray-600">
                        Balaghat, Madhya Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-wedding-gold p-4 rounded-lg">
                      <FaPhone className="text-wedding-black text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Phone</h3>
                      <a
                        href="tel:+916264620716"
                        className="text-wedding-gold hover:text-red-700 transition-colors"
                      >
                        +91 62646 20716
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-wedding-gold p-4 rounded-lg">
                      <FaEnvelope className="text-wedding-black text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <a
                        href="mailto:info@rsphotography.com"
                        className="text-wedding-gold hover:text-red-700 transition-colors"
                      >
                        info@rsphotography.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Find Us</h3>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.789123456789!2d80.1849!3d21.8129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ4JzQ2LjQiTiA4MMKwMTEnMDUuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="RS Photography Location"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    * Update the Google Maps embed URL with your actual location coordinates
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
