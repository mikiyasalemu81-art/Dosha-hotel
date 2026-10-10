'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MessageSquare, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import LanguageSwitcher from './LanguageSwitcher';

export const FloatingActions: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('floating');
  const [langOpen, setLangOpen] = useState(false);

  // Localized quick greeting for WhatsApp
  const greetings: { [key: string]: string } = {
    en: 'Hello Dosha Hotel! I would like to inquire about a reservation.',
    am: 'ሰላም ዶሻ ሆቴል! ስለ ክፍሎች መረጃ ማግኘት እፈልጋለሁ።',
    om: "Akkam Hoteela Dooshaa! Waa'ee kutaalee odeeffannoo argachuu barbaada.",
  };

  const whatsappGreeting = encodeURIComponent(
    greetings[locale] || greetings.en
  );

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 1.6, // Staggered spring after splash screen
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none"
      aria-label="Quick Actions"
    >
      {/* 3) Language Switcher Glass Popover */}
      <div className="pointer-events-auto">
        <LanguageSwitcher variant="minimal" />
      </div>

      {/* 2) Call Now Button */}
      <div className="pointer-events-auto">
        <a
          href={`tel:${siteConfig.phone}`}
          className="w-12 h-12 rounded-full bg-charcoal/90 border border-graphite hover:border-gold/60 text-sand hover:text-gold flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label={t('callLabel')}
          title={t('callLabel')}
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5 text-gold" />
        </a>
      </div>

      {/* 1) WhatsApp with subtle pulse ring */}
      <div className="pointer-events-auto relative">
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" />

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappGreeting}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-13 h-13 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all hover:scale-108 active:scale-95"
          aria-label={t('whatsappLabel')}
          title={t('whatsappLabel')}
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-6 h-6 fill-white text-white" />
        </a>
      </div>
    </motion.aside>
  );
};

export default FloatingActions;
