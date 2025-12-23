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
      <div className="pt-20 bg-wedding-black text-white">
        {/* Hero Section */}
        <section className="relative h-52 md:h-60 flex items-center justify-center text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.pinimg.com/736x/2e/dc/88/2edc885cae7bca92ace48a0a1a767b67.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/85 to-wedding-gold/35" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center px-4">
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
              Pricing &amp; Plans
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-3">
              Our <span className="text-wedding-gold">Packages</span>
            </h1>
            <p className="text-sm md:text-base text-wedding-light-gray max-w-2xl mx-auto">
              Choose from curated wedding, pre-wedding and engagement packages designed for every style and budget.
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
                Wedding Photography Packages
              </h2>
              <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
                Thoughtfully crafted collections for every celebration – from intimate gatherings to grand weddings.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  className={`relative bg-wedding-black/80 border border-wedding-gold/30 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-wedding-gold/60 hover:-translate-y-2 ${
                    pkg.popular ? 'ring-2 ring-wedding-gold/50 scale-105 md:scale-110' : ''
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
                  <div className="p-6 bg-wedding-black/90">
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaCheck className="text-wedding-gold mr-2 mt-1 flex-shrink-0" />
                          <span className="text-wedding-light-gray text-sm">{feature}</span>
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
        <section className="py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
                Upgrade Your Experience
              </p>
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
                Add-On Services
              </h2>
              <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
                Flexible extras you can attach to any package for even more cinematic coverage and premium deliverables.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: FaPlane, title: 'Drone Coverage', price: '₹5,000', note: 'Aerial venue & procession shots' },
                { icon: FaBook, title: 'Premium Album', price: '₹8,000', note: 'Custom designed luxury album' },
                { icon: FaCamera, title: 'Extra Photographer', price: '₹10,000/day', note: 'Additional candid coverage' }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="relative bg-wedding-black/80 border border-wedding-gold/30 rounded-2xl p-6 md:p-7 shadow-xl backdrop-blur-sm overflow-hidden hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/10 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-wedding-gold/20 border border-wedding-gold/50 flex items-center justify-center">
                          <service.icon className="text-wedding-gold text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-elegant font-bold">
                          {service.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-wedding-gold font-semibold text-base md:text-lg">
                          {service.price}
                        </p>
                        <p className="text-[11px] md:text-xs text-wedding-light-gray/80">
                          Per event add-on
                        </p>
                      </div>
                    </div>
                    <p className="text-wedding-light-gray text-sm md:text-base">
                      {service.note}
                    </p>
                  </div>
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
        <section className="py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
                Questions About Pricing
              </p>
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
                Package FAQs
              </h2>
              <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
                Clear answers to the most common questions couples ask us about booking and payments.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
              {[
                {
                  q: 'Can I customize a package?',
                  a: 'Yes, absolutely! All our packages can be customized according to your specific needs. Contact us to discuss your requirements.'
                },
                {
                  q: 'What is included in the price?',
                  a: 'All packages include professional photography/videography, editing, and digital delivery. Premium packages can include albums and prints based on your selection.'
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
                  className="bg-wedding-black/80 border border-wedding-gold/25 p-5 md:p-6 rounded-2xl shadow-lg backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg md:text-xl font-elegant font-bold mb-2 text-white">
                    {faq.q}
                  </h3>
                  <p className="text-wedding-light-gray text-sm md:text-base">
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
