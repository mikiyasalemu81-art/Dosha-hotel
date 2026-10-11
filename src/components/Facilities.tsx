'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  UtensilsCrossed,
  Wine,
  Sunset,
  Clock,
  Wifi,
  Droplets,
  BedDouble,
  Sparkles,
  Car,
  Bell,
  Shirt,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig, FacilityItem } from '@/config/site';
import Reveal from './Reveal';

const facilityIconMap: { [key: string]: React.ElementType } = {
  UtensilsCrossed,
  Wine,
  Sunset,
  Clock,
  Wifi,
  Droplets,
  BedDouble,
  Sparkles,
  Car,
  Bell,
  Shirt,
  ShieldCheck,
};

export const Facilities: React.FC = () => {
  const t = useTranslations('facilities');

  return (
    <section
      id="facilities"
      className="relative py-24 sm:py-32 bg-paper border-b border-sand/60 overflow-hidden opacity-100"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Reveal variant="fade-up">
            <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-4">
              {t('headline')}
            </h2>
            <p className="text-ink-soft text-sm sm:text-base font-light">
              {t('sentence')}
            </p>
          </Reveal>
        </div>

        {/* 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.facilities.map((facility: FacilityItem, idx: number) => {
            const Icon = facilityIconMap[facility.iconName] || Sparkles;
            const rowNumber = Math.floor(idx / 4);
            const rowDelay = (rowNumber * 0.1) + ((idx % 4) * 0.05);

            return (
              <Reveal
                key={facility.id}
                variant="fade-scale"
                delay={rowDelay}
                className="opacity-100"
              >
                <div className="p-5 sm:p-6 rounded-card bg-white border border-sand/70 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    {/* Thin bronze line icon */}
                    <div className="w-10 h-10 rounded-full bg-champagne/60 border border-sand flex items-center justify-center text-bronze mb-4 group-hover:scale-105 group-hover:border-bronze transition-all">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    <h3 className="font-serif text-base sm:text-lg text-ink font-normal mb-2 leading-snug">
                      {t(`items.${facility.id}.title` as any)}
                    </h3>

                    <p className="text-xs text-ink-soft font-light leading-relaxed">
                      {t(`items.${facility.id}.desc` as any)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
