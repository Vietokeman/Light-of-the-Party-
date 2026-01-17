import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, BookOpen } from 'lucide-react';
import { Card, Badge } from '@/components/common';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-party-red-700 via-party-red-600 to-party-red-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="gold" className="mb-6">Về chúng tôi</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Light of the Party
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Dự án học tập AI về Tư tưởng Hồ Chí Minh và Lịch sử Đảng Cộng sản Việt Nam,
              được xây dựng với tâm huyết và công nghệ hiện đại.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Sứ mệnh của chúng tôi
                </h2>
                <p className="text-gray-600 mb-4">
                  Ánh Sáng Soi Đường - Light of the Party được tạo ra với mục đích 
                  mang Tư tưởng Hồ Chí Minh và kiến thức về Lịch sử Đảng đến gần hơn 
                  với thế hệ trẻ thông qua công nghệ AI hiện đại.
                </p>
                <p className="text-gray-600">
                  Chúng tôi tin rằng việc học tập lịch sử và tư tưởng cách mạng 
                  có thể trở nên thú vị và tương tác hơn với sự hỗ trợ của 
                  trí tuệ nhân tạo.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card variant="party" className="p-4 text-center">
                  <Target className="mx-auto mb-2 text-party-red-500" size={32} />
                  <div className="font-bold text-gray-900">Mục tiêu</div>
                  <div className="text-sm text-gray-600">Giáo dục hiệu quả</div>
                </Card>
                <Card variant="party" className="p-4 text-center">
                  <Heart className="mx-auto mb-2 text-party-red-500" size={32} />
                  <div className="font-bold text-gray-900">Đam mê</div>
                  <div className="text-sm text-gray-600">Công nghệ & Lịch sử</div>
                </Card>
                <Card variant="party" className="p-4 text-center">
                  <Users className="mx-auto mb-2 text-party-red-500" size={32} />
                  <div className="font-bold text-gray-900">Cộng đồng</div>
                  <div className="text-sm text-gray-600">Học tập cùng nhau</div>
                </Card>
                <Card variant="party" className="p-4 text-center">
                  <BookOpen className="mx-auto mb-2 text-party-red-500" size={32} />
                  <div className="font-bold text-gray-900">Kiến thức</div>
                  <div className="text-sm text-gray-600">Luôn cập nhật</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Giá trị cốt lõi
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card variant="default" className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chính xác</h3>
                <p className="text-gray-600 text-sm">
                  Thông tin được trích dẫn từ nguồn đáng tin cậy, đảm bảo 
                  tính chính xác của mọi câu trả lời.
                </p>
              </Card>

              <Card variant="default" className="p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nhanh chóng</h3>
                <p className="text-gray-600 text-sm">
                  Phản hồi streaming trong 3-5 giây, mang lại trải nghiệm 
                  học tập mượt mà và hiệu quả.
                </p>
              </Card>

              <Card variant="default" className="p-6">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo mật</h3>
                <p className="text-gray-600 text-sm">
                  Dữ liệu người dùng được bảo vệ với Firebase Authentication 
                  và các tiêu chuẩn bảo mật cao nhất.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-gradient-to-r from-party-red-600 to-party-gold-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-white/50 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            <blockquote className="text-2xl md:text-3xl font-serif text-white mb-6 italic">
              "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam"
            </blockquote>
            <cite className="text-white/80 not-italic">— Chủ tịch Hồ Chí Minh</cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
