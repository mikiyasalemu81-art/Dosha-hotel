'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Sun, Moon, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from './ThemeContext';
import { useSound } from './SoundContext';

interface NavbarProps {
  onOpenBooking?: (roomType?: string) => void;
  onLanguageTransition?: (coords: { x: number; y: number }, targetLocale: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onLanguageTransition }) => {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { mode, resolvedTheme, toggleTheme } = useTheme();
  const { isPlaying, isAvailable: soundAvailable, toggleSound } = useSound();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 160 && currentScrollY > lastScrollY + 6) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 6 || currentScrollY <= 80) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#rooms', label: t('rooms') },
    { href: '#facilities', label: t('facilities') },
    { href: '#restaurant', label: t('restaurant') },
    { href: '#gallery', label: t('gallery') },
    { href: '#reviews', label: t('reviews') },
    { href: '#location', label: t('location') },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = `/${locale}/book`;
    }
  };

  return (
    <>
      {/* Floating Centered Pill Navbar */}
      <header
        className={`fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none transition-transform duration-500 ease-luxury ${
          isVisible ? 'translate-y-0' : '-translate-y-28'
        }`}
      >
        <div className="w-full max-w-5xl bg-white/75 backdrop-blur-xl border border-sand/70 rounded-pill px-4 sm:px-6 py-2.5 sm:py-3 shadow-soft flex items-center justify-between pointer-events-auto transition-colors duration-500">
          {/* Logo Left */}
          <Logo size="sm" />

          {/* Nav Links Center (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-[0.16em] text-ink-soft hover:text-bronze transition-colors py-1 font-medium select-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Ambient sound, Theme toggle, Language switcher, Book Now */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Toggle (only if available) */}
            {soundAvailable && (
              <button
                onClick={toggleSound}
                className="p-2 rounded-full border border-sand/80 bg-white/80 text-ink-soft hover:text-bronze hover:border-bronze transition-all"
                aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
                title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
              >
                {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-bronze animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Day / Evening Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-sand/80 bg-white/80 text-ink-soft hover:text-bronze hover:border-bronze transition-all flex items-center justify-center"
              aria-label={`Current theme: ${mode}. Toggle day/evening mode.`}
              title={`Theme: ${mode} (${resolvedTheme})`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {resolvedTheme === 'day' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-3.5 h-3.5 text-bronze" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-3.5 h-3.5 text-bronze" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher onTransitionStart={onLanguageTransition} />

            {/* Bronze Book Now Pill */}
            <button
              onClick={handleBookClick}
              className="btn-bronze hidden sm:inline-flex !min-h-[38px] !py-2 !px-5 !text-xs"
              id="navbar-book-pill"
            >
              {tCommon('bookNow')}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full border border-sand bg-white text-ink md:hidden hover:border-bronze transition-colors"
              aria-label={t('menu')}
              aria-expanded={mobileMenuOpen}
              id="navbar-mobile-menu-btn"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Champagne Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
              opacity: 0,
            }}
            animate={{
              clipPath: 'circle(150% at calc(100% - 40px) 40px)',
              opacity: 1,
            }}
            exit={{
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
              opacity: 0,
            }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-champagne flex flex-col justify-between p-6 sm:p-10 md:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full border border-sand bg-white text-ink hover:text-bronze transition-colors shadow-sm"
                aria-label={tCommon('close')}
                id="mobile-overlay-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sliding Links */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                },
              }}
              className="flex flex-col gap-6 my-auto"
              aria-label="Mobile Navigation Menu"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -25 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="font-serif text-3xl sm:text-4xl text-ink hover:text-bronze transition-colors block tracking-wide"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </motion.nav>

            {/* Bottom Actions inside Mobile Menu */}
            <div className="flex flex-col gap-3 pt-6 border-t border-sand">
              <button
                onClick={handleBookClick}
                className="btn-bronze w-full text-center"
                id="mobile-overlay-book-btn"
              >
                {tCommon('bookNow')}
              </button>

              <div className="flex items-center justify-center gap-4 pt-2">
                <span className="text-xs text-ink-soft">
                  Theme: {mode.toUpperCase()}
                </span>
                <span className="text-sand">·</span>
                <button
                  onClick={toggleTheme}
                  className="text-xs text-bronze uppercase tracking-widest font-semibold"
                >
                  Switch Theme
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
