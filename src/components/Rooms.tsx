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
      className="relative bg-paper border-b border-sand/60 py-24 sm:py-32 overflow-hidden opacity-100"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10 sm:mb-14">
        <Reveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow-label mb-2">{t('eyebrow')}</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15]">
                {t('headline')}
              </h2>
            </div>
            <p className="text-ink-soft text-sm sm:text-base font-light max-w-md mt-3 md:mt-0">
              {t('sentence')}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Responsive Grid on Desktop / Snap Carousel on Mobile */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteConfig.rooms.map((room: RoomType, idx) => (
            <Reveal
              key={room.id}
              variant="fade-scale"
              delay={idx * 0.1}
              className="flex flex-col luxury-card overflow-hidden opacity-100"
            >
              {/* Room Photo with arch-shaped top corners */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[20px] bg-champagne">
                <Image
                  src={room.image}
                  alt={t(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                  fill
                  sizes="(max-width: 768px) 85vw, 420px"
                  className="object-cover object-center transition-transform duration-700 ease-luxury hover:scale-105"
                />

                {/* Guests badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-pill bg-white/90 backdrop-blur-md border border-sand/70 flex items-center gap-1.5 text-xs text-ink font-medium shadow-sm">
                  <Users className="w-3.5 h-3.5 text-bronze" />
                  <span>{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="font-serif text-2xl text-ink font-light mb-2">
                    {t(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-soft line-clamp-2 leading-relaxed font-light mb-5">
                    {t(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.desc` as any)}
                  </p>

                  {/* Amenities */}
                  <div className="flex items-center gap-3.5 py-3 border-y border-sand/40 mb-6">
                    {room.amenities.map((amenityKey) => {
                      const item = amenityIcons[amenityKey];
                      if (!item) return null;
                      const Icon = item.icon;
                      return (
                        <div
                          key={amenityKey}
                          className="text-ink-soft hover:text-bronze transition-colors"
                          title={t(`amenities.${amenityKey}` as any)}
                        >
                          <Icon className="w-4 h-4 text-bronze" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rate & Button */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    {room.priceETB === 'PRICE_TBD' ? (
                      <span className="text-xs uppercase tracking-wider text-ink-soft font-medium">
                        {t('priceTbd')}
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-ink-soft">{tCommon('from')}</span>
                        <span className="font-serif text-xl text-bronze font-light">
                          {room.priceETB} ETB
                        </span>
                        <span className="text-xs text-ink-soft">/ {tCommon('night')}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className="btn-bronze !min-h-[40px] !py-2 !px-4 !text-xs flex items-center gap-1.5"
                    id={`book-room-${room.id}`}
                  >
                    <span>{t('bookRoom')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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
