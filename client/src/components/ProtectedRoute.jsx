import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Check if admin token exists in localStorage (static credentials)
  const token = localStorage.getItem('adminToken')
  const adminData = localStorage.getItem('adminData')

  console.log('ProtectedRoute check:', { token: !!token, adminData: !!adminData })

  // If no token or admin data, redirect to login
  if (!token || !adminData) {
    console.log('ProtectedRoute: No token or adminData, redirecting to login')
    return <Navigate to="/admin/login" replace />
  }

  // Verify admin data is valid
  try {
    const admin = JSON.parse(adminData)
    console.log('ProtectedRoute: Admin email check:', admin.email)
    if (admin.email !== 'rsphotography0@gmail.com') {
      // Invalid admin data, clear and redirect
      console.log('ProtectedRoute: Invalid admin email, redirecting to login')
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      return <Navigate to="/admin/login" replace />
    }
    console.log('ProtectedRoute: Access granted')
  } catch (error) {
    // Invalid admin data format, clear and redirect
    console.log('ProtectedRoute: Error parsing adminData:', error)
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute








