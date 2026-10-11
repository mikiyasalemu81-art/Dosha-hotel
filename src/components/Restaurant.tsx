'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Wine, Sparkles, Flame, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Reveal from './Reveal';

export const Restaurant: React.FC = () => {
  const t = useTranslations('restaurant');

  return (
    <section
      id="restaurant"
      className="relative py-24 sm:py-32 lg:py-36 bg-champagne/40 border-b border-sand/60 overflow-hidden opacity-100"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text: Progressive Enhancement */}
          <div className="lg:col-span-5 flex flex-col opacity-100">
            <Reveal variant="fade-up">
              <span className="eyebrow-label mb-3">{t('eyebrow')}</span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-5">
                {t('headline')}
              </h2>

              <p className="text-ink-soft text-base sm:text-lg leading-relaxed mb-8 font-light">
                {t('sentence')}
              </p>

              {/* Sensory highlights */}
              <div className="space-y-4 pt-4 border-t border-sand/70">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shrink-0 shadow-sm">
                    <Wine className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-medium text-ink pt-1.5">{t('highlights.0')}</h4>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-medium text-ink pt-1.5">{t('highlights.1')}</h4>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shrink-0 shadow-sm">
                    <Flame className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-medium text-ink pt-1.5">{t('highlights.2')}</h4>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shrink-0 shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-medium text-ink pt-1.5">{t('highlights.3')}</h4>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Collage of Photos 05 to 09 */}
          <div className="lg:col-span-7 opacity-100">
            <Reveal variant="fade-scale" delay={0.15}>
              <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-center">
                {/* Photo 05: Restaurant Dining Hall */}
                <div className="col-span-8 relative aspect-[4/3] rounded-card overflow-hidden border border-sand shadow-soft group bg-white">
                  <Image
                    src={siteConfig.images.restaurantHall}
                    alt="Dosha Hotel Restaurant Dining Hall"
                    fill
                    sizes="(max-width: 768px) 60vw, 40vw"
                    className="object-cover object-center image-arch-hover"
                  />
                </div>

                {/* Photo 08: Signature Drinks */}
                <div className="col-span-4 relative aspect-[3/4] rounded-card overflow-hidden border border-sand shadow-soft group bg-white">
                  <Image
                    src={siteConfig.images.signatureDrinks}
                    alt="Dosha Hotel Signature Drinks"
                    fill
                    sizes="(max-width: 768px) 40vw, 25vw"
                    className="object-cover object-center image-arch-hover"
                  />
                </div>

                {/* Photo 06: Terrace Evening */}
                <div className="col-span-4 relative aspect-[3/4] rounded-card overflow-hidden border border-sand shadow-soft group bg-white -mt-4">
                  <Image
                    src={siteConfig.images.terraceEvening}
                    alt="Dosha Hotel Evening Terrace"
                    fill
                    sizes="(max-width: 768px) 40vw, 25vw"
                    className="object-cover object-center image-arch-hover"
                  />
                </div>

                {/* Photos 07 & 09: Bar Lounge & Event Hall */}
                <div className="col-span-8 grid grid-cols-2 gap-3.5 sm:gap-4 -mt-4">
                  <div className="relative aspect-square rounded-card overflow-hidden border border-sand shadow-soft group bg-white">
                    <Image
                      src={siteConfig.images.barLounge}
                      alt="Dosha Hotel Bar and Lounge"
                      fill
                      sizes="(max-width: 768px) 30vw, 20vw"
                      className="object-cover object-center image-arch-hover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-card overflow-hidden border border-sand shadow-soft group bg-white">
                    <Image
                      src={siteConfig.images.eventHall}
                      alt="Dosha Hotel Buffet & Event Hall"
                      fill
                      sizes="(max-width: 768px) 30vw, 20vw"
                      className="object-cover object-center image-arch-hover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
