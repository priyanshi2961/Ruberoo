import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session) {
          // Check if session is expired (24 hours)
          const sessionAge = Date.now() - session.timestamp;
          if (sessionAge < 24 * 60 * 60 * 1000) {
            setUser(session.user);
          } else {
            // Session expired, clear it
            localStorage.removeItem('session');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        localStorage.removeItem('session');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'session') {
        checkSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData) => {
    const session = {
      user: userData,
      timestamp: Date.now()
    };
    localStorage.setItem('session', JSON.stringify(session));
    setUser(userData);
    // Force a storage event to update other tabs
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
    // Force a storage event to update other tabs
    window.dispatchEvent(new Event('storage'));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 