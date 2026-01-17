import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Header, Footer, ScrollToTop } from '@/components/layout';
import { FloatingChatBot } from '@/components/Chat';
import { IntroLoader, IntroSection } from '@/components/Intro';
import { HomePage, AIUsagePage, AboutPage, HangmanPage } from '@/pages';

const App: React.FC = () => {
  const [showIntroLoader, setShowIntroLoader] = useState(true);
  const [showIntroSection, setShowIntroSection] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if intro has been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    if (introShown) {
      setShowIntroLoader(false);
      setShowIntroSection(false);
      setShowContent(true);
    }
  }, []);

  const handleIntroLoaderComplete = () => {
    setShowIntroLoader(false);
    setShowIntroSection(true);
  };

  const handleIntroSectionComplete = () => {
    setShowIntroSection(false);
    setShowContent(true);
    // Mark intro as shown for this session
    sessionStorage.setItem('introShown', 'true');
  };

  return (
    <AuthProvider>
      {/* Intro Loader */}
      {showIntroLoader && <IntroLoader onComplete={handleIntroLoaderComplete} />}

      {/* Intro Section */}
      {showIntroSection && <IntroSection onComplete={handleIntroSectionComplete} />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: showContent ? 'visible' : 'hidden' }}
      >
        <Router>
          {/* Global Floating ChatBot - Available on all routes */}
          <FloatingChatBot />

          <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white">
            <Header />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ai-usage" element={<AIUsagePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/hangman" element={<HangmanPage />} />
              </Routes>
            </main>
            
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
