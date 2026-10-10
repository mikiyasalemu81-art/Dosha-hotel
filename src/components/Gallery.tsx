'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Maximize2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Reveal from './Reveal';
import Lightbox, { LightboxImage } from './Lightbox';

export const Gallery: React.FC = () => {
  const t = useTranslations('gallery');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // All 9 photos mapped with localized captions
  const galleryPhotos: { id: string; src: string; aspect: string }[] = [
    {
      id: '01',
      src: siteConfig.images.exterior,
      aspect: 'aspect-[4/3] md:col-span-2 md:row-span-2',
    },
    {
      id: '02',
      src: siteConfig.images.lobby,
      aspect: 'aspect-square',
    },
    {
      id: '03',
      src: siteConfig.images.twinRoom,
      aspect: 'aspect-[4/3]',
    },
    {
      id: '04',
      src: siteConfig.images.wineRoom,
      aspect: 'aspect-[4/3]',
    },
    {
      id: '05',
      src: siteConfig.images.restaurantHall,
      aspect: 'aspect-square',
    },
    {
      id: '06',
      src: siteConfig.images.terraceEvening,
      aspect: 'aspect-[3/4] md:row-span-2',
    },
    {
      id: '07',
      src: siteConfig.images.barLounge,
      aspect: 'aspect-square',
    },
    {
      id: '08',
      src: siteConfig.images.signatureDrinks,
      aspect: 'aspect-[3/4]',
    },
    {
      id: '09',
      src: siteConfig.images.eventHall,
      aspect: 'aspect-[4/3] md:col-span-2',
    },
  ];

  const lightboxItems: LightboxImage[] = galleryPhotos.map((photo) => ({
    src: photo.src,
    alt: t(`images.${photo.id}` as any),
    caption: t(`images.${photo.id}` as any),
  }));

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal border-b border-graphite/40 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Reveal>
            <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.2] mb-4">
              {t('headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sand/80 text-sm sm:text-base font-light">
              {t('sentence')}
            </p>
          </Reveal>
        </div>

        {/* Refined Responsive Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {galleryPhotos.map((photo, index) => (
            <Reveal key={photo.id} delay={index * 0.05} className={`${photo.aspect} relative group`}>
              <div
                onClick={() => setActiveLightboxIndex(index)}
                className="w-full h-full relative rounded-sm overflow-hidden bg-ink cursor-pointer border border-graphite/70 group-hover:border-gold/60 transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(201,162,75,0.18)]"
              >
                <Image
                  src={photo.src}
                  alt={t(`images.${photo.id}` as any)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Hover Overlay with Icon and Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="self-end p-2 rounded-full bg-ink/70 text-gold backdrop-blur-sm border border-gold/30">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-ivory font-serif tracking-wide line-clamp-2">
                    {t(`images.${photo.id}` as any)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
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
