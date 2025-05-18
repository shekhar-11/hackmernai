import { useState } from 'react';

const CreateAccount = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          onBackToLogin();
        }, 1200);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background with quote */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8">
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold mb-4">"Education is not the filling of a pail, but the lighting of a fire."</h1>
            <p className="text-xl">- William Butler Yeats</p>
          </div>
        </div>
      </div>

      {/* Right side - Create Account form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#2563eb] text-center mb-8">
              Create Account
            </h1>
            {error && <div className="mb-4 text-red-600 text-center font-medium">{error}</div>}
            {success && <div className="mb-4 text-green-600 text-center font-medium">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={onBackToLogin}
                style={{
                  color: '#2563eb',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
                disabled={loading}
                onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.color = '#2563eb'}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount; 