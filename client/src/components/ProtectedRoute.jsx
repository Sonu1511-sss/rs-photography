import { Navigate } from 'react-router-dom';

// Simple admin protected route
const ProtectedRoute = ({ children }) => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken')
    : null;

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

