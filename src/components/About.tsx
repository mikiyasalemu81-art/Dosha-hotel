'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MapPin, BedDouble, UtensilsCrossed } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Reveal, { RevealItem } from './Reveal';

export const About: React.FC = () => {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.05, 0.98]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-ink overflow-hidden border-b border-graphite/40"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column: Eyebrow, One Headline, One Sentence, 3 Icon Highlights */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal>
              <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.2] mb-6">
                {t('headline')}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-sand/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-light">
                {t('sentence')}
              </p>
            </Reveal>

            {/* 3 Small Icon Highlights */}
            <Reveal delay={0.3} stagger>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-graphite/80">
                {/* 1) Prime location */}
                <RevealItem className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base text-ivory font-medium mt-1">
                    {t('features.location.title')}
                  </h3>
                  <p className="text-xs text-sand/70 leading-relaxed font-light">
                    {t('features.location.desc')}
                  </p>
                </RevealItem>

                {/* 2) Comfortable rooms */}
                <RevealItem className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base text-ivory font-medium mt-1">
                    {t('features.comfort.title')}
                  </h3>
                  <p className="text-xs text-sand/70 leading-relaxed font-light">
                    {t('features.comfort.desc')}
                  </p>
                </RevealItem>

                {/* 3) Fine dining */}
                <RevealItem className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base text-ivory font-medium mt-1">
                    {t('features.dining.title')}
                  </h3>
                  <p className="text-xs text-sand/70 leading-relaxed font-light">
                    {t('features.dining.desc')}
                  </p>
                </RevealItem>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Lobby Reception Image with Parallax & Soft Gold Border Accent */}
          <div className="lg:col-span-6 relative">
            <Reveal delay={0.2}>
              <div className="relative rounded-sm overflow-hidden p-2 sm:p-3 bg-charcoal/40 border border-gold/20 shadow-2xl">
                {/* Decorative gold angle accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold pointer-events-none z-10" />

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm image-vignette">
                  <motion.div
                    style={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: yParallax,
                            scale: scaleParallax,
                          }
                    }
                    className="relative w-full h-[120%] -top-[10%]"
                  >
                    <Image
                      src={siteConfig.images.lobby}
                      alt="Dosha Hotel Lobby and Reception"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
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
