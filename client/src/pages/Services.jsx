import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCamera, FaVideo, FaPlane, FaBook, FaHeart, FaImages, FaStar, FaComment } from 'react-icons/fa'
import SEO from '../components/SEO'
import api from '../utils/api'

const Services = () => {
  const [comments, setComments] = useState({})
  const [showCommentForm, setShowCommentForm] = useState(null)
  const [commentForm, setCommentForm] = useState({
    serviceName: '',
    userName: '',
    userEmail: '',
    comment: '',
    rating: 5
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
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

  useEffect(() => {
    // Load comments for all services
    api.get('/comments')
      .then(res => {
        const commentsByService = {}
        res.data.forEach(comment => {
          if (!commentsByService[comment.serviceName]) {
            commentsByService[comment.serviceName] = []
          }
          commentsByService[comment.serviceName].push(comment)
        })
        setComments(commentsByService)
      })
      .catch(err => console.error('Failed to load comments:', err))
  }, [])

  const handleCommentSubmit = async (e, serviceName) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)

    try {
      await api.post('/comments', {
        ...commentForm,
        serviceName
      })
      setSuccess(true)
      setCommentForm({
        serviceName: '',
        userName: '',
        userEmail: '',
        comment: '',
        rating: 5
      })
      setShowCommentForm(null)
      
      // Reload comments
      const res = await api.get('/comments')
      const commentsByService = {}
      res.data.forEach(comment => {
        if (!commentsByService[comment.serviceName]) {
          commentsByService[comment.serviceName] = []
        }
        commentsByService[comment.serviceName].push(comment)
      })
      setComments(commentsByService)
      
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      toast.error('Failed to submit comment: ' + (error.response?.data?.message || error.message))
    } finally {
      setSubmitting(false)
    }
  }

  const getServiceComments = (serviceName) => {
    return comments[serviceName] || []
  }

  return (
    <>
      <SEO
        title="Services - Wedding Photography & Videography | RS Photography"
        description="Comprehensive wedding photography and videography services in Balaghat and Katangi. Pre-wedding shoots, engagement photography, wedding cinematography, drone coverage, and more."
        keywords="wedding photography services, wedding videography, pre-wedding photography, engagement photography, drone coverage, wedding cinematography balaghat"
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
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-wedding-gold mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Comments Section */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FaComment className="text-wedding-gold" />
                      Comments ({getServiceComments(service.title).length})
                    </h4>
                    <button
                      onClick={() => setShowCommentForm(showCommentForm === service.title ? null : service.title)}
                      className="text-sm text-wedding-gold hover:underline"
                    >
                      {showCommentForm === service.title ? 'Cancel' : 'Add Comment'}
                    </button>
                  </div>

                  {/* Comment Form */}
                  {showCommentForm === service.title && (
                    <form onSubmit={(e) => handleCommentSubmit(e, service.title)} className="mb-4 space-y-3 p-4 bg-gray-50 rounded-lg">
                      {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                          Comment submitted! It will be reviewed before publishing.
                        </div>
                      )}
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={commentForm.userName}
                          onChange={(e) => setCommentForm({ ...commentForm, userName: e.target.value })}
                          required
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email *"
                          value={commentForm.userEmail}
                          onChange={(e) => setCommentForm({ ...commentForm, userEmail: e.target.value })}
                          required
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setCommentForm({ ...commentForm, rating: star })}
                              className="text-2xl"
                            >
                              <FaStar className={star <= commentForm.rating ? 'text-yellow-400' : 'text-gray-300'} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <textarea
                          placeholder="Your Comment *"
                          value={commentForm.comment}
                          onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                          required
                          rows="3"
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg font-semibold hover:bg-wedding-gold/90 disabled:opacity-50 text-sm"
                      >
                        {submitting ? 'Submitting...' : 'Submit Comment'}
                      </button>
                    </form>
                  )}

                  {/* Display Comments */}
                  {getServiceComments(service.title).length > 0 && (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {getServiceComments(service.title).map((comment) => (
                        <div key={comment._id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-sm">{comment.userName}</div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < comment.rating ? 'text-yellow-400' : 'text-gray-300'} size={12} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
    </>
  )
}

export default Services

