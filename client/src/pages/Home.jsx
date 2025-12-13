import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaPlay } from 'react-icons/fa'
import api from '../utils/api'

const Home = () => {
  const [featuredPortfolio, setFeaturedPortfolio] = useState([])
  const [featuredVideos, setFeaturedVideos] = useState([])
  const [featuredTestimonials, setFeaturedTestimonials] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Fetch featured portfolio
    api.get('/portfolio/featured')
      .then(res => setFeaturedPortfolio(res.data))
      .catch(err => console.error(err))

    // Fetch featured videos
    api.get('/videos/featured')
      .then(res => setFeaturedVideos(res.data))
      .catch(err => console.error(err))

    // Fetch featured testimonials
    api.get('/testimonials/featured')
      .then(res => setFeaturedTestimonials(res.data))
      .catch(err => console.error(err))
  }, [])

  const heroImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pt-20">
      {/* Hero Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </motion.div>
        ))}
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-elegant font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            RS Photography
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-wedding-gold"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Capturing Timeless Wedding Stories in Balaghat
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all flex items-center justify-center gap-2"
            >
              View Portfolio <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-wedding-gold text-wedding-gold px-8 py-4 rounded-lg font-semibold hover:bg-wedding-gold hover:text-wedding-black transition-all"
            >
              Book Your Date
            </Link>
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-wedding-gold w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Galleries */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4 dark:text-white">
              Featured Galleries
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Explore our stunning collection of wedding moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Weddings', 'Pre-Wedding', 'Engagement'].map((category, index) => (
              <motion.div
                key={category}
                className="relative group overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-wedding-black to-wedding-gold flex items-center justify-center">
                  <h3 className="text-3xl font-elegant font-bold text-white">
                    {category}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    to={`/portfolio/${category.toLowerCase().replace(' ', '-')}`}
                    className="bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all"
                  >
                    View Gallery
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-wedding-black dark:bg-gray-800 text-white transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4 text-wedding-gold">
              Our Services
            </h2>
            <p className="text-gray-300 text-lg">
              Comprehensive wedding photography and videography services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Wedding Photography',
              'Pre-Wedding Shoots',
              'Engagement Shoots',
              'Wedding Cinematography',
              'Drone Coverage',
              'Albums & Prints'
            ].map((service, index) => (
              <motion.div
                key={service}
                className="bg-wedding-black border border-wedding-gold/30 p-6 rounded-lg hover:border-wedding-gold transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-elegant font-semibold mb-2 text-wedding-gold">
                  {service}
                </h3>
                <p className="text-gray-300">
                  Professional {service.toLowerCase()} services tailored to your needs
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Preview */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                What Our Clients Say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTestimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-wedding-gold ${
                          i < testimonial.rating ? 'text-wedding-gold' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.review}"</p>
                  <p className="font-semibold text-wedding-black dark:text-white">
                    - {testimonial.coupleName}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/testimonials"
                className="inline-block bg-wedding-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-wedding-gold hover:text-wedding-black transition-all"
              >
                Read More Testimonials
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Instagram Reel Section */}
      <section className="py-20 bg-gradient-to-br from-wedding-black to-wedding-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-elegant font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Follow Our Journey
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            See our latest work on Instagram and YouTube
          </motion.p>
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://instagram.com/rsp_photography"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <FaPlay /> Follow on Instagram
            </a>
            <a
              href="https://youtube.com/@rsp_photography"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <FaPlay /> Watch on YouTube
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

