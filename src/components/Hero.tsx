'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, Pause, Play } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface HeroProps {
  onOpenBooking: () => void;
}

const SLIDE_DURATION = 3000; // Exactly 3 seconds per slide

// Exact 9 clip-path transitions cycled in order:
// (1) circle expanding from the center
// (2) curtain wipe from the bottom
// (3) diagonal wipe
// (4) vertical blinds (5 slats)
// (5) arch growing from its base
// (6) horizontal split opening from the middle
// (7) circle expanding from a corner
// (8) soft zoom-through
// (9) slats from the top
const CLIP_PATH_VARIANTS = [
  // 0: Circle expanding from center
  {
    initial: { clipPath: 'circle(0% at 50% 50%)', scale: 1.15 },
    animate: { clipPath: 'circle(150% at 50% 50%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 1: Curtain wipe from the bottom
  {
    initial: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.15 },
    animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 2: Diagonal wipe
  {
    initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.15 },
    animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 3: Vertical blinds (5 slats simulated with clip-path polygon or multi-rect)
  {
    initial: { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.15 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 4: Arch growing from its base
  {
    initial: { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)', scale: 1.15 },
    animate: { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 5: Horizontal split opening from middle
  {
    initial: { clipPath: 'inset(50% 0% 50% 0%)', scale: 1.15 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 6: Circle expanding from a corner (bottom-left)
  {
    initial: { clipPath: 'circle(0% at 0% 100%)', scale: 1.15 },
    animate: { clipPath: 'circle(180% at 0% 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  // 7: Soft zoom-through
  {
    initial: { clipPath: 'inset(15% 15% 15% 15% round 30px)', scale: 1.25, opacity: 0 },
    animate: { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1.0, opacity: 1 },
    exit: { opacity: 0 },
  },
  // 8: Slats from the top
  {
    initial: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', scale: 1.15 },
    animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const shouldReduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const images = siteConfig.images.slideshow;
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Slideshow timer (3s per slide)
  useEffect(() => {
    if (isPaused || userPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, userPaused, nextSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(null);
  };

  const nextIndex = (currentIndex + 1) % images.length;
  const currentTransition = CLIP_PATH_VARIANTS[currentIndex % CLIP_PATH_VARIANTS.length];

  return (
    <section
      className="relative w-full min-h-screen bg-paper overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Dosha Hotel Hero Arch Presentation"
    >
      {/* Preload next image to ensure no blank frame */}
      <link rel="preload" as="image" href={images[nextIndex]} />

      {/* Background Subtle Warm Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(239,229,211,0.65),transparent_70%)] pointer-events-none" />

      {/* Evening Mode Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-bronze/10 via-transparent to-transparent pointer-events-none opacity-0 [[data-theme='evening']_&]:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Half: Huge Cormorant Headline, One Short Sentence, Overlapping Arch Edge */}
          <div className="lg:col-span-6 z-20 flex flex-col justify-center pr-0 lg:pr-6">
            {/* Split-text rise headline */}
            <div className="overflow-hidden mb-8 sm:mb-10">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                className="font-serif text-[clamp(44px,7vw,104px)] font-light text-ink leading-[1.0] tracking-[-0.02em] text-balance"
              >
                Where Adama’s <span className="italic font-normal">warmth</span> meets quiet luxury.
              </motion.h1>
            </div>

            {/* Below Headline: Bronze "Book Now" Button + Quiet "Call Us" Link. Nothing Else. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 sm:gap-8"
            >
              <button
                onClick={onOpenBooking}
                className="btn-bronze text-center shadow-soft"
                id="hero-book-now-pill"
              >
                {t('bookCta')}
              </button>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-ink-soft hover:text-bronze transition-colors py-2"
                id="hero-call-link"
              >
                <Phone className="w-3.5 h-3.5 text-bronze" />
                <span>{t('callCta')}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Half: Large Tall ARCH-shaped Image Frame (rounded top, 82vh on desktop) */}
          <div className="lg:col-span-6 z-10 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-[540px] h-[58vh] sm:h-[68vh] lg:h-[82vh] arch-mask overflow-hidden border border-sand/60 bg-champagne shadow-soft">
              {/* Slideshow inside Arch Frame */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : currentTransition.initial
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : currentTransition.animate
                  }
                  exit={currentTransition.exit}
                  transition={{
                    duration: shouldReduceMotion ? 0.3 : 1.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="absolute inset-0 w-full h-full overflow-hidden"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Dosha Hotel Adama - Slide ${currentIndex + 1}`}
                    fill
                    priority={currentIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  {/* Soft daylight vignette inside arch */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Progress Line + 01 / 09 Indicator + Accessible Pause Control */}
              <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between px-4 py-2.5 rounded-pill bg-white/80 backdrop-blur-md border border-sand/60 shadow-sm">
                {/* 01 / 09 Clickable counter */}
                <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-ink font-medium select-none">
                  <span>0{currentIndex + 1}</span>
                  <span className="text-sand">/</span>
                  <span className="text-ink-soft">0{images.length}</span>
                </div>

                {/* Thin bronze progress line filling over 3s */}
                <div className="flex-1 mx-4 h-[2px] bg-sand/40 rounded-full overflow-hidden">
                  <motion.div
                    key={`line-${currentIndex}-${userPaused || isPaused ? 'paused' : 'active'}`}
                    initial={{ width: '0%' }}
                    animate={{ width: userPaused || isPaused ? '0%' : '100%' }}
                    transition={{
                      duration: userPaused || isPaused ? 0 : SLIDE_DURATION / 1000,
                      ease: 'linear',
                    }}
                    className="h-full bg-bronze"
                  />
                </div>

                {/* Visible Pause Control */}
                <button
                  onClick={() => setUserPaused(!userPaused)}
                  className="p-1 rounded-full text-ink-soft hover:text-bronze transition-colors"
                  aria-label={userPaused ? tCommon('playSlideshow') : tCommon('pauseSlideshow')}
                  title={userPaused ? tCommon('playSlideshow') : tCommon('pauseSlideshow')}
                >
                  {userPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
