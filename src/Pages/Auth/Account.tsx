import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, changePassword, logout } from '../Store/AuthSlice';
import type { RootState } from '../Store/Store';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaLeaf,
  FaSignOutAlt,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaHistory,
  FaHeart,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaPhone,
  FaShieldAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(profileData)).unwrap();
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await dispatch(changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })).unwrap();
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'orders', name: 'Orders', icon: FaHistory },
    { id: 'wishlist', name: 'Wishlist', icon: FaHeart },
    { id: 'addresses', name: 'Addresses', icon: FaMapMarkerAlt },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-700 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                <p className="text-gray-600">Manage your account settings and preferences</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                      >
                        <FaEdit className="mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaEnvelope className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <FaTimes className="mr-2" />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                            <FaUser className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-gray-900">{user?.name}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                            <FaEnvelope className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-gray-900">{user?.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                      {passwordData.confirmPassword && (
                        <div className="mt-2 flex items-center text-sm">
                          {passwordData.newPassword === passwordData.confirmPassword ? (
                            <div className="flex items-center text-green-600">
                              <FaCheck className="h-4 w-4 mr-1" />
                              Passwords match
                            </div>
                          ) : (
                            <span className="text-red-600">Passwords do not match</span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading || passwordData.newPassword !== passwordData.confirmPassword}
                      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* Other Tabs */}
              {activeTab === 'orders' && (
                <div className="text-center py-12">
                  <FaHistory className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Order History</h3>
                  <p className="text-gray-600">Your order history will appear here</p>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="text-center py-12">
                  <FaHeart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Wishlist</h3>
                  <p className="text-gray-600">Your saved items will appear here</p>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="text-center py-12">
                  <FaMapMarkerAlt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Addresses</h3>
                  <p className="text-gray-600">Your saved addresses will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
