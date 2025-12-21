import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaImages, FaVideo, FaBook, FaComments, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
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
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null) // Track which item is being edited
  const navigate = useNavigate()

  // Form states
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'weddings',
    description: '',
    featured: false,
    image: null,
    imageUrl: '' // For existing image when editing
  })

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: null,
    featuredImageUrl: '', // For existing image when editing
    published: false
  })

  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'wedding-film',
    videoUrl: '',
    thumbnailUrl: '',
    description: '',
    featured: false,
    thumbnail: null,
    videoFile: null
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
    const adminData = localStorage.getItem('adminData')
    
    console.log('AdminDashboard mounted')
    console.log('Token:', token)
    console.log('AdminData:', adminData)
    
    if (!token || !adminData) {
      console.log('No token or adminData found, redirecting to login')
      navigate('/admin/login', { replace: true })
      return
    }

    // Verify admin data
    try {
      const admin = JSON.parse(adminData)
      if (admin.email !== 'rsphotography0@gmail.com') {
        console.log('Invalid admin email, redirecting to login')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminData')
        navigate('/admin/login', { replace: true })
        return
      }
    } catch (error) {
      console.log('Error parsing adminData:', error)
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      navigate('/admin/login', { replace: true })
      return
    }

    // Set axios default header
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
    // Load dashboard data (with error handling for API failures)
    loadDashboard()
  }, [navigate])

  const loadDashboard = async () => {
    try {
      console.log('Loading dashboard data...')
      
      // Try to load data, but don't fail if API is not available (for static credentials)
      try {
        const [statsRes, portfolioRes, videosRes, blogsRes, testimonialsRes, contactsRes] = await Promise.all([
          api.get('/admin/dashboard').catch(() => ({ data: { stats: { contacts: 0, portfolio: 0, videos: 0, blogs: 0, testimonials: 0, newContacts: 0 } } })),
          api.get('/portfolio').catch(() => ({ data: [] })),
          api.get('/videos').catch(() => ({ data: [] })),
          api.get('/blogs/all').catch(() => ({ data: [] })),
          api.get('/testimonials').catch(() => ({ data: [] })),
          api.get('/contact').catch(() => ({ data: [] }))
        ])

        setStats(statsRes.data.stats || { contacts: 0, portfolio: 0, videos: 0, blogs: 0, testimonials: 0, newContacts: 0 })
        setPortfolio(portfolioRes.data || [])
        setVideos(videosRes.data || [])
        setBlogs(blogsRes.data || [])
        setTestimonials(testimonialsRes.data || [])
        setContacts(contactsRes.data || [])
      } catch (apiError) {
        console.log('API Error (non-critical):', apiError)
        // Set empty data if API fails
        setStats({ contacts: 0, portfolio: 0, videos: 0, blogs: 0, testimonials: 0, newContacts: 0 })
        setPortfolio([])
        setVideos([])
        setBlogs([])
        setTestimonials([])
        setContacts([])
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard:', error)
      // NOTE: We don't auto-logout on API errors because we're using static credentials
      // The user should only be logged out when they explicitly click the logout button
      // Even if API fails (401, 500, etc.), show the dashboard with empty data
      setStats({ contacts: 0, portfolio: 0, videos: 0, blogs: 0, testimonials: 0, newContacts: 0 })
      setPortfolio([])
      setVideos([])
      setBlogs([])
      setTestimonials([])
      setContacts([])
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Only logout when user explicitly clicks logout button
    console.log('User clicked logout button')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    // Show logout message
    toast.success('Logged out successfully', {
      position: 'top-right',
      autoClose: 2000,
    })
    navigate('/admin/login', { replace: true })
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return

    try {
      await api.delete(`/${type}/${id}`)
      toast.success('Item deleted successfully!', {
        position: 'top-right',
        autoClose: 2000,
      })
      loadDashboard()
    } catch (error) {
      // Don't auto-logout on delete errors - just show error message
      console.error('Delete error:', error)
      toast.error('Failed to delete item: ' + (error.response?.data?.message || error.message), {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  const openModal = (type, item = null) => {
    setModalType(type)
    setShowModal(true)
    setEditingId(item?._id || null)
    
    // If editing, populate form with item data
    if (item) {
      if (type === 'portfolio') {
        setPortfolioForm({
          title: item.title || '',
          category: item.category || 'weddings',
          description: item.description || '',
          featured: item.featured || false,
          image: null, // Don't pre-fill image
          imageUrl: item.imageUrl || '' // Store existing image URL
        })
      } else if (type === 'blog') {
        setBlogForm({
          title: item.title || '',
          content: item.content || '',
          excerpt: item.excerpt || '',
          featuredImage: null,
          featuredImageUrl: item.featuredImage || '',
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
          thumbnail: null,
          videoFile: null
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
        setPortfolioForm({ title: '', category: 'weddings', description: '', featured: false, image: null, imageUrl: '' })
      } else if (type === 'blog') {
        setBlogForm({ title: '', content: '', excerpt: '', featuredImage: null, featuredImageUrl: '', published: false })
      } else if (type === 'video') {
        setVideoForm({ title: '', category: 'wedding-film', videoUrl: '', thumbnailUrl: '', description: '', featured: false, thumbnail: null, videoFile: null })
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
    setUploading(true)
    try {
      // Validate required fields
      if (!portfolioForm.title) {
        toast.error('Please enter a title', { position: 'top-right' })
        setUploading(false)
        return
      }
      
      // For new items, image is required. For editing, image is optional
      if (!editingId && !portfolioForm.image) {
        toast.error('Please select an image', { position: 'top-right' })
        setUploading(false)
        return
      }

      const formData = new FormData()
      formData.append('title', portfolioForm.title)
      formData.append('category', portfolioForm.category)
      formData.append('description', portfolioForm.description || '')
      formData.append('featured', portfolioForm.featured)
      
      // Only append image if a new one is selected
      if (portfolioForm.image) {
        formData.append('image', portfolioForm.image)
      }

      console.log(editingId ? 'Updating' : 'Uploading', 'portfolio item:', {
        id: editingId,
        title: portfolioForm.title,
        category: portfolioForm.category,
        imageName: portfolioForm.image?.name
      })

      let response
      if (editingId) {
        // Update existing item
        response = await api.put(`/portfolio/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Portfolio item updated successfully!', {
          position: 'top-right',
          autoClose: 2000,
        })
      } else {
        // Create new item
        response = await api.post('/portfolio', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Portfolio item added successfully!', {
          position: 'top-right',
          autoClose: 2000,
        })
      }
      
      console.log('Response:', response.data)
      
      // Reset form
      setPortfolioForm({ title: '', category: 'weddings', description: '', featured: false, image: null, imageUrl: '' })
      closeModal()
      loadDashboard()
    } catch (error) {
      console.error('Error:', error)
      console.error('Error response:', error.response?.data)
      toast.error(`Failed to ${editingId ? 'update' : 'add'} portfolio item: ` + (error.response?.data?.message || error.message || 'Unknown error'), {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      if (!blogForm.title || !blogForm.content) {
        toast.error('Please fill in title and content', { position: 'top-right' })
        setUploading(false)
        return
      }

      const formData = new FormData()
      formData.append('title', blogForm.title)
      formData.append('content', blogForm.content)
      formData.append('excerpt', blogForm.excerpt || '')
      formData.append('published', blogForm.published)
      if (blogForm.featuredImage) {
        formData.append('featuredImage', blogForm.featuredImage)
      }

      let response
      if (editingId) {
        response = await api.put(`/blogs/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Blog updated successfully!', { position: 'top-right', autoClose: 2000 })
      } else {
        response = await api.post('/blogs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Blog added successfully!', { position: 'top-right', autoClose: 2000 })
      }
      
      setBlogForm({ title: '', content: '', excerpt: '', featuredImage: null, featuredImageUrl: '', published: false })
      closeModal()
      loadDashboard()
    } catch (error) {
      toast.error(`Failed to ${editingId ? 'update' : 'add'} blog: ` + (error.response?.data?.message || error.message), {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      let videoUrl = videoForm.videoUrl
      let thumbnailUrl = videoForm.thumbnailUrl
      
      // If video file is uploaded, upload it first
      if (videoForm.videoFile) {
        const videoFormData = new FormData()
        videoFormData.append('video', videoForm.videoFile)
        const uploadRes = await api.post('/upload/video', videoFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        videoUrl = uploadRes.data.url
      }
      
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

      // If neither video URL nor video file is provided (and not editing), show error
      if (!editingId && !videoUrl && !videoForm.videoFile) {
        toast.error('Please provide either a video URL or upload a video file', { position: 'top-right' })
        setUploading(false)
        return
      }

      if (!videoForm.title) {
        toast.error('Please enter a title', { position: 'top-right' })
        setUploading(false)
        return
      }

      const videoData = {
        title: videoForm.title,
        category: videoForm.category,
        videoUrl: videoUrl || videoForm.videoUrl, // Use existing URL if no new upload
        thumbnailUrl: thumbnailUrl || videoForm.thumbnailUrl, // Use existing thumbnail if no new upload
        description: videoForm.description || '',
        featured: videoForm.featured
      }

      let response
      if (editingId) {
        response = await api.put(`/videos/${editingId}`, videoData)
        toast.success('Video updated successfully!', { position: 'top-right', autoClose: 2000 })
      } else {
        response = await api.post('/videos', videoData)
        toast.success('Video added successfully!', { position: 'top-right', autoClose: 2000 })
      }
      
      setVideoForm({ title: '', category: 'wedding-film', videoUrl: '', thumbnailUrl: '', description: '', featured: false, thumbnail: null, videoFile: null })
      closeModal()
      loadDashboard()
    } catch (error) {
      toast.error(`Failed to ${editingId ? 'update' : 'add'} video: ` + (error.response?.data?.message || error.message), {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      if (!testimonialForm.coupleName || !testimonialForm.review) {
        toast.error('Please fill in couple name and review', { position: 'top-right' })
        setUploading(false)
        return
      }

      let response
      if (editingId) {
        response = await api.put(`/testimonials/${editingId}`, testimonialForm)
        toast.success('Testimonial updated successfully!', { position: 'top-right', autoClose: 2000 })
      } else {
        response = await api.post('/testimonials', testimonialForm)
        toast.success('Testimonial added successfully!', { position: 'top-right', autoClose: 2000 })
      }
      
      setTestimonialForm({ coupleName: '', rating: 5, review: '', weddingDate: new Date().toISOString().split('T')[0], featured: false })
      closeModal()
      loadDashboard()
    } catch (error) {
      toast.error(`Failed to ${editingId ? 'update' : 'add'} testimonial: ` + (error.response?.data?.message || error.message), {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-elegant font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg hover:bg-wedding-gold/90 font-semibold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <FaEnvelope className="text-blue-500 text-2xl mb-2" />
              <div className="text-3xl font-bold text-gray-900">{stats.contacts}</div>
              <div className="text-gray-600">Contacts</div>
              {stats.newContacts > 0 && (
                <div className="text-wedding-gold text-sm mt-1 font-semibold">{stats.newContacts} new</div>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <FaImages className="text-purple-500 text-2xl mb-2" />
              <div className="text-3xl font-bold text-gray-900">{stats.portfolio}</div>
              <div className="text-gray-600">Portfolio</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <FaVideo className="text-wedding-gold text-2xl mb-2" />
              <div className="text-3xl font-bold text-gray-900">{stats.videos}</div>
              <div className="text-gray-600">Videos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <FaBook className="text-green-500 text-2xl mb-2" />
              <div className="text-3xl font-bold text-gray-900">{stats.blogs}</div>
              <div className="text-gray-600">Blogs</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <FaComments className="text-yellow-500 text-2xl mb-2" />
              <div className="text-3xl font-bold text-gray-900">{stats.testimonials}</div>
              <div className="text-gray-600">Testimonials</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            {['dashboard', 'portfolio', 'videos', 'blogs', 'testimonials', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-wedding-gold text-wedding-gold bg-wedding-gold/5'
                    : 'text-gray-600 hover:text-wedding-gold hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Portfolio Images</h2>
                  <button 
                    onClick={() => openModal('portfolio')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 font-semibold shadow-md"
                  >
                    <FaPlus /> Add New Image
                  </button>
                </div>
                {portfolio.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No portfolio items yet. Add your first image!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolio.map((item) => (
                      <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <img 
                          src={item.imageUrl?.startsWith('http') ? item.imageUrl : `/api${item.imageUrl}`}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                          }}
                        />
                        <div className="p-4">
                          <h3 className="font-semibold mb-1 text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 capitalize mb-2">{item.category}</p>
                          {item.featured && (
                            <span className="inline-block bg-wedding-gold text-wedding-black text-xs px-2 py-1 rounded mb-2">Featured</span>
                          )}
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => openModal('portfolio', item)}
                              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete('portfolio', item._id)}
                              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
                  <button 
                    onClick={() => openModal('video')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 font-semibold shadow-md"
                  >
                    <FaPlus /> Add New Video
                  </button>
                </div>
                {videos.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No videos yet. Add your first video!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <div key={video._id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                        {video.thumbnailUrl ? (
                          <img 
                            src={video.thumbnailUrl?.startsWith('http') ? video.thumbnailUrl : `/api${video.thumbnailUrl}`}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300?text=Video+Thumbnail'
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <FaVideo className="text-4xl text-gray-300" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold mb-1 text-gray-900">{video.title}</h3>
                          <p className="text-sm text-gray-600 capitalize mb-2">{video.category}</p>
                          {video.featured && (
                            <span className="inline-block bg-wedding-gold text-wedding-black text-xs px-2 py-1 rounded mb-2">Featured</span>
                          )}
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => openModal('video', video)}
                              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete('videos', video._id)}
                              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Blogs Tab */}
            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
                  <button 
                    onClick={() => openModal('blog')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 font-semibold shadow-md"
                  >
                    <FaPlus /> Add New Blog
                  </button>
                </div>
                {blogs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No blog posts yet. Add your first blog!</p>
                ) : (
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <div key={blog._id} className="bg-white rounded-lg p-4 flex gap-4 shadow-md border border-gray-200">
                        {blog.featuredImage && (
                          <img 
                            src={blog.featuredImage?.startsWith('http') ? blog.featuredImage : `/api${blog.featuredImage}`}
                            alt={blog.title}
                            className="w-32 h-32 object-cover rounded"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 text-gray-900">{blog.title}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{blog.excerpt || blog.content.substring(0, 100)}...</p>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded text-sm ${blog.published ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal('blog', blog)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete('blogs', blog._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
                  <button 
                    onClick={() => openModal('testimonial')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90 font-semibold shadow-md"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 text-gray-700 font-semibold">Couple Name</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Rating</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((testimonial) => (
                        <tr key={testimonial._id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-gray-900">{testimonial.coupleName}</td>
                          <td className="p-3 text-gray-900">{testimonial.rating}/5</td>
                          <td className="p-2">
                            <button 
                              onClick={() => openModal('testimonial', testimonial)}
                              className="text-blue-500 mr-2 hover:text-blue-400"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete('testimonials', testimonial._id)}
                              className="text-red-500 hover:text-red-400"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Enquiries</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-3 text-gray-700 font-semibold">Name</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Email</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Phone</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Event Date</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Status</th>
                        <th className="text-left p-3 text-gray-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact._id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-gray-900">{contact.name}</td>
                          <td className="p-3 text-gray-900">{contact.email}</td>
                          <td className="p-3 text-gray-900">{contact.phone}</td>
                          <td className="p-3 text-gray-900">{new Date(contact.eventDate).toLocaleDateString()}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded capitalize ${
                              contact.status === 'new' ? 'bg-blue-100 text-blue-700' :
                              contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                              contact.status === 'booked' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {contact.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <button className="text-blue-500 mr-2">
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete('contact', contact._id)}
                              className="text-wedding-gold"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === 'portfolio' && (editingId ? 'Edit Portfolio Image' : 'Add Portfolio Image')}
                {modalType === 'video' && (editingId ? 'Edit Video' : 'Add Video')}
                {modalType === 'blog' && (editingId ? 'Edit Blog Post' : 'Add Blog Post')}
                {modalType === 'testimonial' && (editingId ? 'Edit Testimonial' : 'Add Testimonial')}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="p-6">
              {/* Portfolio Modal */}
              {modalType === 'portfolio' && (
                <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                    <input
                      type="text"
                      value={portfolioForm.title}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                    <select
                      value={portfolioForm.category}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    >
                      <option value="weddings">Weddings</option>
                      <option value="pre-wedding">Pre-Wedding</option>
                      <option value="engagement">Engagement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                    <textarea
                      value={portfolioForm.description}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Image {!editingId && '*'}
                      {editingId && <span className="text-gray-500 text-xs">(Optional - leave empty to keep current image)</span>}
                    </label>
                    {editingId && portfolioForm.imageUrl && !portfolioForm.image && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                        <img 
                          src={portfolioForm.imageUrl?.startsWith('http') ? portfolioForm.imageUrl : `/api${portfolioForm.imageUrl}`}
                          alt="Current" 
                          className="max-w-full h-32 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          // Check file size (5MB limit)
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error('Image size must be less than 5MB', { position: 'top-right' })
                            e.target.value = ''
                            return
                          }
                          // Check file type
                          if (!file.type.startsWith('image/')) {
                            toast.error('Please select a valid image file', { position: 'top-right' })
                            e.target.value = ''
                            return
                          }
                          setPortfolioForm({ ...portfolioForm, image: file })
                          toast.success('Image selected: ' + file.name, { position: 'top-right', autoClose: 2000 })
                        }
                      }}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-wedding-gold file:text-wedding-black hover:file:bg-wedding-gold/90 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                      required={!editingId}
                    />
                    {portfolioForm.image && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">New Image Selected: {portfolioForm.image.name}</p>
                        <p className="text-xs text-gray-500">Size: {(portfolioForm.image.size / 1024 / 1024).toFixed(2)} MB</p>
                        <div className="mt-2">
                          <img 
                            src={URL.createObjectURL(portfolioForm.image)} 
                            alt="Preview" 
                            className="max-w-full h-32 object-cover rounded-lg border border-gray-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={portfolioForm.featured}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Featured</label>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg hover:bg-wedding-gold/90 disabled:opacity-50"
                    >
                      {uploading ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Image' : 'Upload Image')}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
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
                    <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                    <input
                      type="text"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                    <select
                      value={videoForm.category}
                      onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    >
                      <option value="wedding-film">Wedding Film</option>
                      <option value="pre-wedding-film">Pre-Wedding Film</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Video URL (YouTube/Vimeo/External Link)</label>
                    <input
                      type="url"
                      value={videoForm.videoUrl}
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Or Upload Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoForm({ ...videoForm, videoFile: e.target.files[0] })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max 500MB. Supported: MP4, MOV, AVI, WebM</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Thumbnail Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.files[0] })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Or Thumbnail URL</label>
                    <input
                      type="url"
                      value={videoForm.thumbnailUrl}
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                    <textarea
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      rows="3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={videoForm.featured}
                      onChange={(e) => setVideoForm({ ...videoForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Featured</label>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg hover:bg-wedding-gold/90 disabled:opacity-50"
                    >
                      {uploading ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Video' : 'Add Video')}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
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
                    <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Excerpt</label>
                    <textarea
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      rows="2"
                      placeholder="Short description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Content</label>
                    <textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      rows="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Featured Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.files[0] })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={blogForm.published}
                      onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Published</label>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg hover:bg-wedding-gold/90 disabled:opacity-50"
                    >
                      {uploading ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Blog' : 'Add Blog')}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
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
                    <label className="block text-sm font-medium mb-2 text-gray-700">Couple Name</label>
                    <input
                      type="text"
                      value={testimonialForm.coupleName}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, coupleName: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Rating</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Review</label>
                    <textarea
                      value={testimonialForm.review}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      rows="5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Wedding Date</label>
                    <input
                      type="date"
                      value={testimonialForm.weddingDate}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, weddingDate: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={testimonialForm.featured}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Featured</label>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg hover:bg-wedding-gold/90 disabled:opacity-50"
                    >
                      {uploading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Testimonial' : 'Add Testimonial')}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
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

