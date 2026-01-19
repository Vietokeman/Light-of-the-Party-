import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Image, Save, Loader, Check, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UploadService } from '@/services/cloudinaryService';

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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File, type: 'avatar' | 'background') => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Kích thước file không được vượt quá 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh');
      return;
    }

    try {
      if (type === 'avatar') {
        setUploadingAvatar(true);
      } else {
        setUploadingBackground(true);
      }

      setError(null);
      const url = await UploadService(file);

      if (url) {
        if (type === 'avatar') {
          setPhotoURL(url);
        } else {
          setCustomBackground(url);
        }
      } else {
        setError('Upload thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi upload ảnh');
    } finally {
      setUploadingAvatar(false);
      setUploadingBackground(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Only include fields that have values
      const updates: any = {};

      if (displayName.trim()) {
        updates.displayName = displayName.trim();
      }

      if (photoURL.trim()) {
        updates.photoURL = photoURL.trim();
      }

      if (customBackground.trim()) {
        updates.customBackground = customBackground.trim();
      }

      // Only update if there are changes
      if (Object.keys(updates).length === 0) {
        setError('Vui lòng nhập ít nhất một thông tin để cập nhật');
        setIsLoading(false);
        return;
      }

      await updateUserProfile(updates);
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                {/* Avatar URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ảnh đại diện
                  </label>

                  {/* Preview */}
                  {photoURL && (
                    <div className="mb-2 flex justify-center">
                      <img
                        src={photoURL}
                        alt="Avatar preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96';
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    {/* File upload button */}
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="w-full py-2 px-4 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-medium rounded-lg hover:shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploadingAvatar ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Đang upload...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload ảnh đại diện
                        </>
                      )}
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'avatar');
                      }}
                      className="hidden"
                    />

                    {/* URL input */}
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="hoặc dán URL ảnh"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent text-gray-900 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Chat Background URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hình nền chat
                  </label>

                  {/* Preview */}
                  {customBackground && (
                    <div className="mb-2 rounded-lg overflow-hidden h-32 relative">
                      <img
                        src={customBackground}
                        alt="Background preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Xem trước hình nền
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {/* File upload button */}
                    <button
                      type="button"
                      onClick={() => backgroundInputRef.current?.click()}
                      disabled={uploadingBackground}
                      className="w-full py-2 px-4 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-medium rounded-lg hover:shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploadingBackground ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Đang upload...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload hình nền
                        </>
                      )}
                    </button>
                    <input
                      ref={backgroundInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'background');
                      }}
                      className="hidden"
                    />

                    {/* URL input */}
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="url"
                        value={customBackground}
                        onChange={(e) => setCustomBackground(e.target.value)}
                        placeholder="hoặc dán URL ảnh"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500 focus:border-transparent text-gray-900 text-sm"
                      />
                    </div>
                  </div>
                </div>

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
