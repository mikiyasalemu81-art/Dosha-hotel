'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { DoshaEmblem } from '@/components/Logo';

export default function NotFound() {
  const locale = useLocale();
  const tCommon = useTranslations('common');

  const titles: { [key: string]: string } = {
    en: 'Sanctuary Page Not Found',
    am: 'የተፈለገው ገጽ አልተገኘም',
    om: 'Fuulli Barbaaddan Hin Argamne',
  };

  const descriptions: { [key: string]: string } = {
    en: 'The page you are looking for does not exist or has been moved.',
    am: 'የፈለጉት ገጽ አልተገኘም ወይም ተንቀሳቅሷል። ወደ ዋናው ገጽ ይመለሱ።',
    om: 'Fuulli barbaaddan kun hin jiru ykn jijjiirameera. Gara fuula duraatti deebi\'aa.',
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-card p-8 sm:p-10 shadow-soft border border-sand">
        <div className="w-16 h-16 rounded-full bg-champagne border border-sand flex items-center justify-center mx-auto mb-6 p-2">
          <DoshaEmblem className="w-full h-full" />
        </div>

        <span className="eyebrow-label mb-2 justify-center">404</span>

        <h1 className="font-serif text-3xl font-light text-ink mb-3">
          {titles[locale] || titles.en}
        </h1>

        <p className="text-xs sm:text-sm text-ink-soft font-light leading-relaxed mb-8">
          {descriptions[locale] || descriptions.en}
        </p>

        <Link
          href={`/${locale}`}
          className="btn-bronze inline-flex items-center gap-2 !py-2.5 !px-6 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{tCommon('back')}</span>
        </Link>
      </div>
    </div>
  );
}
