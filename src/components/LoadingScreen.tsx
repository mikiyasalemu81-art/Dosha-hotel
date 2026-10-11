'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const hasLoaded = sessionStorage.getItem('dosha_splash_viewed_v2');
        if (hasLoaded) {
          setIsVisible(false);
          return;
        }

        const timer = setTimeout(() => {
          setIsVisible(false);
          try {
            sessionStorage.setItem('dosha_splash_viewed_v2', 'true');
          } catch {}
        }, 1200);

        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="v2-splash"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-paper shadow-2xl"
        >
          <div className="relative flex flex-col items-center">
            {/* SVG Logo Stroke Animation on Paper */}
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 mb-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="splashBronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D2A95F" />
                  <stop offset="100%" stopColor="#8A6A3B" />
                </linearGradient>
              </defs>

              {/* Arch outline stroke */}
              <motion.path
                d="M 22 82 L 22 46 C 22 30.5 34.5 18 50 18 C 65.5 18 78 30.5 78 46 L 78 82"
                stroke="url(#splashBronzeGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Inner arch */}
              <motion.path
                d="M 28 82 L 28 48 C 28 35.8 37.8 26 50 26 C 62.2 26 72 35.8 72 48 L 72 82"
                stroke="#D8C8AA"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Sunrise center */}
              <motion.circle
                cx="50"
                cy="46"
                r="7"
                fill="url(#splashBronzeGrad)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
              />

              {/* Mountain ridges */}
              <motion.path
                d="M 26 80 L 44 58 L 56 69 L 74 53"
                stroke="url(#splashBronzeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.3, ease: 'easeInOut' }}
              />

              {/* Horizon baseline */}
              <motion.line
                x1="18"
                y1="84"
                x2="82"
                y2="84"
                stroke="url(#splashBronzeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </svg>

            {/* Spaced Cormorant Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-serif text-2xl tracking-[0.38em] text-ink uppercase"
            >
              DOSHA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[10px] tracking-[0.3em] text-ink-soft uppercase mt-1 font-sans"
            >
              HOTEL ADAMA
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
