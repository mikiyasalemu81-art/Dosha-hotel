'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  variant?: 'fade-up' | 'arch-grow' | 'fade-scale' | 'none';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 20,
  className = '',
  variant = 'fade-up',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [forcedVisible, setForcedVisible] = useState(false);

  // Progressive enhancement fail-safe: force visible after 1.0s
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setForcedVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Progressive enhancement: show immediately on SSR or if forced visible / reduced motion
  if (!mounted || shouldReduceMotion || forcedVisible) {
    return (
      <div
        className={className}
        style={{ opacity: 1, transform: 'none', clipPath: 'none' }}
      >
        {children}
      </div>
    );
  }

  const initialVariant = {
    opacity: 0.05,
    y: variant === 'fade-up' ? yOffset : 0,
    scale: variant === 'fade-scale' ? 0.98 : 1,
  };

  const visibleVariant = {
    opacity: 1,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={initialVariant}
      whileInView={visibleVariant}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
};

export default Reveal;
