import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaPlay, FaYoutube } from 'react-icons/fa'
import api from '../utils/api'
import SEO from '../components/SEO'

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
    'https://i.pinimg.com/1200x/83/da/4a/83da4aab6a972a7efb1cfcdfb321a5bc.jpg',
    'https://i.pinimg.com/736x/8f/99/8d/8f998d95f46091f9167b171994ab8b6f.jpg',
    'https://i.pinimg.com/736x/0e/f8/16/0ef81696f7176a03b459c25c819f5bd2.jpg'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <SEO 
        title="RS Photography - Best Wedding Photographer in Balaghat & Katangi"
        description="RS Photography - Best Wedding Photographer in Balaghat and Katangi (Kattangi), Madhya Pradesh. Professional Indian Wedding Photography, Pre-Wedding, Engagement Shoots, and Wedding Films."
        keywords="rsphotography, rs photography, balaghat, kattangi, katangi, photographer, wedding photographer, wedding photography balaghat, wedding photographer balaghat, wedding photography katangi, wedding photographer katangi, wedding photography kattangi, wedding photographer kattangi"
      />
      <div className="pt-20">
      {/* Hero Slider */}
      <section className="relative h-screen  flex items-center justify-center overflow-hidden">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </motion.div>
        ))}
        
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1
            className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 uppercase tracking-tight px-2"
            style={{
              color: '#dc2626',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.6)',
              letterSpacing: '0.03em',
              fontFamily: 'Arial, sans-serif',
              fontWeight: '900',
              lineHeight: '1.1'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            RS PHOTOGRAPHY
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-wedding-gold"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Best Wedding Photographer in Balaghat & Katangi (Kattangi) | RS Photography
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-red-700 hover:text-white transition-all flex items-center justify-center gap-2"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-wedding-gold w-8' : 'bg-white/50 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Galleries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
              Featured Galleries
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our stunning collection of wedding moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Weddings', 
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
                path: '/portfolio/weddings'
              },
              { 
                name: 'Pre-Wedding', 
                image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
                path: '/portfolio/pre-wedding'
              },
              { 
                name: 'Engagement', 
                image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
                path: '/portfolio/engagement'
              }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className="relative group overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-black/60 to-wedding-gold/40 group-hover:from-wedding-black/70 group-hover:to-wedding-gold/50 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <h3 className="text-3xl font-elegant font-bold text-white z-10 mb-4 group-hover:mb-6 transition-all duration-300">
                      {category.name}
                    </h3>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={category.path}
                          className="bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-red-700 hover:text-white transition-all z-10 flex items-center gap-2 group/btn shadow-lg"
                        >
                          <span>View Gallery</span>
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <FaArrowRight />
                          </motion.span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-wedding-black text-white">
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
        <section className="py-20 bg-white">
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
                className="bg-gray-50 p-6 rounded-lg shadow-lg"
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
                  <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                  <p className="font-semibold text-wedding-black">
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
      <section className="relative py-20 bg-gradient-to-br from-wedding-black to-wedding-gold text-white overflow-hidden">
        {/* Camera Lens Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/80 to-wedding-gold/60" />
          <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
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
              href="https://www.instagram.com/rs____photography___/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <FaPlay /> Follow on Instagram
            </a>
            <a
              href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold  transition-all flex items-center gap-2"
            >
               <FaYoutube className="text-wedding-gold text-4xl lg:text-2xl  " /> Watch on YouTube
            </a>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home

