import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as needed

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  console.log('Auth status in ProtectedRoute:', isAuthenticated);

  // Check if authentication status is still being determined
  if (isAuthenticated === undefined) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // Render children if authenticated, else redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
