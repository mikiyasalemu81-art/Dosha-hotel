'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationalBooking from './ConversationalBooking';

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
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          {/* Backdrop */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Container: Full-screen modal on desktop, bottom sheet on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white rounded-t-[28px] sm:rounded-card shadow-soft overflow-hidden p-6 sm:p-10 z-10 max-h-[92vh] flex flex-col my-0 sm:my-auto border border-sand/70"
          >
            <ConversationalBooking
              initialRoomId={initialRoomId}
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialGuests={initialGuests}
              onClose={onClose}
              isModal={true}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
