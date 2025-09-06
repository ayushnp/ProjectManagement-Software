import { useState, useEffect } from 'react';
import {
  Menu, X, ArrowRight, CheckCircle, Users, BarChart3, Zap, Shield,
  Clock, Target, Folder, Calendar, Bell, Star, ChevronRight,
  FolderOpen, User, Home, Settings, LogIn, UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication state

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    console.log('Redirecting to login page');
    // Using navigate for actual routing
    navigate('/login');
  };

  const handleSignup = () => {
    console.log('Redirecting to signup page');
    // Using navigate for actual routing
    navigate('/signup');
  };

  const handleDashboardAccess = (dashboardType) => {
    if (!isLoggedIn) {
      if (window.confirm('Please login to access the dashboard. Would you like to login now?')) {
        handleLogin(); // This will now navigate to /login
      }
      return;
    }

    // Redirect to respective dashboard (you'd have routes for these)
    if (dashboardType === 'project') {
      console.log('Redirecting to Project Dashboard');
      alert('Redirecting to Project Dashboard...'); // Placeholder, you'd navigate here
    } else if (dashboardType === 'task') {
      console.log('Redirecting to Task Dashboard');
      alert('Redirecting to Task Dashboard...'); // Placeholder, you'd navigate here
    }
  };

  const features = [
    {
      icon: <Folder className="w-6 h-6" />,
      title: "Project Management",
      description: "Organize and track all your projects in one unified workspace with seamless collaboration.",
      stats: "500+ Projects Managed"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Task Tracking",
      description: "Break down projects into manageable tasks with progress tracking and smart notifications.",
      stats: "10K+ Tasks Completed"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team through shared workspaces and real-time updates.",
      stats: "50K+ Team Members"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      image: "👩‍💼",
      quote: "SynergySphere transformed how we manage our projects. The clean interface and powerful features make collaboration effortless."
    },
    {
      name: "Michael Chen",
      role: "Team Lead",
      company: "StartupXYZ",
      image: "👨‍💻",
      quote: "The best project management tool I've used. Task tracking is seamless and the dashboard gives perfect project visibility."
    },
    {
      name: "Emma Davis",
      role: "Design Director",
      company: "Creative Co",
      image: "👩‍🎨",
      quote: "Beautiful design meets powerful functionality. Our team's productivity has increased significantly since switching."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrollY > 50
            ? 'border-b border-gray-200/60 bg-white/95 shadow-sm backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex h-18 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-slate-700 to-slate-800">
                <FolderOpen size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                SynergySphere
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="#features"
                className="font-medium text-slate-600 transition-colors hover:text-slate-800"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="font-medium text-slate-600 transition-colors hover:text-slate-800"
              >
                Testimonials
              </a>
              <div className="flex items-center space-x-3">
                <a
                  href='/login' // Using handleLogin function
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </a>
                <a
                  href='/signup'
                  className="flex items-center space-x-2 rounded-lg bg-slate-800 px-5 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-md"
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 transition-colors hover:text-slate-800 md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-b border-gray-200/60 bg-white/95 backdrop-blur-xl md:hidden">
            <div className="space-y-4 px-6 py-4">
              <a
                href="#features"
                className="block font-medium text-slate-600 transition-colors hover:text-slate-800"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block font-medium text-slate-600 transition-colors hover:text-slate-800"
              >
                Testimonials
              </a>
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <button
                  onClick={handleLogin}
                  className="block w-full text-left font-medium text-slate-600 transition-colors hover:text-slate-800"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="w-full rounded-lg bg-slate-800 px-5 py-2 font-medium text-white"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pb-16 pt-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-800 md:text-6xl">
              Streamline Your
              <br />
              <span className="text-slate-600">Project Management</span>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl leading-relaxed text-slate-600 text-xl">
              Organize projects, track tasks, and collaborate with your team
              efficiently. Everything you need in one clean, intuitive
              workspace.
            </p>

            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                onClick={() => handleDashboardAccess('project')}
                className="group flex items-center space-x-2 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-md"
              >
                <span>Project Dashboard</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <button
                onClick={() => handleDashboardAccess('task')}
                className="group flex items-center space-x-2 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-800"
              >
                <span>Task Dashboard</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-sm text-slate-500">
                  SynergySphere Dashboard
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDashboardAccess('project')}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-900"
                >
                  Project View
                </button>
                <button
                  onClick={() => handleDashboardAccess('task')}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Task View
                </button>
              </div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-slate-100 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-slate-700">Active Projects</h3>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200">
                    <Folder size={14} className="text-slate-600" />
                  </div>
                </div>
                <p className="mb-1 text-2xl font-bold text-slate-800">24</p>
                <p className="text-sm text-slate-500">+12% this month</p>
              </div>

              <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-slate-100 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-slate-700">Completed Tasks</h3>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200">
                    <CheckCircle size={14} className="text-slate-600" />
                  </div>
                </div>
                <p className="mb-1 text-2xl font-bold text-slate-800">142</p>
                <p className="text-sm text-slate-500">+8% this week</p>
              </div>

              <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-slate-100 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-slate-700">Team Members</h3>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200">
                    <Users size={14} className="text-slate-600" />
                  </div>
                </div>
                <p className="mb-1 text-2xl font-bold text-slate-800">18</p>
                <p className="text-sm text-slate-500">+3 new members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Streamline your workflow with our comprehensive set of project
              management tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative rounded-xl border bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  activeFeature === index
                    ? 'border-slate-300 shadow-md'
                    : 'border-slate-200/60 hover:border-slate-300'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">
                  {feature.title}
                </h3>
                <p className="mb-4 leading-relaxed text-slate-600">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{feature.stats}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-all duration-300 ${
                      activeFeature === index
                        ? 'translate-x-1 text-slate-700'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-100/50 to-gray-100/50 px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">
                10K+
              </div>
              <p className="text-slate-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">
                50K+
              </div>
              <p className="text-slate-600">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">
                99.9%
              </div>
              <p className="text-slate-600">Uptime</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">
                24/7
              </div>
              <p className="text-slate-600">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Trusted by Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              See what our users are saying about their experience with
              SynergySphere.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
              >
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-current text-yellow-500"
                    />
                  ))}
                </div>
                <p className="mb-4 leading-relaxed text-slate-700">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="mr-3 text-2xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-medium text-slate-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center space-x-3 md:mb-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-slate-700 to-slate-800">
                <FolderOpen size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                SynergySphere
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a
                href="#"
                className="text-slate-600 transition-colors hover:text-slate-800"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-600 transition-colors hover:text-slate-800"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-600 transition-colors hover:text-slate-800"
              >
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center">
            <p className="text-slate-500">
              © 2025 SynergySphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}