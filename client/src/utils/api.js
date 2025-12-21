import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 errors
// NOTE: We DON'T auto-logout on 401 errors because we're using static credentials
// The user should only be logged out when they explicitly click the logout button
// API errors are handled gracefully in the components
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-logout on 401 errors - let components handle it
    // This prevents automatic logout when using static credentials
    console.log('API Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

export default api









