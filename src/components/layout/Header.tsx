import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, Users, ImageIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginModal, ProfileSettingsModal } from '@/components/Auth';
import VisitorCounter from './VisitorCounter';
import { UserStats } from '@/components/Stats';

const navItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Trò chuyện AI', href: '/chat' },
  { label: 'Trò chơi Hangman', href: '/hangman' },
  { label: 'Báo cáo AI', href: '/ai-usage' },
  { label: 'Giới thiệu', href: '/about' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { user, userProfile, isAuthenticated, signOut } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <svg className="w-8 h-8 text-party-gold-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div className="absolute inset-0 bg-party-gold-500 blur-lg opacity-30 group-hover:opacity-50 transition" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-party-red-700 leading-tight">
                  Light of the Party
                </h1>
                <p className="text-xs text-party-red-600/70 hidden sm:block">
                  Ánh Sáng Soi Đường
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-party-red-600'
                      : 'text-gray-700 hover:text-party-red-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: User Stats + Visitor Counter + Auth */}
            <div className="flex items-center gap-4">
              {/* User Stats */}
              <div className="hidden lg:block">
                <UserStats />
              </div>
              
              {/* Visitor Counter */}
              <VisitorCounter />

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition"
                  >
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt={userProfile.displayName || 'Avatar'}
                        className="w-8 h-8 rounded-full object-cover border-2 border-party-gold-400"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-party-red-500 to-party-gold-500 flex items-center justify-center text-white">
                        <User size={16} />
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-800 truncate">
                            {userProfile?.displayName || 'Người dùng'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                        {userProfile?.photoURL && (
                          <button
                            onClick={() => {
                              setShowAvatarPreview(true);
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                          >
                            <ImageIcon size={16} />
                            Xem ảnh đại diện
                          </button>
                        )}
                        
                        
                        <button
                          onClick={() => {
                            setShowProfileModal(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Settings size={16} />
                          Cài đặt hồ sơ
                        </button>
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition"
                >
                  <User size={16} />
                  Đăng nhập
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-sm font-medium ${
                      location.pathname === item.href
                        ? 'text-party-red-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-medium rounded-lg"
                  >
                    <User size={16} />
                    Đăng nhập
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <ProfileSettingsModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      
      {/* Avatar Preview Modal */}
      <AnimatePresence>
        {showAvatarPreview && userProfile?.photoURL && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarPreview(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAvatarPreview(false)}
                  className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
                >
                  <X size={32} />
                </button>
                <img
                  src={userProfile.photoURL}
                  alt={userProfile.displayName || 'Avatar'}
                  className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <p className="text-white font-semibold text-lg">
                    {userProfile.displayName || 'Ảnh đại diện'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
