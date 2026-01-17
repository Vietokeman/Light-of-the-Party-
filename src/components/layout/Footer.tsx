import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-party-red-700 via-party-red-600 to-party-red-800 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-10 h-10 text-party-gold-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div>
                <h3 className="text-xl font-bold">Light of the Party</h3>
                <p className="text-sm text-white/70">Ánh Sáng Soi Đường</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Nền tảng học tập AI về Tư tưởng Hồ Chí Minh và Lịch sử Đảng Cộng sản Việt Nam.
              Sử dụng công nghệ LightRAG + Gemini để mang lại trải nghiệm học tập tối ưu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-party-gold-400 mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white text-sm transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/ai-usage" className="text-white/80 hover:text-white text-sm transition">
                  Báo cáo kỹ thuật AI
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white text-sm transition">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold text-party-gold-400 mb-4">Công nghệ sử dụng</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-party-gold-400 rounded-full" />
                <span className="text-white/80 text-sm">React + TypeScript + Vite</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-party-gold-400 rounded-full" />
                <span className="text-white/80 text-sm">Firebase Auth & Firestore</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-party-gold-400 rounded-full" />
                <span className="text-white/80 text-sm">LightRAG + Gemini AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-party-gold-400 rounded-full" />
                <span className="text-white/80 text-sm">Tailwind CSS + Framer Motion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm flex items-center gap-1">
              © {currentYear} Light of the Party. Made with{' '}
              <Heart size={14} className="text-party-gold-400 fill-current" />
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-white/60 hover:text-white transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
