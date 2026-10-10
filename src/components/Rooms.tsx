'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Wifi, Tv, Droplets, Coffee, Sun, ArrowRight, Users } from 'lucide-react';
import { siteConfig, RoomType } from '@/config/site';
import Reveal from './Reveal';

interface RoomsProps {
  onSelectRoom: (roomId: string) => void;
}

const amenityIcons = {
  wifi: { icon: Wifi, key: 'wifi' },
  tv: { icon: Tv, key: 'tv' },
  hotWater: { icon: Droplets, key: 'hotWater' },
  breakfast: { icon: Coffee, key: 'breakfast' },
  balcony: { icon: Sun, key: 'balcony' },
};

export const Rooms: React.FC<RoomsProps> = ({ onSelectRoom }) => {
  const t = useTranslations('rooms');
  const tCommon = useTranslations('common');

  return (
    <section
      id="rooms"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal border-b border-graphite/40 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.2]">
                {t('headline')}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-4 md:mt-0">
            <p className="text-sand/80 text-sm sm:text-base font-light max-w-md">
              {t('sentence')}
            </p>
          </Reveal>
        </div>

        {/* Desktop 3-column / 4-card grid & Mobile Horizontal Snap Carousel */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {siteConfig.rooms.map((room: RoomType, idx) => (
            <Reveal
              key={room.id}
              delay={idx * 0.1}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start flex-1 flex flex-col"
            >
              <div className="group flex flex-col h-full bg-ink/70 border border-graphite/70 rounded-sm overflow-hidden transition-all duration-500 hover:border-gold/50 hover:shadow-[0_10px_30px_rgba(201,162,75,0.15)] hover:-translate-y-1">
                {/* Room Image with Smooth Hover Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                  <Image
                    src={room.image}
                    alt={t(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

                  {/* Capacity Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-ink/75 backdrop-blur-md border border-graphite flex items-center gap-1.5 text-[11px] text-sand">
                    <Users className="w-3 h-3 text-gold" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory font-normal mb-2 transition-colors group-hover:text-gold-light">
                      {t(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                    </h3>

                    <p className="text-xs text-sand/70 line-clamp-2 leading-relaxed font-light mb-4">
                      {t(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.desc` as any)}
                    </p>

                    {/* Amenity Icons */}
                    <div className="flex items-center gap-3 py-3 border-y border-graphite/60 mb-5">
                      {room.amenities.map((amenityKey) => {
                        const item = amenityIcons[amenityKey];
                        if (!item) return null;
                        const Icon = item.icon;
                        return (
                          <div
                            key={amenityKey}
                            className="text-sand/70 hover:text-gold transition-colors flex items-center"
                            title={t(`amenities.${amenityKey}` as any)}
                          >
                            <Icon className="w-4 h-4 text-gold/80" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Line & Booking Button */}
                  <div>
                    <div className="mb-4">
                      {room.priceETB === 'PRICE_TBD' ? (
                        <span className="text-xs tracking-wider uppercase text-sand/80 font-medium">
                          {t('priceTbd')}
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-sand/70">{tCommon('from')}</span>
                          <span className="font-serif text-lg text-gold font-light">
                            {room.priceETB} ETB
                          </span>
                          <span className="text-xs text-sand/70">/ {tCommon('night')}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectRoom(room.id)}
                      className="btn-secondary w-full text-center flex items-center justify-center gap-2 !py-2.5 !min-h-[42px] text-xs group-hover:border-gold group-hover:text-gold"
                      id={`book-room-${room.id}`}
                    >
                      <span>{t('bookRoom')}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
