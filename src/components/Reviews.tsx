'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star, ExternalLink, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { siteConfig, ReviewItem } from '@/config/site';
import Reveal from './Reveal';

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

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-32 lg:py-40 bg-ink border-b border-graphite/40 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Overall Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.2] mb-3">
                {t('headline')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sand/80 text-sm sm:text-base font-light">
                {t('sentence')}
              </p>
            </Reveal>
          </div>

          {/* Overall Rating Badge */}
          <Reveal delay={0.2} className="shrink-0">
            <div className="p-4 sm:p-5 rounded-sm bg-charcoal/90 border border-gold/30 flex items-center gap-4 shadow-xl">
              <div className="flex flex-col items-center justify-center pr-4 border-r border-graphite">
                <span className="font-serif text-3xl font-light text-gold leading-none">
                  {siteConfig.overallRating.score.toFixed(1)}
                </span>
                <span className="text-[10px] text-sand/60 tracking-wider uppercase mt-1">
                  / {siteConfig.overallRating.maxScore.toFixed(1)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-sand/80 font-medium">
                  {t('verified')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Carousel Presentation */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((rev: ReviewItem, idx: number) => {
              const isActive = idx === currentIndex;
              return (
                <Reveal
                  key={rev.id}
                  delay={idx * 0.1}
                  className={`flex flex-col justify-between p-6 sm:p-8 rounded-sm bg-charcoal/60 border transition-all duration-300 ${
                    isActive
                      ? 'border-gold/50 shadow-[0_4px_25px_rgba(201,162,75,0.12)]'
                      : 'border-graphite/70'
                  }`}
                >
                  <div>
                    {/* Gold Star Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>

                    <Quote className="w-6 h-6 text-gold/30 mb-2" />

                    {/* Short Quote */}
                    <p className="text-sm sm:text-base font-serif text-ivory/95 font-light leading-relaxed mb-6 italic">
                      &ldquo;{t(`${rev.textKey.replace('reviews.', '')}` as any)}&rdquo;
                    </p>
                  </div>

                  {/* Guest Name & Source */}
                  <div className="pt-4 border-t border-graphite/60 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-medium text-ivory tracking-wide">{rev.name}</h4>
                      <span className="text-[11px] text-sand/60 font-light">
                        {t(`${rev.dateKey.replace('reviews.', '')}` as any)}
                      </span>
                    </div>

                    <span className="text-[10px] tracking-wider uppercase text-gold font-medium bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                      {rev.source}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* CTA: Read All Reviews on Google Maps */}
        <div className="mt-12 text-center">
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            id="google-maps-reviews-btn"
          >
            <span>{tCommon('viewOnGoogleMaps')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
