import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendar, FaUser, FaCity, FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.eventDate || !formData.city) {
      toast.error('कृपया सभी आवश्यक फ़ील्ड भरें (Please fill in all required fields)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    // Name validation
    if (formData.name.trim().length < 2) {
      toast.error('कृपया वैध नाम दर्ज करें (Please enter a valid name)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('कृपया वैध ईमेल पता दर्ज करें (Please enter a valid email address)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      toast.error('कृपया 10 अंकों का वैध फ़ोन नंबर दर्ज करें (Please enter a valid 10-digit phone number)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    // Event date validation
    const eventDate = new Date(formData.eventDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (eventDate < today) {
      toast.error('कृपया भविष्य की तारीख चुनें (Please select a future date)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    // City validation
    if (formData.city.trim().length < 2) {
      toast.error('कृपया वैध शहर का नाम दर्ज करें (Please enter a valid city name)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/contact', formData)
      
      // Success notification
      toast.success('धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया। हम जल्द ही आपसे संपर्क करेंगे। (Thank you! Your message has been sent successfully. We will contact you soon.)', {
        position: 'top-right',
        autoClose: 6000,
      })
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        city: '',
        message: ''
      })
    } catch (err) {
      console.error('Contact form error:', err)
      
      // Show detailed error messages
      if (err.response) {
        const errorMessage = err.response.data?.message || err.response.data?.error || 'Failed to send message'
        toast.error(`त्रुटि: ${errorMessage} (Error: ${errorMessage})`, {
          position: 'top-right',
          autoClose: 5000,
        })
      } else if (err.request) {
        toast.error('सर्वर से कनेक्ट नहीं हो सका। कृपया इंटरनेट कनेक्शन जांचें। (Could not connect to server. Please check your internet connection.)', {
          position: 'top-right',
          autoClose: 5000,
        })
      } else {
        toast.error('कुछ गलत हुआ। कृपया पुनः प्रयास करें। (Something went wrong. Please try again.)', {
          position: 'top-right',
          autoClose: 5000,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Contact Us - RS Photography | Book Your Wedding Photography"
        description="Contact RS Photography for wedding photography services in Balaghat and Katangi (Kattangi), Madhya Pradesh. Book your date today!"
        keywords="contact rs photography, book wedding photographer balaghat, wedding photography booking, contact photographer katangi"
      />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/80 to-wedding-gold/60" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-wedding-gold">
              Let's Discuss Your Special Day
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
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-elegant font-bold mb-6 text-wedding-black">
                  Send Us a Message
                </h2>
                

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-wedding-black">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-gold" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-wedding-black">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-gold" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                          placeholder="10-digit number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2 text-wedding-black">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-gold" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-semibold mb-2 text-wedding-black">
                        Event Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-gold" />
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold mb-2 text-wedding-black">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-gold" />
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                          placeholder="Your City"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-wedding-black">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Tell us about your event..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-wedding-black"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FaPaperPlane />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-elegant font-bold mb-6 text-wedding-black">
                    Get in Touch
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    We'd love to hear from you! Whether you're planning your wedding, 
                    engagement, or any special event, RS Photography is here 
                    to help capture your precious moments. Contact us today to discuss 
                    your photography needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-wedding-gold p-4 rounded-lg">
                      <FaPhone className="text-wedding-black text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-wedding-black">Phone</h3>
                      <div className="space-y-2">
                        <a href="tel:+916262620716" className="block text-gray-700 hover:text-wedding-gold transition-colors">
                          +91 62626 20716
                        </a>
                        <a href="tel:+919893356211" className="block text-gray-700 hover:text-wedding-gold transition-colors">
                          +91 98933 56211
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-wedding-gold p-4 rounded-lg">
                      <FaEnvelope className="text-wedding-black text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-wedding-black">Email</h3>
                      <a href="mailto:info@rsphotography.com" className="text-gray-700 hover:text-wedding-gold transition-colors">
                        info@rsphotography.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="bg-wedding-gold p-4 rounded-lg">
                      <FaMapMarkerAlt className="text-wedding-black text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-wedding-black">Location</h3>
                      <p className="text-gray-700">
                        Sukdighat Post, Miragpur<br />
                        District Balaghat, Madhya Pradesh<br />
                        India
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Service Areas */}
                <motion.div
                  className="bg-gray-50 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-elegant font-bold text-xl mb-4 text-wedding-black">
                    Service Areas
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We proudly serve the following areas:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-wedding-gold">✓</span>
                      Balaghat
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-wedding-gold">✓</span>
                      Katangi (Kattangi)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-wedding-gold">✓</span>
                      Surrounding Areas
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                Find Us
              </h2>
              <p className="text-gray-600 text-lg mb-2 font-semibold">
                RS Photography, Tekadighat Post, Miragpur, Jila Balaghat, MP
              </p>
              <p className="text-gray-600">
                Madhya Pradesh, India
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://www.google.com/maps?q=21.8134,80.1834&hl=en&z=15&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RS Photography Location - Sukdighat Post, Miragpur, District Balaghat, Madhya Pradesh"
                className="w-full"
              ></iframe>
              <div className="p-4 bg-gray-50 text-center">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=21.8134,80.1834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wedding-gold hover:text-wedding-black font-semibold transition-colors"
                >
                  View on Google Maps →
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
