'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BedDouble,
} from 'lucide-react';
import { siteConfig, WHATSAPP_NUMBER } from '@/config/site';
import { DoshaEmblem } from './Logo';
import { useSound } from './SoundContext';

interface ConversationalBookingProps {
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onClose?: () => void;
  isModal?: boolean;
}

export const ConversationalBooking: React.FC<ConversationalBookingProps> = ({
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  onClose,
  isModal = true,
}) => {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const tRooms = useTranslations('rooms');
  const locale = useLocale();
  const { playUiClick } = useSound();

  // Date utilities
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getTomorrowStr = (baseDateStr?: string) => {
    const base = baseDateStr ? new Date(baseDateStr) : new Date();
    base.setDate(base.getDate() + 1);
    return base.toISOString().split('T')[0];
  };

  const today = getTodayStr();

  // Steps: 1..6
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Form State
  const [checkIn, setCheckIn] = useState(initialCheckIn && initialCheckIn >= today ? initialCheckIn : today);
  const [checkOut, setCheckOut] = useState(
    initialCheckOut && initialCheckOut > (initialCheckIn || today)
      ? initialCheckOut
      : getTomorrowStr(initialCheckIn || today)
  );
  const [adults, setAdults] = useState(Math.max(1, initialGuests));
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(initialRoomId || 'standard-twin');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'other_bank' | 'cash' | 'card'>('telebirr');
  const [notes, setNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Handle Check-In date change (enforce checkOut > checkIn)
  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    if (!checkOut || checkOut <= newCheckIn) {
      setCheckOut(getTomorrowStr(newCheckIn));
    }
  };

  // Restore saved session values on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('dosha_booking_session');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.checkIn && data.checkIn >= today) setCheckIn(data.checkIn);
        if (data.checkOut && data.checkOut > (data.checkIn || today)) setCheckOut(data.checkOut);
        if (data.adults) setAdults(data.adults);
        if (data.children !== undefined) setChildren(data.children);
        if (data.selectedRoom) setSelectedRoom(data.selectedRoom);
        if (data.paymentMethod) setPaymentMethod(data.paymentMethod);
        if (data.notes) setNotes(data.notes);
        if (data.fullName) setFullName(data.fullName);
        if (data.phone) setPhone(data.phone);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [today]);

  // Save changes to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        'dosha_booking_session',
        JSON.stringify({
          checkIn,
          checkOut,
          adults,
          children,
          selectedRoom,
          paymentMethod,
          notes,
          fullName,
          phone,
        })
      );
    } catch {
      // ignore
    }
  }, [checkIn, checkOut, adults, children, selectedRoom, paymentMethod, notes, fullName, phone]);

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  // Current room details
  const currentRoomObj = siteConfig.rooms.find((r) => r.id === selectedRoom) || siteConfig.rooms[0];

  // Format date helper for human-readable localized display
  const formatDateLocale = useCallback((dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      return new Intl.DateTimeFormat(locale === 'am' || locale === 'om' ? 'en-GB' : locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date);
    } catch {
      return dateStr;
    }
  }, [locale]);

  // Validation per step
  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(checkIn && checkOut && nights > 0 && checkOut > checkIn);
      case 2:
        return adults >= 1;
      case 3:
        return Boolean(selectedRoom);
      case 4:
        return Boolean(paymentMethod);
      case 5:
        return true; // notes is optional
      case 6:
        return fullName.trim().length >= 2 && phone.trim().length >= 6;
      default:
        return true;
    }
  }, [step, checkIn, checkOut, nights, adults, selectedRoom, paymentMethod, fullName, phone]);

  // Helper message for the step
  const stepHelperMessage = useMemo(() => {
    switch (step) {
      case 1:
        if (!checkIn) return t('chooseDatesHelp');
        if (!checkOut || checkOut <= checkIn) return t('errorDates');
        return t('chooseDatesHelp');
      case 2:
        return t('chooseGuestsHelp');
      case 3:
        return t('chooseRoomHelp');
      case 4:
        return t('choosePaymentHelp');
      case 5:
        return t('notes');
      case 6:
        if (fullName.trim().length < 2) return t('errorName');
        if (phone.trim().length < 6) return t('errorPhone');
        return t('enterDetailsHelp');
      default:
        return '';
    }
  }, [step, checkIn, checkOut, fullName, phone, t]);

  const handleFinalSubmit = useCallback(() => {
    const roomKeyMap: { [key: string]: string } = {
      'standard-twin': 'standardTwin.name',
      'deluxe-double': 'deluxeDouble.name',
      'executive-suite': 'executiveSuite.name',
      'family-room': 'familyRoom.name',
    };
    const roomName = tRooms(roomKeyMap[selectedRoom] as any);
    const paymentLabel = t(`paymentMethods.${paymentMethod}` as any);

    let message = '';
    if (locale === 'am') {
      message = `ሰላም ዶሻ ሆቴል! ክፍል ማስያዝ እፈልጋለሁ።
ስም: ${fullName}
ስልክ: ${phone}
ክፍል: ${roomName}
መግቢያ: ${checkIn} | መውጫ: ${checkOut} (${nights} ሌሊቶች)
እንግዶች: ${adults} አዋቂዎች, ${children} ልጆች
የክፍያ ዘዴ: ${paymentLabel}
ተጨማሪ ማስታወሻ: ${notes.trim() || 'ምንም'}`;
    } else if (locale === 'om') {
      message = `Akkam Hoteela Dooshaa! Kutaa qabachuu barbaada.
Maqaa: ${fullName}
Bilbila: ${phone}
Kutaa: ${roomName}
Guyyaa Galmaa: ${checkIn} | Guyyaa Ba'aa: ${checkOut} (Halkan ${nights})
Keessummoota: Ga'eessota ${adults}, Daa'imman ${children}
Kafaltii: ${paymentLabel}
Yaada Addaa: ${notes.trim() || 'Hin jiru'}`;
    } else {
      message = `Hello Dosha Hotel! I'd like to book a stay.
Name: ${fullName}
Phone: ${phone}
Room: ${roomName}
Check-in: ${checkIn} | Check-out: ${checkOut} (${nights} nights)
Guests: ${adults} Adults, ${children} Children
Payment: ${paymentLabel}
Notes: ${notes.trim() || 'None'}`;
    }

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    setWhatsappUrl(url);
    setSubmitted(true);

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }, [locale, fullName, phone, selectedRoom, checkIn, checkOut, nights, adults, children, paymentMethod, notes, t, tRooms]);

  const handleNext = useCallback(() => {
    if (!isStepValid) return;
    playUiClick();
    if (step < 6) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  }, [isStepValid, playUiClick, step, handleFinalSubmit]);

  const handleBack = useCallback(() => {
    playUiClick();
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  }, [playUiClick, step]);

  // Keyboard navigation: Enter to continue, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
        return;
      }
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement | null;
        if (target && target.tagName === 'TEXTAREA') return;
        if (isStepValid) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isStepValid, handleNext]);

  // Confirmation screen
  if (submitted) {
    return (
      <div className="text-center py-10 px-4 max-w-lg mx-auto flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 rounded-full bg-champagne border border-sand flex items-center justify-center mx-auto mb-6 text-bronze shadow-soft">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="font-serif text-3xl text-ink font-light mb-3">
          {t('redirectTitle')}
        </h3>

        <p className="text-ink-soft text-sm leading-relaxed mb-8 font-light">
          {t('redirectDesc')}
        </p>

        <div className="space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bronze w-full text-center flex items-center justify-center gap-2"
          >
            <span>{t('openWhatsappManual')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {siteConfig.bookingComUrl && (
            <a
              href={siteConfig.bookingComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center flex items-center justify-center gap-2"
            >
              <span>{tCommon('bookOnBookingCom')}</span>
              <ExternalLink className="w-4 h-4 text-bronze" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-ink-soft hover:text-bronze transition-colors pt-2 uppercase tracking-widest font-medium"
          >
            ← {tCommon('back')}
          </button>
        </div>
      </div>
    );
  }

  // Animation variants for smooth horizontal slide
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex flex-col h-full justify-between select-none">
      {/* 1. STICKY TOP HEADER: Progress Bar & Step Counter */}
      <div className="shrink-0 pb-4 border-b border-sand/60">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 text-ink-soft hover:text-bronze transition-colors uppercase tracking-widest text-[11px] font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{tCommon('back')}</span>
              </button>
            )}
            <span className="font-serif tracking-widest text-ink uppercase">
              Step {step} of 6
            </span>
          </div>

          {onClose && isModal && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full border border-sand hover:border-bronze text-ink-soft hover:text-bronze transition-colors"
              aria-label={tCommon('close')}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Thin Bronze Progress Bar */}
        <div className="w-full h-1 bg-champagne rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-bronze"
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* 2. SCROLLABLE MIDDLE BODY: Questions + Reservation Summary */}
      <div className="flex-1 overflow-y-auto py-6 min-h-0 pr-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Step Question */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* STEP 1: Dates */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <span className="eyebrow-label mb-2">DATES</span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-light text-ink leading-tight">
                        When will you stay?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-paper p-4 rounded-card border border-sand/70">
                        <label className="block text-[11px] uppercase tracking-wider text-bronze font-semibold mb-2">
                          {t('checkInDate')}
                        </label>
                        <input
                          type="date"
                          min={today}
                          value={checkIn}
                          onChange={(e) => handleCheckInChange(e.target.value)}
                          className="w-full bg-white border border-sand/80 rounded-pill px-3.5 py-2.5 text-xs text-ink focus:border-bronze focus:outline-none"
                        />
                      </div>

                      <div className="bg-paper p-4 rounded-card border border-sand/70">
                        <label className="block text-[11px] uppercase tracking-wider text-bronze font-semibold mb-2">
                          {t('checkOutDate')}
                        </label>
                        <input
                          type="date"
                          min={getTomorrowStr(checkIn)}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-white border border-sand/80 rounded-pill px-3.5 py-2.5 text-xs text-ink focus:border-bronze focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="text-xs text-ink-soft bg-champagne/40 p-3 rounded-card border border-sand/50 flex items-center justify-between">
                      <span>{t('nightsCalculated', { count: nights })}</span>
                      <span className="font-serif text-bronze-deep font-medium">
                        {formatDateLocale(checkIn)} → {formatDateLocale(checkOut)}
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 2: Guests */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <span className="eyebrow-label mb-2">GUESTS</span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-light text-ink leading-tight">
                        Who is traveling?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-paper p-4 rounded-card border border-sand/70">
                        <label className="block text-xs uppercase tracking-wider text-bronze font-semibold mb-3">
                          {t('adults')}
                        </label>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                            className="w-10 h-10 rounded-full border border-sand bg-white text-ink flex items-center justify-center hover:border-bronze font-serif text-lg"
                          >
                            -
                          </button>
                          <span className="font-serif text-2xl text-ink font-light">{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults((prev) => Math.min(10, prev + 1))}
                            className="w-10 h-10 rounded-full border border-sand bg-white text-ink flex items-center justify-center hover:border-bronze font-serif text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="bg-paper p-4 rounded-card border border-sand/70">
                        <label className="block text-xs uppercase tracking-wider text-bronze font-semibold mb-3">
                          {t('children')}
                        </label>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                            className="w-10 h-10 rounded-full border border-sand bg-white text-ink flex items-center justify-center hover:border-bronze font-serif text-lg"
                          >
                            -
                          </button>
                          <span className="font-serif text-2xl text-ink font-light">{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren((prev) => Math.min(6, prev + 1))}
                            className="w-10 h-10 rounded-full border border-sand bg-white text-ink flex items-center justify-center hover:border-bronze font-serif text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Room Selection */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <span className="eyebrow-label mb-2">ACCOMMODATIONS</span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-light text-ink leading-tight">
                        Select your room
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {siteConfig.rooms.map((room) => {
                        const isSelected = selectedRoom === room.id;
                        return (
                          <button
                            key={room.id}
                            type="button"
                            onClick={() => setSelectedRoom(room.id)}
                            className={`p-4 rounded-card border text-left transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-champagne/60 border-bronze shadow-sm'
                                : 'bg-paper border-sand/70 hover:border-sand'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-serif text-base text-ink font-medium">
                                  {tRooms(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                                </span>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-bronze" />}
                              </div>
                              <p className="text-[11px] text-ink-soft line-clamp-2 mb-3">
                                {tRooms(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.desc` as any)}
                              </p>
                            </div>
                            <span className="text-[11px] text-bronze font-medium uppercase tracking-wider">
                              {room.priceETB !== 'PRICE_TBD'
                                ? tRooms('fromRate', { price: room.priceETB })
                                : tRooms('priceTbd')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Payment Method */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <span className="eyebrow-label mb-2">PAYMENT</span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-light text-ink leading-tight">
                        Preferred payment
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(['telebirr', 'cbe', 'cash', 'card', 'other_bank'] as const).map((method) => {
                        const isSelected = paymentMethod === method;
                        const labelKey = method === 'other_bank' ? 'otherBank' : method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`p-3.5 rounded-card border text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-champagne/60 border-bronze shadow-sm'
                                : 'bg-paper border-sand/70 hover:border-sand'
                            }`}
                          >
                            <span className="text-xs text-ink font-medium">
                              {t(`paymentMethods.${labelKey}` as any)}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-bronze" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: Preferences */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <span className="eyebrow-label mb-2">PREFERENCES</span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-light text-ink leading-tight">
                        Anything special?
                      </h2>
                    </div>

                    <div className="bg-paper p-4 sm:p-5 rounded-card border border-sand/70">
                      <label className="block text-xs uppercase tracking-wider text-bronze font-semibold mb-2">
                        {t('notes')}
                      </label>
                      <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t('notesPlaceholder')}
                        className="w-full bg-white border border-sand/80 rounded-[14px] p-3 text-xs text-ink placeholder-ink-soft/40 focus:border-bronze focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 6: Guest Details */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div>
                      <span className="eyebrow-label mb-2">DETAILS</span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-light text-ink leading-tight">
                        Your details
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-paper p-4 rounded-card border border-sand/70">
                        <label className="block text-xs uppercase tracking-wider text-bronze font-semibold mb-1.5">
                          {t('fullName')} *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t('fullNamePlaceholder')}
                          className="w-full bg-white border border-sand/80 rounded-pill px-3.5 py-2.5 text-xs text-ink placeholder-ink-soft/40 focus:border-bronze focus:outline-none"
                          required
                        />
                      </div>

                      <div className="bg-paper p-4 rounded-card border border-sand/70">
                        <label className="block text-xs uppercase tracking-wider text-bronze font-semibold mb-1.5">
                          {t('phone')} *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t('phonePlaceholder')}
                          className="w-full bg-white border border-sand/80 rounded-pill px-3.5 py-2.5 text-xs text-ink placeholder-ink-soft/40 focus:border-bronze focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Live Summary Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 bg-paper rounded-card p-6 border border-sand/70 shadow-sm sticky top-0">
            <div className="flex items-center gap-3 pb-4 border-b border-sand/60 mb-4">
              <div className="w-8 h-8 rounded-full border border-bronze/40 flex items-center justify-center p-1 bg-white">
                <DoshaEmblem className="w-full h-full" />
              </div>
              <div>
                <h4 className="font-serif text-base text-ink font-light">{t('reservationSummary')}</h4>
                <p className="text-[11px] text-ink-soft">{siteConfig.hotelShortName}</p>
              </div>
            </div>

            {currentRoomObj && (
              <div className="relative aspect-[16/9] w-full rounded-[14px] overflow-hidden mb-4 bg-champagne">
                <motion.div
                  layoutId={`room-image-${selectedRoom}`}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentRoomObj.image}
                    alt={selectedRoom}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            )}

            <div className="space-y-2.5 text-xs text-ink-soft">
              <div className="flex justify-between py-1 border-b border-sand/30">
                <span className="font-medium">Dates:</span>
                <span className="text-ink font-serif font-medium">
                  {formatDateLocale(checkIn)} to {formatDateLocale(checkOut)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand/30">
                <span className="font-medium">Duration:</span>
                <span className="text-ink">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand/30">
                <span className="font-medium">Guests:</span>
                <span className="text-ink">{adults} Adults, {children} Children</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand/30">
                <span className="font-medium">Selected Room:</span>
                <span className="text-ink font-serif truncate max-w-[160px]">
                  {tRooms(`${selectedRoom === 'standard-twin' ? 'standardTwin' : selectedRoom === 'deluxe-double' ? 'deluxeDouble' : selectedRoom === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium">Payment:</span>
                <span className="text-ink font-serif">
                  {t(`paymentMethods.${paymentMethod === 'other_bank' ? 'otherBank' : paymentMethod}` as any)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Collapsible Summary Bar */}
        <div className="lg:hidden mt-4 pt-3 border-t border-sand/60">
          <button
            type="button"
            onClick={() => setIsMobileSummaryOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-3 rounded-card bg-paper border border-sand/70 text-xs text-ink"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="font-medium text-bronze uppercase tracking-wider text-[10px]">
                {t('reservationSummary')}:
              </span>
              <span className="truncate text-ink-soft">
                {nights} {nights === 1 ? 'night' : 'nights'} · {tRooms(`${selectedRoom === 'standard-twin' ? 'standardTwin' : selectedRoom === 'deluxe-double' ? 'deluxeDouble' : selectedRoom === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
              </span>
            </div>
            {isMobileSummaryOpen ? (
              <ChevronUp className="w-4 h-4 text-bronze shrink-0 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-bronze shrink-0 ml-1" />
            )}
          </button>

          <AnimatePresence>
            {isMobileSummaryOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-paper/60 rounded-card p-3 mt-2 border border-sand/50 text-xs text-ink-soft space-y-1.5"
              >
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span className="text-ink font-medium">
                    {formatDateLocale(checkIn)} to {formatDateLocale(checkOut)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="text-ink">{adults} Adults, {children} Children</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className="text-ink">
                    {t(`paymentMethods.${paymentMethod === 'other_bank' ? 'otherBank' : paymentMethod}` as any)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. CLEAR STICKY FOOTER INSIDE THE MODAL (Always visible, never cut off) */}
      <div className="shrink-0 pt-4 border-t border-sand/60 bg-white sticky bottom-0 z-20 flex items-center justify-between gap-3">
        {/* Left: Back button (text style) */}
        <div className="flex items-center gap-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="text-xs sm:text-sm text-ink-soft hover:text-bronze underline-offset-4 hover:underline font-medium transition-colors flex items-center gap-1 py-2 px-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{tCommon('back')}</span>
            </button>
          ) : (
            <span className="text-[11px] text-ink-soft/60 hidden sm:inline">
              Step 1 of 6
            </span>
          )}
        </div>

        {/* Center / Inline Helper Message */}
        <div className="text-[11px] text-bronze-deep font-medium text-center truncate max-w-[180px] sm:max-w-xs">
          {!isStepValid ? stepHelperMessage : ''}
        </div>

        {/* Right: Large Bronze Continue / Send via WhatsApp Button */}
        <button
          type="button"
          disabled={!isStepValid}
          onClick={handleNext}
          className={`btn-bronze !py-3 !px-6 sm:!px-8 text-xs sm:text-sm flex items-center gap-2 font-medium shrink-0 shadow-sm ${
            !isStepValid ? 'opacity-40 cursor-not-allowed hover:!bg-bronze hover:!text-white' : ''
          }`}
          id="conversational-continue-btn"
        >
          {step === 6 ? (
            <>
              <MessageSquare className="w-4 h-4" />
              <span>{t('sendViaWhatsapp')}</span>
            </>
          ) : (
            <>
              <span>{tCommon('continue')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConversationalBooking;
