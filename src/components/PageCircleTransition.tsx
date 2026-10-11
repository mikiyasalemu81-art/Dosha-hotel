'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageCircleTransitionProps {
  isActive: boolean;
  origin: { x: number; y: number } | null;
  onAnimationComplete?: () => void;
}

export const PageCircleTransition: React.FC<PageCircleTransitionProps> = ({
  isActive,
  origin,
  onAnimationComplete,
}) => {
  if (!isActive) return null;

  const x = origin ? origin.x : typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  const y = origin ? origin.y : typeof window !== 'undefined' ? window.innerHeight / 2 : 500;

  return (
    <div className="fixed inset-0 z-[99998] pointer-events-none overflow-hidden">
      {/* Expanding circle from origin coordinate */}
      <motion.div
        initial={{
          clipPath: `circle(0px at ${x}px ${y}px)`,
          opacity: 1,
        }}
        animate={{
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(160% at ${x}px ${y}px)`,
            `circle(160% at ${x}px ${y}px)`,
            `circle(0px at ${typeof window !== 'undefined' ? window.innerWidth - x : 500}px ${typeof window !== 'undefined' ? window.innerHeight - y : 500}px)`,
          ],
        }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={onAnimationComplete}
        className="w-full h-full bg-gradient-to-br from-bronze via-champagne to-paper pointer-events-auto flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9] }}
          transition={{ duration: 0.9 }}
          className="font-serif text-3xl sm:text-4xl text-white tracking-[0.3em] font-light"
        >
          DOSHA
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageCircleTransition;
