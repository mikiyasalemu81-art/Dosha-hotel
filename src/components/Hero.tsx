'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Pause, Play } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface HeroProps {
  onOpenBooking: () => void;
}

const SLIDE_DURATION = 3000;

const CLIP_PATH_VARIANTS = [
  {
    initial: { clipPath: 'circle(0% at 50% 50%)', scale: 1.15 },
    animate: { clipPath: 'circle(150% at 50% 50%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.15 },
    animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.15 },
    animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.15 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)', scale: 1.15 },
    animate: { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'inset(50% 0% 50% 0%)', scale: 1.15 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'circle(0% at 0% 100%)', scale: 1.15 },
    animate: { clipPath: 'circle(180% at 0% 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'inset(15% 15% 15% 15% round 30px)', scale: 1.25, opacity: 0 },
    animate: { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1.0, opacity: 1 },
    exit: { opacity: 0 },
  },
  {
    initial: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', scale: 1.15 },
    animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1.0 },
    exit: { opacity: 0 },
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  const images = siteConfig.images.slideshow;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  React.useEffect(() => {
    if (isPaused || userPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, userPaused, nextSlide]);

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
      className="relative w-full min-h-screen bg-paper overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-16 opacity-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Dosha Hotel Hero Arch Presentation"
    >
      <link rel="preload" as="image" href={images[nextIndex]} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(239,229,211,0.65),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bronze/10 via-transparent to-transparent pointer-events-none opacity-0 [[data-theme='evening']_&]:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Visible by default, animates gracefully on mount */}
          <div className="lg:col-span-6 z-20 flex flex-col justify-center pr-0 lg:pr-6 opacity-100">
            <div className="mb-8 sm:mb-10">
              {locale === 'en' ? (
                <h1 className="font-serif text-[clamp(44px,7vw,104px)] font-light text-ink leading-[1.0] tracking-[-0.02em] text-balance opacity-100">
                  Where Adama’s <span className="italic font-normal">warmth</span> meets quiet luxury.
                </h1>
              ) : (
                <h1 className="font-serif text-[clamp(36px,6vw,84px)] font-light text-ink leading-[1.2] tracking-[-0.01em] text-balance opacity-100">
                  {t('headline')}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-6 sm:gap-8 opacity-100">
              <button
                onClick={onOpenBooking}
                className="btn-bronze text-center shadow-soft"
                id="hero-book-now-pill"
              >
                {t('bookCta')}
              </button>

              <a
                href={siteConfig.phoneTel}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-ink-soft hover:text-bronze transition-colors py-2"
                id="hero-call-link"
              >
                <Phone className="w-3.5 h-3.5 text-bronze" />
                <span>{t('callCta')}</span>
              </a>
            </div>
          </div>

          {/* Right: Arch frame */}
          <div className="lg:col-span-6 z-10 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-[540px] h-[58vh] sm:h-[68vh] lg:h-[82vh] arch-mask overflow-hidden border border-sand/60 bg-champagne shadow-soft">
              <div
                className="relative w-full h-full overflow-hidden transition-all duration-1000 ease-arch"
                style={currentTransition.animate}
              >
                <Image
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Dosha Hotel Adama - Slide ${currentIndex + 1}`}
                  fill
                  priority={currentIndex === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Slide Counter & Pause */}
              <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between px-4 py-2.5 rounded-pill bg-white/85 backdrop-blur-md border border-sand/60 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-ink font-medium select-none">
                  <span>0{currentIndex + 1}</span>
                  <span className="text-sand">/</span>
                  <span className="text-ink-soft">0{images.length}</span>
                </div>

                <div className="flex-1 mx-4 h-[2px] bg-sand/40 rounded-full overflow-hidden">
                  <div
                    key={`line-${currentIndex}`}
                    className="h-full bg-bronze transition-all ease-linear"
                    style={{
                      width: userPaused || isPaused ? '50%' : '100%',
                      transitionDuration: `${SLIDE_DURATION}ms`,
                    }}
                  />
                </div>

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
