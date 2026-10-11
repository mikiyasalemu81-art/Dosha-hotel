'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Wine, Sparkles, Flame, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Restaurant: React.FC = () => {
  const t = useTranslations('restaurant');
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [-55, 55]);

  return (
    <section
      id="restaurant"
      ref={sectionRef}
      className="relative py-28 sm:py-36 lg:py-44 bg-champagne/40 border-b border-sand/60 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text: Masked Text-Line Rise Reveal */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="eyebrow-label mb-3">{t('eyebrow')}</span>

            <div className="overflow-hidden mb-5">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15]"
              >
                {t('headline')}
              </motion.h2>
            </div>

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
          </div>

          {/* Right Collage of Photos 05 to 09 with Parallax at Different Speeds */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-center">
              {/* Photo 05: Restaurant Dining Hall */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxSlow }}
                className="col-span-8 relative aspect-[4/3] rounded-card overflow-hidden border border-sand shadow-soft group bg-white"
              >
                <Image
                  src={siteConfig.images.restaurantHall}
                  alt="Dosha Hotel Restaurant Dining Hall"
                  fill
                  sizes="(max-width: 768px) 60vw, 40vw"
                  className="object-cover object-center image-arch-hover"
                />
              </motion.div>

              {/* Photo 08: Signature Drinks */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxFast }}
                className="col-span-4 relative aspect-[3/4] rounded-card overflow-hidden border border-sand shadow-soft group bg-white"
              >
                <Image
                  src={siteConfig.images.signatureDrinks}
                  alt="Dosha Hotel Signature Drinks"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover object-center image-arch-hover"
                />
              </motion.div>

              {/* Photo 06: Terrace Evening */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxFast }}
                className="col-span-4 relative aspect-[3/4] rounded-card overflow-hidden border border-sand shadow-soft group bg-white -mt-4"
              >
                <Image
                  src={siteConfig.images.terraceEvening}
                  alt="Dosha Hotel Evening Terrace"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover object-center image-arch-hover"
                />
              </motion.div>

              {/* Photos 07 & 09: Bar Lounge & Event Hall */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxSlow }}
                className="col-span-8 grid grid-cols-2 gap-3.5 sm:gap-4 -mt-4"
              >
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
