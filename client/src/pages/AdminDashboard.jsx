import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaImages, FaVideo, FaBook, FaComments, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import api from '../utils/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [videos, setVideos] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const navigate = useNavigate()

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  // Form states
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'weddings',
    description: '',
    featured: false,
    image: null
  })

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: null,
    published: false
  })

  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'wedding-film',
    videoUrl: '',
    thumbnailUrl: '',
    description: '',
    featured: false,
    thumbnail: null
  })

  const [testimonialForm, setTestimonialForm] = useState({
    coupleName: '',
    rating: 5,
    review: '',
    weddingDate: new Date().toISOString().split('T')[0],
    featured: false
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    // Set axios default header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    loadDashboard()
  }, [navigate])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      
      // Get token and set header
      const token = localStorage.getItem('adminToken')
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }

      const [statsRes, portfolioRes, videosRes, blogsRes, testimonialsRes, contactsRes] = await Promise.all([
        api.get('/admin/dashboard').catch(err => {
          console.error('Stats error:', err)
          return { data: { stats: null } }
        }),
        api.get('/portfolio').catch(err => {
          console.error('Portfolio error:', err)
          return { data: [] }
        }),
        api.get('/videos').catch(err => {
          console.error('Videos error:', err)
          return { data: [] }
        }),
        api.get('/blogs/all').catch(err => {
          console.error('Blogs error:', err)
          return { data: [] }
        }),
        api.get('/testimonials').catch(err => {
          console.error('Testimonials error:', err)
          return { data: [] }
        }),
        api.get('/contact').catch(err => {
          console.error('Contacts error:', err)
          if (err.response?.status === 401) {
            localStorage.removeItem('adminToken')
            navigate('/admin/login')
            return { data: [] }
          }
          return { data: [] }
        })
      ])

      setStats(statsRes.data?.stats || null)
      setPortfolio(portfolioRes.data || [])
      setVideos(videosRes.data || [])
      setBlogs(blogsRes.data || [])
      setTestimonials(testimonialsRes.data || [])
      setContacts(contactsRes.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Dashboard load error:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
      } else {
        showNotification('Failed to load dashboard data', 'error')
      }
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    try {
      await api.delete(`/${type}/${id}`)
      showNotification('Item deleted successfully!', 'success')
      // Reload dashboard data
      await loadDashboard()
    } catch (error) {
      console.error('Delete error:', error)
      showNotification(error.response?.data?.message || 'Failed to delete item', 'error')
    }
  }

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingId(item?._id || null)
    setShowModal(true)
    
    // If editing, populate forms with item data
    if (item) {
      if (type === 'portfolio') {
        setPortfolioForm({
          title: item.title || '',
          category: item.category || 'weddings',
          description: item.description || '',
          featured: item.featured || false,
          image: null
        })
      } else if (type === 'blog') {
        setBlogForm({
          title: item.title || '',
          content: item.content || '',
          excerpt: item.excerpt || '',
          featuredImage: null,
          published: item.published || false
        })
      } else if (type === 'video') {
        setVideoForm({
          title: item.title || '',
          category: item.category || 'wedding-film',
          videoUrl: item.videoUrl || '',
          thumbnailUrl: item.thumbnailUrl || '',
          description: item.description || '',
          featured: item.featured || false,
          thumbnail: null
        })
      } else if (type === 'testimonial') {
        setTestimonialForm({
          coupleName: item.coupleName || '',
          rating: item.rating || 5,
          review: item.review || '',
          weddingDate: item.weddingDate ? new Date(item.weddingDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          featured: item.featured || false
        })
      }
    } else {
      // Reset forms for new item
      if (type === 'portfolio') {
        setPortfolioForm({ title: '', category: 'weddings', description: '', featured: false, image: null })
      } else if (type === 'blog') {
        setBlogForm({ title: '', content: '', excerpt: '', featuredImage: null, published: false })
      } else if (type === 'video') {
        setVideoForm({ title: '', category: 'wedding-film', videoUrl: '', thumbnailUrl: '', description: '', featured: false, thumbnail: null })
      } else if (type === 'testimonial') {
        setTestimonialForm({ coupleName: '', rating: 5, review: '', weddingDate: new Date().toISOString().split('T')[0], featured: false })
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType(null)
    setEditingId(null)
  }

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault()
    
    // Only require image for new items
    if (!editingId && !portfolioForm.image) {
      showNotification('Please select an image', 'error')
      return
    }
    
    setUploading(true)
    try {
      if (editingId) {
        // Update existing item
        const formData = new FormData()
        formData.append('title', portfolioForm.title)
        formData.append('category', portfolioForm.category)
        formData.append('description', portfolioForm.description)
        formData.append('featured', portfolioForm.featured)
        if (portfolioForm.image) {
          formData.append('image', portfolioForm.image)
        }

        await api.put(`/portfolio/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        showNotification('Portfolio item updated successfully!', 'success')
      } else {
        // Create new item
        const formData = new FormData()
        formData.append('title', portfolioForm.title)
        formData.append('category', portfolioForm.category)
        formData.append('description', portfolioForm.description)
        formData.append('featured', portfolioForm.featured)
        formData.append('image', portfolioForm.image)

        await api.post('/portfolio', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        showNotification('Portfolio item added successfully!', 'success')
      }
      
      closeModal()
      // Reset form
      setPortfolioForm({ title: '', category: 'weddings', description: '', featured: false, image: null })
      // Reload dashboard data
      await loadDashboard()
    } catch (error) {
      console.error('Portfolio submit error:', error)
      showNotification(error.response?.data?.message || (editingId ? 'Failed to update portfolio item' : 'Failed to add portfolio item'), 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('title', blogForm.title)
      formData.append('content', blogForm.content)
      formData.append('excerpt', blogForm.excerpt)
      formData.append('published', blogForm.published)
      if (blogForm.featuredImage) {
        formData.append('featuredImage', blogForm.featuredImage)
      }

      if (editingId) {
        await api.put(`/blogs/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        showNotification('Blog updated successfully!', 'success')
      } else {
        await api.post('/blogs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        showNotification('Blog added successfully!', 'success')
      }
      
      closeModal()
      // Reset form
      setBlogForm({ title: '', content: '', excerpt: '', featuredImage: null, published: false })
      // Reload dashboard data
      await loadDashboard()
    } catch (error) {
      console.error('Blog submit error:', error)
      showNotification(error.response?.data?.message || (editingId ? 'Failed to update blog' : 'Failed to add blog'), 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      let thumbnailUrl = videoForm.thumbnailUrl
      
      // If thumbnail file is uploaded, upload it first
      if (videoForm.thumbnail) {
        const thumbnailFormData = new FormData()
        thumbnailFormData.append('image', videoForm.thumbnail)
        const uploadRes = await api.post('/upload/image', thumbnailFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        thumbnailUrl = uploadRes.data.url
      }

      const videoData = {
        title: videoForm.title,
        category: videoForm.category,
        videoUrl: videoForm.videoUrl,
        thumbnailUrl: thumbnailUrl,
        description: videoForm.description,
        featured: videoForm.featured
      }

      if (editingId) {
        await api.put(`/videos/${editingId}`, videoData)
        showNotification('Video updated successfully!', 'success')
      } else {
        await api.post('/videos', videoData)
        showNotification('Video added successfully!', 'success')
      }
      
      closeModal()
      // Reset form
      setVideoForm({ title: '', category: 'wedding-film', videoUrl: '', thumbnailUrl: '', description: '', featured: false, thumbnail: null })
      // Reload dashboard data
      await loadDashboard()
    } catch (error) {
      console.error('Video submit error:', error)
      showNotification(error.response?.data?.message || (editingId ? 'Failed to update video' : 'Failed to add video'), 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, testimonialForm)
        showNotification('Testimonial updated successfully!', 'success')
      } else {
        await api.post('/testimonials', testimonialForm)
        showNotification('Testimonial added successfully!', 'success')
      }
      
      closeModal()
      // Reset form
      setTestimonialForm({ coupleName: '', rating: 5, review: '', weddingDate: new Date().toISOString().split('T')[0], featured: false })
      // Reload dashboard data
      await loadDashboard()
    } catch (error) {
      console.error('Testimonial submit error:', error)
      showNotification(error.response?.data?.message || (editingId ? 'Failed to update testimonial' : 'Failed to add testimonial'), 'error')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-black via-gray-900 to-wedding-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-200">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-wedding-black via-gray-900 to-wedding-black relative">
      {/* Notification Toast */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          <span>{notification.message}</span>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-elegant font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              Manage portfolio, blogs, videos, testimonials and enquiries.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </motion.div>

        {/* Stats */}
        {stats && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur border border-blue-400/30 p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <FaEnvelope className="text-blue-400 text-3xl" />
                {stats.newContacts > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.newContacts}
                  </span>
                )}
              </div>
              <div className="text-4xl font-bold mb-1">{stats.contacts}</div>
              <div className="text-sm text-gray-300">Contacts</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur border border-purple-400/30 p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <FaImages className="text-purple-300 text-3xl mb-3" />
              <div className="text-4xl font-bold mb-1">{stats.portfolio}</div>
              <div className="text-sm text-gray-300">Portfolio</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur border border-red-400/30 p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <FaVideo className="text-red-300 text-3xl mb-3" />
              <div className="text-4xl font-bold mb-1">{stats.videos}</div>
              <div className="text-sm text-gray-300">Videos</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur border border-green-400/30 p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <FaBook className="text-green-300 text-3xl mb-3" />
              <div className="text-4xl font-bold mb-1">{stats.blogs}</div>
              <div className="text-sm text-gray-300">Blogs</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur border border-yellow-400/30 p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <FaComments className="text-yellow-300 text-3xl mb-3" />
              <div className="text-4xl font-bold mb-1">{stats.testimonials}</div>
              <div className="text-sm text-gray-300">Testimonials</div>
            </motion.div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-white/10 overflow-x-auto">
            {['dashboard', 'portfolio', 'videos', 'blogs', 'testimonials', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-wedding-gold text-wedding-gold bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 text-white">
            {/* Dashboard Overview Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Dashboard Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold mb-4 text-wedding-gold">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => openModal('portfolio')}
                        className="w-full bg-wedding-gold/20 hover:bg-wedding-gold/30 text-wedding-gold px-4 py-3 rounded-lg flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <FaImages /> Add Portfolio Item
                        </span>
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => openModal('blog')}
                        className="w-full bg-wedding-gold/20 hover:bg-wedding-gold/30 text-wedding-gold px-4 py-3 rounded-lg flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <FaBook /> Add Blog Post
                        </span>
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => openModal('video')}
                        className="w-full bg-wedding-gold/20 hover:bg-wedding-gold/30 text-wedding-gold px-4 py-3 rounded-lg flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <FaVideo /> Add Video
                        </span>
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => openModal('testimonial')}
                        className="w-full bg-wedding-gold/20 hover:bg-wedding-gold/30 text-wedding-gold px-4 py-3 rounded-lg flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <FaComments /> Add Testimonial
                        </span>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold mb-4 text-wedding-gold">Recent Activity</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                      {contacts.length > 0 && (
                        <div className="flex items-center gap-3">
                          <FaEnvelope className="text-blue-400" />
                          <span>{contacts.length} contact enquiry{contacts.length > 1 ? 'ies' : ''}</span>
                        </div>
                      )}
                      {portfolio.length > 0 && (
                        <div className="flex items-center gap-3">
                          <FaImages className="text-purple-300" />
                          <span>{portfolio.length} portfolio item{portfolio.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {videos.length > 0 && (
                        <div className="flex items-center gap-3">
                          <FaVideo className="text-red-300" />
                          <span>{videos.length} video{videos.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {blogs.length > 0 && (
                        <div className="flex items-center gap-3">
                          <FaBook className="text-green-300" />
                          <span>{blogs.length} blog post{blogs.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {testimonials.length > 0 && (
                        <div className="flex items-center gap-3">
                          <FaComments className="text-yellow-300" />
                          <span>{testimonials.length} testimonial{testimonials.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Portfolio</h2>
                  <button 
                    onClick={() => openModal('portfolio')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 transition-all shadow-lg"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="text-left p-4 text-wedding-gold font-semibold">Title</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Category</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-gray-400">
                            No portfolio items yet. Click "Add New" to create one.
                          </td>
                        </tr>
                      ) : (
                        portfolio.map((item) => (
                          <tr key={item._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-gray-200">{item.title}</td>
                            <td className="p-4 text-gray-300 capitalize">{item.category}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openModal('portfolio', item)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('portfolio', item._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Videos</h2>
                  <button 
                    onClick={() => openModal('video')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 transition-all shadow-lg"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="text-left p-4 text-wedding-gold font-semibold">Title</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Category</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-gray-400">
                            No videos yet. Click "Add New" to create one.
                          </td>
                        </tr>
                      ) : (
                        videos.map((video) => (
                          <tr key={video._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-gray-200">{video.title}</td>
                            <td className="p-4 text-gray-300 capitalize">{video.category}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openModal('video', video)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('videos', video._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Blogs Tab */}
            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Blogs</h2>
                  <button 
                    onClick={() => openModal('blog')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 transition-all shadow-lg"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="text-left p-4 text-wedding-gold font-semibold">Title</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Published</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-gray-400">
                            No blogs yet. Click "Add New" to create one.
                          </td>
                        </tr>
                      ) : (
                        blogs.map((blog) => (
                          <tr key={blog._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-gray-200">{blog.title}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded text-sm font-medium ${
                                blog.published 
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                  : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                              }`}>
                                {blog.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openModal('blog', blog)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('blogs', blog._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Testimonials</h2>
                  <button 
                    onClick={() => openModal('testimonial')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 transition-all shadow-lg"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="text-left p-4 text-wedding-gold font-semibold">Couple Name</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Rating</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-gray-400">
                            No testimonials yet. Click "Add New" to create one.
                          </td>
                        </tr>
                      ) : (
                        testimonials.map((testimonial) => (
                          <tr key={testimonial._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-gray-200">{testimonial.coupleName}</td>
                            <td className="p-4">
                              <span className="text-wedding-gold font-semibold">{testimonial.rating}/5</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => openModal('testimonial', testimonial)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('testimonials', testimonial._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Contact Enquiries</h2>
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="text-left p-4 text-wedding-gold font-semibold">Name</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Email</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Phone</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Event Date</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Status</th>
                        <th className="text-left p-4 text-wedding-gold font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-400">
                            No contact enquiries yet.
                          </td>
                        </tr>
                      ) : (
                        contacts.map((contact) => (
                          <tr key={contact._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-gray-200">{contact.name}</td>
                            <td className="p-4 text-gray-300">{contact.email}</td>
                            <td className="p-4 text-gray-300">{contact.phone}</td>
                            <td className="p-4 text-gray-300">{new Date(contact.eventDate).toLocaleDateString()}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded text-sm font-medium capitalize border ${
                                contact.status === 'new' 
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                                contact.status === 'contacted' 
                                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                contact.status === 'booked' 
                                  ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                                  'bg-gray-500/20 text-gray-300 border-gray-500/30'
                              }`}>
                                {contact.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={async () => {
                                    const newStatus = contact.status === 'new' ? 'contacted' : 
                                                     contact.status === 'contacted' ? 'booked' : 
                                                     contact.status === 'booked' ? 'archived' : 'new'
                                    try {
                                      await api.put(`/contact/${contact._id}`, { status: newStatus })
                                      showNotification('Contact status updated!', 'success')
                                      await loadDashboard()
                                    } catch (error) {
                                      showNotification('Failed to update contact status', 'error')
                                    }
                                  }}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                  title="Update Status"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('contact', contact._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for create forms */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-wedding-black via-gray-900 to-wedding-black rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-elegant font-bold capitalize text-wedding-gold">
                {editingId ? 'Edit' : 'Add'} {modalType}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6">
              {modalType === 'portfolio' && (
                <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Title</label>
                    <input
                      type="text"
                      value={portfolioForm.title}
                      onChange={e =>
                        setPortfolioForm({ ...portfolioForm, title: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter portfolio title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Category</label>
                    <select
                      value={portfolioForm.category}
                      onChange={e =>
                        setPortfolioForm({ ...portfolioForm, category: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                    >
                      <option value="weddings" className="bg-wedding-black">Weddings</option>
                      <option value="pre-wedding" className="bg-wedding-black">Pre-Wedding</option>
                      <option value="engagement" className="bg-wedding-black">Engagement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Description</label>
                    <textarea
                      value={portfolioForm.description}
                      onChange={e =>
                        setPortfolioForm({
                          ...portfolioForm,
                          description: e.target.value
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 h-24 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent resize-none"
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="portfolio-featured"
                      type="checkbox"
                      checked={portfolioForm.featured}
                      onChange={e =>
                        setPortfolioForm({
                          ...portfolioForm,
                          featured: e.target.checked
                        })
                      }
                      className="w-4 h-4 text-wedding-gold bg-white/10 border-white/20 rounded focus:ring-wedding-gold"
                    />
                    <label htmlFor="portfolio-featured" className="text-sm text-gray-300">
                      Featured on home / portfolio
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Image (JPEG/PNG) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        setPortfolioForm({
                          ...portfolioForm,
                          image: e.target.files?.[0] || null
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-wedding-gold/20 file:text-wedding-gold hover:file:bg-wedding-gold/30 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                      required={!editingId}
                    />
                    {portfolioForm.image && (
                      <p className="text-xs text-green-400 mt-1">✓ Image selected: {portfolioForm.image.name}</p>
                    )}
                    {editingId && !portfolioForm.image && (
                      <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full mt-2 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-400 disabled:opacity-60 transition-all shadow-lg"
                  >
                    {uploading ? (editingId ? 'Updating...' : 'Saving...') : (editingId ? 'Update Portfolio' : 'Save Portfolio')}
                  </button>
                </form>
              )}

              {modalType === 'blog' && (
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={e =>
                        setBlogForm({ ...blogForm, title: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter blog title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Excerpt</label>
                    <input
                      type="text"
                      value={blogForm.excerpt}
                      onChange={e =>
                        setBlogForm({ ...blogForm, excerpt: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter excerpt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Content (HTML allowed)</label>
                    <textarea
                      value={blogForm.content}
                      onChange={e =>
                        setBlogForm({ ...blogForm, content: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 h-32 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent resize-none"
                      placeholder="Enter blog content"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="blog-published"
                      type="checkbox"
                      checked={blogForm.published}
                      onChange={e =>
                        setBlogForm({
                          ...blogForm,
                          published: e.target.checked
                        })
                      }
                      className="w-4 h-4 text-wedding-gold bg-white/10 border-white/20 rounded focus:ring-wedding-gold"
                    />
                    <label htmlFor="blog-published" className="text-sm text-gray-300">
                      Published
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Featured Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        setBlogForm({
                          ...blogForm,
                          featuredImage: e.target.files?.[0] || null
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-wedding-gold/20 file:text-wedding-gold hover:file:bg-wedding-gold/30 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full mt-2 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-400 disabled:opacity-60 transition-all shadow-lg"
                  >
                    {uploading ? (editingId ? 'Updating...' : 'Saving...') : (editingId ? 'Update Blog' : 'Save Blog')}
                  </button>
                </form>
              )}

              {modalType === 'video' && (
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Title</label>
                    <input
                      type="text"
                      value={videoForm.title}
                      onChange={e =>
                        setVideoForm({ ...videoForm, title: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter video title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Category</label>
                    <input
                      type="text"
                      value={videoForm.category}
                      onChange={e =>
                        setVideoForm({ ...videoForm, category: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="e.g., wedding-film"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Video URL (YouTube)</label>
                    <input
                      type="text"
                      value={videoForm.videoUrl}
                      onChange={e =>
                        setVideoForm({ ...videoForm, videoUrl: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter YouTube URL"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Thumbnail URL (optional)
                    </label>
                    <input
                      type="text"
                      value={videoForm.thumbnailUrl}
                      onChange={e =>
                        setVideoForm({
                          ...videoForm,
                          thumbnailUrl: e.target.value
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter thumbnail URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Or upload thumbnail
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        setVideoForm({
                          ...videoForm,
                          thumbnail: e.target.files?.[0] || null
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-wedding-gold/20 file:text-wedding-gold hover:file:bg-wedding-gold/30 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Description</label>
                    <textarea
                      value={videoForm.description}
                      onChange={e =>
                        setVideoForm({
                          ...videoForm,
                          description: e.target.value
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 h-24 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent resize-none"
                      placeholder="Enter video description"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="video-featured"
                      type="checkbox"
                      checked={videoForm.featured}
                      onChange={e =>
                        setVideoForm({
                          ...videoForm,
                          featured: e.target.checked
                        })
                      }
                      className="w-4 h-4 text-wedding-gold bg-white/10 border-white/20 rounded focus:ring-wedding-gold"
                    />
                    <label htmlFor="video-featured" className="text-sm text-gray-300">
                      Featured video
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full mt-2 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-400 disabled:opacity-60 transition-all shadow-lg"
                  >
                    {uploading ? (editingId ? 'Updating...' : 'Saving...') : (editingId ? 'Update Video' : 'Save Video')}
                  </button>
                </form>
              )}

              {modalType === 'testimonial' && (
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Couple Name
                    </label>
                    <input
                      type="text"
                      value={testimonialForm.coupleName}
                      onChange={e =>
                        setTestimonialForm({
                          ...testimonialForm,
                          coupleName: e.target.value
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="Enter couple name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Rating (1–5)
                    </label>
                    <select
                      value={testimonialForm.rating}
                      onChange={e =>
                        setTestimonialForm({
                          ...testimonialForm,
                          rating: Number(e.target.value)
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                    >
                      {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r} className="bg-wedding-black">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={testimonialForm.weddingDate}
                      onChange={e =>
                        setTestimonialForm({
                          ...testimonialForm,
                          weddingDate: e.target.value
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">
                      Review
                    </label>
                    <textarea
                      value={testimonialForm.review}
                      onChange={e =>
                        setTestimonialForm({
                          ...testimonialForm,
                          review: e.target.value
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 h-24 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent resize-none"
                      placeholder="Enter review text"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="testimonial-featured"
                      type="checkbox"
                      checked={testimonialForm.featured}
                      onChange={e =>
                        setTestimonialForm({
                          ...testimonialForm,
                          featured: e.target.checked
                        })
                      }
                      className="w-4 h-4 text-wedding-gold bg-white/10 border-white/20 rounded focus:ring-wedding-gold"
                    />
                    <label htmlFor="testimonial-featured" className="text-sm text-gray-300">
                      Show as featured testimonial
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full mt-2 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-400 disabled:opacity-60 transition-all shadow-lg"
                  >
                    {uploading ? (editingId ? 'Updating...' : 'Saving...') : (editingId ? 'Update Testimonial' : 'Save Testimonial')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

