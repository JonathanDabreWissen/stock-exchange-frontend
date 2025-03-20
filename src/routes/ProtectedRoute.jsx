import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './path/to/AuthContext'; // Update this path as needed

function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  
  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the child routes
  return <Outlet />;
}

export default ProtectedRoute;