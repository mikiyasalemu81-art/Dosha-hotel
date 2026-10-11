'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { siteConfig, ReviewItem } from '@/config/site';

export const Reviews: React.FC = () => {
  const t = useTranslations('reviews');
  const tCommon = useTranslations('common');
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = siteConfig.reviews;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section
      id="reviews"
      className="relative py-28 sm:py-36 lg:py-44 bg-champagne/45 border-b border-sand/60 overflow-hidden opacity-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <span className="eyebrow-label mb-3 justify-center">{t('eyebrow')}</span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-4">
          {t('headline')}
        </h2>
        <p className="text-ink-soft text-sm sm:text-base font-light mb-12 max-w-xl mx-auto">
          {t('sentence')}
        </p>

        {/* Large Centered Quote Carousel Card */}
        <div className="relative bg-white rounded-card p-8 sm:p-14 shadow-soft border border-sand/70">
          <div className="w-12 h-12 rounded-full bg-champagne/60 border border-sand flex items-center justify-center mx-auto mb-6 text-bronze">
            <Quote className="w-6 h-6" />
          </div>

          {/* 5 Bronze Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />
            ))}
          </div>

          <div className="min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl"
              >
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-ink font-light leading-relaxed italic mb-8">
                  &ldquo;{t(`${current.textKey.replace('reviews.', '')}` as any)}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-1">
                  <h4 className="font-sans font-medium text-ink text-sm sm:text-base tracking-wide">
                    {current.name}
                  </h4>
                  <span className="text-xs text-ink-soft/75">
                    {t(`${current.dateKey.replace('reviews.', '')}` as any)} · Google Maps Verified
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-sand/40">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full border border-sand hover:border-bronze text-ink-soft hover:text-bronze transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-serif tracking-widest text-ink-soft">
              0{currentIndex + 1} / 0{reviews.length}
            </span>

            <button
              onClick={nextReview}
              className="p-2.5 rounded-full border border-sand hover:border-bronze text-ink-soft hover:text-bronze transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Google Maps link */}
        <div className="mt-10 text-center">
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            id="google-maps-reviews-btn"
          >
            <span>{tCommon('viewOnGoogleMaps')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-bronze" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
