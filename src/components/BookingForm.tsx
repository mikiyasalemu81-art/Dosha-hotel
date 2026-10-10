'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Calendar,
  Users,
  CreditCard,
  MessageSquare,
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

interface BookingFormProps {
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  isFullPage?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialRoomId = 'standard-twin',
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  isFullPage = false,
}) => {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const tRooms = useTranslations('rooms');
  const locale = useLocale();

  // Default dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomType, setRoomType] = useState(initialRoomId || 'standard-twin');
  const [checkIn, setCheckIn] = useState(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrow);
  const [adults, setAdults] = useState(Math.max(1, initialGuests));
  const [children, setChildren] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'other_bank' | 'cash' | 'card'>('telebirr');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  // Selected payment info
  const selectedPaymentInfo = siteConfig.paymentMethods.find(
    (p) => p.id === paymentMethod
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = t('errorName');
    }
    if (!phone.trim() || phone.trim().length < 6) {
      newErrors.phone = t('errorPhone');
    }
    if (nights <= 0) {
      newErrors.dates = t('errorDates');
    }
    if (!roomType) {
      newErrors.roomType = t('errorRoom');
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = t('errorPayment');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Get localized room name
    const roomKeyMap: { [key: string]: string } = {
      'standard-twin': 'standardTwin.name',
      'deluxe-double': 'deluxeDouble.name',
      'executive-suite': 'executiveSuite.name',
      'family-room': 'familyRoom.name',
    };
    const roomName = tRooms(roomKeyMap[roomType] as any);
    const paymentLabel = t(`paymentMethods.${paymentMethod}` as any);

    // Build message per locale
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
      message = `Hello Dosha Hotel! I'd like to book.
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

    // Attempt to open WhatsApp directly
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  // If submitted, show elegant redirect confirmation screen with fallback button
  if (submitted) {
    return (
      <div className="text-center py-8 sm:py-12 px-4 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-6 text-gold">
          <MessageSquare className="w-8 h-8" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light mb-3">
          {t('redirectTitle')}
        </h3>

        <p className="text-sand/80 text-sm leading-relaxed mb-8 font-light">
          {t('redirectDesc')}
        </p>

        <div className="space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full text-center flex items-center justify-center gap-2"
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
              <ExternalLink className="w-4 h-4 text-gold" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-sand/60 hover:text-gold transition-colors pt-2 uppercase tracking-widest"
          >
            ← {tCommon('back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5">
            {t('fullName')} *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            placeholder={t('fullNamePlaceholder')}
            className={`w-full bg-charcoal/90 border rounded-sm px-3.5 py-2.5 text-xs text-ivory placeholder-sand/40 focus:outline-none transition-colors ${
              errors.fullName ? 'border-red-500' : 'border-graphite focus:border-gold'
            }`}
            required
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5">
            {t('phone')} *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            placeholder={t('phonePlaceholder')}
            className={`w-full bg-charcoal/90 border rounded-sm px-3.5 py-2.5 text-xs text-ivory placeholder-sand/40 focus:outline-none transition-colors ${
              errors.phone ? 'border-red-500' : 'border-graphite focus:border-gold'
            }`}
            required
          />
          {errors.phone && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Room Selection */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5">
          {t('roomType')} *
        </label>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none transition-colors cursor-pointer"
        >
          {siteConfig.rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.id === 'standard-twin'
                ? tRooms('standardTwin.name')
                : room.id === 'deluxe-double'
                ? tRooms('deluxeDouble.name')
                : room.id === 'executive-suite'
                ? tRooms('executiveSuite.name')
                : tRooms('familyRoom.name')}
            </option>
          ))}
        </select>
      </div>

      {/* Dates: Check-in & Check-out */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>{t('checkInDate')} *</span>
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (errors.dates) setErrors({ ...errors, dates: '' });
            }}
            className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>{t('checkOutDate')} *</span>
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              if (errors.dates) setErrors({ ...errors, dates: '' });
            }}
            className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none transition-colors"
            required
          />
        </div>
      </div>

      {/* Nights Counter & Date Validation Notice */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-sand/70 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>{t('nightsCalculated', { count: Math.max(1, nights) })}</span>
        </span>
        {errors.dates && (
          <span className="text-red-400 text-[11px] font-medium" role="alert">
            {errors.dates}
          </span>
        )}
      </div>

      {/* Guests: Adults & Children */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>{t('adults')}</span>
          </label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none transition-colors"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Adult' : 'Adults'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5">
            {t('children')}
          </label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3 py-2 text-xs text-ivory focus:border-gold focus:outline-none transition-colors"
          >
            {[0, 1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Child' : 'Children'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Payment Method Choice */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-gold" />
          <span>{t('paymentMethod')} *</span>
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as any)}
          className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none transition-colors cursor-pointer"
        >
          <option value="telebirr">{t('paymentMethods.telebirr')}</option>
          <option value="cbe">{t('paymentMethods.cbe')}</option>
          <option value="other_bank">{t('paymentMethods.otherBank')}</option>
          <option value="cash">{t('paymentMethods.cash')}</option>
          <option value="card">{t('paymentMethods.card')}</option>
        </select>

        {/* Selected payment instructions and accounts */}
        {selectedPaymentInfo && (
          <div className="mt-2.5 p-3 rounded-sm bg-ink/70 border border-graphite/80 text-[11px] text-sand/80 leading-relaxed">
            <p>{t(selectedPaymentInfo.instructionsKey.replace('booking.', '') as any)}</p>
          </div>
        )}
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-sand/90 font-medium mb-1.5">
          {t('notes')}
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('notesPlaceholder')}
          className="w-full bg-charcoal/90 border border-graphite rounded-sm px-3.5 py-2 text-xs text-ivory placeholder-sand/40 focus:border-gold focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="btn-gold w-full text-center flex items-center justify-center gap-2"
          id="booking-form-submit-btn"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t('submit')}</span>
        </button>
      </div>

      {/* Optional Booking.com alternative */}
      {siteConfig.bookingComUrl && (
        <div className="pt-2 text-center">
          <a
            href={siteConfig.bookingComUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sand/70 hover:text-gold inline-flex items-center gap-1.5 transition-colors link-gold-underline"
          >
            <span>{tCommon('bookOnBookingCom')}</span>
            <ExternalLink className="w-3 h-3 text-gold" />
          </a>
        </div>
      )}
    </form>
  );
};

export default BookingForm;
