import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaAward, FaCamera, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import SEO from '../components/SEO'
import raju from './images/raju.png'
const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const startValue = 0
    const endValue = parseInt(target)

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
      
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    animate()
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const About = () => {
  const stats = [
    { icon: FaCamera, number: 500, suffix: '+', label: 'Weddings Captured' },
    { icon: FaAward, number: 10, suffix: '+', label: 'Years Experience' },
    { icon: FaHeart, number: 1000, suffix: '+', label: 'Happy Couples' },
    { icon: FaMapMarkerAlt, number: 50, suffix: '+', label: 'Cities Covered' }
  ]

  return (
    <>
      <SEO 
        title="About Us - RS Photography | Best Wedding Photographer in Balaghat & Katangi"
        description="RS Photography - Professional wedding photography service in Balaghat and Katangi (Kattangi), Madhya Pradesh with over 10 years of experience in Indian wedding photography."
        keywords="rs photography, wedding photographer, photographer balaghat, photographer katangi, photographer kattangi"
      />
      <div className="pt-20">
      {/* About Us Section with Grid Background */}
      <section className="relative min-h-screen bg-wedding-black text-white overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-2 p-4 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-sm overflow-hidden"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-${1516035069371 + i}?w=400&q=80)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Heading */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-elegant font-bold text-white">
                ABOUT US
              </h1>

              {/* Stats/Tags */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-white text-lg font-medium">10+</span>
                <span className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                  Experience
                </span>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-lg font-medium">500+</span>
                  <FaCamera className="text-red-700" />
                  <span className="text-sm">Weddings</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6 text-white/90 text-lg leading-relaxed">
                <p>
                  With over 10 years of wedding photography experience and countless happy couples, 
                  we bring an extremely unique experience to our clients. Specializing in Indian 
                  wedding photography, we understand the cultural significance and emotional depth 
                  of every moment.
                </p>
                <p>
                  Evoking emotion through photography is our greatest passion. We provide our clients 
                  a mix of cinematic shots, compelling storytelling, and current photography trends 
                  that make our style stand out and is completely original. Every frame we capture 
                  tells a story of love, joy, and celebration.
                </p>
              </div>

              {/* CTA Button */}
              <motion.a
                href="#vision"
                className="inline-block bg-red-700 hover:bg-wedding-gold hover:text-black text-white px-8 py-4 rounded-md font-semibold transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                READ MORE
              </motion.a>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-20"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
                <div className="aspect-[4/5] relative">
                  <img
                    src={raju}
                    alt="RS Photography Team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wedding-black/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-wedding-black via-gray-900 to-wedding-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4 text-wedding-gold">
              Our Achievements
            </h2>
            <p className="text-gray-400 text-lg">
              Numbers that speak for our dedication and excellence
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 hover:border-wedding-gold/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-wedding-gold/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-wedding-gold text-3xl" />
                </div>
                <h3 className="text-5xl md:text-6xl font-elegant font-bold mb-2 text-wedding-gold">
                  <Counter target={stat.number} suffix={stat.suffix} duration={2000} />
                </h3>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-20 bg-wedding-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4 text-white">
              Our Vision & Mission
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Committed to excellence in every frame we capture
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-wedding-gold p-3 rounded-lg">
                  <FaAward className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl font-elegant font-bold text-wedding-gold">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                To be the most trusted and sought-after wedding photography service in 
                Balaghat and surrounding regions, known for our artistic excellence, 
                attention to detail, and commitment to capturing authentic emotions.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-wedding-gold p-3 rounded-lg">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl font-elegant font-bold text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
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
      <section className="relative py-20 bg-gradient-to-br text-white overflow-hidden">
        {/* Camera Lens Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-wedding-black/70 to-wedding-gold/70" /> */}
        <div className="relative z-10 container mx-auto px-4 text-center">
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
            RS Photography proudly serves couples in Balaghat, Katangi (Kattangi), Madhya Pradesh, and surrounding regions. 
            Our deep understanding of local traditions and customs allows us to capture 
            your wedding in a way that honors your heritage while creating modern, 
            timeless memories. RS Photography is your trusted wedding photographer in Balaghat and Katangi.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 text-wedding-gold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <FaMapMarkerAlt size={24} />
            <span className="text-xl font-semibold">RS Photography, Sukdighat Post, Miragpur, Jila Balaghat, Madhya Pradesh, India</span>
          </motion.div>
          
          
        </div>
      </section>
    </div>
    </>
  )
}

export default About
