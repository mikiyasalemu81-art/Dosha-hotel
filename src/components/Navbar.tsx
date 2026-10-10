'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import MagneticButton from './MagneticButton';
import { siteConfig } from '@/config/site';

interface NavbarProps {
  onOpenBooking?: (roomType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blurred glass background after 80px
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (with a threshold buffer)
      if (currentScrollY > 200 && currentScrollY > lastScrollY + 5) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 80) {
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
    { href: `#rooms`, label: t('rooms') },
    { href: `#restaurant`, label: t('restaurant') },
    { href: `#gallery`, label: t('gallery') },
    { href: `#reviews`, label: t('reviews') },
    { href: `#location`, label: t('location') },
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
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-ink/80 backdrop-blur-md border-b border-graphite/60 py-3.5 shadow-2xl'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo size={isScrolled ? 'sm' : 'md'} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-[0.16em] text-sand/85 hover:text-gold transition-colors link-gold-underline py-1 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Language Switcher + Book Now Button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />

            <MagneticButton strength={0.25}>
              <button
                onClick={handleBookClick}
                className="btn-gold !min-h-[42px] !py-2.5 !px-5 text-xs"
                id="navbar-book-now-btn"
              >
                {tCommon('bookNow')}
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Right Controls: Language Switcher + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <LanguageSwitcher variant="minimal" />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded border border-graphite/80 bg-charcoal/60 backdrop-blur text-sand hover:text-gold transition-colors"
              aria-label={t('menu')}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-trigger"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden"
          >
            {/* Top Bar inside overlay */}
            <div className="flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded border border-graphite/80 bg-charcoal/80 text-sand hover:text-gold transition-colors"
                aria-label={tCommon('close')}
                id="mobile-menu-close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Navigation Links */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col gap-6 my-auto"
              aria-label="Mobile Navigation"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="font-serif text-3xl sm:text-4xl text-ivory hover:text-gold transition-colors block tracking-wide"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </motion.nav>

            {/* Bottom Actions inside Mobile Menu */}
            <div className="flex flex-col gap-4 pt-6 border-t border-graphite/80">
              <button
                onClick={handleBookClick}
                className="btn-gold w-full text-center"
                id="mobile-menu-book-btn"
              >
                {tCommon('bookNow')}
              </button>

              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-secondary w-full text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>{tCommon('callUs')}</span>
              </a>

              <p className="text-center text-xs text-sand/60 mt-2">
                {siteConfig.locationShort}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
