import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, MessageCircle, X, Minimize2, Maximize2, Lock } from 'lucide-react';
import { sendMessageToGemini } from '../../services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { LoginModal } from '@/components/Auth';

interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
}

const FloatingChatBot: React.FC = () => {
    const { user, userProfile } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
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

    const handleOpenChat = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        setIsOpen(true);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

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
            // Chuẩn bị lịch sử hội thoại cho Gemini
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
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        onClick={handleOpenChat}
                        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-2xl hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={user ? "Mở trợ lý Tư tưởng HCM" : "Vui lòng đăng nhập để sử dụng"}
                    >
                        {user ? <MessageCircle size={32} /> : <Lock size={32} />}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Login Prompt */}
            <AnimatePresence>
                {showLoginPrompt && (
                    <motion.div
                        className="fixed bottom-28 right-8 bg-white rounded-lg shadow-xl p-4 z-50 border-2 border-party-red-500"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <div className="flex items-center gap-2">
                            <Lock className="text-party-red-600" size={20} />
                            <p className="text-sm font-medium text-gray-900">
                                Vui lòng đăng nhập để sử dụng trợ lý AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-8 right-8 w-96 max-h-[calc(100vh-4rem)] rounded-2xl shadow-2xl overflow-hidden bg-white z-50 flex flex-col"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 20 }}
                        style={{ height: isMinimized ? 'auto' : '600px', maxHeight: 'calc(100vh - 4rem)' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MessageCircle size={24} />
                                <div>
                                    <h3 className="font-bold text-lg">Light of the Party</h3>
                                    <p className="text-xs opacity-90">Trợ lý Tư tưởng HCM</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="hover:bg-white/20 p-2 rounded-lg transition"
                                    title={isMinimized ? 'Mở rộng' : 'Thu gọn'}
                                >
                                    {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsMinimized(false);
                                    }}
                                    className="hover:bg-white/20 p-2 rounded-lg transition"
                                    title="Đóng"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        {!isMinimized && (
                            <>
                                <div
                                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative"
                                    style={userProfile?.customBackground ? {
                                        backgroundImage: `url(${userProfile.customBackground})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    } : undefined}
                                >
                                    {/* Overlay để text dễ đọc hơn khi có background */}
                                    {userProfile?.customBackground && (
                                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                                    )}

                                    <div className="relative z-10 space-y-4">
                                        {messages.map((message, index) => (
                                            <motion.div
                                                key={message.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs px-4 py-3 rounded-lg user-select-text select-text ${message.role === 'user'
                                                        ? 'bg-red-500 text-white rounded-br-none'
                                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                                        }`}
                                                >
                                                    <p className="text-sm whitespace-pre-wrap break-words">
                                                        {message.content.split('\n').map((line, i) => (
                                                            <React.Fragment key={i}>
                                                                {line.includes('**') ? (
                                                                    <>
                                                                        {line.split(/(\*\*.*?\*\*)/).map((part, j) => (
                                                                            part.startsWith('**') ? (
                                                                                <strong key={j}>{part.slice(2, -2)}</strong>
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
                                                </div>
                                            </motion.div>
                                        ))}

                                        {isLoading && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex justify-start"
                                            >
                                                <div className="bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-200 rounded-bl-none flex items-center gap-2">
                                                    <Loader size={16} className="animate-spin" />
                                                    <span className="text-sm">Đang xử lý...</span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex justify-center"
                                            >
                                                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200">
                                                    ⚠️ {error}
                                                </div>
                                            </motion.div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="border-t border-gray-200 p-4 bg-white">
                                    <div className="flex gap-2">
                                        <textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Hỏi về Tư tưởng Hồ Chí Minh..."
                                            rows={2}
                                            disabled={isLoading}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none disabled:bg-gray-100 text-sm text-gray-900 placeholder-gray-500 bg-white"
                                        />
                                        <motion.button
                                            onClick={handleSendMessage}
                                            disabled={isLoading || !input.trim()}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all h-fit"
                                        >
                                            <Send size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
};

export default FloatingChatBot;
