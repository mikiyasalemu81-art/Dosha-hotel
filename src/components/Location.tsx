'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Location: React.FC = () => {
  const t = useTranslations('location');
  const tCommon = useTranslations('common');

  return (
    <section
      id="location"
      className="relative py-28 sm:py-36 lg:py-44 bg-paper border-b border-sand/60 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight leading-[1.15] mb-3">
            {t('headline')}
          </h2>
          <p className="text-ink-soft text-sm sm:text-base font-light">
            {t('sentence')}
          </p>
        </div>

        {/* Content Grid: Contact Details & Embedded Map in Large Rounded Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 luxury-card">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 pb-6 border-b border-sand/50">
                <div className="w-10 h-10 rounded-full bg-champagne border border-sand flex items-center justify-center text-bronze shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-ink-soft font-semibold mb-1">
                    {t('addressTitle')}
                  </h4>
                  <p className="text-sm font-medium text-ink leading-relaxed">
                    {siteConfig.address.full}
                  </p>
                  <p className="text-xs text-bronze font-medium mt-1">
                    {t('landmarkNote')}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pb-6 border-b border-sand/50">
                <div className="w-10 h-10 rounded-full bg-champagne border border-sand flex items-center justify-center text-bronze shrink-0 shadow-sm">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-ink-soft font-semibold mb-1">
                    {t('hoursTitle')}
                  </h4>
                  <p className="text-sm font-medium text-ink">
                    {t('hours')}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne border border-sand flex items-center justify-center text-bronze shrink-0 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-ink-soft font-semibold mb-1">
                    {t('contactTitle')}
                  </h4>
                  <div className="flex flex-col gap-1 text-sm font-medium text-ink">
                    <a href={`tel:${siteConfig.phone}`} className="hover:text-bronze transition-colors">
                      {siteConfig.phone}
                    </a>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bronze flex items-center gap-1.5 text-xs hover:underline mt-0.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{siteConfig.whatsappDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bronze Get Directions Button */}
            <div className="pt-8">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bronze w-full text-center flex items-center justify-center gap-2"
                id="get-directions-btn"
              >
                <span>{tCommon('getDirections')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Embedded Map in Large Rounded Frame */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full rounded-card overflow-hidden border border-sand shadow-soft bg-champagne">
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dosha Hotel Adama Google Map Location"
              className="w-full h-full filter contrast-105 opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
