import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Zap, 
  Search, 
  MessageSquare, 
  Shield,
  Code2,
  Layers,
  GitBranch,
  Check
} from 'lucide-react';
import { Card, Badge } from '@/components/common';

const AIUsagePage: React.FC = () => {
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
            <Badge variant="gold" className="mb-6">Báo cáo kỹ thuật</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cách chúng tôi sử dụng AI
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Báo cáo chi tiết về việc triển khai LightRAG và Gemini AI 
              để xử lý kiến thức về Tư tưởng Hồ Chí Minh và Lịch sử Đảng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tổng quan kiến trúc
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card variant="party" className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">LightRAG</h3>
                <p className="text-gray-600 text-sm">
                  Knowledge Base với Graph-based Retrieval
                </p>
              </Card>

              <Card variant="party" className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gemini AI</h3>
                <p className="text-gray-600 text-sm">
                  Large Language Model với Streaming Response
                </p>
              </Card>

              <Card variant="party" className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Firebase</h3>
                <p className="text-gray-600 text-sm">
                  Authentication & Firestore Database
                </p>
              </Card>
            </div>

            {/* Architecture Diagram */}
            <Card variant="party" className="p-8 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Luồng xử lý câu hỏi
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center p-4 bg-party-red-50 rounded-lg">
                  <MessageSquare className="mx-auto mb-2 text-party-red-600" size={24} />
                  <p className="text-sm font-medium text-gray-900">1. User Query</p>
                </div>
                <div className="hidden md:block text-party-gold-500">→</div>
                <div className="flex-1 text-center p-4 bg-party-gold-50 rounded-lg">
                  <Search className="mx-auto mb-2 text-party-gold-600" size={24} />
                  <p className="text-sm font-medium text-gray-900">2. LightRAG Retrieval</p>
                </div>
                <div className="hidden md:block text-party-gold-500">→</div>
                <div className="flex-1 text-center p-4 bg-party-red-50 rounded-lg">
                  <Layers className="mx-auto mb-2 text-party-red-600" size={24} />
                  <p className="text-sm font-medium text-gray-900">3. Context Augmentation</p>
                </div>
                <div className="hidden md:block text-party-gold-500">→</div>
                <div className="flex-1 text-center p-4 bg-party-gold-50 rounded-lg">
                  <Zap className="mx-auto mb-2 text-party-gold-600" size={24} />
                  <p className="text-sm font-medium text-gray-900">4. Gemini Generation</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* LightRAG Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-lg flex items-center justify-center">
                <Database className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">LightRAG</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600">
                <strong>LightRAG</strong> là hệ thống Retrieval-Augmented Generation dựa trên Graph,
                được thiết kế để xử lý và truy xuất thông tin từ kho kiến thức về 
                Tư tưởng Hồ Chí Minh và Lịch sử Đảng.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="default" className="p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <GitBranch className="text-party-red-500" size={20} />
                  Graph-based Knowledge
                </h4>
                <p className="text-gray-600 text-sm">
                  Xây dựng đồ thị kiến thức từ tài liệu, cho phép truy vấn ngữ nghĩa
                  và tìm kiếm mối quan hệ giữa các khái niệm.
                </p>
              </Card>

              <Card variant="default" className="p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Search className="text-party-red-500" size={20} />
                  Semantic Search
                </h4>
                <p className="text-gray-600 text-sm">
                  Tìm kiếm theo ngữ nghĩa, không chỉ từ khóa, giúp truy xuất
                  thông tin chính xác và phù hợp với ngữ cảnh.
                </p>
              </Card>

              <Card variant="default" className="p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="text-party-red-500" size={20} />
                  Context Enrichment
                </h4>
                <p className="text-gray-600 text-sm">
                  Làm giàu ngữ cảnh bằng cách truy xuất các tài liệu liên quan,
                  cung cấp cho LLM đầy đủ thông tin để trả lời.
                </p>
              </Card>

              <Card variant="default" className="p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Code2 className="text-party-red-500" size={20} />
                  Source Attribution
                </h4>
                <p className="text-gray-600 text-sm">
                  Trích dẫn nguồn gốc của thông tin, đảm bảo tính minh bạch
                  và khả năng kiểm chứng của câu trả lời.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gemini Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-party-red-500 to-party-gold-500 rounded-lg flex items-center justify-center">
                <Cpu className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Gemini AI</h2>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600">
                <strong>Google Gemini</strong> là Large Language Model được sử dụng để 
                tổng hợp thông tin và sinh câu trả lời. Chúng tôi sử dụng streaming 
                để tối ưu thời gian phản hồi xuống 3-5 giây.
              </p>
            </div>

            <Card variant="party" className="p-6 mb-8">
              <h4 className="font-bold text-gray-900 mb-4">Cấu hình sử dụng</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
{`{
  "model": "gemini-2.0-flash",
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 2048
  },
  "streaming": true
}`}
                </pre>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h5 className="font-medium text-gray-900">Streaming Response</h5>
                  <p className="text-sm text-gray-600">
                    Hiển thị từng phần của câu trả lời ngay khi được sinh ra,
                    giảm thời gian chờ đợi của người dùng.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h5 className="font-medium text-gray-900">System Prompt Tối ưu</h5>
                  <p className="text-sm text-gray-600">
                    Prompt được thiết kế chuyên biệt cho chủ đề Tư tưởng HCM,
                    đảm bảo câu trả lời chính xác và phù hợp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h5 className="font-medium text-gray-900">Context-Aware Generation</h5>
                  <p className="text-sm text-gray-600">
                    Kết hợp ngữ cảnh từ LightRAG để sinh câu trả lời có căn cứ
                    và có thể trích dẫn nguồn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gradient-to-br from-party-red-700 via-party-red-600 to-party-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React', desc: 'UI Framework' },
                { name: 'TypeScript', desc: 'Type Safety' },
                { name: 'Vite', desc: 'Build Tool' },
                { name: 'Tailwind CSS', desc: 'Styling' },
                { name: 'Firebase', desc: 'Auth & Database' },
                { name: 'Gemini AI', desc: 'LLM' },
                { name: 'LightRAG', desc: 'RAG System' },
                { name: 'Framer Motion', desc: 'Animations' },
              ].map((tech) => (
                <div key={tech.name} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="font-bold text-party-gold-400">{tech.name}</div>
                  <div className="text-sm text-white/70">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIUsagePage;
