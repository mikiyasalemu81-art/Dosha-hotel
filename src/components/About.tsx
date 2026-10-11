'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, BedDouble, UtensilsCrossed } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const About: React.FC = () => {
  const t = useTranslations('about');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 lg:py-44 bg-champagne/45 overflow-hidden border-b border-sand/60"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column: Arch Mask Growing Upward Reveal */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0% round 80px 80px 0 0)', opacity: 0 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)', opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <span className="eyebrow-label mb-3">{t('eyebrow')}</span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-5 text-balance">
              {t('headline')}
            </h2>

            <p className="text-ink-soft text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-light">
              {t('sentence')}
            </p>

            {/* Three Icon Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-sand/70">
              {/* Prime Location */}
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

              {/* Serene Comfort */}
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

              {/* Distinguished Dining */}
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
          </motion.div>

          {/* Right Column: Asymmetric Collage (Lobby in Arch + Exterior overlapping) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            {/* Main Arch Frame: Lobby Reception */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] aspect-[3/4] arch-mask overflow-hidden bg-champagne border border-sand shadow-soft"
            >
              <Image
                src={siteConfig.images.lobby}
                alt="Dosha Hotel Reception Lobby"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover object-center image-arch-hover"
              />
            </motion.div>

            {/* Overlapping Exterior Building Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -left-4 sm:left-4 w-48 sm:w-56 aspect-[4/3] rounded-card overflow-hidden bg-white p-2 border border-sand shadow-soft hidden xs:block"
            >
              <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                <Image
                  src={siteConfig.images.exterior}
                  alt="Dosha Hotel Exterior Facade"
                  fill
                  sizes="240px"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
