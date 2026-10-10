'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, ChevronDown, Pause, Play } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { DoshaEmblem } from './Logo';
import MagneticButton from './MagneticButton';

interface HeroProps {
  onOpenBooking: () => void;
}

const SLIDE_DURATION = 3000; // 3 seconds per slide

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const tGallery = useTranslations('gallery.images');
  const shouldReduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);

  const images = siteConfig.images.slideshow;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Manage slideshow timer with pause / resume
  useEffect(() => {
    if (isPaused || userPaused || shouldReduceMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, userPaused, nextSlide, shouldReduceMotion]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStart(null);
  };

  // Preload the next image
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <section
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden select-none bg-ink flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Dosha Hotel Hero Gallery"
    >
      {/* Hidden preloader for the next slide */}
      <link rel="preload" as="image" href={images[nextIndex]} />

      {/* Cinematic Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              className="relative w-full h-full"
              initial={{
                scale: currentIndex % 2 === 0 ? 1.0 : 1.08,
              }}
              animate={{
                scale: currentIndex % 2 === 0 ? 1.08 : 1.0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 3.6,
                ease: 'linear',
              }}
            >
              <Image
                src={images[currentIndex]}
                alt={`Dosha Hotel Adama - Slide ${currentIndex + 1}`}
                fill
                priority={currentIndex === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette & Deep Gradient Overlays for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />
      </div>

      {/* Top spacer for navbar */}
      <div className="pt-24 sm:pt-28" />

      {/* Hero Content (Centered, Bottom-Weighted, Clean, ONE sentence) */}
      <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center pb-24 sm:pb-28">
        {/* 1) Logo mark (small) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-6 sm:mb-8"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/40 flex items-center justify-center p-2 bg-ink/40 backdrop-blur-sm">
            <DoshaEmblem className="w-full h-full" />
          </div>
        </motion.div>

        {/* 2) ONE Short Elegant Headline (Large Serif) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory max-w-4xl tracking-tight leading-[1.15] text-balance mb-8 sm:mb-10 drop-shadow-lg"
        >
          {t('headline')}
        </motion.h1>

        {/* 3) One primary gold "Book Now" button + one text-style "Call Us" link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 w-full sm:w-auto"
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={onOpenBooking}
              className="btn-gold w-full sm:w-auto text-center"
              id="hero-book-now-btn"
            >
              {t('bookCta')}
            </button>
          </MagneticButton>

          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 text-sand hover:text-gold-light transition-colors text-xs font-semibold uppercase tracking-[0.18em] py-2 link-gold-underline"
            id="hero-call-btn"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>{t('callCta')}</span>
          </a>
        </motion.div>

        {/* Animated subtle scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 sm:mt-12 flex flex-col items-center gap-1.5 cursor-pointer text-sand/60 hover:text-gold transition-colors"
          onClick={() => {
            const nextEl = document.getElementById('about');
            if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
            {tCommon('scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-gold/80" />
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators: 9 short lines/dots with gold progress bar fill + Assistive Pause */}
      <div className="relative z-10 w-full pb-6 px-4 flex items-center justify-center gap-4">
        {/* Assistive Pause/Resume Toggle */}
        <button
          onClick={() => setUserPaused(!userPaused)}
          className="p-1.5 rounded-full text-sand/60 hover:text-gold transition-colors bg-charcoal/40 backdrop-blur border border-graphite/40"
          aria-label={userPaused ? tCommon('playSlideshow') : tCommon('pauseSlideshow')}
          title={userPaused ? tCommon('playSlideshow') : tCommon('pauseSlideshow')}
        >
          {userPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>

        {/* 9 Slide Indicators with 3-second animated gold fill */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Slideshow indicators">
          {images.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}`}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                style={{
                  width: isActive ? 36 : 14,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                {isActive && (
                  <motion.div
                    key={`progress-${currentIndex}-${userPaused || isPaused ? 'paused' : 'running'}`}
                    initial={{ width: '0%' }}
                    animate={{ width: userPaused || isPaused ? '0%' : '100%' }}
                    transition={{
                      duration: userPaused || isPaused ? 0 : SLIDE_DURATION / 1000,
                      ease: 'linear',
                    }}
                    className="h-full bg-gold-gradient rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
