'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface QuickBookingBarProps {
  onCheckAvailability: (details: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
}

export const QuickBookingBar: React.FC<QuickBookingBarProps> = ({
  onCheckAvailability,
}) => {
  const t = useTranslations('quickBook');
  const tCommon = useTranslations('common');

  // Today and tomorrow default strings YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <>
      {/* Desktop Floating Glass Card overlapping bottom of hero */}
      <div className="relative z-30 -mt-10 sm:-mt-14 max-w-site mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="glass-panel rounded-sm p-4 sm:p-5 shadow-2xl border border-gold/25 backdrop-blur-xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
          >
            {/* Check-In */}
            <div className="flex flex-col">
              <label
                htmlFor="desktop-checkin"
                className="text-[11px] uppercase tracking-wider text-sand/80 font-medium mb-1.5 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{t('checkIn')}</span>
              </label>
              <input
                id="desktop-checkin"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-charcoal/80 border border-graphite rounded-sm px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col">
              <label
                htmlFor="desktop-checkout"
                className="text-[11px] uppercase tracking-wider text-sand/80 font-medium mb-1.5 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{t('checkOut')}</span>
              </label>
              <input
                id="desktop-checkout"
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-charcoal/80 border border-graphite rounded-sm px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col">
              <label
                htmlFor="desktop-guests"
                className="text-[11px] uppercase tracking-wider text-sand/80 font-medium mb-1.5 flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-gold" />
                <span>{t('guests')}</span>
              </label>
              <select
                id="desktop-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-charcoal/80 border border-graphite rounded-sm px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none transition-colors cursor-pointer"
              >
                <option value={1}>{t('guestOption1')}</option>
                <option value={2}>{t('guestOption2')}</option>
                <option value={3}>{t('guestOption3')}</option>
                <option value={4}>{t('guestOption4')}</option>
              </select>
            </div>

            {/* Actions: Check Availability + Optional Booking.com */}
            <div className="flex items-center gap-2 pt-5">
              <button
                type="submit"
                className="btn-gold flex-1 text-center justify-center gap-2 !py-2.5 !min-h-[42px] text-xs"
                id="quick-book-check-btn"
              >
                <span>{t('cta')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {siteConfig.bookingComUrl && (
                <a
                  href={siteConfig.bookingComUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-2.5 !px-3 !min-h-[42px] text-xs flex items-center justify-center gap-1.5 text-sand hover:text-ivory"
                  title={tCommon('bookOnBookingCom')}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-gold" />
                </a>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-ink/90 backdrop-blur-xl border-t border-graphite/80 p-3.5 md:hidden flex items-center justify-between gap-3 shadow-2xl pb-[max(0.875rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-sand/70">
            {siteConfig.hotelShortName}
          </span>
          <span className="font-serif text-sm text-gold font-light">
            {tCommon('priceOnRequest')}
          </span>
        </div>

        <button
          onClick={() =>
            onCheckAvailability({
              checkIn,
              checkOut,
              guests,
            })
          }
          className="btn-gold !py-2 !px-4 !min-h-[40px] text-xs flex items-center gap-1.5"
          id="mobile-sticky-book-btn"
        >
          <span>{tCommon('bookNow')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
};

export default QuickBookingBar;
