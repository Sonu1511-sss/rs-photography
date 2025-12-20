import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../utils/api'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    // Verify token on mount
    if (token) {
      api.get('/admin/verify')
        .catch(() => {
          // If token is invalid, remove it
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminData')
        })
    }
  }, [token])

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute








