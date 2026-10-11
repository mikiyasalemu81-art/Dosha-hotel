'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Users, ArrowRight } from 'lucide-react';
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
      {/* Desktop Floating White Glass Card overlapping bottom of Hero */}
      <div className="relative z-30 -mt-12 sm:-mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="bg-white/85 backdrop-blur-xl rounded-card p-5 lg:p-6 shadow-soft border border-sand/70">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-5 items-center"
          >
            {/* Check-In */}
            <div className="flex flex-col">
              <label
                htmlFor="desktop-checkin"
                className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-1.5 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-bronze" />
                <span>{t('checkIn')}</span>
              </label>
              <input
                id="desktop-checkin"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-paper border border-sand/70 rounded-pill px-3.5 py-2 text-xs text-ink focus:border-bronze focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col">
              <label
                htmlFor="desktop-checkout"
                className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-1.5 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-bronze" />
                <span>{t('checkOut')}</span>
              </label>
              <input
                id="desktop-checkout"
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-paper border border-sand/70 rounded-pill px-3.5 py-2 text-xs text-ink focus:border-bronze focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col">
              <label
                htmlFor="desktop-guests"
                className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-1.5 flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-bronze" />
                <span>{t('guests')}</span>
              </label>
              <select
                id="desktop-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-paper border border-sand/70 rounded-pill px-3.5 py-2 text-xs text-ink focus:border-bronze focus:outline-none transition-colors cursor-pointer"
              >
                <option value={1}>{t('guestOption1')}</option>
                <option value={2}>{t('guestOption2')}</option>
                <option value={3}>{t('guestOption3')}</option>
                <option value={4}>{t('guestOption4')}</option>
              </select>
            </div>

            {/* Bronze Check Availability Button */}
            <div className="pt-5">
              <button
                type="submit"
                className="btn-bronze w-full text-center flex items-center justify-center gap-2 !py-2.5 !min-h-[42px] text-xs"
                id="quick-book-check-btn"
              >
                <span>{t('cta')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-sand/80 p-3.5 md:hidden flex items-center justify-between gap-3 shadow-soft pb-[max(0.875rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            {siteConfig.hotelShortName}
          </span>
          <span className="font-serif text-sm text-bronze font-normal">
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
          className="btn-bronze !py-2 !px-4 !min-h-[40px] text-xs flex items-center gap-1.5"
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
