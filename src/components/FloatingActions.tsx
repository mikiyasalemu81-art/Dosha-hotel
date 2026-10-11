'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MessageSquare, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import LanguageSwitcher from './LanguageSwitcher';

export const FloatingActions: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('floating');

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
        delay: 1.2,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none"
      aria-label="Quick Actions"
    >
      {/* Language Switcher */}
      <div className="pointer-events-auto">
        <LanguageSwitcher />
      </div>

      {/* Call Now Button */}
      <div className="pointer-events-auto">
        <a
          href={`tel:${siteConfig.phone}`}
          className="w-12 h-12 rounded-full bg-white border border-sand hover:border-bronze text-ink-soft hover:text-bronze flex items-center justify-center shadow-soft backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label={t('callLabel')}
          title={t('callLabel')}
          id="floating-call-btn"
        >
          <Phone className="w-4 h-4 text-bronze" />
        </a>
      </div>

      {/* WhatsApp Button with gentle pulse ring */}
      <div className="pointer-events-auto relative">
        <span className="absolute -inset-1 rounded-full bg-emerald-500/25 animate-ping opacity-75 pointer-events-none" />
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappGreeting}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_6px_25px_rgba(16,185,129,0.35)] transition-all hover:scale-108 active:scale-95"
          aria-label={t('whatsappLabel')}
          title={t('whatsappLabel')}
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
        </a>
      </div>
    </motion.aside>
  );
};

export default FloatingActions;
