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
    <div className="pt-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black text-white">
      {/* Hero Section */}
      <section className="relative h-52 md:h-60 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white overflow-hidden">
         {/* Camera Lens Background Image */}
         <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
            What We Do
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-3">
            Our <span className="text-wedding-gold">Services</span>
          </h1>
          <p className="text-sm md:text-base text-wedding-light-gray max-w-2xl mx-auto">
            Wedding photography, pre-wedding, engagement and cinematic films crafted for beautiful Indian weddings.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
              Wedding Services
            </h2>
            <p className="text-sm md:text-base text-wedding-light-gray max-w-2xl mx-auto">
              Premium photography and cinematography packages designed for Indian weddings, pre-weddings and engagements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-wedding-black/80 border border-wedding-gold/30 rounded-2xl p-8 shadow-xl backdrop-blur-sm hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-wedding-gold/15 border border-wedding-gold/40 flex items-center justify-center shadow-inner">
                    <service.icon size={28} className="text-wedding-gold" />
                  </div>
                  <h3 className="text-2xl font-elegant text-white font-bold">
                  {service.title}
                  </h3>
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-wedding-gold mr-2">✓</span>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10">
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
            className="text-lg md:text-xl mb-8 text-wedding-light-gray"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Contact us today to discuss your wedding photography needs
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-wedding-gold/60 hover:scale-105 transition-all"
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

