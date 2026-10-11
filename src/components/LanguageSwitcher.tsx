'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', short: 'EN', native: 'English' },
  { code: 'am', label: 'Amharic', short: 'አማ', native: 'አማርኛ' },
  { code: 'om', label: 'Afan Oromo', short: 'OM', native: 'Afaan Oromoo' },
] as const;

interface LanguageSwitcherProps {
  className?: string;
  onTransitionStart?: (coords: { x: number; y: number }, targetLocale: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  onTransitionStart,
}) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, locale: 'en' | 'am' | 'om') => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);

    if (onTransitionStart) {
      onTransitionStart(coords, locale);
    } else {
      router.replace(pathname, { locale });
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-sand bg-white/80 backdrop-blur-md text-xs font-medium text-ink hover:border-bronze hover:text-bronze transition-all shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-bronze" />
        <span className="tracking-widest uppercase font-serif">{currentLang.short}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            className="absolute right-0 mt-2 w-44 rounded-2xl bg-white/95 backdrop-blur-xl border border-sand p-1.5 shadow-soft z-50 origin-top-right"
          >
            {languages.map((lang) => {
              const active = currentLocale === lang.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={active}
                  onClick={(e) => handleSelect(e, lang.code as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    active
                      ? 'bg-champagne/60 text-bronze font-medium'
                      : 'text-ink-soft hover:text-ink hover:bg-champagne/30'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{lang.native}</span>
                    <span className="text-[10px] text-ink-soft/60 tracking-wider uppercase font-serif">
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  {active && <Check className="w-3.5 h-3.5 text-bronze" />}
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
