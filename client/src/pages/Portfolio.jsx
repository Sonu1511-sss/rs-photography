import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

const Portfolio = () => {
  const categories = [
    {
      title: 'Weddings',
      description: 'Complete wedding day coverage capturing every precious moment',
      path: '/portfolio/weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
    },
    {
      title: 'Pre-Wedding',
      description: 'Romantic pre-wedding shoots in stunning locations',
      path: '/portfolio/pre-wedding',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800'
    },
    {
      title: 'Engagement',
      description: 'Beautiful engagement ceremonies and celebrations',
      path: '/portfolio/engagement',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-wedding-gold">
            Explore our collection of beautiful wedding moments
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="group relative overflow-hidden rounded-lg shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-elegant font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-200 mb-4">
                    {category.description}
                  </p>
                  <Link
                    to={category.path}
                    className="inline-flex items-center gap-2 bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all w-fit"
                  >
                    View Gallery <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio

