'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Instagram, Facebook, Send, Music2, Phone, MessageSquare, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="relative bg-champagne border-t border-sand/80 pt-20 pb-28 sm:pb-20 text-ink-soft">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-sand">
          {/* Col 1: Big Wordmark, Tagline, Socials */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Logo size="lg" className="mb-4" />
            <p className="text-xs sm:text-sm text-ink-soft max-w-sm font-light leading-relaxed mb-6">
              {t('tagline')}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-sand flex items-center justify-center text-ink-soft hover:text-bronze hover:border-bronze transition-colors shadow-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-sand flex items-center justify-center text-ink-soft hover:text-bronze hover:border-bronze transition-colors shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.telegram && (
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-sand flex items-center justify-center text-ink-soft hover:text-bronze hover:border-bronze transition-colors shadow-sm"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.tiktok && (
                <a
                  href={siteConfig.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-sand flex items-center justify-center text-ink-soft hover:text-bronze hover:border-bronze transition-colors shadow-sm"
                  aria-label="TikTok"
                >
                  <Music2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Minimal Navigation Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-ink mb-4 font-normal">
              {t('navigation')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#rooms" className="text-ink-soft hover:text-bronze transition-colors">
                  {tNav('rooms')}
                </a>
              </li>
              <li>
                <a href="#facilities" className="text-ink-soft hover:text-bronze transition-colors">
                  {tNav('facilities')}
                </a>
              </li>
              <li>
                <a href="#restaurant" className="text-ink-soft hover:text-bronze transition-colors">
                  {tNav('restaurant')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-ink-soft hover:text-bronze transition-colors">
                  {tNav('gallery')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-ink-soft hover:text-bronze transition-colors">
                  {tNav('reviews')}
                </a>
              </li>
              <li>
                <a href="#location" className="text-ink-soft hover:text-bronze transition-colors">
                  {tNav('location')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-ink mb-4 font-normal">
              {t('contact')}
            </h4>
            <div className="space-y-3 text-xs text-ink-soft">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronze shrink-0" />
                <a href={siteConfig.phoneTel} className="hover:text-bronze transition-colors font-medium">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-bronze shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bronze transition-colors font-medium"
                >
                  WhatsApp: {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Minimal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-soft/70 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.hotelName}. {t('rights')}</p>
          <div className="flex items-center gap-6">
            <span>{siteConfig.locationShort}</span>
            <span className="text-sand">·</span>
            <a href="#about" className="hover:text-bronze transition-colors">
              Dosha Hospitality
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
