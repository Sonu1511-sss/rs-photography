import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'
import SEO from '../components/SEO'

const PortfolioEngagement = () => {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/portfolio?category=engagement')
      .then(res => {
        setPortfolio(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <SEO 
        title="Engagement Photography Gallery - RS Photography"
        description="Browse our engagement photography gallery featuring beautiful engagement ceremonies captured by RS Photography."
        keywords="engagement photography, engagement photos, engagement ceremony, engagement gallery"
      />
      <div className="pt-20 bg-wedding-black text-white">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/90 to-wedding-gold/20" />
          <div className="absolute inset-0 bg-wedding-black/65" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
              Engagement Gallery
            </h1>
            <p className="text-xl text-wedding-gold">
              Celebrating Your Commitment
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-gradient-to-b from-wedding-black via-[#0b0b0f] to-wedding-black">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
                <p className="text-wedding-light-gray">Loading gallery...</p>
              </div>
            ) : portfolio.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-elegant font-bold mb-4 text-wedding-charcoal">
                  No Photos Yet
                </h2>
                <p className="text-wedding-light-gray text-lg">
                  Check back soon for our engagement photography gallery!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="relative group overflow-hidden rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
      </div>
    </>
  )
}

export default PortfolioEngagement
