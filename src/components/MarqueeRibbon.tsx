'use client';

import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface MarqueeRibbonProps {
  text?: string;
  className?: string;
}

export const MarqueeRibbon: React.FC<MarqueeRibbonProps> = ({
  text = 'Rooms · Restaurant · Lounge · Adama · Quiet Luxury · Wonji Corridor · ',
  className = '',
}) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  return (
    <div className={`relative w-full overflow-hidden py-4 border-y border-sand/60 bg-paper select-none ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
        className="flex whitespace-nowrap text-xs sm:text-sm font-serif tracking-[0.28em] uppercase text-ink-soft/75"
      >
        <span className="inline-block mr-6">{text} {text}</span>
        <span className="inline-block mr-6">{text} {text}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeRibbon;
