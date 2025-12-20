import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import api from '../utils/api'
import SEO from '../components/SEO'

const Portfolio = () => {
  const [featuredPortfolio, setFeaturedPortfolio] = useState([])
  const [allPortfolio, setAllPortfolio] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    // Fetch all portfolio items
    api.get('/portfolio')
      .then(res => {
        const portfolioData = res.data && res.data.length > 0 ? res.data : getSamplePortfolio()
        setAllPortfolio(portfolioData)
        // Also fetch featured for featured section
        return api.get('/portfolio/featured')
      })
      .then(res => {
        const featuredData = res.data && res.data.length > 0 ? res.data : getSamplePortfolio().slice(0, 6)
        setFeaturedPortfolio(featuredData)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        // Use sample data if API fails
        const sampleData = getSamplePortfolio()
        setAllPortfolio(sampleData)
        setFeaturedPortfolio(sampleData.slice(0, 6))
        setLoading(false)
      })
  }, [])

  const getSamplePortfolio = () => {
    return [
      {
        _id: 'sample-1',
        title: 'Traditional Indian Wedding Ceremony',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        description: 'Beautiful traditional wedding ceremony with vibrant colors'
      },
      {
        _id: 'sample-2',
        title: 'Mehendi Celebration',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        description: 'Colorful mehendi ceremony moments'
      },
      {
        _id: 'sample-3',
        title: 'Sangam Ritual',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        description: 'Sacred sangam ritual captured beautifully'
      },
      {
        _id: 'sample-4',
        title: 'Baraat Procession',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
        description: 'Vibrant baraat procession with music and dance'
      },
      {
        _id: 'sample-5',
        title: 'Pheras Ceremony',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1606214174585-fe3155dec0e5?w=800&q=80',
        description: 'Sacred pheras ceremony with traditional rituals'
      },
      {
        _id: 'sample-6',
        title: 'Sindoor Daan',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
        description: 'Emotional sindoor daan moment'
      },
      {
        _id: 'sample-7',
        title: 'Wedding Reception',
        category: 'weddings',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        description: 'Grand wedding reception celebration'
      },
      {
        _id: 'sample-8',
        title: 'Romantic Pre-Wedding Shoot',
        category: 'pre-wedding',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        description: 'Romantic pre-wedding photoshoot in natural setting'
      },
      {
        _id: 'sample-9',
        title: 'Couple Pre-Wedding Session',
        category: 'pre-wedding',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        description: 'Beautiful couple moments before the wedding'
      },
      {
        _id: 'sample-10',
        title: 'Outdoor Pre-Wedding',
        category: 'pre-wedding',
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        description: 'Stunning outdoor pre-wedding photography'
      },
      {
        _id: 'sample-11',
        title: 'Engagement Ceremony',
        category: 'engagement',
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        description: 'Joyful engagement ceremony celebration'
      },
      {
        _id: 'sample-12',
        title: 'Ring Exchange Moment',
        category: 'engagement',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        description: 'Emotional ring exchange ceremony'
      },
      {
        _id: 'sample-13',
        title: 'Engagement Party',
        category: 'engagement',
        imageUrl: 'https://images.unsplash.com/photo-1606214174585-fe3155dec0e5?w=800&q=80',
        description: 'Beautiful engagement party celebration'
      }
    ]
  }

  const filteredPortfolio = activeFilter === 'all' 
    ? allPortfolio 
    : allPortfolio.filter(item => item.category === activeFilter)

  const filterButtons = [
    { id: 'all', label: 'All' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'engagement', label: 'Engagement' }
  ]

  const categories = [
    {
      name: 'Weddings',
      path: '/portfolio/weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      description: 'Complete wedding day coverage'
    },
    {
      name: 'Pre-Wedding',
      path: '/portfolio/pre-wedding',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      description: 'Romantic pre-wedding shoots'
    },
    {
      name: 'Engagement',
      path: '/portfolio/engagement',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      description: 'Engagement ceremony moments'
    }
  ]

  return (
    <>
      <SEO 
        title="Portfolio - Wedding Photography Gallery | RS Photography"
        description="Explore our stunning wedding photography portfolio featuring weddings, pre-wedding shoots, and engagement ceremonies captured by RS Photography in Balaghat and Katangi."
        keywords="wedding photography portfolio, wedding photos, pre-wedding photos, engagement photos, photography gallery"
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
              Our Portfolio
            </h1>
            <p className="text-xl text-wedding-gold">
              Capturing Life's Most Precious Moments
            </p>
          </div>
        </section>

        {/* Category Galleries */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                Explore Our Galleries
              </h2>
              <p className="text-gray-600 text-lg">
                Browse through our collection of beautiful wedding moments
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="relative group overflow-hidden rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-wedding-black/60 to-wedding-gold/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <h3 className="text-3xl font-elegant font-bold text-white mb-2 z-10">
                        {category.name}
                      </h3>
                      <p className="text-white/90 mb-4 z-10 text-center">
                        {category.description}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={category.path}
                          className="bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all z-10 flex items-center gap-2 group/btn"
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery with Filters */}
        {!loading && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                  Our Portfolio Gallery
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Browse through our collection of beautiful wedding moments
                </p>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {filterButtons.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        activeFilter === filter.id
                          ? 'bg-wedding-gold text-wedding-black shadow-lg scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {filteredPortfolio.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">
                    No portfolio items found in this category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPortfolio.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="relative group overflow-hidden rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={item.imageUrl?.startsWith('http') 
                          ? item.imageUrl 
                          : `/api${item.imageUrl}`
                        }
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-elegant font-bold text-xl mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-white/90 text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Featured Portfolio */}
        {!loading && featuredPortfolio.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                  Featured Work
                </h2>
                <p className="text-gray-600 text-lg">
                  Some of our most cherished captures
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPortfolio.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="relative group overflow-hidden rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={item.imageUrl?.startsWith('http') 
                          ? item.imageUrl 
                          : `/api${item.imageUrl}`
                        }
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-elegant font-bold text-xl mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-white/90 text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-wedding-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold">
                Ready to Create Your Own Memories?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Let's discuss how we can capture your special day
              </p>
              <Link
                to="/contact"
                className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Book Your Session
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Portfolio
