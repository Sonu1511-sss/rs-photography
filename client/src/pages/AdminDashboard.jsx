import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaImages, FaVideo, FaBook, FaComments, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaTimes, FaCheck, FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'
import api from '../utils/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [videos, setVideos] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [contacts, setContacts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Form states
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'weddings',
    description: '',
    featured: false,
    image: null,
    imageUrl: ''
  })

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: null,
    featuredImageUrl: '',
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

  const [contactForm, setContactForm] = useState({
    status: 'new'
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    loadDashboard()
  }, [navigate])

  const loadDashboard = async () => {
    setLoading(true)
    setError('')
    try {
      console.log('Loading dashboard data...')
      const token = localStorage.getItem('adminToken')
      if (!token) {
        console.log('No token found, redirecting to login')
        navigate('/admin/login', { replace: true })
        return
      }

      const [statsRes, portfolioRes, videosRes, blogsRes, testimonialsRes, contactsRes, commentsRes] = await Promise.allSettled([
        api.get('/admin/dashboard'),
        api.get('/portfolio'),
        api.get('/videos'),
        api.get('/blogs/all'),
        api.get('/testimonials'),
        api.get('/contact'),
        api.get('/comments/all')
      ])

      // Handle stats
      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data.stats || { contacts: 0, portfolio: 0, videos: 0, blogs: 0, testimonials: 0, comments: 0, newContacts: 0, pendingComments: 0 })
      } else {
        console.warn('Failed to load stats:', statsRes.reason)
        setStats({ contacts: 0, portfolio: 0, videos: 0, blogs: 0, testimonials: 0, comments: 0, newContacts: 0, pendingComments: 0 })
        if (statsRes.reason?.response?.status === 401) {
          localStorage.removeItem('adminToken')
          navigate('/admin/login', { replace: true })
          return
        }
      }

      // Handle other data
      setPortfolio(portfolioRes.status === 'fulfilled' ? (portfolioRes.value.data || []) : [])
      setVideos(videosRes.status === 'fulfilled' ? (videosRes.value.data || []) : [])
      setBlogs(blogsRes.status === 'fulfilled' ? (blogsRes.value.data || []) : [])
      setTestimonials(testimonialsRes.status === 'fulfilled' ? (testimonialsRes.value.data || []) : [])
      setContacts(contactsRes.status === 'fulfilled' ? (contactsRes.value.data || []) : [])
      setComments(commentsRes.status === 'fulfilled' ? (commentsRes.value.data || []) : [])

      console.log('Dashboard data loaded successfully')
    } catch (error) {
      console.error('Dashboard load error:', error)
      setError('Failed to load dashboard data. Some features may not be available.')
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminData')
        navigate('/admin/login', { replace: true })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    navigate('/admin/login')
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return

    try {
      await api.delete(`/${type}/${id}`)
      await loadDashboard()
      toast.success('Item deleted successfully!')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete item: ' + (error.response?.data?.message || error.message))
    }
  }

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingId(item?._id || null)
    setShowModal(true)
    setError('')

    // Reset or populate forms
    if (type === 'portfolio') {
      if (item) {
        setPortfolioForm({
          title: item.title || '',
          category: item.category || 'weddings',
          description: item.description || '',
          featured: item.featured || false,
          image: null,
          imageUrl: item.imageUrl || ''
        })
      } else {
        setPortfolioForm({ title: '', category: 'weddings', description: '', featured: false, image: null, imageUrl: '' })
      }
    } else if (type === 'blog') {
      if (item) {
        setBlogForm({
          title: item.title || '',
          content: item.content || '',
          excerpt: item.excerpt || '',
          featuredImage: null,
          featuredImageUrl: item.featuredImage || '',
          published: item.published || false
        })
      } else {
        setBlogForm({ title: '', content: '', excerpt: '', featuredImage: null, featuredImageUrl: '', published: false })
      }
    } else if (type === 'video') {
      if (item) {
        setVideoForm({
          title: item.title || '',
          category: item.category || 'wedding-film',
          videoUrl: item.videoUrl || '',
          thumbnailUrl: item.thumbnailUrl || '',
          description: item.description || '',
          featured: item.featured || false,
          thumbnail: null
        })
      } else {
        setVideoForm({ title: '', category: 'wedding-film', videoUrl: '', thumbnailUrl: '', description: '', featured: false, thumbnail: null })
      }
    } else if (type === 'testimonial') {
      if (item) {
        setTestimonialForm({
          coupleName: item.coupleName || '',
          rating: item.rating || 5,
          review: item.review || '',
          weddingDate: item.weddingDate ? new Date(item.weddingDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          featured: item.featured || false
        })
      } else {
        setTestimonialForm({ coupleName: '', rating: 5, review: '', weddingDate: new Date().toISOString().split('T')[0], featured: false })
      }
    } else if (type === 'contact') {
      if (item) {
        setContactForm({ status: item.status || 'new' })
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType(null)
    setEditingId(null)
    setError('')
  }

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    
    // Validation
    if (!portfolioForm.title.trim()) {
      setError('Title is required')
      setUploading(false)
      return
    }
    
    try {
      const formData = new FormData()
      formData.append('title', portfolioForm.title.trim())
      formData.append('category', portfolioForm.category)
      formData.append('description', portfolioForm.description || '')
      formData.append('featured', portfolioForm.featured ? 'true' : 'false')
      
      // Handle image: file upload takes priority, then imageUrl
      if (portfolioForm.image) {
        console.log('Uploading image file:', portfolioForm.image.name)
        formData.append('image', portfolioForm.image)
      } else if (portfolioForm.imageUrl && portfolioForm.imageUrl.trim()) {
        console.log('Using image URL:', portfolioForm.imageUrl)
        formData.append('imageUrl', portfolioForm.imageUrl.trim())
      } else if (!editingId) {
        // For new items, image is required
        setError('Please upload an image or provide an image URL')
        setUploading(false)
        return
      }
      // For edit mode, if no image and no imageUrl, keep existing image (don't send anything)

      console.log('Submitting portfolio:', { editingId, title: portfolioForm.title, category: portfolioForm.category })
      
      let response
      if (editingId) {
        console.log('Updating portfolio item:', editingId)
        response = await api.put(`/portfolio/${editingId}`, formData)
      } else {
        console.log('Creating new portfolio item')
        response = await api.post('/portfolio', formData)
      }
      
      console.log('Portfolio saved successfully:', response.data)
      
      // Success - reload dashboard
      closeModal()
      await loadDashboard()
      
      // Show success message
      const successMsg = editingId ? 'Portfolio item updated successfully!' : 'Portfolio item added successfully!'
      toast.success(successMsg)
    } catch (error) {
      console.error('Portfolio submit error:', error)
      console.error('Error response:', error.response)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save portfolio item'
      setError(errorMessage)
      toast.error('Error: ' + errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    
    // Validation
    if (!blogForm.title.trim()) {
      setError('Title is required')
      setUploading(false)
      return
    }
    if (!blogForm.content.trim()) {
      setError('Content is required')
      setUploading(false)
      return
    }
    
    try {
      const formData = new FormData()
      formData.append('title', blogForm.title.trim())
      formData.append('content', blogForm.content.trim())
      formData.append('excerpt', blogForm.excerpt || '')
      formData.append('published', blogForm.published ? 'true' : 'false')
      
      // Handle featured image: file upload takes priority, then imageUrl
      if (blogForm.featuredImage) {
        console.log('Uploading featured image file:', blogForm.featuredImage.name)
        formData.append('featuredImage', blogForm.featuredImage)
      } else if (blogForm.featuredImageUrl && blogForm.featuredImageUrl.trim()) {
        console.log('Using featured image URL:', blogForm.featuredImageUrl)
        formData.append('featuredImageUrl', blogForm.featuredImageUrl.trim())
      }

      console.log('Submitting blog:', { editingId, title: blogForm.title, published: blogForm.published })

      let response
      if (editingId) {
        console.log('Updating blog:', editingId)
        response = await api.put(`/blogs/${editingId}`, formData)
      } else {
        console.log('Creating new blog')
        response = await api.post('/blogs', formData)
      }
      
      console.log('Blog saved successfully:', response.data)
      
      // Success - reload dashboard
      closeModal()
      await loadDashboard()
      
      // Show success message
      const successMsg = editingId ? 'Blog updated successfully!' : 'Blog added successfully!'
      toast.success(successMsg)
    } catch (error) {
      console.error('Blog submit error:', error)
      console.error('Error response:', error.response)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save blog'
      setError(errorMessage)
      toast.error('Error: ' + errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    
    // Validation
    if (!videoForm.title.trim()) {
      setError('Title is required')
      setUploading(false)
      return
    }
    if (!videoForm.videoUrl.trim()) {
      setError('Video URL is required')
      setUploading(false)
      return
    }
    
    try {
      let thumbnailUrl = videoForm.thumbnailUrl || ''
      
      if (videoForm.thumbnail) {
        console.log('Uploading thumbnail file:', videoForm.thumbnail.name)
        const thumbnailFormData = new FormData()
        thumbnailFormData.append('image', videoForm.thumbnail)
        const uploadRes = await api.post('/upload/image', thumbnailFormData)
        thumbnailUrl = uploadRes.data.url
        console.log('Thumbnail uploaded:', thumbnailUrl)
      }

      const videoData = {
        title: videoForm.title.trim(),
        category: videoForm.category,
        videoUrl: videoForm.videoUrl.trim(),
        thumbnailUrl: thumbnailUrl,
        description: videoForm.description || '',
        featured: videoForm.featured
      }

      console.log('Submitting video:', { editingId, ...videoData })

      let response
      if (editingId) {
        console.log('Updating video:', editingId)
        response = await api.put(`/videos/${editingId}`, videoData)
      } else {
        console.log('Creating new video')
        response = await api.post('/videos', videoData)
      }
      
      console.log('Video saved successfully:', response.data)
      
      // Success - reload dashboard
      closeModal()
      await loadDashboard()
      
      // Show success message
      const successMsg = editingId ? 'Video updated successfully!' : 'Video added successfully!'
      toast.success(successMsg)
    } catch (error) {
      console.error('Video submit error:', error)
      console.error('Error response:', error.response)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save video'
      setError(errorMessage)
      toast.error('Error: ' + errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError('')
    
    // Validation
    if (!testimonialForm.coupleName.trim()) {
      setError('Couple name is required')
      setUploading(false)
      return
    }
    if (!testimonialForm.review.trim()) {
      setError('Review is required')
      setUploading(false)
      return
    }
    
    try {
      const testimonialData = {
        coupleName: testimonialForm.coupleName.trim(),
        rating: testimonialForm.rating,
        review: testimonialForm.review.trim(),
        weddingDate: testimonialForm.weddingDate,
        featured: testimonialForm.featured
      }

      console.log('Submitting testimonial:', { editingId, ...testimonialData })

      let response
      if (editingId) {
        console.log('Updating testimonial:', editingId)
        response = await api.put(`/testimonials/${editingId}`, testimonialData)
      } else {
        console.log('Creating new testimonial')
        response = await api.post('/testimonials', testimonialData)
      }
      
      console.log('Testimonial saved successfully:', response.data)
      
      // Success - reload dashboard
      closeModal()
      await loadDashboard()
      
      // Show success message
      const successMsg = editingId ? 'Testimonial updated successfully!' : 'Testimonial added successfully!'
      toast.success(successMsg)
    } catch (error) {
      console.error('Testimonial submit error:', error)
      console.error('Error response:', error.response)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save testimonial'
      setError(errorMessage)
      toast.error('Error: ' + errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleContactStatusUpdate = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status })
      toast.success('Contact status updated!')
      loadDashboard()
    } catch (error) {
      toast.error('Failed to update status: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleCommentApprove = async (id, approved) => {
    try {
      await api.patch(`/comments/${id}/approve`, { approved })
      toast.success(approved ? 'Comment approved!' : 'Comment unapproved!')
      loadDashboard()
    } catch (error) {
      toast.error('Failed to update comment: ' + (error.response?.data?.message || error.message))
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-wedding-black to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-elegant font-bold mb-1">Admin Dashboard</h1>
              <p className="text-gray-300 text-sm">Manage your website content</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-md"
          >
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </motion.div>
        )}

        {/* Stats */}
        {stats ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500"
            >
              <div className="flex items-center justify-between mb-3">
                <FaEnvelope className="text-blue-500 text-2xl" />
                {stats.newContacts > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{stats.newContacts}</span>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-800">{stats.contacts || 0}</div>
              <div className="text-gray-600 text-sm mt-1">Contacts</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-purple-500"
            >
              <FaImages className="text-purple-500 text-2xl mb-3" />
              <div className="text-3xl font-bold text-gray-800">{stats.portfolio || 0}</div>
              <div className="text-gray-600 text-sm mt-1">Portfolio</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-red-500"
            >
              <FaVideo className="text-red-500 text-2xl mb-3" />
              <div className="text-3xl font-bold text-gray-800">{stats.videos || 0}</div>
              <div className="text-gray-600 text-sm mt-1">Videos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-green-500"
            >
              <FaBook className="text-green-500 text-2xl mb-3" />
              <div className="text-3xl font-bold text-gray-800">{stats.blogs || 0}</div>
              <div className="text-gray-600 text-sm mt-1">Blogs</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-yellow-500"
            >
              <FaComments className="text-yellow-500 text-2xl mb-3" />
              <div className="text-3xl font-bold text-gray-800">{stats.testimonials || 0}</div>
              <div className="text-gray-600 text-sm mt-1">Testimonials</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-indigo-500"
            >
              <div className="flex items-center justify-between mb-3">
                <FaComments className="text-indigo-500 text-2xl" />
                {stats.pendingComments > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{stats.pendingComments}</span>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-800">{stats.comments || 0}</div>
              <div className="text-gray-600 text-sm mt-1">Comments</div>
            </motion.div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md mb-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b bg-gray-50 overflow-x-auto">
            {['dashboard', 'portfolio', 'videos', 'blogs', 'testimonials', 'contacts', 'comments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'border-b-3 border-wedding-gold text-wedding-gold bg-white'
                    : 'text-gray-600 hover:text-wedding-black hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-wedding-gold/10 to-wedding-gold/5 p-6 rounded-xl border border-wedding-gold/20">
                    <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                      <FaPlus className="text-wedding-gold" /> Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => openModal('portfolio')} 
                        className="w-full text-left px-5 py-3 bg-white rounded-lg hover:bg-wedding-gold hover:text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <FaImages /> Add Portfolio Item
                      </button>
                      <button 
                        onClick={() => openModal('blog')} 
                        className="w-full text-left px-5 py-3 bg-white rounded-lg hover:bg-wedding-gold hover:text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <FaBook /> Add Blog Post
                      </button>
                      <button 
                        onClick={() => openModal('video')} 
                        className="w-full text-left px-5 py-3 bg-white rounded-lg hover:bg-wedding-gold hover:text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <FaVideo /> Add Video
                      </button>
                      <button 
                        onClick={() => openModal('testimonial')} 
                        className="w-full text-left px-5 py-3 bg-white rounded-lg hover:bg-wedding-gold hover:text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <FaComments /> Add Testimonial
                      </button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Activity</h3>
                    <p className="text-gray-600 mb-4">Check individual tabs for detailed information and manage your content.</p>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Navigate through tabs to view and manage:</p>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>• Portfolio items</li>
                        <li>• Videos and films</li>
                        <li>• Blog posts</li>
                        <li>• Testimonials</li>
                        <li>• Contact enquiries</li>
                        <li>• Service comments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Portfolio Management</h2>
                  <button 
                    onClick={() => openModal('portfolio')}
                    className="bg-wedding-gold text-wedding-black px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 shadow-md hover:shadow-lg transition-all font-semibold"
                  >
                    <FaPlus /> Add New Item
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Featured</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {portfolio.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-gray-500">
                            <FaImages className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p>No portfolio items found</p>
                            <button 
                              onClick={() => openModal('portfolio')}
                              className="mt-4 text-wedding-gold hover:underline"
                            >
                              Add your first portfolio item
                            </button>
                          </td>
                        </tr>
                      ) : (
                        portfolio.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{item.title}</td>
                            <td className="p-4">
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm capitalize">
                                {item.category}
                              </span>
                            </td>
                            <td className="p-4">
                              {item.featured ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                  <FaCheck /> Featured
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => openModal('portfolio', item)} 
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-all"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('portfolio', item._id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                  title="Delete"
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Video Management</h2>
                  <button 
                    onClick={() => openModal('video')}
                    className="bg-wedding-gold text-wedding-black px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 shadow-md hover:shadow-lg transition-all font-semibold"
                  >
                    <FaPlus /> Add New Video
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Featured</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {videos.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-gray-500">
                            <FaVideo className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p>No videos found</p>
                            <button 
                              onClick={() => openModal('video')}
                              className="mt-4 text-wedding-gold hover:underline"
                            >
                              Add your first video
                            </button>
                          </td>
                        </tr>
                      ) : (
                        videos.map((video) => (
                          <tr key={video._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{video.title}</td>
                            <td className="p-4">
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm capitalize">
                                {video.category}
                              </span>
                            </td>
                            <td className="p-4">
                              {video.featured ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                  <FaCheck /> Featured
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => openModal('video', video)} 
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-all"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('videos', video._id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                  title="Delete"
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Blog Management</h2>
                  <button 
                    onClick={() => openModal('blog')}
                    className="bg-wedding-gold text-wedding-black px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 shadow-md hover:shadow-lg transition-all font-semibold"
                  >
                    <FaPlus /> Add New Blog
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {blogs.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-gray-500">
                            <FaBook className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p>No blogs found</p>
                            <button 
                              onClick={() => openModal('blog')}
                              className="mt-4 text-wedding-gold hover:underline"
                            >
                              Add your first blog post
                            </button>
                          </td>
                        </tr>
                      ) : (
                        blogs.map((blog) => (
                          <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                blog.published 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {blog.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => openModal('blog', blog)} 
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-all"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('blogs', blog._id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                  title="Delete"
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Testimonials Management</h2>
                  <button 
                    onClick={() => openModal('testimonial')}
                    className="bg-wedding-gold text-wedding-black px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 shadow-md hover:shadow-lg transition-all font-semibold"
                  >
                    <FaPlus /> Add New Testimonial
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Couple Name</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Rating</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Featured</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {testimonials.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-gray-500">
                            <FaComments className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p>No testimonials found</p>
                            <button 
                              onClick={() => openModal('testimonial')}
                              className="mt-4 text-wedding-gold hover:underline"
                            >
                              Add your first testimonial
                            </button>
                          </td>
                        </tr>
                      ) : (
                        testimonials.map((testimonial) => (
                          <tr key={testimonial._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{testimonial.coupleName}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {testimonial.featured ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                  <FaCheck /> Featured
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => openModal('testimonial', testimonial)} 
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-all"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete('testimonials', testimonial._id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                  title="Delete"
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
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Contact Enquiries</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Phone</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Event Date</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-500">
                            <FaEnvelope className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p>No contact enquiries found</p>
                          </td>
                        </tr>
                      ) : (
                        contacts.map((contact) => (
                          <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{contact.name}</td>
                            <td className="p-4 text-gray-600">{contact.email}</td>
                            <td className="p-4 text-gray-600">{contact.phone}</td>
                            <td className="p-4 text-gray-600">{new Date(contact.eventDate).toLocaleDateString()}</td>
                            <td className="p-4">
                              <select
                                value={contact.status}
                                onChange={(e) => handleContactStatusUpdate(contact._id, e.target.value)}
                                className={`px-3 py-1.5 rounded-lg capitalize text-sm font-medium border-0 shadow-sm focus:ring-2 focus:ring-wedding-gold ${
                                  contact.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                  contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                                  contact.status === 'booked' ? 'bg-green-100 text-green-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="booked">Booked</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleDelete('contact', contact._id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Service Comments</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">Service</th>
                        <th className="text-left p-4 font-semibold text-gray-700">User</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Comment</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Rating</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {comments.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-500">
                            <FaComments className="mx-auto text-4xl text-gray-300 mb-2" />
                            <p>No comments found</p>
                          </td>
                        </tr>
                      ) : (
                        comments.map((comment) => (
                          <tr key={comment._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                {comment.serviceName}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-gray-800">{comment.userName}</div>
                              <div className="text-xs text-gray-500 mt-1">{comment.userEmail}</div>
                            </td>
                            <td className="p-4 max-w-xs">
                              <p className="text-sm text-gray-700 line-clamp-2">{comment.comment}</p>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < comment.rating ? 'text-yellow-400' : 'text-gray-300'} size={14} />
                                ))}
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                comment.approved 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {comment.approved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCommentApprove(comment._id, !comment.approved)}
                                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    comment.approved 
                                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                                  }`}
                                >
                                  {comment.approved ? 'Unapprove' : 'Approve'}
                                </button>
                                <button
                                  onClick={() => handleDelete('comments', comment._id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                  title="Delete"
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

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-gradient-to-r from-wedding-black to-gray-800 text-white p-5 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Edit' : 'Add New'} {modalType === 'portfolio' ? 'Portfolio Item' : 
                modalType === 'blog' ? 'Blog' : 
                modalType === 'video' ? 'Video' : 
                modalType === 'testimonial' ? 'Testimonial' : ''}
              </h2>
              <button 
                onClick={closeModal} 
                className="text-white hover:text-gray-300 hover:bg-white/10 p-2 rounded-lg transition-all"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4"
                >
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </motion.div>
              )}

              {/* Portfolio Modal */}
              {modalType === 'portfolio' && (
                <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Title *</label>
                    <input
                      type="text"
                      value={portfolioForm.title}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      value={portfolioForm.category}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    >
                      <option value="weddings">Weddings</option>
                      <option value="pre-wedding">Pre-Wedding</option>
                      <option value="engagement">Engagement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      value={portfolioForm.description}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Image {!editingId && '*'}</label>
                    {portfolioForm.imageUrl && !portfolioForm.image && (
                      <div className="mb-3">
                        <img src={portfolioForm.imageUrl} alt="Current" className="max-w-xs rounded-lg shadow-md mb-2" />
                        <p className="text-xs text-gray-500">Current image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          setPortfolioForm({ ...portfolioForm, image: file, imageUrl: '' })
                        } else {
                          setPortfolioForm({ ...portfolioForm, image: null })
                        }
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-2">Or enter image URL:</p>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={portfolioForm.imageUrl || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value, image: null })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={portfolioForm.featured}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label>Featured</label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-wedding-gold/90 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
                    >
                      {uploading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Blog Modal */}
              {modalType === 'blog' && (
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Title *</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Excerpt</label>
                    <textarea
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      rows="2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Content *</label>
                    <textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      rows="10"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Featured Image</label>
                    {blogForm.featuredImageUrl && !blogForm.featuredImage && (
                      <div className="mb-3">
                        <img src={blogForm.featuredImageUrl} alt="Current" className="max-w-xs rounded-lg shadow-md mb-2" />
                        <p className="text-xs text-gray-500">Current image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          setBlogForm({ ...blogForm, featuredImage: file, featuredImageUrl: '' })
                        } else {
                          setBlogForm({ ...blogForm, featuredImage: null })
                        }
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-2">Or enter image URL:</p>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={blogForm.featuredImageUrl || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, featuredImageUrl: e.target.value, featuredImage: null })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={blogForm.published}
                      onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                      className="mr-2"
                    />
                    <label>Published</label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-wedding-gold/90 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
                    >
                      {uploading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Video Modal */}
              {modalType === 'video' && (
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Title *</label>
                    <input
                      type="text"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      value={videoForm.category}
                      onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    >
                      <option value="wedding-film">Wedding Film</option>
                      <option value="pre-wedding-film">Pre-Wedding Film</option>
                      <option value="highlight-reel">Highlight Reel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Video URL *</label>
                    <input
                      type="url"
                      value={videoForm.videoUrl}
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      required
                      placeholder="YouTube or Vimeo URL"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Thumbnail</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.files[0] })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                    <input
                      type="url"
                      value={videoForm.thumbnailUrl}
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                      placeholder="Or enter thumbnail URL"
                      className="w-full px-4 py-2 border rounded-lg mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={videoForm.featured}
                      onChange={(e) => setVideoForm({ ...videoForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label>Featured</label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-wedding-gold/90 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
                    >
                      {uploading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Testimonial Modal */}
              {modalType === 'testimonial' && (
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Couple Name *</label>
                    <input
                      type="text"
                      value={testimonialForm.coupleName}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, coupleName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Rating *</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Review *</label>
                    <textarea
                      value={testimonialForm.review}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                      rows="4"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Wedding Date</label>
                    <input
                      type="date"
                      value={testimonialForm.weddingDate}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, weddingDate: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={testimonialForm.featured}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label>Featured</label>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-6 py-3 rounded-lg font-semibold hover:bg-wedding-gold/90 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
                    >
                      {uploading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
