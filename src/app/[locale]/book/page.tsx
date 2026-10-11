'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversationalBooking from '@/components/ConversationalBooking';

export default function BookPage() {
  const locale = useLocale();
  const tCommon = useTranslations('common');

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-24 bg-paper min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft hover:text-bronze transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{tCommon('back')}</span>
          </Link>

          {/* Conversational Booking Container */}
          <div className="bg-white rounded-card p-6 sm:p-10 shadow-soft border border-sand/70">
            <ConversationalBooking isModal={false} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
