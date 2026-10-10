'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const DoshaEmblem: React.FC<{
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}> = ({
  className = 'w-8 h-8',
  strokeColor = '#C9A24B',
  fillColor = 'none',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dosha Hotel Emblem"
    >
      <defs>
        <linearGradient id="doshaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6C979" />
          <stop offset="55%" stopColor="#C9A24B" />
          <stop offset="100%" stopColor="#9C7A2E" />
        </linearGradient>
      </defs>

      {/* Elegant Arch Sanctuary Outer Frame */}
      <path
        d="M 22 80 L 22 46 C 22 30.5 34.5 18 50 18 C 65.5 18 78 30.5 78 46 L 78 80"
        stroke="url(#doshaGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Inner Fine Accent Arch */}
      <path
        d="M 28 80 L 28 48 C 28 35.8 37.8 26 50 26 C 62.2 26 72 35.8 72 48 L 72 80"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stylized Sun Rise at Center */}
      <circle
        cx="50"
        cy="48"
        r="7.5"
        fill="url(#doshaGoldGrad)"
      />

      {/* Rising Mountain Ridges of Adama */}
      <path
        d="M 26 78 L 44 56 L 56 68 L 74 52"
        stroke="url(#doshaGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Fine Horizon Base Line */}
      <line
        x1="18"
        y1="82"
        x2="82"
        y2="82"
        stroke="url(#doshaGoldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  orientation = 'horizontal',
  size = 'md',
  className = '',
  showText = true,
}) => {
  const locale = useLocale();

  const textColor =
    variant === 'dark' ? 'text-ink' : variant === 'gold' ? 'text-gold' : 'text-ivory';
  const subTextColor =
    variant === 'dark' ? 'text-neutral-700' : 'text-sand/80';

  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg tracking-[0.25em]',
    md: 'text-2xl tracking-[0.28em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.32em]',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.22em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
  };

  return (
    <Link
      href={`/${locale}`}
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
        orientation === 'vertical' ? 'flex-col text-center' : 'flex-row'
      } ${className}`}
      aria-label="Dosha Hotel Adama Home"
    >
      <div className="relative transform transition-transform duration-500 group-hover:scale-105">
        <DoshaEmblem className={emblemSizes[size]} />
      </div>

      {showText && (
        <div className={`flex flex-col ${orientation === 'vertical' ? 'items-center' : 'items-start'}`}>
          <span
            className={`font-serif font-light uppercase leading-none transition-colors duration-300 ${textColor} ${titleSizes[size]}`}
          >
            DOSHA
          </span>
          <span
            className={`font-sans font-medium uppercase mt-1 ${subTextColor} ${subSizes[size]}`}
          >
            HOTEL · ADAMA
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
