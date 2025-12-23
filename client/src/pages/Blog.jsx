import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa'
import api from '../utils/api'
import SEO from '../components/SEO'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await api.get('/blogs')
      const blogData = response.data && response.data.length > 0 ? response.data : getSampleBlogs()
      setBlogs(blogData)
      setError(null)
    } catch (err) {
      console.error('Error fetching blogs:', err)
      // Use sample data if API fails
      setBlogs(getSampleBlogs())
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  const getSampleBlogs = () => {
    return [
      {
        _id: 'sample-blog-1',
        title: '10 Essential Tips for Perfect Wedding Photography',
        slug: '10-essential-tips-for-perfect-wedding-photography',
        content: '<p>Wedding photography is an art that requires skill, patience, and attention to detail. Here are 10 essential tips to ensure your wedding photos are perfect:</p><p>1. Plan ahead and create a shot list</p><p>2. Understand the lighting conditions</p><p>3. Capture candid moments</p><p>4. Focus on emotions and expressions</p><p>5. Use the right equipment</p><p>6. Be prepared for different weather conditions</p><p>7. Communicate with the couple</p><p>8. Capture details and decorations</p><p>9. Take multiple shots of important moments</p><p>10. Edit with care and maintain natural colors</p>',
        author: 'RS Photography',
        featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'sample-blog-2',
        title: 'The Art of Capturing Indian Wedding Traditions',
        slug: 'the-art-of-capturing-indian-wedding-traditions',
        content: '<p>Indian weddings are rich in traditions and rituals. As a wedding photographer, understanding these traditions is crucial for capturing the perfect moments.</p><p>From the vibrant baraat procession to the sacred pheras ceremony, each moment holds deep cultural significance. Learn how to capture these traditions with respect and artistry.</p><p>Key traditions to focus on include: Mehendi ceremony, Sangeet night, Baraat arrival, Pheras, Sindoor daan, and the grand reception.</p>',
        author: 'RS Photography',
        featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: 'sample-blog-3',
        title: 'Pre-Wedding Photography: Creating Timeless Memories',
        slug: 'pre-wedding-photography-creating-timeless-memories',
        content: '<p>Pre-wedding photography sessions are becoming increasingly popular as couples want to capture their love story before the big day.</p><p>These sessions allow couples to be more relaxed and natural, resulting in beautiful, intimate photographs. Choose locations that reflect your personality and style.</p><p>Tips for a successful pre-wedding shoot: Choose the right time of day for natural lighting, select meaningful locations, coordinate outfits, and most importantly, have fun and be yourselves!</p>',
        author: 'RS Photography',
        featuredImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: 'sample-blog-4',
        title: 'Choosing the Right Wedding Photographer: A Complete Guide',
        slug: 'choosing-the-right-wedding-photographer',
        content: '<p>Your wedding photographer plays a crucial role in preserving your special day. Here\'s a complete guide to help you choose the right photographer.</p><p>Consider factors like: Photography style (traditional, candid, cinematic), Experience and portfolio, Budget, Personality and communication, Equipment and backup plans, and Post-wedding services.</p><p>Meet with potential photographers, review their portfolios, and ensure their style matches your vision for your wedding day.</p>',
        author: 'RS Photography',
        featuredImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: 'sample-blog-5',
        title: 'Wedding Videography: Capturing Motion and Emotion',
        slug: 'wedding-videography-capturing-motion-and-emotion',
        content: '<p>Wedding videography adds a dynamic dimension to your wedding memories, capturing not just images but motion, sound, and emotion.</p><p>A well-crafted wedding video tells your story, preserving the laughter, tears, and joy of your special day. Modern wedding videography combines cinematic techniques with documentary-style coverage.</p><p>Key elements of great wedding videos include: Smooth camera movements, Natural audio capture, Emotional storytelling, Beautiful color grading, and Professional editing that highlights the best moments.</p>',
        author: 'RS Photography',
        featuredImage: 'https://images.unsplash.com/photo-1606214174585-fe3155dec0e5?w=800&q=80',
        createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: 'sample-blog-6',
        title: 'Best Locations for Wedding Photography in Madhya Pradesh',
        slug: 'best-locations-for-wedding-photography-in-madhya-pradesh',
        content: '<p>Madhya Pradesh offers stunning locations for wedding photography, from historic palaces to beautiful natural settings.</p><p>Popular locations include: Historic forts and palaces, Beautiful gardens and parks, Riverside locations, Traditional havelis, and Modern wedding venues with elegant architecture.</p><p>Each location offers unique opportunities for creating memorable wedding photographs. Consider the time of day, lighting conditions, and accessibility when choosing your wedding photography location.</p>',
        author: 'RS Photography',
        featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const truncateContent = (html, maxLength = 150) => {
    // Remove HTML tags and get plain text
    const text = html.replace(/<[^>]*>/g, '')
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <>
        <SEO 
          title="Blog - Wedding Photography Tips & Stories"
          description="Read our latest blog posts about wedding photography, tips, stories, and insights from RS Photography."
          keywords="wedding photography blog, photography tips, wedding stories, photography advice, wedding photography guide"
        />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Blog - Wedding Photography Tips & Stories"
          description="Read our latest blog posts about wedding photography, tips, stories, and insights from RS Photography."
          keywords="wedding photography blog, photography tips, wedding stories, photography advice, wedding photography guide"
        />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-wedding-black">Error Loading Blog</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchBlogs}
              className="bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO 
        title="Blog - Wedding Photography Tips & Stories"
        description="Read our latest blog posts about wedding photography, tips, stories, and insights from RS Photography."
        keywords="wedding photography blog, photography tips, wedding stories, photography advice, wedding photography guide"
      />
      <div className="pt-20 bg-wedding-black text-white">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-gradient-to-br from-wedding-black to-yellow-300/20 text-white overflow-hidden">
          {/* Camera Lens Background Image */}
          <div 
            className="absolute  inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ 
              backgroundImage: 'url(https://i.pinimg.com/736x/2e/dc/88/2edc885cae7bca92ace48a0a1a767b67.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(1px)'
            }}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-br from-wedding-black/70 to-wedding-gold/70" /> */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.h1
              className="text-3xl md:text-5xl text-wedding-gold font-elegant font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Blog
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wedding Photography Tips, Stories & Insights
            </motion.p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="relative py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black overflow-hidden">
          {/* DSLR Lens Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10 container mx-auto px-4">
            {blogs.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-elegant font-bold mb-4 text-white">
                  No Blog Posts Yet
                </h2>
                <p className="text-wedding-light-gray text-lg">
                  Check back soon for our latest wedding photography tips and stories!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    className="bg-wedding-black/80 border border-wedding-gold/30 rounded-2xl shadow-xl overflow-hidden hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300 group backdrop-blur-sm"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Featured Image */}
                    {blog.featuredImage && (
                      <Link to={`/blog/${blog.slug}`}>
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={blog.featuredImage.startsWith('http') 
                              ? blog.featuredImage 
                              : `/api${blog.featuredImage}`
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Link>
                    )}

                    {/* Blog Content */}
                    <div className="p-6">
                      <Link to={`/blog/${blog.slug}`}>
                        <h2 className="text-2xl font-elegant font-bold mb-3 text-white hover:text-wedding-gold transition-colors">
                          {blog.title}
                        </h2>
                      </Link>

                      {/* Meta Information */}
                      <div className="flex items-center gap-4 mb-4 text-wedding-light-gray text-xs md:text-sm">
                        {blog.author && (
                          <div className="flex items-center gap-2">
                            <FaUser className="text-wedding-gold" />
                            <span>{blog.author}</span>
                          </div>
                        )}
                        {blog.createdAt && (
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-wedding-gold" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                        )}
                      </div>

                      {/* Excerpt */}
                      {blog.content && (
                        <p className="text-wedding-light-gray mb-4 line-clamp-3 text-sm">
                          {truncateContent(blog.content)}
                        </p>
                      )}

                      {/* Read More Link */}
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-2 text-wedding-gold font-semibold hover:gap-4 transition-all group/link"
                      >
                        Read More
                        <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-wedding-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold">
                Ready to Capture Your Special Day?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Let's discuss how we can make your wedding memories last forever
              </p>
              <Link
                to="/contact"
                className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Book Your Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Blog
