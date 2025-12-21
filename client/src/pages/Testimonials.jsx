import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaUser, FaCalendar, FaQuoteLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'
import api from '../utils/api'
import SEO from '../components/SEO'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    coupleName: '',
    rating: 5,
    review: '',
    weddingDate: new Date().toISOString().split('T')[0],
    email: '',
    phone: ''
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const response = await api.get('/testimonials')
      setTestimonials(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error loading testimonials:', error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating: rating
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.coupleName || formData.coupleName.trim().length < 2) {
      toast.error('कृपया वैध नाम दर्ज करें (Please enter a valid name)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    if (!formData.review || formData.review.trim().length < 10) {
      toast.error('कृपया कम से कम 10 अक्षरों की समीक्षा लिखें (Please write a review with at least 10 characters)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    if (formData.rating < 1 || formData.rating > 5) {
      toast.error('कृपया 1 से 5 के बीच रेटिंग दें (Please provide a rating between 1 and 5)', {
        position: 'top-right',
        autoClose: 4000,
      })
      return
    }

    setSubmitting(true)

    try {
      const response = await api.post('/testimonials', {
        coupleName: formData.coupleName.trim(),
        rating: formData.rating,
        review: formData.review.trim(),
        weddingDate: formData.weddingDate
      })

      toast.success('धन्यवाद! आपकी समीक्षा सफलतापूर्वक जमा कर दी गई है। (Thank you! Your review has been submitted successfully.)', {
        position: 'top-right',
        autoClose: 6000,
      })

      // Reset form
      setFormData({
        coupleName: '',
        rating: 5,
        review: '',
        weddingDate: new Date().toISOString().split('T')[0],
        email: '',
        phone: ''
      })
      setShowForm(false)
      
      // Reload testimonials
      loadTestimonials()
    } catch (error) {
      console.error('Error submitting testimonial:', error)
      toast.error('समीक्षा जमा करने में त्रुटि: ' + (error.response?.data?.message || error.message || 'कृपया पुनः प्रयास करें'), {
        position: 'top-right',
        autoClose: 5000,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onStarClick ? () => onStarClick(star) : undefined}
            className={interactive ? "cursor-pointer transition-transform hover:scale-110" : ""}
            disabled={!interactive}
          >
            <FaStar
              className={`text-xl ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="Client Reviews & Testimonials - RS Photography"
        description="Read what our clients say about RS Photography. Share your wedding photography experience and rate our services."
        keywords="testimonials, reviews, client feedback, wedding photography reviews, RS Photography reviews"
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
              Client Reviews
            </h1>
            <p className="text-xl text-wedding-gold">
              What Our Clients Say About Us
            </p>
          </div>
        </section>

        {/* Submit Review Section */}
        <section className="py-12 bg-wedding-gold/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-elegant font-bold mb-2 text-wedding-gold">
                Share Your Experience
              </h2>
              <p className="text-gray-300">
                Help us improve by sharing your wedding photography experience
              </p>
            </div>
            
            {!showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-wedding-gold/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Write Your Review</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <FaUser className="inline mr-2" /> Couple Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="coupleName"
                      value={formData.coupleName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter your name or couple name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-4">
                      {renderStars(formData.rating, true, handleRatingClick)}
                      <span className="text-gray-600 font-semibold">{formData.rating} / 5 Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <FaCalendar className="inline mr-2" /> Wedding Date
                    </label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <FaQuoteLeft className="inline mr-2" /> Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Share your experience with RS Photography..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 10 characters required</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-wedding-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setFormData({
                          coupleName: '',
                          rating: 5,
                          review: '',
                          weddingDate: new Date().toISOString().split('T')[0],
                          email: '',
                          phone: ''
                        })
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </section>

        {/* Testimonials Display */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4 text-wedding-black">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg">
                Real experiences from real couples
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl mb-4">No testimonials yet.</p>
                <p className="text-gray-400">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-wedding-gold rounded-full flex items-center justify-center">
                          <FaUser className="text-wedding-black text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.coupleName}</h3>
                          {testimonial.weddingDate && (
                            <p className="text-xs text-gray-500">
                              {new Date(testimonial.weddingDate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                      {testimonial.featured && (
                        <span className="bg-wedding-gold text-wedding-black text-xs px-2 py-1 rounded font-semibold">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    <div className="relative">
                      <FaQuoteLeft className="text-wedding-gold text-2xl mb-2 opacity-50" />
                      <p className="text-gray-700 leading-relaxed italic">
                        "{testimonial.review}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Testimonials
