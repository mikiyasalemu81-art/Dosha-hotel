'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin, BedDouble, UtensilsCrossed } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Reveal from './Reveal';

export const About: React.FC = () => {
  const t = useTranslations('about');

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 lg:py-36 bg-champagne/45 overflow-hidden border-b border-sand/60 opacity-100"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column: Progressive Enhancement Reveal */}
          <div className="lg:col-span-6 flex flex-col opacity-100">
            <Reveal variant="fade-up">
              <span className="eyebrow-label mb-3">{t('eyebrow')}</span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-5 text-balance">
                {t('headline')}
              </h2>

              <p className="text-ink-soft text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-light">
                {t('sentence')}
              </p>

              {/* Three Icon Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-sand/70">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-ink font-medium mt-1">
                    {t('features.location.title')}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed font-light">
                    {t('features.location.desc')}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shadow-sm">
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-ink font-medium mt-1">
                    {t('features.comfort.title')}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed font-light">
                    {t('features.comfort.desc')}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-white border border-sand/80 flex items-center justify-center text-bronze shadow-sm">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-ink font-medium mt-1">
                    {t('features.dining.title')}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed font-light">
                    {t('features.dining.desc')}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Asymmetric Collage (Lobby in Arch + Exterior overlapping) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end opacity-100">
            <Reveal variant="fade-scale" delay={0.15}>
              <div className="relative w-full max-w-[420px] aspect-[3/4] arch-mask overflow-hidden bg-champagne border border-sand shadow-soft">
                <Image
                  src={siteConfig.images.lobby}
                  alt="Dosha Hotel Reception Lobby"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover object-center image-arch-hover"
                />
              </div>

              <div className="absolute -bottom-8 -left-4 sm:left-4 w-48 sm:w-56 aspect-[4/3] rounded-card overflow-hidden bg-white p-2 border border-sand shadow-soft hidden xs:block">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                  <Image
                    src={siteConfig.images.exterior}
                    alt="Dosha Hotel Exterior Facade"
                    fill
                    sizes="240px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
