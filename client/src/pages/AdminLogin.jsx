import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import api from '../utils/api'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

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
    if (!formData.username.trim()) {
      setError('Username is required')
      return
    }
    if (!formData.password) {
      setError('Password is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await api.post('/admin/login', formData)
      localStorage.setItem('adminToken', res.data.token)
      localStorage.setItem('adminData', JSON.stringify(res.data.admin))
      // Direct navigation to dashboard after successful login
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
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
        </div>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-gold-400 px-4 py-3 rounded mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-2">
              <FaUser className="inline mr-2" /> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                error && !formData.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-wedding-gold focus:ring-wedding-gold'
              }`}
              placeholder="Enter username"
              autoComplete="username"
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
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/admin/signup"
              className="text-wedding-gold hover:underline font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin

