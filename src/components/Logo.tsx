'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const DoshaEmblem: React.FC<{
  className?: string;
  isOpenDoor?: boolean;
}> = ({ className = 'w-8 h-8', isOpenDoor = false }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dosha Hotel Arch Emblem"
    >
      <defs>
        <linearGradient id="emblemBronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--bronze)" />
          <stop offset="100%" stopColor="var(--bronze-deep)" />
        </linearGradient>
      </defs>

      {/* Outer Arch Frame */}
      <path
        d="M 22 82 L 22 46 C 22 30.5 34.5 18 50 18 C 65.5 18 78 30.5 78 46 L 78 82"
        stroke="url(#emblemBronzeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Inner Fine Accent Arch */}
      <path
        d="M 28 82 L 28 48 C 28 35.8 37.8 26 50 26 C 62.2 26 72 35.8 72 48 L 72 82"
        stroke="var(--sand)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Double Door Left Wing (animates open when clicked) */}
      <motion.path
        d="M 50 82 L 32 82 L 32 50 C 32 40 40 32 50 32 Z"
        fill="none"
        stroke="var(--bronze)"
        strokeWidth="1"
        style={{ originX: 0.32, originY: 0.5 }}
        animate={{ rotateY: isOpenDoor ? -70 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Double Door Right Wing (animates open when clicked) */}
      <motion.path
        d="M 50 82 L 68 82 L 68 50 C 68 40 60 32 50 32 Z"
        fill="none"
        stroke="var(--bronze)"
        strokeWidth="1"
        style={{ originX: 0.68, originY: 0.5 }}
        animate={{ rotateY: isOpenDoor ? 70 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Stylized Sunrise over Ridges */}
      <circle
        cx="50"
        cy="46"
        r="7.5"
        fill="url(#emblemBronzeGrad)"
      />

      {/* Adama Ridges */}
      <path
        d="M 26 80 L 44 58 L 56 69 L 74 53"
        stroke="url(#emblemBronzeGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Baseline */}
      <line
        x1="18"
        y1="84"
        x2="82"
        y2="84"
        stroke="url(#emblemBronzeGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
}) => {
  const locale = useLocale();
  const [clickCount, setClickCount] = useState(0);
  const [isOpenDoor, setIsOpenDoor] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.26em]',
    md: 'text-xl tracking-[0.3em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.35em]',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.24em]',
    md: 'text-[10px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.3em]',
  };

  // Easter egg: Door swing and 5-click "Welcome home" toast
  const handleLogoClick = (e: React.MouseEvent) => {
    setIsOpenDoor(true);
    setTimeout(() => setIsOpenDoor(false), 800);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 5) {
      setShowToast(true);
      setClickCount(0);
      setTimeout(() => setShowToast(false), 3500);
    }
  };

  const welcomeMessages: { [key: string]: string } = {
    en: 'Welcome home to Dosha Hotel.',
    am: 'ወደ ዶሻ ሆቴል ቤትዎ እንኳን ደህና መጡ።',
    om: 'Baga gara manakeessan Hoteela Dooshaatti dhuftan.',
  };

  return (
    <div className="relative inline-flex items-center">
      <Link
        href={`/${locale}`}
        onClick={handleLogoClick}
        className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze select-none ${className}`}
        aria-label="Dosha Hotel Adama Home"
      >
        <div className="relative transform transition-transform duration-500 group-hover:scale-105">
          <DoshaEmblem className={emblemSizes[size]} isOpenDoor={isOpenDoor} />
        </div>

        {showText && (
          <div className="flex flex-col items-start leading-none">
            <span
              className={`font-serif font-light text-ink uppercase tracking-[0.28em] transition-colors duration-300 group-hover:text-bronze ${titleSizes[size]}`}
            >
              DOSHA
            </span>
            <span
              className={`font-sans font-medium text-ink-soft/80 uppercase mt-1 ${subSizes[size]}`}
            >
              HOTEL ADAMA
            </span>
          </div>
        )}
      </Link>

      {/* Hidden 5-Click Surprise Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-pill bg-white border border-sand text-ink shadow-soft text-xs font-serif flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
            <span>{welcomeMessages[locale] || welcomeMessages.en}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logo;
