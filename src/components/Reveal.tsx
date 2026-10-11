'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const [forcedVisible, setForcedVisible] = useState(false);

  // Progressive enhancement fail-safe: force visible after 1.5s regardless of scroll/observer state
  useEffect(() => {
    const timer = setTimeout(() => {
      setForcedVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (shouldReduceMotion || forcedVisible) {
    return <div className={`opacity-100 ${className}`}>{children}</div>;
  }

  const initialVariant = {
    opacity: 0,
    y: variant === 'fade-up' ? yOffset : 0,
    scale: variant === 'fade-scale' ? 0.95 : 1,
    clipPath: variant === 'arch-grow' ? 'inset(30% 0% 0% 0% round 40px 40px 0 0)' : undefined,
  };

  const visibleVariant = {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: variant === 'arch-grow' ? 'inset(0% 0% 0% 0% round 0px 0px 0 0)' : undefined,
  };

  return (
    <motion.div
      initial={initialVariant}
      whileInView={visibleVariant}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
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
