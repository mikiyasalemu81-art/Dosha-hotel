'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { DoshaEmblem } from '@/components/Logo';
import Reveal from '@/components/Reveal';

export default function BookPage() {
  const locale = useLocale();
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20 bg-ink min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Reveal>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sand/70 hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{tCommon('back')}</span>
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center p-1.5 bg-charcoal/80">
                <DoshaEmblem className="w-full h-full" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory tracking-tight">
                {t('modalTitle')}
              </h1>
            </div>

            <p className="text-sand/80 text-sm sm:text-base font-light max-w-xl mb-10">
              {t('modalSubtitle')}
            </p>
          </Reveal>

          {/* Main Card with Booking Form */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Column */}
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-sm bg-charcoal/70 border border-gold/25 shadow-2xl backdrop-blur-xl">
                <BookingForm isFullPage />
              </div>

              {/* Guarantees & Concierge Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-sm bg-charcoal/40 border border-graphite/70">
                  <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-wider font-semibold mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Best Direct Rates</span>
                  </div>
                  <p className="text-xs text-sand/70 leading-relaxed font-light">
                    Booking directly on WhatsApp ensures personalized room selection and instant confirmation without intermediary booking fees.
                  </p>
                </div>

                <div className="p-5 rounded-sm bg-charcoal/40 border border-graphite/70">
                  <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-wider font-semibold mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Instant Attention</span>
                  </div>
                  <p className="text-xs text-sand/70 leading-relaxed font-light">
                    Our 24-hour reception desk replies promptly with your reservation summary and check-in details.
                  </p>
                </div>

                <div className="p-5 rounded-sm bg-charcoal/40 border border-graphite/70">
                  <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-wider font-semibold mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Flexible Settlement</span>
                  </div>
                  <p className="text-xs text-sand/70 leading-relaxed font-light">
                    Settle via Telebirr, CBE Bank Transfer, Cash on arrival, or POS Card at reception.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
