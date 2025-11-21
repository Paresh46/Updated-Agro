// File: src/components/Navbar.tsx
import { useState, useEffect, type ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../Pages/Store/Store';
import { logout } from '../Pages/Store/AuthSlice';
import {
  FaHome,
  FaInfoCircle,
  FaSeedling,
  FaShoppingCart,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaHeart,
  FaSearch,
  FaBars,
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaLeaf,
  FaShieldAlt
} from 'react-icons/fa';
import { NavLink, useLocation, Link } from 'react-router-dom';
// Logo import removed as unused

interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
}

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  // Get cart items and auth state from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle /> },
    { name: 'Products', path: '/products', icon: <FaSeedling /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMenuOpen(false), [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaPhone className="mr-2 text-green-200" />
              <span>+91 98765 43210</span>
            </div>
            <div className="hidden sm:flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-200" />
              <span>Nashik, Maharashtra</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-green-200" />
              <span className="text-green-200">100% Organic & Natural</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-200">Free shipping on orders above ₹500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
    <nav
      className={`fixed w-full z-50 transition-all duration-300 supports-[backdrop-filter]:bg-white/60 ${
        scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg py-2'
            : 'bg-white/70 backdrop-blur-sm py-3'
      }`}
      aria-label="Site navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
            {/* Logo */}
          <NavLink to="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-700 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-green-900 group-hover:text-green-700 transition-colors">
                    Anand <span className="text-green-700">Agro</span>
                  </span>
                  <p className="text-xs text-green-600 font-medium">Organic & Natural</p>
                </div>
            </div>
          </NavLink>

          {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                aria-label={item.name}
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive
                        ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'
                    }`
                  }
                >
                  <span className="text-lg mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                  {item.name === 'Cart' && itemCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {itemCount > 99 ? '99+' : itemCount}
                </span>
                )}
              </NavLink>
            ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/60 focus-within:ring-offset-2 focus-within:ring-offset-white">
                <FaSearch className="text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                  className="bg-transparent border-none outline-none text-sm w-32"
                />
              </div>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                title="Wishlist"
              >
                <FaHeart className="text-lg" />
              </Link>

              {/* User Account */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                  <Link
                    to="/account"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    title="Account"
                  >
                    <FaUser className="text-lg" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-lg" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-600 hover:text-green-600 font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                title="Shopping Cart"
              >
                <FaShoppingCart className="text-lg" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
                    {itemCount > 99 ? '99+' : itemCount}
                    </span>
                )}
                  </Link>

              {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 mt-2">
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <FaSearch className="text-gray-500 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                    className="bg-transparent border-none outline-none text-sm flex-1"
                  />
                </div>

                {/* Mobile Navigation */}
                <div className="grid grid-cols-2 gap-2" aria-label="Mobile primary">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex flex-col items-center py-3 rounded-lg text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive
                            ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                            : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'
                  }`
                }
                aria-label={item.name}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.name}</span>
                      {item.name === 'Cart' && itemCount > 0 && (
                        <span className="mt-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {itemCount > 99 ? '99+' : itemCount}
                        </span>
                )}
              </NavLink>
            ))}
          </div>
          
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 px-4 py-2">
                        Welcome, {user?.name}
                      </div>
                  <Link
                    to="/account"
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUser className="mr-2" />
                        Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                  </button>
                    </div>
              ) : (
                    <div className="space-y-2">
                  <Link
                    to="/login"
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                        Login
                  </Link>
                  <Link
                    to="/signup"
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                        Sign Up
                  </Link>
                    </div>
              )}
            </div>
          </div>
        </div>
      )}
        </div>
    </nav>
    </>
  );
};

export default Navbar;