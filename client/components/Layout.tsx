import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFBFC] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#4ADE80] rounded-[18px] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <span className="text-xl font-semibold text-[#1F2937]">
                LegalClarify
              </span>
            </div>

            {/* Desktop Navigation - Not Logged In */}
            {!isLoggedIn && (
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => navigateTo('/')}
                  className={`px-4 py-2 rounded-[18px] font-medium transition-colors ${
                    isActivePage('/') ? 'text-[#6366F1]' : 'text-[#6B7280]'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('/features')}
                  className={`px-4 py-2 rounded-[18px] font-medium transition-colors ${
                    isActivePage('/features') ? 'text-[#6366F1]' : 'text-[#6B7280]'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className={`px-4 py-2 rounded-[18px] font-medium transition-colors ${
                    isActivePage('/about') ? 'text-[#6366F1]' : 'text-[#6B7280]'
                  }`}
                >
                  About
                </button>
              </div>
            )}

            {/* Desktop Navigation - Logged In */}
            {isLoggedIn && (
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className={`px-4 py-2 rounded-[18px] font-medium transition-colors ${
                    isActivePage('/dashboard') ? 'text-[#6366F1]' : 'text-[#6B7280]'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigateTo('/upload')}
                  className={`px-4 py-2 rounded-[18px] font-medium transition-colors ${
                    isActivePage('/upload') ? 'text-[#6366F1]' : 'text-[#6B7280]'
                  }`}
                >
                  Analyze
                </button>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateTo('/login')}
                    className="text-[#6366F1] px-4 py-2 rounded-[18px] font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigateTo('/signup')}
                    className="bg-[#6366F1] text-white px-6 py-3 rounded-[18px] font-medium shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)]"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateTo('/upload')}
                    className="bg-[#6366F1] text-white px-6 py-3 rounded-[18px] font-medium shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)]"
                  >
                    Analyze Document
                  </button>
                  <button
                    onClick={logout}
                    className="text-[#6B7280] px-4 py-2 rounded-[18px] font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {children}
      </main>
    </div>
  );
}
