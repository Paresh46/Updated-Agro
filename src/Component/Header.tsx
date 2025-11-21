// src/components/Header.tsx
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../Pages/Store/Store';
import { logout } from '../Pages/Store/AuthSlice';
import { 
  FaShoppingCart, 
  FaLeaf, 
  FaUser, 
  FaHeart, 
  FaSearch,
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

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
              <FaEnvelope className="mr-2 text-green-200" />
              <span>support@anandagro.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-200" />
              <span>Nashik, Maharashtra</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-200">Free shipping on orders above ₹500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-amber-200 bg-white/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-green-700 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <FaLeaf className="text-white text-xl" />
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-green-900 group-hover:text-green-700 transition-colors">
                  Anand <span className="text-green-700">Agro</span>
                </span>
                <p className="text-xs text-green-600 font-medium">Organic & Natural</p>
          </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" aria-label="Primary">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive
                      ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive
                      ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive
                      ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isActive
                      ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50/60'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/60 focus-within:ring-offset-2 focus-within:ring-offset-white">
                <FaSearch className="text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
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
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-lg" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-gray-600 hover:text-green-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md"
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <FaSearch className="text-gray-500 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    aria-label="Search products"
                    className="bg-transparent border-none outline-none text-sm flex-1"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2" aria-label="Mobile primary">
                  <Link 
                    to="/" 
                    className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/products" 
                    className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    to="/about" 
                    className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/contact" 
                    className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>

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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="mr-2" />
                        Account
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
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
    </header>
    </>
  );
};

export default Header;