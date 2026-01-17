import React from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen, Brain } from 'lucide-react';

interface IntroSectionProps {
  onComplete: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onComplete }) => {
  const features = [
    {
      icon: <Star className="w-12 h-12" />,
      title: 'Tư tưởng Hồ Chí Minh',
      description: 'Hệ thống kiến thức toàn diện về tư tưởng và di sản văn hóa',
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'AI Trợ lý thông minh',
      description: 'Công nghệ LightRAG + Gemini hỗ trợ học tập hiệu quả',
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Lịch sử Đảng',
      description: 'Khám phá hành trình vẻ vang của Đảng Cộng sản Việt Nam',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-party-red-50 via-party-gold-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Star Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <svg className="w-24 h-24 text-party-gold-500 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="absolute inset-0 bg-party-gold-500 blur-2xl opacity-40" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-party-red-700 mb-4"
          >
            Light of the Party
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-party-gold-600 mb-8 font-semibold"
          >
            Ánh Sáng Soi Đường
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Nền tảng học tập AI tiên tiến về tư tưởng Hồ Chí Minh và lịch sử Đảng Cộng sản Việt Nam.
            Kết hợp công nghệ LightRAG với Gemini AI để mang đến trải nghiệm học tập hiện đại.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="text-party-red-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="px-12 py-4 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-bold text-lg rounded-full shadow-party-lg hover:shadow-party-xl hover:scale-105 transition-all"
          >
            Bắt đầu khám phá →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroSection;
