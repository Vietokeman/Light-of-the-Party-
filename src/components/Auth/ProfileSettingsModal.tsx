import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Image, Save, Loader, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateUserProfile } = useAuth();
  
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL || '');
  const [customBackground, setCustomBackground] = useState(userProfile?.customBackground || '');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateUserProfile({
        displayName: displayName.trim() || undefined,
        photoURL: photoURL.trim() || undefined,
        customBackground: customBackground.trim() || undefined,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

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
              {/* Header */}
              <div className="bg-gradient-to-r from-party-red-600 to-party-gold-500 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-4">
                  {/* Avatar preview */}
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    {photoURL ? (
                      <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-white/80" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Cài đặt hồ sơ</h2>
                    <p className="text-sm opacity-90">Tùy chỉnh thông tin cá nhân</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên hiển thị
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Nhập tên hiển thị"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Avatar URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Ảnh đại diện
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Dán URL hình ảnh từ internet
                  </p>
                </div>

                {/* Chat Background URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Hình nền chat
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={customBackground}
                      onChange={(e) => setCustomBackground(e.target.value)}
                      placeholder="https://example.com/background.jpg"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Hình nền sẽ hiển thị trong khung chat
                  </p>
                </div>

                {/* Preview */}
                {customBackground && (
                  <div className="rounded-lg overflow-hidden h-24 relative">
                    <img 
                      src={customBackground} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-white text-xs">
                      Xem trước hình nền
                    </span>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200">
                    ⚠️ {error}
                  </div>
                )}

                {/* Success message */}
                {success && (
                  <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm border border-green-200 flex items-center gap-2">
                    <Check size={16} />
                    Cập nhật thành công!
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
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Lưu thay đổi
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSettingsModal;
