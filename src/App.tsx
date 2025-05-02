import React, { useState, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import Register from './components/Register';
import { chatApi } from './api/chatApi';
import './styles/App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already authenticated by trying to fetch chat history
    const checkAuth = async () => {
      try {
        const response = await chatApi.getChatHistory();
        setIsAuthenticated(response.success);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await chatApi.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const handleRegisterSuccess = () => {
    // After successful registration, show login form
    setShowRegister(false);
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Friend</h1>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </header>
      <main className="app-main">
        {isAuthenticated ? (
          <ChatContainer />
        ) : showRegister ? (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onBackToLogin={handleBackToLogin}
          />
        ) : (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onRegisterClick={handleRegisterClick}
          />
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} AI Friend App</p>
      </footer>
    </div>
  );
};

export default App;
