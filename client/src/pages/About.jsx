import { motion } from 'framer-motion'
import { FaAward, FaCamera, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'

const About = () => {
  const stats = [
    { icon: FaCamera, number: '500+', label: 'Weddings Captured' },
    { icon: FaAward, number: '10+', label: 'Years Experience' },
    { icon: FaHeart, number: '1000+', label: 'Happy Couples' },
    { icon: FaMapMarkerAlt, number: '50+', label: 'Cities Covered' }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            About RS Photography
          </h1>
          <p className="text-xl text-wedding-gold">
            Capturing Your Love Story with Elegance and Emotion
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-gradient-to-br from-wedding-black to-wedding-gold rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                  alt="RS Photography"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-elegant font-bold mb-6">
                Welcome to RS Photography
              </h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Based in the beautiful city of Balaghat, Madhya Pradesh, RS Photography 
                specializes in capturing the most precious moments of your special day. 
                With over a decade of experience, we have been privileged to document 
                countless weddings, engagements, and pre-wedding celebrations.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Our approach combines traditional Indian wedding aesthetics with modern 
                cinematic techniques, ensuring that every frame tells a story of love, 
                joy, and celebration. We understand that your wedding day is one of the 
                most important days of your life, and we are committed to preserving 
                these memories with the utmost care and artistry.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                From intimate ceremonies to grand celebrations, we adapt our style to 
                match your vision, creating timeless photographs and films that you'll 
                treasure forever.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-wedding-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="text-wedding-gold text-4xl mb-4 mx-auto" />
                <h3 className="text-4xl font-elegant font-bold mb-2 text-wedding-gold">
                  {stat.number}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gray-50 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-elegant font-bold mb-4 text-wedding-gold">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted and sought-after wedding photography service in 
                Balaghat and surrounding regions, known for our artistic excellence, 
                attention to detail, and commitment to capturing authentic emotions.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-elegant font-bold mb-4 text-wedding-gold">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To create stunning visual narratives that preserve the magic of your 
                wedding day. We strive to blend traditional Indian wedding photography 
                with contemporary techniques, ensuring every moment is captured with 
                elegance and emotion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Focus */}
      <section className="py-20 bg-gradient-to-br from-wedding-black to-wedding-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-elegant font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Serving Balaghat & Nearby Areas
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We proudly serve couples in Balaghat, Madhya Pradesh, and surrounding regions. 
            Our deep understanding of local traditions and customs allows us to capture 
            your wedding in a way that honors your heritage while creating modern, 
            timeless memories.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 text-wedding-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <FaMapMarkerAlt size={24} />
            <span className="text-xl font-semibold">Balaghat, Madhya Pradesh, India</span>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

