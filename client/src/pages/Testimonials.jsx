import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import api from '../utils/api'
import SEO from '../components/SEO'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, featured

  useEffect(() => {
    const endpoint = filter === 'featured' ? '/testimonials/featured' : '/testimonials'
    api.get(endpoint)
      .then(res => {
        const data = res.data && res.data.length > 0 ? res.data : getSampleTestimonials()
        setTestimonials(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setTestimonials(getSampleTestimonials())
        setLoading(false)
      })
  }, [filter])

  const getSampleTestimonials = () => {
    return [
      {
        _id: 'sample-1',
        coupleName: 'Rajesh & Priya',
        rating: 5,
        review: 'RS Photography captured our wedding beautifully! Every moment was perfectly framed. The team was professional, punctual, and made us feel so comfortable. Highly recommended!',
        weddingDate: '2024-01-15',
        featured: true
      },
      {
        _id: 'sample-2',
        coupleName: 'Amit & Sneha',
        rating: 5,
        review: 'Amazing experience with RS Photography! The pre-wedding shoot was absolutely stunning. They understood our vision and delivered beyond expectations. Thank you for making our special day even more memorable!',
        weddingDate: '2023-12-20',
        featured: true
      },
      {
        _id: 'sample-3',
        coupleName: 'Vikram & Anjali',
        rating: 5,
        review: 'Best wedding photographer in Balaghat! The photos are incredible and the service was outstanding. They captured every emotion perfectly. We couldn\'t be happier with our wedding album.',
        weddingDate: '2024-02-10',
        featured: true
      },
      {
        _id: 'sample-4',
        coupleName: 'Rohit & Kavya',
        rating: 5,
        review: 'RS Photography exceeded all our expectations! The team was creative, professional, and very accommodating. Our wedding photos are absolutely beautiful. Worth every penny!',
        weddingDate: '2023-11-05',
        featured: false
      },
      {
        _id: 'sample-5',
        coupleName: 'Suresh & Meera',
        rating: 5,
        review: 'Outstanding photography services! They made our engagement ceremony so special with their beautiful captures. The editing quality is top-notch. Highly recommend RS Photography!',
        weddingDate: '2024-03-22',
        featured: false
      },
      {
        _id: 'sample-6',
        coupleName: 'Karan & Divya',
        rating: 5,
        review: 'Professional, creative, and amazing results! RS Photography captured our wedding in the most beautiful way. The highlight reel was incredible. Thank you for preserving our memories so beautifully!',
        weddingDate: '2023-10-18',
        featured: true
      }
    ]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
        title="Testimonials - Client Reviews | RS Photography"
        description="Read what our clients say about RS Photography. Real reviews and testimonials from couples who trusted us with their wedding photography in Balaghat and Katangi."
        keywords="wedding photography reviews, photographer testimonials, RS photography reviews, wedding photographer balaghat reviews, client testimonials"
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
                Client Testimonials
              </h1>
              <p className="text-xl text-wedding-gold">
                What Our Happy Couples Say About Us
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-wedding-gold text-wedding-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Testimonials
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'featured'
                    ? 'bg-wedding-gold text-wedding-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Featured Only
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {testimonials.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No testimonials found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {testimonial.featured && (
                      <div className="absolute top-4 right-4 bg-wedding-gold text-wedding-black px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    )}

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

                    <div className="mb-4">
                      <FaQuoteLeft className="text-wedding-gold text-2xl mb-2" />
                      <p className="text-gray-700 italic leading-relaxed mb-2">
                        {testimonial.review}
                      </p>
                      <FaQuoteRight className="text-wedding-gold text-2xl ml-auto" />
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-semibold text-wedding-black text-lg">
                        - {testimonial.coupleName}
                      </p>
                      {testimonial.weddingDate && (
                        <p className="text-gray-500 text-sm mt-1">
                          {formatDate(testimonial.weddingDate)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-wedding-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold">
                Ready to Create Your Own Story?
              </h2>
              <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Join our family of happy couples and let us capture your special moments
              </p>
              <a
                href="/contact"
                className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Book Your Date
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Testimonials
