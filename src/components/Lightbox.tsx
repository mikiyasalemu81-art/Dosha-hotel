'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [scale, setScale] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isOpen = currentIndex !== null;
  const current = currentIndex !== null ? images[currentIndex] : null;

  const next = useCallback(() => {
    if (currentIndex === null) return;
    setScale(1);
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const prev = useCallback(() => {
    if (currentIndex === null) return;
    setScale(1);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation: Left, Right, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, next, prev, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setScale(1);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleZoom = () => {
    setScale((prev) => (prev > 1 ? 1 : 1.75));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50 && scale === 1) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
    setTouchStart(null);
  };

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Top Bar: Counter & Controls */}
          <div
            className="flex items-center justify-between text-xs text-sand z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-serif tracking-widest uppercase">
              {currentIndex! + 1} / {images.length}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleZoom}
                className="p-2.5 rounded-full bg-charcoal/80 border border-graphite text-sand hover:text-gold transition-colors"
                aria-label={scale > 1 ? 'Zoom out' : 'Zoom in'}
              >
                {scale > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-charcoal/80 border border-graphite text-sand hover:text-gold transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage: Image and Navigation Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-charcoal/80 border border-graphite text-sand hover:text-gold hover:border-gold transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-charcoal/80 border border-graphite text-sand hover:text-gold hover:border-gold transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Current Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center cursor-zoom-in"
              onClick={toggleZoom}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Bottom Bar: Multilingual Caption */}
          <div
            className="max-w-2xl mx-auto text-center px-4 py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm sm:text-base font-serif text-ivory/95 font-light">
              {current.caption}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
