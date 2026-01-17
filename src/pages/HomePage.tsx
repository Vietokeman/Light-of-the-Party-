import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, Cpu, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button, Card, Badge, StarIcon } from '@/components/common';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-party-red-700 via-party-red-600 to-party-red-800" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 vn-pattern-overlay opacity-30" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Floating stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-party-gold-400"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <StarIcon size={20 + i * 5} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="gold" className="mb-6">
                🌟 AI-Powered Learning Platform
              </Badge>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block">Light of the Party</span>
              <span className="block text-party-gold-400 text-3xl md:text-4xl lg:text-5xl mt-2">
                Ánh Sáng Soi Đường
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            >
              Nền tảng học tập AI về Tư tưởng Hồ Chí Minh và Lịch sử Đảng Cộng sản Việt Nam.
              Sử dụng công nghệ LightRAG + Gemini để mang lại trải nghiệm học tập tối ưu.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="gold" size="lg">
                <MessageCircle className="mr-2" size={20} />
                Bắt đầu trò chuyện
              </Button>
              <Link to="/ai-usage">
                <Button variant="outline" size="lg">
                  <BookOpen className="mr-2" size={20} />
                  Tìm hiểu thêm
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-party-gold-400">AI</div>
                <div className="text-sm text-white/70">LightRAG + Gemini</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-party-gold-400">24/7</div>
                <div className="text-sm text-white/70">Hỗ trợ liên tục</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-party-gold-400">∞</div>
                <div className="text-sm text-white/70">Kiến thức</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="red" className="mb-4">Tính năng nổi bật</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trải nghiệm học tập thông minh
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Được xây dựng với công nghệ AI tiên tiến nhất để mang lại trải nghiệm học tập
              tương tác và hiệu quả.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card variant="party" className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">LightRAG + Gemini</h3>
              <p className="text-gray-600">
                Kết hợp công nghệ Retrieval-Augmented Generation với Gemini AI để cung cấp
                câu trả lời chính xác và có nguồn gốc rõ ràng.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card variant="party" className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Streaming Response</h3>
              <p className="text-gray-600">
                Phản hồi nhanh chóng với công nghệ streaming, đảm bảo thời gian chờ tối ưu
                từ 3-5 giây cho mỗi câu trả lời.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card variant="party" className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cá nhân hóa</h3>
              <p className="text-gray-600">
                Tùy chỉnh avatar, tên hiển thị và hình nền chat theo sở thích cá nhân.
                Tích hợp đăng nhập Firebase an toàn.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-party-red-600 to-party-gold-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn sàng khám phá?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Bắt đầu hành trình học tập về Tư tưởng Hồ Chí Minh và Lịch sử Đảng ngay hôm nay.
          </p>
          <Link to="/ai-usage">
            <Button variant="gold" size="lg">
              Xem báo cáo kỹ thuật AI
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
