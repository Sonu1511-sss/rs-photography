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

  // Hero images – 3 images rotate automatically
  // 1: Weddings, 2: Pre-Wedding, 3: Engagements
  const heroImages = [
    'https://media.istockphoto.com/id/866987706/photo/indian-wedding-hands.jpg?s=612x612&w=0&k=20&c=6L-u9qhFPv9MjDnF4UK4AqjVbDKM4_8Xad72IHhwPZE=', 
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 6000) // 6 seconds per slide
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <SEO 
        title="RS Photography - Best Wedding Photographer in Balaghat & Katangi"
        description="RS Photography - Best Wedding Photographer in Balaghat and Katangi (Kattangi), Madhya Pradesh. Professional Indian Wedding Photography, Pre-Wedding, Engagement Shoots, and Wedding Films."
        keywords="rsphotography, rs photography, balaghat, kattangi, katangi, photographer, wedding photographer, wedding photography balaghat, wedding photographer balaghat, wedding photography katangi, wedding photographer katangi, wedding photography kattangi, wedding photographer kattangi"
      />
      <div className="pt-20 bg-wedding-black text-white">
      {/* Hero – slider with 3 images */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background images */}
        {heroImages.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                filter: 'blur(2px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-wedding-black/65 via-wedding-black/50 to-wedding-black/65" />
            </div>
          </motion.div>
        ))}

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 tracking-tight"
            style={{
              color: '#ffffff',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)',
              letterSpacing: '0.02em',
              fontFamily: 'Arial, sans-serif',
              fontWeight: '800',
              lineHeight: '1.2'
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            RS Photography – Wedding Photography in Balaghat & Katangi
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl mb-4 md:mb-5 font-medium"
            style={{
              color: '#f4d03f',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 10px rgba(244, 208, 63, 0.4)'
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Weddings | Pre-Wedding | Engagements | Films 📸
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-wedding-gold/50 transition-all flex items-center justify-center gap-2 text-sm md:text-base shadow-md"
            >
              View Portfolio <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent backdrop-blur-sm border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-wedding-black hover:border-white transition-all text-sm md:text-base shadow-md"
            >
              Book Your Date
            </Link>
          </motion.div>
        </div>

        {/* Slider indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-wedding-gold w-10 shadow-lg shadow-wedding-gold/50' : 'bg-white/40 w-2.5 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Galleries - Dark Theme */}
      <section className="py-20 bg-gradient-to-b from-wedding-black via-[#0b0b0f] to-wedding-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
              Featured Work
            </p>
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
              Featured Galleries
            </h2>
            <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
              Weddings, pre-weddings and engagements we&apos;ve loved capturing for couples in Balaghat &amp; Katangi.
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
                className="relative group overflow-hidden rounded-2xl shadow-xl border border-wedding-gold/25 bg-wedding-black/80 backdrop-blur-sm hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300"
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
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-black/55 to-wedding-gold/30 group-hover:from-wedding-black/70 group-hover:to-wedding-gold/45 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-elegant font-bold text-white z-10 mb-2 md:mb-3 group-hover:mb-4 transition-all duration-300 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-wedding-light-gray text-xs md:text-sm mb-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View curated {category.name.toLowerCase()} stories from our recent shoots.
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={category.path}
                          className="bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-wedding-gold/50 transition-all z-10 flex items-center gap-2 group/btn shadow-lg text-sm md:text-base"
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
      <section className="py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
              Our Services
            </h2>
            <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
              Complete wedding coverage – from pre-wedding stories to the final reception, with cinematic films and premium albums.
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
                className="bg-wedding-black/80 border border-wedding-gold/25 p-6 rounded-2xl shadow-xl backdrop-blur-sm hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-elegant font-semibold text-white">
                    {service}
                  </h3>
                  <span className="text-[11px] md:text-xs px-3 py-1 rounded-full border border-wedding-gold/40 text-wedding-gold/90">
                    Core Service
                  </span>
                </div>
                <p className="text-wedding-light-gray text-sm md:text-base">
                  Professional {service.toLowerCase()} crafted for modern Indian weddings in Balaghat, Katangi & nearby cities.
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
              className="inline-block bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-wedding-gold/50 transition-all shadow-md"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Preview */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm md:text-base text-wedding-gold mb-2 tracking-[0.2em] uppercase">
                Client Love
              </p>
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-white">
                What Our Clients Say
              </h2>
              <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
                Couples from Balaghat, Katangi and beyond sharing their wedding experience with RS Photography.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTestimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  className="relative bg-wedding-black/80 border border-wedding-gold/30 rounded-2xl p-6 md:p-7 shadow-xl backdrop-blur-sm overflow-hidden hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -top-6 -right-4 text-[84px] text-wedding-gold/5 font-serif select-none">
                    “
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-wedding-gold/30 to-wedding-soft-gold/20 border border-wedding-gold/50 flex items-center justify-center text-wedding-black font-bold">
                        {testimonial.coupleName?.[0]?.toUpperCase() || 'R'}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm md:text-base">
                          {testimonial.coupleName || 'Happy Couple'}
                        </p>
                        {testimonial.weddingDate && (
                          <p className="text-[11px] md:text-xs text-wedding-light-gray/80">
                            {new Date(testimonial.weddingDate).getFullYear()} Wedding
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm md:text-base ${
                            i < (testimonial.rating || 5)
                              ? 'text-wedding-gold'
                              : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-wedding-light-gray text-sm md:text-base leading-relaxed italic mb-2">
                    “{testimonial.review || testimonial.message}”
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
                className="inline-block bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-wedding-gold/50 transition-all shadow-md"
              >
                Read More Testimonials
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Instagram Reel Section */}
      <section className="relative py-20 bg-wedding-black text-white overflow-hidden">
        {/* Camera Lens Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: 'url(https://i.pinimg.com/736x/2e/dc/88/2edc885cae7bca92ace48a0a1a767b67.jpg',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/90 to-wedding-gold/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Follow Our Journey
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            See our latest work on Instagram and YouTube
          </motion.p>
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://www.instagram.com/rs____photography___/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <FaPlay /> Follow on Instagram
            </a>
            <a
              href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
               <FaYoutube className="text-2xl" /> Watch on YouTube
            </a>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home

