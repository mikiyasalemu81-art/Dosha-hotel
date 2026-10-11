'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for image or gallery element
      const isImg = target.tagName === 'IMG' || target.closest('.image-arch-hover') || target.closest('#gallery');
      setIsImageHovered(!!isImg);

      // Check for button or link
      const isInteract =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';
      setIsHovered(!!isInteract);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Small Bronze Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-bronze"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isImageHovered ? 0 : isHovered ? 0.6 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 32,
          stiffness: 450,
          mass: 0.1,
        }}
        style={{ width: 6, height: 6 }}
      />

      {/* Trailing Bronze Ring (Grows over images with "View" label) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-bronze flex items-center justify-center text-[10px] font-serif text-white tracking-widest uppercase overflow-hidden"
        animate={{
          x: position.x - (isImageHovered ? 36 : isHovered ? 22 : 16),
          y: position.y - (isImageHovered ? 36 : isHovered ? 22 : 16),
          width: isImageHovered ? 72 : isHovered ? 44 : 32,
          height: isImageHovered ? 72 : isHovered ? 44 : 32,
          backgroundColor: isImageHovered
            ? 'rgba(176, 141, 87, 0.85)'
            : isHovered
            ? 'rgba(176, 141, 87, 0.1)'
            : 'transparent',
          borderColor: isImageHovered ? 'var(--bronze)' : 'rgba(176, 141, 87, 0.45)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.2,
        }}
      >
        {isImageHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            View
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default Cursor;
