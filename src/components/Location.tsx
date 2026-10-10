'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Reveal from './Reveal';

export const Location: React.FC = () => {
  const t = useTranslations('location');
  const tCommon = useTranslations('common');

  return (
    <section
      id="location"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal border-b border-graphite/40 overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Reveal>
            <span className="eyebrow-label mb-3">{t('eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-tight leading-[1.2] mb-3">
              {t('headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sand/80 text-sm sm:text-base font-light">
              {t('sentence')}
            </p>
          </Reveal>
        </div>

        {/* Content Grid: Contact Details & Embedded Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-sm bg-ink/80 border border-graphite/80 shadow-2xl">
            <div className="space-y-6">
              {/* Address item */}
              <div className="flex items-start gap-4 pb-6 border-b border-graphite/60">
                <div className="w-10 h-10 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/60 font-semibold mb-1">
                    {t('addressTitle')}
                  </h4>
                  <p className="text-sm font-medium text-ivory leading-relaxed">
                    {siteConfig.address.full}
                  </p>
                  <p className="text-xs text-gold/90 mt-1">
                    {t('landmarkNote')}
                  </p>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-4 pb-6 border-b border-graphite/60">
                <div className="w-10 h-10 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/60 font-semibold mb-1">
                    {t('hoursTitle')}
                  </h4>
                  <p className="text-sm font-medium text-ivory">
                    {t('hours')}
                  </p>
                </div>
              </div>

              {/* Contact item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-charcoal border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/60 font-semibold mb-1">
                    {t('contactTitle')}
                  </h4>
                  <div className="flex flex-col gap-1 text-sm font-medium text-ivory">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="hover:text-gold transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold flex items-center gap-1.5 text-xs hover:underline mt-0.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{siteConfig.whatsappDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gold "Get Directions" Button */}
            <div className="pt-8">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center flex items-center justify-center gap-2"
                id="get-directions-btn"
              >
                <span>{tCommon('getDirections')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Embedded Map */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full rounded-sm overflow-hidden border border-gold/25 shadow-2xl bg-ink">
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dosha Hotel Adama Google Map Location"
              className="w-full h-full filter contrast-125 saturate-50 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
