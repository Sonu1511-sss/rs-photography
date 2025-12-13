import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import api from '../utils/api'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    api.get('/testimonials')
      .then(res => {
        setTestimonials(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [testimonials.length])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-wedding-gold">
            What our couples say about their experience
          </p>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                key={currentIndex}
                className="bg-gray-50 p-8 md:p-12 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <FaQuoteLeft className="text-wedding-gold text-4xl mb-6 mx-auto" />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < testimonials[currentIndex].rating
                          ? 'text-wedding-gold'
                          : 'text-gray-300'
                      }`}
                      size={24}
                    />
                  ))}
                </div>
                <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex].review}"
                </p>
                <p className="text-2xl font-elegant font-bold text-wedding-black">
                  {testimonials[currentIndex].coupleName}
                </p>
                {testimonials[currentIndex].weddingDate && (
                  <p className="text-gray-600 mt-2">
                    {formatDate(testimonials[currentIndex].weddingDate)}
                  </p>
                )}
              </motion.div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndex === index ? 'bg-wedding-gold w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-elegant font-bold text-center mb-12">
            All Testimonials
          </h2>
          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No testimonials available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < testimonial.rating
                            ? 'text-wedding-gold'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                  <p className="font-semibold text-wedding-black">
                    - {testimonial.coupleName}
                  </p>
                  {testimonial.weddingDate && (
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(testimonial.weddingDate)}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Testimonials

