'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check session storage to avoid replay on repeat visits within same session
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem('dosha_splash_viewed');
      if (hasLoaded) {
        setIsVisible(false);
        return;
      }
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('dosha_splash_viewed', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink"
        >
          <div className="relative flex flex-col items-center">
            {/* SVG Logo Stroke Animation */}
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 mb-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="splashGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E6C979" />
                  <stop offset="55%" stopColor="#C9A24B" />
                  <stop offset="100%" stopColor="#9C7A2E" />
                </linearGradient>
              </defs>

              {/* Arch outline */}
              <motion.path
                d="M 22 80 L 22 46 C 22 30.5 34.5 18 50 18 C 65.5 18 78 30.5 78 46 L 78 80"
                stroke="url(#splashGold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />

              {/* Inner arch */}
              <motion.path
                d="M 28 80 L 28 48 C 28 35.8 37.8 26 50 26 C 62.2 26 72 35.8 72 48 L 72 80"
                stroke="#C9A24B"
                strokeWidth="1"
                strokeOpacity="0.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.1, delay: 0.15, ease: 'easeInOut' }}
              />

              {/* Sunrise center */}
              <motion.circle
                cx="50"
                cy="48"
                r="7"
                fill="url(#splashGold)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              />

              {/* Mountain ridges */}
              <motion.path
                d="M 26 78 L 44 56 L 56 68 L 74 52"
                stroke="url(#splashGold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: 'easeInOut' }}
              />

              {/* Horizon baseline */}
              <motion.line
                x1="18"
                y1="82"
                x2="82"
                y2="82"
                stroke="url(#splashGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              />
            </svg>

            {/* Wordmark Fade In */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-serif text-2xl tracking-[0.35em] text-ivory uppercase"
            >
              DOSHA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[10px] tracking-[0.3em] text-sand/80 uppercase mt-1"
            >
              HOTEL · ADAMA
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
