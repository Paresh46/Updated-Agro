import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../Pages/Store/Store';
import { FaSpinner } from 'react-icons/fa';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-md flex items-center justify-center">
        <div className="text-center p-6 rounded-2xl border border-emerald-100 bg-white/70 shadow-sm">
          <FaSpinner className="animate-spin h-8 w-8 text-green-600 mx-auto mb-3" aria-hidden="true" />
          <p className="text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
