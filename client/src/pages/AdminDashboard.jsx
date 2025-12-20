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
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

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
      const [statsRes, portfolioRes, videosRes, blogsRes, testimonialsRes, contactsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/portfolio'),
        api.get('/videos'),
        api.get('/blogs/all'),
        api.get('/testimonials'),
        api.get('/contact')
      ])

      setStats(statsRes.data.stats)
      setPortfolio(portfolioRes.data)
      setVideos(videosRes.data)
      setBlogs(blogsRes.data)
      setTestimonials(testimonialsRes.data)
      setContacts(contactsRes.data)
      setLoading(false)
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
      }
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
      loadDashboard()
    } catch (error) {
      alert('Failed to delete item')
    }
  }

  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
    // Reset forms
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

  const closeModal = () => {
    setShowModal(false)
    setModalType(null)
  }

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('title', portfolioForm.title)
      formData.append('category', portfolioForm.category)
      formData.append('description', portfolioForm.description)
      formData.append('featured', portfolioForm.featured)
      if (portfolioForm.image) {
        formData.append('image', portfolioForm.image)
      }

      await api.post('/portfolio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      alert('Portfolio item added successfully!')
      closeModal()
      loadDashboard()
    } catch (error) {
      alert('Failed to add portfolio item: ' + (error.response?.data?.message || error.message))
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

      await api.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      alert('Blog added successfully!')
      closeModal()
      loadDashboard()
    } catch (error) {
      alert('Failed to add blog: ' + (error.response?.data?.message || error.message))
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

      await api.post('/videos', videoData)
      
      alert('Video added successfully!')
      closeModal()
      loadDashboard()
    } catch (error) {
      alert('Failed to add video: ' + (error.response?.data?.message || error.message))
    } finally {
      setUploading(false)
    }
  }

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      await api.post('/testimonials', testimonialForm)
      
      alert('Testimonial added successfully!')
      closeModal()
      loadDashboard()
    } catch (error) {
      alert('Failed to add testimonial: ' + (error.response?.data?.message || error.message))
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-elegant font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-wedding-gold text-white px-4 py-2 rounded-lg hover:bg-wedding-gold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow">
              <FaEnvelope className="text-blue-500 text-2xl mb-2" />
              <div className="text-3xl font-bold">{stats.contacts}</div>
              <div className="text-gray-300">Contacts</div>
              {stats.newContacts > 0 && (
                <div className="text-wedding-gold text-sm mt-1">{stats.newContacts} new</div>
              )}
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow">
              <FaImages className="text-purple-500 text-2xl mb-2" />
              <div className="text-3xl font-bold">{stats.portfolio}</div>
              <div className="text-gray-300">Portfolio</div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow">
              <FaVideo className="text-wedding-gold text-2xl mb-2" />
              <div className="text-3xl font-bold">{stats.videos}</div>
              <div className="text-gray-300">Videos</div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow">
              <FaBook className="text-green-500 text-2xl mb-2" />
              <div className="text-3xl font-bold">{stats.blogs}</div>
              <div className="text-gray-300">Blogs</div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow">
              <FaComments className="text-yellow-500 text-2xl mb-2" />
              <div className="text-3xl font-bold">{stats.testimonials}</div>
              <div className="text-gray-300">Testimonials</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-gray-700 rounded-lg shadow mb-8">
          <div className="flex border-b">
            {['dashboard', 'portfolio', 'videos', 'blogs', 'testimonials', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-wedding-gold text-wedding-gold'
                    : 'text-gray-300 hover:text-wedding-black'
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
                  <h2 className="text-2xl font-bold">Portfolio</h2>
                  <button 
                    onClick={() => openModal('portfolio')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.map((item) => (
                        <tr key={item._id} className="border-b">
                          <td className="p-2">{item.title}</td>
                          <td className="p-2 capitalize">{item.category}</td>
                          <td className="p-2">
                            <button className="text-blue-500 mr-2">
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete('portfolio', item._id)}
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

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">Videos</h2>
                  <button 
                    onClick={() => openModal('video')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map((video) => (
                        <tr key={video._id} className="border-b">
                          <td className="p-2">{video.title}</td>
                          <td className="p-2 capitalize">{video.category}</td>
                          <td className="p-2">
                            <button className="text-blue-500 mr-2">
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete('videos', video._id)}
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

            {/* Blogs Tab */}
            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">Blogs</h2>
                  <button 
                    onClick={() => openModal('blog')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Published</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog) => (
                        <tr key={blog._id} className="border-b">
                          <td className="p-2">{blog.title}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded ${blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="p-2">
                            <button className="text-blue-500 mr-2">
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete('blogs', blog._id)}
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

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">Testimonials</h2>
                  <button 
                    onClick={() => openModal('testimonial')}
                    className="bg-wedding-gold text-wedding-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-wedding-gold/90"
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Couple Name</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((testimonial) => (
                        <tr key={testimonial._id} className="border-b">
                          <td className="p-2">{testimonial.coupleName}</td>
                          <td className="p-2">{testimonial.rating}/5</td>
                          <td className="p-2">
                            <button className="text-blue-500 mr-2">
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete('testimonials', testimonial._id)}
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

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Enquiries</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Event Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact._id} className="border-b">
                          <td className="p-2">{contact.name}</td>
                          <td className="p-2">{contact.email}</td>
                          <td className="p-2">{contact.phone}</td>
                          <td className="p-2">{new Date(contact.eventDate).toLocaleDateString()}</td>
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
    </div>
  )
}

export default AdminDashboard

