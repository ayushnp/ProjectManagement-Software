import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Something went wrong');
      } else {
        alert('User registered successfully! You can now log in.');
        setFormData({ name: '', email: '', password: '' });
        setAgreedToTerms(false);
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-lg font-medium text-gray-900">
            SynergySphere
          </div>
          <div className="flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Home</a>
            
            <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Login</a>
            <a href='/signup' className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      {/* Signup Card */}
      <div className="flex flex-grow items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Create an account</h1>
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-700">Log in instead</a>
              </p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2 space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm leading-relaxed text-gray-600">
                  By creating an account, I agree to our{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-700">Terms of use</a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-700">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!agreedToTerms || loading}
                className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create an account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
