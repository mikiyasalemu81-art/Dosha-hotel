'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', short: 'EN', native: 'English' },
  { code: 'am', label: 'Amharic', short: 'አማ', native: 'አማርኛ' },
  { code: 'om', label: 'Afan Oromo', short: 'OM', native: 'Afaan Oromoo' },
] as const;

export const LanguageSwitcher: React.FC<{
  variant?: 'minimal' | 'full' | 'floating';
  className?: string;
}> = ({ variant = 'minimal', className = '' }) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleSelect = (locale: 'en' | 'am' | 'om') => {
    // Persist choice in cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
    router.replace(pathname, { locale });
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code as any)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded transition-all ${
              currentLocale === lang.code
                ? 'bg-gold/15 text-gold border border-gold/40'
                : 'text-sand/70 hover:text-ivory hover:bg-graphite/40'
            }`}
            aria-label={`Switch language to ${lang.native}`}
          >
            {lang.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded border border-graphite/80 bg-charcoal/60 backdrop-blur text-xs font-medium text-ivory/90 hover:border-gold/50 hover:text-gold transition-all"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-gold" />
        <span className="tracking-widest uppercase font-serif font-normal">{currentLang.short}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            className="absolute right-0 mt-2 w-44 rounded glass-panel p-1.5 shadow-2xl z-50 origin-top-right"
          >
            {languages.map((lang) => {
              const active = currentLocale === lang.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(lang.code as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs transition-colors ${
                    active
                      ? 'bg-gold/15 text-gold font-medium'
                      : 'text-sand hover:text-ivory hover:bg-graphite/50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{lang.native}</span>
                    <span className="text-[10px] text-sand/60 tracking-wider uppercase font-serif">
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  {active && <Check className="w-3.5 h-3.5 text-gold" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
