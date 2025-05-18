import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/Dashboard'

function App() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Try to fetch user progress which requires authentication
        const response = await fetch('/api/progress', {
          credentials: 'include'
        });
        
        if (response.ok) {
          // If the request is successful, user is authenticated
          const userData = localStorage.getItem('user');
          if (userData) {
            setIsLoggedIn(true);
          }
        } else {
          // If the request fails, clear any stale data
          localStorage.removeItem('user');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleShowCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const handleBackToLogin = () => {
    setShowCreateAccount(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563eb]"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <>
      {showCreateAccount ? (
        <CreateAccount onBackToLogin={handleBackToLogin} />
      ) : (
        <LoginPage onShowCreateAccount={handleShowCreateAccount} onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
