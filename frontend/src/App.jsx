import { useState } from 'react'
import LoginPage from './components/LoginPage'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/Dashboard'

function App() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const handleBackToLogin = () => {
    setShowCreateAccount(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

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
