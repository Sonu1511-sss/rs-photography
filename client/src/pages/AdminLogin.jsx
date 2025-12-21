import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'
import api from '../utils/api'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [apiConnected, setApiConnected] = useState(null)
  const navigate = useNavigate()

  // Test API connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/health')
        setApiConnected(true)
      } catch (err) {
        setApiConnected(false)
        console.warn('API connection test failed:', err)
      }
    }
    testConnection()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    const trimmedEmail = formData.email.trim()
    if (!trimmedEmail) {
      setError('Email is required')
      toast.error('Please enter your email address', {
        position: 'top-right',
        duration: 2000,
      })
      return
    }
    if (!formData.password) {
      setError('Password is required')
      toast.error('Please enter your password', {
        position: 'top-right',
        duration: 2000,
      })
      return
    }

    setLoading(true)
    setError('')

    try {
      // Call actual API endpoint
      const response = await api.post('/admin/login', {
        email: trimmedEmail,
        password: formData.password
      })

      // Store token and admin data
      const { token, admin } = response.data
      localStorage.setItem('adminToken', token)
      localStorage.setItem('adminData', JSON.stringify(admin))
      
      console.log('Login successful, token stored')
      
      // Show success toast
      toast.success('Login successful! Redirecting to dashboard...', {
        position: 'top-right',
        duration: 2000,
      })
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true })
      }, 500)
    } catch (err) {
      console.error('Login error:', err)
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      })
      
      let errorMessage = 'Login failed. Please check your credentials and try again.'
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.message || `Server error: ${err.response.status} ${err.response.statusText}`
      } else if (err.request) {
        // Request made but no response (network error)
        errorMessage = 'Network error: Unable to connect to server. Please check if the server is running.'
      } else {
        // Something else happened
        errorMessage = err.message || 'An unexpected error occurred'
      }
      
      setError(errorMessage)
      toast.error(errorMessage, {
        position: 'top-right',
        duration: 5000,
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-black via-wedding-gold to-wedding-black pt-20 px-4">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-elegant font-bold mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">
            RS Photography Admin Panel
          </p>
          {apiConnected === false && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded text-sm">
              ⚠️ Server connection issue. Please ensure the server is running.
            </div>
          )}
        </div>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-semibold">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              <FaUser className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                error && !formData.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-wedding-gold focus:ring-wedding-gold'
              }`}
              placeholder="Enter email"
              autoComplete="email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              <FaLock className="inline mr-2" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  error && !formData.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-wedding-gold focus:ring-wedding-gold'
                }`}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-wedding-gold"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-wedding-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-2">
            Don't have an admin account?
          </p>
          <Link
            to="/admin/signup"
            className="text-wedding-gold hover:text-wedding-black font-semibold text-sm transition-colors"
          >
            Create Admin Account
          </Link>
        </div>

      </motion.div>
    </div>
  )
}

export default AdminLogin

