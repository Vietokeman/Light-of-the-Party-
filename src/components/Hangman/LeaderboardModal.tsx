import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, X } from 'lucide-react';
import { getTopScores, HangmanScore } from '@/services/hangmanService';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [scores, setScores] = useState<HangmanScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadScores();
    }
  }, [isOpen]);

  const loadScores = async () => {
    setIsLoading(true);
    try {
      const topScores = await getTopScores(10);
      setScores(topScores);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Award className="text-orange-600" size={24} />;
      default:
        return <span className="text-gray-600 font-bold text-lg">#{rank}</span>;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 flex items-center justify-center z-[61] p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-party-red-600 to-party-gold-500 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <TrendingUp size={32} />
              <div>
                <h2 className="text-2xl font-bold">Bảng xếp hạng</h2>
                <p className="text-sm opacity-90">Top 10 người chơi xuất sắc nhất</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-party-red-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Đang tải bảng xếp hạng...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Chưa có ai chơi. Hãy là người đầu tiên!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scores.map((score, index) => (
                  <motion.div
                    key={score.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      index < 3 
                        ? 'bg-gradient-to-r from-party-gold-50 to-party-red-50 border-2 border-party-gold-300' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 flex justify-center">
                      {getRankIcon(index + 1)}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {score.userPhoto ? (
                        <img 
                          src={score.userPhoto} 
                          alt={score.userName}
                          className="w-10 h-10 rounded-full border-2 border-white shadow"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-party-red-500 text-white flex items-center justify-center font-bold">
                          {score.userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 truncate">
                          {score.userName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {score.correctAnswers}/{score.totalQuestions} đúng
                          {score.longestStreak > 0 && ` • Streak: ${score.longestStreak}`}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0">
                      <div className={`text-2xl font-bold ${
                        index < 3 ? 'text-party-red-600' : 'text-gray-700'
                      }`}>
                        {score.score}
                      </div>
                      <p className="text-xs text-gray-500 text-center">điểm</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LeaderboardModal;
