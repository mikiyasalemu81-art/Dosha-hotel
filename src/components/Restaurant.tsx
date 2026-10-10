'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, Wine, Flame, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Reveal from './Reveal';

export const Restaurant: React.FC = () => {
  const t = useTranslations('restaurant');
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      id="restaurant"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-ink border-b border-graphite/40 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Side: Eyebrow, One Headline, One Sentence */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.2] mb-6">
                {t('headline')}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-sand/80 text-base sm:text-lg leading-relaxed mb-8 font-light">
                {t('sentence')}
              </p>
            </Reveal>

            {/* Curated Sensory Highlights */}
            <Reveal delay={0.3}>
              <div className="space-y-4 pt-4 border-t border-graphite/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Wine className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ivory">
                      {t('highlights.0')}
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ivory">
                      {t('highlights.1')}
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ivory">
                      {t('highlights.2')}
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-ivory">
                      {t('highlights.3')}
                    </h4>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Asymmetrical Collage with Photos 05, 06, 07, 08, 09 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Main Feature: Restaurant Hall (05) */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxSlow }}
                className="col-span-8 relative aspect-[4/3] rounded-sm overflow-hidden border border-gold/20 shadow-xl group"
              >
                <Image
                  src={siteConfig.images.restaurantHall}
                  alt="Dosha Hotel Restaurant Dining Hall"
                  fill
                  sizes="(max-width: 768px) 60vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* Signature Drinks (08) */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxFast }}
                className="col-span-4 relative aspect-[3/4] rounded-sm overflow-hidden border border-graphite shadow-xl group"
              >
                <Image
                  src={siteConfig.images.signatureDrinks}
                  alt="Dosha Hotel Signature Drinks and Cocktails"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Terrace Evening (06) */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxFast }}
                className="col-span-4 relative aspect-[3/4] rounded-sm overflow-hidden border border-graphite shadow-xl group -mt-4"
              >
                <Image
                  src={siteConfig.images.terraceEvening}
                  alt="Dosha Hotel Open-Air Evening Terrace with Lanterns"
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Bar Lounge (07) & Buffet Event Hall (09) */}
              <motion.div
                style={shouldReduceMotion ? {} : { y: parallaxSlow }}
                className="col-span-8 grid grid-cols-2 gap-3 sm:gap-4 -mt-4"
              >
                <div className="relative aspect-square rounded-sm overflow-hidden border border-graphite shadow-xl group">
                  <Image
                    src={siteConfig.images.barLounge}
                    alt="Dosha Hotel Wooden Bar and Lounge"
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden border border-graphite shadow-xl group">
                  <Image
                    src={siteConfig.images.eventHall}
                    alt="Dosha Hotel Buffet & Event Hall"
                    fill
                    sizes="(max-width: 768px) 30vw, 20vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
