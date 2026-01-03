import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../Store/Store';
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaUser,
  FaLock,
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';
import ICart from '../Cart/Component/ICart';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment' | 'review'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
  };

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const steps = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1] as any);
    }
  };

  const prevStep = () => {
    const steps = ['cart', 'shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1] as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Progress Steps */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {[
                { key: 'cart', label: 'Cart', icon: FaShoppingCart },
                { key: 'shipping', label: 'Shipping', icon: FaTruck },
                { key: 'payment', label: 'Payment', icon: FaCreditCard },
                { key: 'review', label: 'Review', icon: FaCheckCircle }
              ].map((step, index) => {
                const isActive = currentStep === step.key;
                const isCompleted = ['cart', 'shipping', 'payment', 'review'].indexOf(currentStep) > index;
                const StepIcon = step.icon;

                return (
                  <div key={step.key} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isActive
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isCompleted
                        ? 'bg-emerald-100 border-emerald-600 text-emerald-600'
                        : 'bg-white border-slate-300 text-slate-400'
                      }`}>
                      {isCompleted ? <FaCheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${isActive ? 'text-emerald-600' : isCompleted ? 'text-emerald-600' : 'text-slate-500'
                      }`}>
                      {step.label}
                    </span>
                    {index < 3 && (
                      <FaChevronRight className="w-4 h-4 text-slate-400 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {currentStep === 'cart' && 'Your Cart'}
              {currentStep === 'shipping' && 'Shipping Details'}
              {currentStep === 'payment' && 'Payment Method'}
              {currentStep === 'review' && 'Order Review'}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {currentStep === 'cart' && 'Review your selected jaggery products'}
              {currentStep === 'shipping' && 'Enter your delivery information'}
              {currentStep === 'payment' && 'Choose your payment method'}
              {currentStep === 'review' && 'Confirm your order details'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaShoppingCart className="w-16 h-16 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                Discover our premium collection of organic jaggery products and add them to your cart
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaLeaf className="w-5 h-5" />
                  Browse Products
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300"
                >
                  <FaArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            /* Cart and Checkout Flow */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Dynamic Content */}
              <div className="lg:col-span-2">
                {currentStep === 'cart' && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Cart Items ({totalItems})</h2>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                            <FaLeaf className="w-8 h-8 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-600">Premium Organic Jaggery</p>
                            <p className="text-lg font-bold text-emerald-600">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, (quantities[item.id] || item.quantity) - 1)}
                              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                              <FaMinus className="w-3 h-3 text-slate-600" />
                            </button>
                            <span className="w-12 text-center font-semibold">
                              {quantities[item.id] || item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, (quantities[item.id] || item.quantity) + 1)}
                              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                              <FaPlus className="w-3 h-3 text-slate-600" />
                            </button>
                          </div>
                          <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 'shipping' && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleShippingChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => handleShippingChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                        <textarea
                          value={shippingInfo.address}
                          onChange={(e) => handleShippingChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          rows={3}
                          placeholder="Enter full address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                        <input
                          type="text"
                          value={shippingInfo.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter state"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Pincode</label>
                        <input
                          type="text"
                          value={shippingInfo.pincode}
                          onChange={(e) => handleShippingChange('pincode', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'payment' && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      {[
                        { id: 'card', label: 'Credit/Debit Card', icon: FaCreditCard, desc: 'Pay with your card securely' },
                        { id: 'upi', label: 'UPI Payment', icon: FaUser, desc: 'Pay using UPI apps like PhonePe, GPay' },
                        { id: 'cod', label: 'Cash on Delivery', icon: FaTruck, desc: 'Pay when your order arrives' }
                      ].map((method) => (
                        <div
                          key={method.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-slate-200 hover:border-slate-300'
                            }`}
                          onClick={() => setPaymentMethod(method.id as any)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${paymentMethod === method.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                              <method.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900">{method.label}</h3>
                              <p className="text-sm text-slate-600">{method.desc}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                              }`}>
                              {paymentMethod === method.id && <FaCheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 'review' && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Order Review</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">Shipping Address</h3>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                          <p className="text-slate-600">{shippingInfo.address}</p>
                          <p className="text-slate-600">{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                          <p className="text-slate-600">{shippingInfo.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">Payment Method</h3>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="capitalize">{paymentMethod.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">Order Items</h3>
                        <div className="space-y-2">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100">
                              <span className="text-slate-700">{item.title} x {item.quantity}</span>
                              <span className="font-semibold">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-emerald-600">FREE</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <div className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                        🎉 Free shipping on orders above ₹500
                      </div>
                    )}
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-emerald-600">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FaTruck className="w-4 h-4 text-emerald-600" />
                      <span>Free delivery on orders above ₹500</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FaShieldAlt className="w-4 h-4 text-emerald-600" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FaLeaf className="w-4 h-4 text-emerald-600" />
                      <span>100% organic & natural products</span>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 space-y-3">
                    {currentStep !== 'cart' && (
                      <button
                        onClick={prevStep}
                        className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                        Previous Step
                      </button>
                    )}

                    {currentStep !== 'review' ? (
                      <button
                        onClick={nextStep}
                        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        {currentStep === 'cart' ? 'Proceed to Shipping' :
                          currentStep === 'shipping' ? 'Continue to Payment' :
                            'Review Order'}
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                        <FaLock className="w-4 h-4" />
                        Place Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Continue Shopping */}
      {cartItems.length > 0 && currentStep === 'cart' && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </section>
      )}

      {/* Keep original ICart component for functionality */}
      <ICart />
    </div>
  );
};

export default Cart;
