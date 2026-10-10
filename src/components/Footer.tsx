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
    <footer className="relative bg-ink border-t border-graphite/60 pt-16 pb-24 sm:pb-16 text-sand">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-graphite/60">
          {/* Col 1: Logo & Tagline */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Logo size="md" className="mb-4" />
            <p className="text-xs text-sand/70 max-w-sm font-light leading-relaxed mb-6">
              {t('tagline')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-charcoal border border-graphite flex items-center justify-center text-sand hover:text-gold hover:border-gold/50 transition-colors"
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
                  className="w-9 h-9 rounded-sm bg-charcoal border border-graphite flex items-center justify-center text-sand hover:text-gold hover:border-gold/50 transition-colors"
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
                  className="w-9 h-9 rounded-sm bg-charcoal border border-graphite flex items-center justify-center text-sand hover:text-gold hover:border-gold/50 transition-colors"
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
                  className="w-9 h-9 rounded-sm bg-charcoal border border-graphite flex items-center justify-center text-sand hover:text-gold hover:border-gold/50 transition-colors"
                  aria-label="TikTok"
                >
                  <Music2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-ivory mb-4">
              {t('navigation')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#rooms" className="text-sand/80 hover:text-gold transition-colors link-gold-underline">
                  {tNav('rooms')}
                </a>
              </li>
              <li>
                <a href="#restaurant" className="text-sand/80 hover:text-gold transition-colors link-gold-underline">
                  {tNav('restaurant')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-sand/80 hover:text-gold transition-colors link-gold-underline">
                  {tNav('gallery')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-sand/80 hover:text-gold transition-colors link-gold-underline">
                  {tNav('reviews')}
                </a>
              </li>
              <li>
                <a href="#location" className="text-sand/80 hover:text-gold transition-colors link-gold-underline">
                  {tNav('location')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-ivory mb-4">
              {t('contact')}
            </h4>
            <div className="space-y-3 text-xs text-sand/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp: {siteConfig.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sand/60 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.hotelName}. {t('rights')}</p>
          <div className="flex items-center gap-6">
            <span>{siteConfig.locationShort}</span>
            <span className="text-graphite">·</span>
            <a href="#about" className="hover:text-gold transition-colors">
              Dosha Hospitality
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
