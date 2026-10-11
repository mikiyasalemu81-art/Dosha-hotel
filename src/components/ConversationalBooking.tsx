'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  Sparkles,
  BedDouble,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
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

  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  // Steps: 1..6
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  // Form State with Session Storage persistence
  const [checkIn, setCheckIn] = useState(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrow);
  const [adults, setAdults] = useState(Math.max(1, initialGuests));
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(initialRoomId || 'standard-twin');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'other_bank' | 'cash' | 'card'>('telebirr');
  const [notes, setNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Restore saved session values on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('dosha_booking_session');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.checkIn) setCheckIn(data.checkIn);
        if (data.checkOut) setCheckOut(data.checkOut);
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
  }, []);

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

  // Keyboard navigation: Enter to continue, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
  const selectedPaymentInfo = siteConfig.paymentMethods.find((p) => p.id === paymentMethod);

  // Validation per step
  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return nights > 0;
      case 2:
        return adults >= 1;
      case 3:
        return !!selectedRoom;
      case 4:
        return !!paymentMethod;
      case 5:
        return true; // notes is optional
      case 6:
        return fullName.trim().length >= 2 && phone.trim().length >= 6;
      default:
        return true;
    }
  }, [step, nights, adults, selectedRoom, paymentMethod, fullName, phone]);

  const handleNext = () => {
    if (!isStepValid) return;
    playUiClick();
    if (step < 6) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    playUiClick();
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
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
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
    setWhatsappUrl(url);
    setSubmitted(true);

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  // Confirmation screen
  if (submitted) {
    return (
      <div className="text-center py-10 px-4 max-w-lg mx-auto">
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
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex flex-col h-full justify-between">
      {/* Top Header: Progress Bar & Step Counter */}
      <div className="pb-6 border-b border-sand/60">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
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

      {/* Main Content: Split Question & Live Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start flex-1">
        {/* Left Column: One Question Per Step */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* STEP 1: Dates */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow-label mb-2">DATES</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
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
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-white border border-sand/80 rounded-pill px-3.5 py-2 text-xs text-ink focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div className="bg-paper p-4 rounded-card border border-sand/70">
                      <label className="block text-[11px] uppercase tracking-wider text-bronze font-semibold mb-2">
                        {t('checkOutDate')}
                      </label>
                      <input
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-white border border-sand/80 rounded-pill px-3.5 py-2 text-xs text-ink focus:border-bronze focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-ink-soft flex items-center justify-between px-1">
                    <span>{t('nightsCalculated', { count: Math.max(1, nights) })}</span>
                    {nights <= 0 && (
                      <span className="text-red-500 font-medium">{t('errorDates')}</span>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Guests */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow-label mb-2">GUESTS</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
                      How many guests?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Adults Stepper */}
                    <div className="bg-paper p-5 rounded-card border border-sand/70 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-ink font-light">Adults</h4>
                        <span className="text-xs text-ink-soft">Age 13+</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                          className="w-9 h-9 rounded-full bg-white border border-sand hover:border-bronze text-ink font-semibold flex items-center justify-center transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-serif text-lg text-ink w-6 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults((prev) => Math.min(8, prev + 1))}
                          className="w-9 h-9 rounded-full bg-white border border-sand hover:border-bronze text-ink font-semibold flex items-center justify-center transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children Stepper */}
                    <div className="bg-paper p-5 rounded-card border border-sand/70 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-ink font-light">Children</h4>
                        <span className="text-xs text-ink-soft">Age 0-12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                          className="w-9 h-9 rounded-full bg-white border border-sand hover:border-bronze text-ink font-semibold flex items-center justify-center transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-serif text-lg text-ink w-6 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren((prev) => Math.min(6, prev + 1))}
                          className="w-9 h-9 rounded-full bg-white border border-sand hover:border-bronze text-ink font-semibold flex items-center justify-center transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Room Choice */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow-label mb-2">ROOM</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
                      Which room do you prefer?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[340px] overflow-y-auto pr-1">
                    {siteConfig.rooms.map((room) => {
                      const isSelected = selectedRoom === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoom(room.id)}
                          className={`p-3.5 rounded-card border cursor-pointer transition-all flex items-center gap-3.5 ${
                            isSelected
                              ? 'bg-champagne/70 border-bronze shadow-sm'
                              : 'bg-paper border-sand/70 hover:border-bronze/60'
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-[12px] overflow-hidden shrink-0 bg-champagne">
                            <Image
                              src={room.image}
                              alt={room.id}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-base text-ink font-light truncate">
                              {tRooms(`${room.id === 'standard-twin' ? 'standardTwin' : room.id === 'deluxe-double' ? 'deluxeDouble' : room.id === 'executive-suite' ? 'executiveSuite' : 'familyRoom'}.name` as any)}
                            </h4>
                            <p className="text-[11px] text-ink-soft">Capacity: {room.capacity} Guests</p>
                            <p className="text-xs text-bronze font-medium mt-0.5">
                              {room.priceETB === 'PRICE_TBD' ? t('priceTbd') : `${room.priceETB} ETB / night`}
                            </p>
                          </div>
                        </div>
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
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
                      How would you like to pay?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {siteConfig.paymentMethods.map((pm) => {
                      const isSelected = paymentMethod === pm.id;
                      return (
                        <div
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-4 rounded-card border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-champagne/70 border-bronze shadow-sm'
                              : 'bg-paper border-sand/70 hover:border-bronze/60'
                          }`}
                        >
                          <h4 className="font-serif text-base text-ink font-medium mb-1">
                            {t(`paymentMethods.${pm.id}` as any)}
                          </h4>
                          <p className="text-[11px] text-ink-soft line-clamp-2">
                            {t(pm.instructionsKey.replace('booking.', '') as any)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {selectedPaymentInfo && (
                    <div className="p-4 rounded-card bg-white border border-sand/80 text-xs text-ink-soft leading-relaxed shadow-sm">
                      <p className="font-medium text-ink mb-1">Payment Instructions:</p>
                      <p>{t(selectedPaymentInfo.instructionsKey.replace('booking.', '') as any)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: Special Requests */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow-label mb-2">PREFERENCES</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
                      Anything special?
                    </h2>
                  </div>

                  <div className="bg-paper p-5 rounded-card border border-sand/70">
                    <label className="block text-xs uppercase tracking-wider text-bronze font-semibold mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('notesPlaceholder')}
                      className="w-full bg-white border border-sand/80 rounded-[14px] p-3.5 text-xs text-ink placeholder-ink-soft/40 focus:border-bronze focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: Guest Details */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow-label mb-2">DETAILS</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
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

        {/* Right Column: Live Summary Card (Desktop) / Slim Bar (Mobile) */}
        <div className="lg:col-span-5 bg-paper rounded-card p-6 border border-sand/70 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-sand/60 mb-4">
            <div className="w-8 h-8 rounded-full border border-bronze/40 flex items-center justify-center p-1 bg-white">
              <DoshaEmblem className="w-full h-full" />
            </div>
            <div>
              <h4 className="font-serif text-base text-ink font-light">Reservation Summary</h4>
              <p className="text-[11px] text-ink-soft">{siteConfig.hotelShortName}</p>
            </div>
          </div>

          {/* Shared Element Header Image */}
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
              <span className="text-ink font-serif">{checkIn} → {checkOut}</span>
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
              <span className="text-ink font-serif">{t(`paymentMethods.${paymentMethod}` as any)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Continue / Send via WhatsApp Button */}
      <div className="pt-6 border-t border-sand/60 flex items-center justify-between gap-4">
        <span className="text-[11px] text-ink-soft hidden sm:inline">
          {step === 6 ? 'Final review before opening WhatsApp' : 'Press Enter or click continue'}
        </span>

        <button
          type="button"
          disabled={!isStepValid}
          onClick={handleNext}
          className={`btn-bronze !py-3 !px-7 text-xs flex items-center gap-2 ${
            !isStepValid ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          id="conversational-continue-btn"
        >
          {step === 6 ? (
            <>
              <MessageSquare className="w-4 h-4" />
              <span>Send via WhatsApp</span>
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
