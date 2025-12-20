import { motion } from 'framer-motion'
import { FaCamera, FaVideo, FaPlane, FaBook, FaHeart, FaImages } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      icon: FaCamera,
      title: 'Wedding Photography',
      description: 'Complete coverage of your wedding day with professional photography services. We capture every moment from the morning rituals to the evening celebrations.',
      features: [
        'Full day coverage',
        'Multiple photographers',
        'Candid & traditional shots',
        'High-resolution images',
        'Online gallery access'
      ]
    },
    {
      icon: FaImages,
      title: 'Pre-Wedding Shoots',
      description: 'Romantic pre-wedding photo sessions in beautiful locations. Create stunning memories before your big day.',
      features: [
        'Location scouting',
        'Multiple outfit changes',
        'Professional editing',
        'Digital delivery',
        'Album options'
      ]
    },
    {
      icon: FaHeart,
      title: 'Engagement Shoots',
      description: 'Capture the joy and excitement of your engagement ceremony with our professional photography services.',
      features: [
        'Ceremony coverage',
        'Family portraits',
        'Candid moments',
        'Quick turnaround',
        'Social media ready'
      ]
    },
    {
      icon: FaVideo,
      title: 'Wedding Cinematography',
      description: 'Cinematic wedding films that tell your love story. Professional videography with cinematic editing.',
      features: [
        '4K video quality',
        'Highlight reel',
        'Full ceremony video',
        'Drone footage',
        'Music & effects'
      ]
    },
    {
      icon: FaPlane,
      title: 'Drone Coverage',
      description: 'Aerial photography and videography to capture stunning overhead shots of your wedding venue and celebrations.',
      features: [
        'Aerial venue shots',
        'Procession coverage',
        'Group photos',
        '4K quality',
        'Safe & licensed'
      ]
    },
    {
      icon: FaBook,
      title: 'Albums & Prints',
      description: 'Premium wedding albums and prints to preserve your memories in physical form. Custom designed layouts.',
      features: [
        'Custom album design',
        'Premium materials',
        'Various sizes',
        'Print options',
        'Fast delivery'
      ]
    }
  ]

  return (
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
            Our Services
          </h1>
          <p className="text-xl text-wedding-gold">
            Comprehensive wedding photography and videography solutions
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all hover:border-wedding-gold"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-wedding-gold mb-4">
                  <service.icon size={48} />
                </div>
                <h3 className="text-2xl font-elegant font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-wedding-gold mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-wedding-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-elegant font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Book Your Wedding?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Contact us today to discuss your wedding photography needs
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block bg-wedding-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </section>
    </div>
  )
}

export default Services

