import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithFacebook, signInWithEmail, signUpWithEmail, isLoading, error, clearError } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        if (!displayName.trim()) {
          setLocalError('Vui lòng nhập tên hiển thị');
          return;
        }
        await signUpWithEmail(email, password, displayName);
      }
      onClose();
      resetForm();
    } catch (err) {
      // Error is already set in context
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
      resetForm();
    } catch (err) {
      // Error is already set in context
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      onClose();
      resetForm();
    } catch (err) {
      // Error is already set in context
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setLocalError(null);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setLocalError(null);
    clearError();
  };

  const displayError = localError || error;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[61] p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Header with Party theme */}
              <div className="bg-gradient-to-r from-party-red-600 to-party-gold-500 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div>
                    <h2 className="text-xl font-bold">Light of the Party</h2>
                    <p className="text-sm opacity-90">Ánh Sáng Soi Đường</p>
                  </div>
                </div>
                <p className="text-sm opacity-80">
                  {mode === 'login' ? 'Đăng nhập để sử dụng trợ lý AI' : 'Tạo tài khoản mới'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    Tiếp tục với Google
                  </span>
                </button>

                {/* Facebook Sign In */}
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium">
                    Tiếp tục với Facebook
                  </span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">hoặc</span>
                  </div>
                </div>

                {/* Display Name (signup only) */}
                {mode === 'signup' && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Tên hiển thị"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Error message */}
                {displayError && (
                  <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200">
                    ⚠️ {displayError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    mode === 'login' ? 'Đăng nhập' : 'Đăng ký'
                  )}
                </button>

                {/* Switch mode */}
                <p className="text-center text-sm text-gray-600">
                  {mode === 'login' ? (
                    <>
                      Chưa có tài khoản?{' '}
                      <button
                        type="button"
                        onClick={switchMode}
                        className="text-party-red-600 font-medium hover:underline"
                      >
                        Đăng ký ngay
                      </button>
                    </>
                  ) : (
                    <>
                      Đã có tài khoản?{' '}
                      <button
                        type="button"
                        onClick={switchMode}
                        className="text-party-red-600 font-medium hover:underline"
                      >
                        Đăng nhập
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
