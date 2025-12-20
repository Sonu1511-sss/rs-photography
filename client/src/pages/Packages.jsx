import { motion } from 'framer-motion'
import { FaCheck, FaStar, FaCamera, FaVideo, FaPlane, FaBook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Packages = () => {
  const packages = [
    {
      name: 'Basic',
      price: '₹25,000',
      popular: false,
      icon: FaCamera,
      description: 'Perfect for intimate ceremonies and small gatherings',
      features: [
        '1 Photographer',
        '6 Hours Coverage',
        '200+ Edited Photos',
        'Online Gallery',
        'Digital Delivery',
        'Basic Editing'
      ],
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: 'Standard',
      price: '₹45,000',
      popular: true,
      icon: FaVideo,
      description: 'Most popular choice for complete wedding coverage',
      features: [
        '2 Photographers',
        'Full Day Coverage',
        '500+ Edited Photos',
        'Wedding Cinematography',
        'Highlight Reel (3-5 min)',
        'Online Gallery',
        'Digital Delivery',
        'Professional Editing',
        'Drone Shots (Optional)'
      ],
      color: 'from-wedding-gold to-gold-400'
    },
    {
      name: 'Premium',
      price: '₹75,000',
      popular: false,
      icon: FaStar,
      description: 'Ultimate package with all premium services',
      features: [
        '3 Photographers',
        'Full Day + Pre-Wedding',
        '1000+ Edited Photos',
        '4K Cinematography',
        'Highlight Reel (5-7 min)',
        'Full Ceremony Video',
        'Drone Coverage',
        'Online Gallery',
        'Premium Album (50 pages)',
        'Professional Editing',
        'Same Day Highlights',
        'Social Media Content'
      ],
      color: 'from-wedding-black to-gray-800'
    },
    {
      name: 'Luxury',
      price: '₹1,25,000',
      popular: false,
      icon: FaBook,
      description: 'Complete wedding experience with all services',
      features: [
        '4 Photographers + 2 Videographers',
        'Multi-Day Coverage',
        'Pre-Wedding Shoot',
        'Engagement Shoot',
        '2000+ Edited Photos',
        '4K Cinematography',
        'Multiple Highlight Reels',
        'Full Ceremony Videos',
        'Drone Coverage',
        'Premium Albums (2 copies)',
        'Canvas Prints',
        'Online Gallery',
        'Professional Editing',
        'Same Day Highlights',
        'Social Media Content',
        'Photo Booth Setup'
      ],
      color: 'from-purple-600 to-purple-800'
    }
  ]

  return (
    <>
      <SEO 
        title="Wedding Photography Packages - RS Photography | Pricing"
        description="Choose from our affordable wedding photography packages in Balaghat and Katangi. From basic to luxury packages, we have options for every budget."
        keywords="wedding photography packages, photography pricing, wedding photographer cost, photography packages balaghat, affordable wedding photography"
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
              Our Packages
            </h1>
            <p className="text-xl text-wedding-gold">
              Choose the Perfect Package for Your Special Day
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-20 bg-wedding-black">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl text-white md:text-5xl font-elegant font-bold mb-4">
                Wedding Photography Packages
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                We offer flexible packages to suit every budget and requirement. 
                All packages can be customized according to your needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  className={`relative bg-white rounded-lg shadow-lg overflow-hidden border-2 ${
                    pkg.popular 
                      ? 'border-wedding-gold scale-105 md:scale-110' 
                      : 'border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-wedding-gold text-wedding-black px-4 py-1 text-sm font-bold rounded-bl-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Package Header */}
                  <div className={`bg-gradient-to-br ${pkg.color} text-white p-6 text-center`}>
                    <pkg.icon className="text-4xl mx-auto mb-4" />
                    <h3 className="text-2xl font-elegant font-bold mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-sm text-white/90">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Package Features */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaCheck className="text-wedding-gold mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                        pkg.popular
                          ? 'bg-wedding-gold text-wedding-black hover:bg-gold-400'
                          : 'bg-wedding-black text-white hover:bg-wedding-gold hover:text-wedding-black'
                      }`}
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                Add-On Services
              </h2>
              <p className="text-gray-600 text-lg">
                Enhance your package with these additional services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: FaPlane, title: 'Drone Coverage', price: '₹5,000' },
                { icon: FaBook, title: 'Premium Album', price: '₹8,000' },
                { icon: FaCamera, title: 'Extra Photographer', price: '₹10,000/day' }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <service.icon className="text-wedding-gold text-3xl mb-4" />
                  <h3 className="text-xl font-elegant font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-wedding-gold font-semibold text-lg">
                    {service.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Package Section */}
        <section className="py-20 bg-wedding-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold">
                Need a Custom Package?
              </h2>
              <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Every wedding is unique, and we understand that. Contact us to create 
                a customized package that perfectly fits your needs and budget.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Contact Us for Custom Quote
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
                Package FAQs
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: 'Can I customize a package?',
                  a: 'Yes, absolutely! All our packages can be customized according to your specific needs. Contact us to discuss your requirements.'
                },
                {
                  q: 'What is included in the price?',
                  a: 'All packages include professional photography/videography, editing, and digital delivery. Premium packages include physical albums and prints.'
                },
                {
                  q: 'Do you require a deposit?',
                  a: 'Yes, we require a 50% advance payment to confirm your booking. The remaining amount can be paid on or before the event date.'
                },
                {
                  q: 'What if I need to cancel?',
                  a: 'Cancellations made 30 days before the event will receive a 50% refund. Cancellations made less than 30 days before are non-refundable.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-elegant font-bold mb-2 text-wedding-black">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Packages
