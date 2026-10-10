'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import BookingForm from './BookingForm';
import { DoshaEmblem } from './Logo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}) => {
  const t = useTranslations('booking');

  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-ink/95 border border-gold/30 rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8 z-10 my-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-charcoal/80 border border-graphite text-sand hover:text-gold hover:border-gold transition-colors"
              aria-label="Close booking modal"
              id="booking-modal-close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center p-1.5">
                <DoshaEmblem className="w-full h-full" />
              </div>
              <h2
                id="booking-modal-title"
                className="font-serif text-2xl sm:text-3xl font-light text-ivory tracking-wide"
              >
                {t('modalTitle')}
              </h2>
            </div>

            <p className="text-xs text-sand/70 font-light mb-6">
              {t('modalSubtitle')}
            </p>

            {/* Form */}
            <BookingForm
              initialRoomId={initialRoomId}
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialGuests={initialGuests}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
