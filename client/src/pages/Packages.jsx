import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa'

const Packages = () => {
  const packages = [
    {
      name: 'Silver',
      price: '₹50,000',
      description: 'Perfect for intimate weddings',
      hours: '8 hours',
      deliverables: [
        '1 Photographer',
        '400+ Edited Photos',
        'Online Gallery',
        'USB Drive',
        'Basic Editing'
      ],
      notIncluded: [
        'Videography',
        'Drone Coverage',
        'Album',
        'Pre-Wedding Shoot'
      ],
      popular: false
    },
    {
      name: 'Gold',
      price: '₹85,000',
      description: 'Most popular choice',
      hours: '12 hours',
      deliverables: [
        '2 Photographers',
        '800+ Edited Photos',
        'Online Gallery',
        'USB Drive',
        'Premium Editing',
        '50 Print Photos',
        'Pre-Wedding Shoot (2 hours)'
      ],
      notIncluded: [
        'Videography',
        'Drone Coverage',
        'Album'
      ],
      popular: true
    },
    {
      name: 'Platinum',
      price: '₹1,50,000',
      description: 'Complete wedding coverage',
      hours: 'Full Day',
      deliverables: [
        '2 Photographers + 1 Videographer',
        '1200+ Edited Photos',
        'Wedding Film (10-15 min)',
        'Full Ceremony Video',
        'Drone Coverage',
        'Online Gallery',
        'USB Drive',
        'Premium Album',
        'Pre-Wedding Shoot (4 hours)',
        'Engagement Coverage'
      ],
      notIncluded: [],
      popular: false
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            Our Packages
          </h1>
          <p className="text-xl text-wedding-gold">
            Choose the perfect package for your special day
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-colors duration-300 ${
                  pkg.popular ? 'border-4 border-wedding-gold scale-105' : 'border border-gray-200 dark:border-gray-700'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-wedding-gold text-wedding-black px-4 py-1 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-3xl font-elegant font-bold mb-2 dark:text-white">{pkg.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-wedding-gold">{pkg.price}</span>
                    <span className="text-gray-600 ml-2">Starting from</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-lg font-semibold">Coverage: </span>
                    <span className="text-gray-700">{pkg.hours}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-wedding-black">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaCheck className="text-wedding-gold mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pkg.notIncluded.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-500">Not Included:</h4>
                      <ul className="space-y-2">
                        {pkg.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <FaTimes className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-500 dark:text-gray-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-wedding-gold text-wedding-black hover:bg-gold-400'
                        : 'bg-wedding-black text-white hover:bg-wedding-gold hover:text-wedding-black'
                    }`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            <strong>Note:</strong> All packages can be customized according to your needs. 
            Contact us for a personalized quote. Prices may vary based on location, date, and additional requirements.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Packages

