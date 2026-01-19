import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, MessageCircle, Home, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendMessageToGemini } from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'model',
      content: 'Xin chào! 👋 Tôi là **Light of the Party Assistant** - trợ lý học tập chuyên về Tư tưởng Hồ Chí Minh.\n\n📚 Tôi sẽ trả lời dựa trên giáo trình **"Tư tưởng Hồ Chí Minh"** (Nhà xuất bản Chính trị quốc gia Sự thật, 2021).\n\n💡 Hãy hỏi tôi về:\n- Khái niệm Tư tưởng Hồ Chí Minh\n- Cơ sở hình thành và ý nghĩa\n- Phương pháp nghiên cứu\n- Các quan điểm cơ bản trong cách mạng Việt Nam',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check authentication on mount and when user changes
  useEffect(() => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setShowLoginPrompt(false);
    }
  }, [user]);

  const handleSendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const response = await sendMessageToGemini(input, conversationHistory as any);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white pt-16">
        <div className="container mx-auto h-[calc(100vh-4rem)] flex flex-col p-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-t-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MessageCircle size={32} />
                <div>
                  <h1 className="text-2xl font-bold">Light of the Party Assistant</h1>
                  <p className="text-sm opacity-90">Trợ lý Tư tưởng Hồ Chí Minh</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Trang chủ</span>
              </button>
            </div>
          </motion.div>

          {/* Messages Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1 bg-white shadow-xl overflow-hidden flex flex-col"
            style={userProfile?.customBackground ? {
              backgroundImage: `url(${userProfile.customBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : undefined}
          >
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
              {userProfile?.customBackground && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              )}
              
              <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl px-6 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white rounded-br-none shadow-lg'
                          : 'bg-white text-gray-800 border-2 border-gray-200 rounded-bl-none shadow-md'
                      }`}
                    >
                      <p className="text-base whitespace-pre-wrap break-words leading-relaxed">
                        {message.content.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line.includes('**') ? (
                              <>
                                {line.split(/(\*\*.*?\*\*)/).map((part, j) => (
                                  part.startsWith('**') ? (
                                    <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>
                                  ) : (
                                    <span key={j}>{part}</span>
                                  )
                                ))}
                              </>
                            ) : (
                              line
                            )}
                            {i < message.content.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white text-gray-800 px-6 py-4 rounded-2xl border-2 border-gray-200 rounded-bl-none flex items-center gap-3 shadow-md">
                      <Loader size={20} className="animate-spin text-red-600" />
                      <span className="text-base">Đang xử lý...</span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center"
                  >
                    <div className="bg-red-50 text-red-700 px-6 py-4 rounded-2xl border-2 border-red-200 shadow-md">
                      <p className="text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập câu hỏi của bạn về Tư tưởng Hồ Chí Minh..."
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 resize-none text-gray-900 placeholder-gray-400"
                    rows={2}
                    disabled={!user || isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || !user || isLoading}
                    className="px-6 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={20} />
                    <span className="hidden sm:inline font-medium">Gửi</span>
                  </button>
                </div>
                {!user && (
                  <p className="text-sm text-red-600 mt-2">
                    Vui lòng đăng nhập để sử dụng trợ lý AI
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-b-2xl p-4 shadow-xl text-center text-sm"
          >
            💡 Tài liệu tham khảo: Giáo trình "Tư tưởng Hồ Chí Minh" - NXB Chính trị quốc gia Sự thật, 2021
          </motion.div>
        </div>
      </div>

      {/* Login Prompt Dialog */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Yêu cầu đăng nhập
                </h2>
                <p className="text-gray-600">
                  Bạn cần đăng nhập để sử dụng trợ lý AI Tư tưởng Hồ Chí Minh
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    navigate('/?login=true');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-medium rounded-xl hover:shadow-lg transition"
                >
                  Đăng nhập
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatPage;
