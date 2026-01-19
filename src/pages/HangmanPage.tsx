import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RotateCcw, Home, TrendingUp } from 'lucide-react';
import { hangmanWords, HangmanWord, normalizeVietnamese } from '@/data/hangman';
import { useAuth } from '@/context/AuthContext';
import { saveHangmanScore } from '@/services/hangmanService';
import LeaderboardModal from '@/components/Hangman/LeaderboardModal';

const MAX_WRONG_GUESSES = 6;
const TOTAL_QUESTIONS = 10;

const HangmanPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [usedWords, setUsedWords] = useState<HangmanWord[]>([]);
  const [currentWord, setCurrentWord] = useState<HangmanWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'finished'>('playing');
  const [showResult, setShowResult] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  // Initialize first word
  useEffect(() => {
    getNewWord();
  }, []);

  const getNewWord = useCallback(() => {
    const availableWords = hangmanWords.filter(
      w => !usedWords.find(used => used.word === w.word)
    );
    
    if (availableWords.length === 0 || currentQuestion > TOTAL_QUESTIONS) {
      setGameStatus('finished');
      return;
    }

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    setUsedWords(prev => [...prev, randomWord]);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
    setShowResult(false);
  }, [usedWords, currentQuestion]);

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!currentWord) return;

    // Check if letter is in word (normalized)
    const normalizedWord = normalizeVietnamese(currentWord.word);
    const normalizedLetter = normalizeVietnamese(letter);
    
    if (!normalizedWord.includes(normalizedLetter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      
      if (newWrong >= MAX_WRONG_GUESSES) {
        setGameStatus('lost');
        setStreak(0);
        setShowResult(true);
      }
    } else {
      // Check if word is complete
      const allLettersGuessed = normalizedWord
        .split('')
        .filter(c => c !== ' ')
        .every(c => Array.from(newGuessed).some(g => normalizeVietnamese(g) === c));
      const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak(prev => Math.max(prev, newStreak));
        setCorrectAnswers
      if (allLettersGuessed) {
        setGameStatus('won');
        const points = 100 + (streak * 50) + ((MAX_WRONG_GUESSES - wrongGuesses) * 20);
        setScore(prev => prev + points);
        setStreak(prev => prev + 1);
        setShowResult(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= TOTAL_QUESTIONS) {
      setGameStatus('finished');
      handleSaveScore();
    } else {
      setCurrentQuestion(prev => prev + 1);
      getNewWord();
    }
  };

  const handleSaveScore = async () => {
    if (!user || !userProfile || scoreSaved) return;
    
    try {
      await saveHangmanScore(
        user.uid,
        userProfile.displayName || 'Anonymous',
        score,
        TOTAL_QUESTIONS,
        correctAnswers,
        maxStreak,
        userProfile.photoURL
      );
      setScoreSaved(true);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(1);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);
    setUsedWords([]);
    setGameStatus('playing');
    setShowResult(false);
    setScoreSaved(false);
    getNewWord();
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;
      
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus, handleGuess]);

  if (!currentWord && gameStatus !== 'finished') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-party-red-50 via-party-gold-50 to-white p-4 overflow-auto">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-lg text-party-red-600 hover:text-party-red-700 font-medium transition-all hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-lg text-party-gold-600 hover:text-party-gold-700 font-medium transition-all hover:scale-105"
            >
              <TrendingUp size={20} />
              <span className="hidden sm:inline">Bảng xếp hạng</span>
            </button>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-sm text-gray-600">Câu {currentQuestion}/{TOTAL_QUESTIONS}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
              <Trophy className="w-5 h-5 text-party-gold-600" />
              <span className="font-bold text-party-red-600">{score}</span>
            </div>
          </div>
        </div>

        {gameStatus !== 'finished' && currentWord && (
          <>
            {/* Game Board */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              {/* Hint */}
              <div className="mb-6 text-center">
                <span className="inline-block bg-party-gold-100 text-party-red-700 px-4 py-2 rounded-lg">
                  <span className="font-bold">Gợi ý:</span> {currentWord.hint}
                </span>
              </div>

              {/* Hangman Drawing */}
              <div className="flex justify-center mb-6">
                <HangmanDrawing wrongGuesses={wrongGuesses} />
              </div>

              {/* Word Display */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {currentWord.word.split('').map((letter, index) => {
                  const normalized = normalizeVietnamese(letter);
                  const isSpace = letter === ' ';
                  const isGuessed = Array.from(guessedLetters).some(
                    g => normalizeVietnamese(g) === normalized
                  );
                  
                  return isSpace ? (
                    <div key={index} className="w-4" />
                  ) : (
                    <div
                      key={index}
                      className="w-12 h-16 flex items-center justify-center border-b-4 border-party-red-600"
                    >
                      <span className={`text-3xl font-bold text-party-red-700 ${isGuessed ? '' : 'opacity-0'}`}>
                        {letter}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Keyboard */}
              <div className="space-y-2">
                {[
                  'QWERTYUIOP',
                  'ASDFGHJKL',
                  'ZXCVBNM',
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1 flex-wrap">
                    {row.split('').map(letter => {
                      const isGuessed = guessedLetters.has(letter);
                      const isCorrect = currentWord.word.toUpperCase().includes(letter) || 
                                       normalizeVietnamese(currentWord.word).includes(normalizeVietnamese(letter));
                      
                      return (
                        <button
                          key={letter}
                          onClick={() => handleGuess(letter)}
                          disabled={isGuessed || gameStatus !== 'playing'}
                          className={`w-10 h-10 rounded-lg font-bold transition-all ${
                            !isGuessed
                              ? 'bg-party-red-500 text-white hover:bg-party-red-600'
                              : isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-300 text-gray-500'
                          } disabled:cursor-not-allowed`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Lives Display */}
            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: MAX_WRONG_GUESSES }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${
                    i < wrongGuesses ? 'bg-red-500' : 'bg-green-500'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Result Modal */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  gameStatus === 'won' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {gameStatus === 'won' ? '✓' : '✗'}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {gameStatus === 'won' ? 'Chính xác!' : 'Không chính xác!'}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  Đáp án: <span className="font-bold text-party-red-600">{currentWord?.word}</span>
                </p>
                
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  {currentQuestion >= TOTAL_QUESTIONS ? 'Xem kết quả' : 'Câu tiếp theo →'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Result */}
        {gameStatus === 'finished' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Trophy className="w-20 h-20 mx-auto mb-4 text-party-gold-500" />
            <h2 className="text-3xl font-bold mb-2">Hoàn thành!</h2>
            <div className="mb-6 space-y-2">
              <p className="text-2xl">
                Điểm số: <span className="font-bold text-party-red-600">{score}</span>
              </p>
              <p className="text-gray-600">
                Trả lời đúng: {correctAnswers}/{TOTAL_QUESTIONS} • Streak tối đa: {maxStreak}
              </p>
              {scoreSaved && (
                <p className="text-green-600 text-sm">✓ Điểm số đã được lưu vào bảng xếp hạng</p>
              )}
            </div>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-party-gold-600 text-party-gold-600 font-bold rounded-lg hover:bg-party-gold-50 transition"
              >
                <TrendingUp size={20} />
                Xem bảng xếp hạng
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-3 border-2 border-party-red-600 text-party-red-600 font-bold rounded-lg hover:bg-party-red-50 transition"
              >
                <Home size={20} />
                Trang chủ
              </button>
              <button
                onClick={handlePlayAgain}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-party-red-600 to-party-gold-500 text-white font-bold rounded-lg hover:shadow-lg transition"
              >
                <RotateCcw size={20} />
                Chơi lại
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Leaderboard Modal */}
      <LeaderboardModal 
        isOpen={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)} 
      />
    </div>
  );
};

// Hangman Drawing Component
const HangmanDrawing: React.FC<{ wrongGuesses: number }> = ({ wrongGuesses }) => {
  return (
    <svg className="w-64 h-64" viewBox="0 0 200 250">
      {/* Gallows */}
      <line x1="20" y1="230" x2="100" y2="230" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="230" x2="60" y2="20" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="20" x2="140" y2="20" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />

      {/* Head */}
      {wrongGuesses >= 1 && (
        <circle cx="140" cy="70" r="20" stroke="#B91C1C" strokeWidth="4" fill="none" />
      )}
      
      {/* Body */}
      {wrongGuesses >= 2 && (
        <line x1="140" y1="90" x2="140" y2="150" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
      )}
      
      {/* Left Arm */}
      {wrongGuesses >= 3 && (
        <line x1="140" y1="110" x2="110" y2="130" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
      )}
      
      {/* Right Arm */}
      {wrongGuesses >= 4 && (
        <line x1="140" y1="110" x2="170" y2="130" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
      )}
      
      {/* Left Leg */}
      {wrongGuesses >= 5 && (
        <line x1="140" y1="150" x2="120" y2="190" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
      )}
      
      {/* Right Leg */}
      {wrongGuesses >= 6 && (
        <line x1="140" y1="150" x2="160" y2="190" stroke="#B91C1C" strokeWidth="4" strokeLinecap="round" />
      )}
    </svg>
  );
};

export default HangmanPage;
