import { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', credentials.username);
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setLocation('/admin');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full mb-6"
            >
              <Lock className="text-primary-600" size={32} />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Secure access for restaurant management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Protected by secure authentication system.
            <br />
            Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
