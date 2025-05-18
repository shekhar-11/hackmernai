import React from 'react'

function Logout() {
   const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Clear user data from localStorage
      localStorage.removeItem('user');

      // Redirect to login page by reloading the app
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
          >
            <span className="mr-3 text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
  )
}

export default Logout
