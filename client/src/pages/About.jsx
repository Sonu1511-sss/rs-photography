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
      <div className="pt-16">
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

        <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left max-w-xl"
            >
              {/* Heading */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-wedding-black/70 border border-wedding-gold/40 px-4 py-1 text-[11px] md:text-xs uppercase tracking-[0.25em] text-wedding-light-gray">
                  RS Photography • Since 2014
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-white leading-tight">
                  About <span className="text-wedding-gold">US</span>
                </h1>
               
              </div>

              {/* Stats/Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="text-wedding-gold text-2xl font-bold">10+</span>
                <span className="bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-4 py-2 rounded-md text-sm font-semibold shadow-md">
                  Years Experience
                </span>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-wedding-gold text-2xl font-bold">500+</span>
                  <FaCamera className="text-wedding-gold" />
                  <span className="text-sm text-wedding-light-gray">Weddings</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6 text-wedding-light-gray text-lg leading-relaxed">
                <p>
                  With over <span className="text-wedding-gold font-semibold">10 years</span> of wedding photography experience and countless happy couples, 
                  we bring an extremely unique experience to our clients. Specializing in <span className="text-wedding-gold font-semibold">Indian 
                  wedding photography</span>, we understand the cultural significance and emotional depth 
                  of every moment.
                </p>
                <p>
                  Evoking emotion through photography is our greatest passion. We provide our clients 
                  a mix of <span className="text-wedding-gold font-semibold">cinematic shots</span>, compelling storytelling, and current photography trends 
                  that make our style stand out and is completely original. Every frame we capture 
                  tells a story of <span className="text-wedding-gold font-semibold">love, joy, and celebration</span>.
                </p>
              </div>

              {/* CTA Button */}
              <motion.a
                href="#vision"
                className="inline-block bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-wedding-gold/50"
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
              <div className="relative rounded-2xl -mt-10 md:-mt-16 overflow-hidden shadow-2xl max-w-md mx-auto">
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
      <section className="py-20 bg-wedding-black text-white">
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
            <p className="text-wedding-light-gray text-lg">
              Numbers that speak for our dedication and excellence
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-wedding-black/80 backdrop-blur-sm p-6 rounded-xl border-2 border-wedding-gold/30 hover:bg-wedding-black/90 hover:border-wedding-gold transition-all duration-300 shadow-lg"
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
                <p className="text-wedding-light-gray font-medium">{stat.label}</p>
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
            <p className="text-wedding-light-gray text-lg max-w-2xl mx-auto">
              Committed to excellence in every frame we capture
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-wedding-black/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 border-wedding-gold/30 hover:border-wedding-gold hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-wedding-gold to-wedding-soft-gold p-3 rounded-lg shadow-md">
                  <FaAward className="text-wedding-black text-2xl" />
                </div>
                <h3 className="text-3xl font-elegant font-bold text-wedding-gold">
                  Our Vision
                </h3>
              </div>
              <p className="text-wedding-light-gray leading-relaxed text-lg">
                To be the most trusted and sought-after wedding photography service in 
                Balaghat and surrounding regions, known for our <span className="text-wedding-gold font-semibold">artistic excellence</span>, 
                attention to detail, and commitment to capturing <span className="text-wedding-gold font-semibold">authentic emotions</span>.
              </p>
            </motion.div>
            <motion.div
              className="bg-wedding-black/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 border-wedding-gold/30 hover:border-wedding-gold hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-wedding-gold to-wedding-soft-gold p-3 rounded-lg shadow-md">
                  <FaHeart className="text-wedding-black text-2xl" />
                </div>
                <h3 className="text-3xl font-elegant font-bold text-wedding-gold">
                  Our Mission
                </h3>
              </div>
              <p className="text-wedding-light-gray leading-relaxed text-lg">
                To create stunning visual narratives that preserve the <span className="text-wedding-gold font-semibold">magic of your 
                wedding day</span>. We strive to blend traditional Indian wedding photography 
                with contemporary techniques, ensuring every moment is captured with 
                <span className="text-wedding-gold font-semibold"> elegance and emotion</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Focus */}
      <section className="relative py-20 bg-wedding-black text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/90 to-wedding-gold/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Serving Balaghat & Nearby Areas
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto text-wedding-light-gray"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            RS Photography proudly serves couples in <span className="text-wedding-gold font-semibold">Balaghat, Katangi (Kattangi), Madhya Pradesh</span>, and surrounding regions. 
            Our deep understanding of local traditions and customs allows us to capture 
            your wedding in a way that honors your heritage while creating modern, 
            timeless memories. RS Photography is your trusted wedding photographer in Balaghat and Katangi.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-3 text-wedding-gold mb-8 bg-wedding-black/60 backdrop-blur-sm px-6 py-4 rounded-lg border border-wedding-gold/30 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <FaMapMarkerAlt size={24} className="text-wedding-gold" />
            <span className="text-lg md:text-xl font-semibold text-center">RS Photography, Sukdighat Post, Miragpur, Jila Balaghat, Madhya Pradesh, India</span>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}

export default About
