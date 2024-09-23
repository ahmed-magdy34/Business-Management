import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined); // Start as undefined to handle loading

  // Check localStorage on load to see if the user is authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true'); // Convert string to boolean
  }, []);

  
  
  // Login function (save auth status in localStorage)
  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  // Logout function (clear auth status from localStorage)
  const logout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove from localStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);
