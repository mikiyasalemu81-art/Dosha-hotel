'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Lightbox, { LightboxImage } from './Lightbox';

export const Gallery: React.FC = () => {
  const t = useTranslations('gallery');
  const shouldReduceMotion = useReducedMotion();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryPhotos = [
    { id: '01', src: siteConfig.images.exterior, aspect: 'aspect-[4/3] md:col-span-2 md:row-span-2' },
    { id: '02', src: siteConfig.images.lobby, aspect: 'aspect-square' },
    { id: '03', src: siteConfig.images.twinRoom, aspect: 'aspect-[4/3]' },
    { id: '04', src: siteConfig.images.wineRoom, aspect: 'aspect-[4/3]' },
    { id: '05', src: siteConfig.images.restaurantHall, aspect: 'aspect-square' },
    { id: '06', src: siteConfig.images.terraceEvening, aspect: 'aspect-[3/4] md:row-span-2' },
    { id: '07', src: siteConfig.images.barLounge, aspect: 'aspect-square' },
    { id: '08', src: siteConfig.images.signatureDrinks, aspect: 'aspect-[3/4]' },
    { id: '09', src: siteConfig.images.eventHall, aspect: 'aspect-[4/3] md:col-span-2' },
  ];

  const lightboxItems: LightboxImage[] = galleryPhotos.map((photo) => ({
    src: photo.src,
    alt: t(`images.${photo.id}` as any),
    caption: t(`images.${photo.id}` as any),
  }));

  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36 lg:py-44 bg-paper border-b border-sand/60 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-4">
            {t('headline')}
          </h2>
          <p className="text-ink-soft text-sm sm:text-base font-light">
            {t('sentence')}
          </p>
        </div>

        {/* Diagonal Wave Unfold Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {galleryPhotos.map((photo, index) => {
            // Compute diagonal wave delay based on grid coordinates
            const col = index % 4;
            const row = Math.floor(index / 4);
            const waveDelay = (col + row) * 0.1;

            return (
              <motion.div
                key={photo.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.9, y: 24, rotate: -1.5 }
                }
                whileInView={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, y: 0, rotate: 0 }
                }
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.85,
                  delay: waveDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${photo.aspect} relative group`}
              >
                <div
                  onClick={() => setActiveLightboxIndex(index)}
                  className="w-full h-full relative rounded-card overflow-hidden bg-champagne cursor-pointer border border-sand/70 group-hover:border-bronze shadow-sm group-hover:shadow-soft transition-all duration-500"
                >
                  <motion.div
                    layoutId={`gallery-item-${index}`}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={photo.src}
                      alt={t(`images.${photo.id}` as any)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-106"
                    />
                  </motion.div>

                  {/* Hover Overlay with View Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
                    <div className="self-end p-2 rounded-full bg-white/80 text-bronze backdrop-blur-md shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs text-white font-serif tracking-wide line-clamp-2 drop-shadow-sm">
                      {t(`images.${photo.id}` as any)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox with shared-element feel */}
      <Lightbox
        images={lightboxItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />
    </section>
  );
};

export default Gallery;
