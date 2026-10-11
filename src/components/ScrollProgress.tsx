'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Appear after about 1800px (after the gallery section)
      if (latest > 1600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Hairline at the very top of the page */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-bronze origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Back to Top Button appearing after Gallery */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-8 left-6 z-40 p-3 rounded-full bg-white/90 border border-sand hover:border-bronze text-ink-soft hover:text-bronze shadow-soft backdrop-blur-md transition-all"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </>
  );
};

export default ScrollProgress;
