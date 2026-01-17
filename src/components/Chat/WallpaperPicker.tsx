import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Link } from 'lucide-react';
import { WallpaperConfig, WallpaperType } from '@/types';

interface WallpaperPickerProps {
  currentConfig: WallpaperConfig;
  onSelect: (config: WallpaperConfig) => void;
  onClose: () => void;
}

const PRESET_WALLPAPERS: Array<{ type: WallpaperType; name: string; preview: string }> = [
  {
    type: 'default',
    name: 'Mặc định',
    preview: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  {
    type: 'party',
    name: 'Đảng',
    preview: 'linear-gradient(135deg, rgba(178, 34, 34, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%)',
  },
  {
    type: 'stars',
    name: 'Sao đêm',
    preview: '#0f0f1a',
  },
];

const WallpaperPicker: React.FC<WallpaperPickerProps> = ({
  currentConfig,
  onSelect,
  onClose,
}) => {
  const [customUrl, setCustomUrl] = useState(currentConfig.customUrl || '');
  const [showCustomInput, setShowCustomInput] = useState(currentConfig.type === 'custom');

  const handlePresetSelect = (type: WallpaperType) => {
    onSelect({ type });
  };

  const handleCustomSubmit = () => {
    if (customUrl.trim()) {
      onSelect({ type: 'custom', customUrl: customUrl.trim() });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white border-b border-gray-200 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800 text-sm">Chọn hình nền chat</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* Preset wallpapers */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {PRESET_WALLPAPERS.map((wallpaper) => (
          <button
            key={wallpaper.type}
            onClick={() => handlePresetSelect(wallpaper.type)}
            className={`relative rounded-lg overflow-hidden h-16 border-2 transition-all ${
              currentConfig.type === wallpaper.type && !showCustomInput
                ? 'border-party-gold-500 ring-2 ring-party-gold-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div
              className="absolute inset-0"
              style={{ background: wallpaper.preview }}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <span className="text-xs font-medium text-gray-700 bg-white/80 px-2 py-0.5 rounded">
                {wallpaper.name}
              </span>
            </div>
            {currentConfig.type === wallpaper.type && !showCustomInput && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-party-gold-500 rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Custom URL input */}
      <div className="space-y-2">
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className={`flex items-center gap-2 text-sm ${
            showCustomInput ? 'text-party-red-600' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Link size={14} />
          Dùng URL tùy chỉnh
        </button>

        {showCustomInput && (
          <div className="flex gap-2">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-party-red-500"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!customUrl.trim()}
              className="px-3 py-2 bg-party-red-500 text-white rounded-lg text-sm hover:bg-party-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Áp dụng
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WallpaperPicker;
