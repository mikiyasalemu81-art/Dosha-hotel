import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingActions from '@/components/FloatingActions';
import '@/app/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doshahoteladama.com';

  const metaDataByLocale: {
    [key: string]: { title: string; description: string };
  } = {
    en: {
      title: 'Dosha Hotel Adama | Luxury Hotel & Dining in Adama, Ethiopia',
      description:
        "Where Adama's warmth meets quiet luxury. Serene rooms, exquisite dining, open-air evening terrace, and refined Ethiopian hospitality along the Wonji corridor.",
    },
    am: {
      title: 'ዶሻ ሆቴል አዳማ | የቅንጦት ማረፊያ እና ሬስቶራንት በአዳማ (ናዝሬት)',
      description:
        'የአዳማ እንግዳ ተቀባይነት ከቅንጦት ጋር የሚገናኝበት። ጸጥታ የሰፈነባቸው ዘመናዊ ክፍሎች፣ ምርጥ ምግቦች እና ክፍት ቴራስ በወንጂ መዞሪያ።',
    },
    om: {
      title: 'Hoteela Dooshaa Adaamaa | Hoteela Filatamaa fi Nyaata Magaalaa Adaamaa',
      description:
        "Simannaan Adaamaa mijataa ol'aanaa waliin kan wal argu. Kutaalee boqonnaa qulqulluu, nyaata aadaa fi kan biyya alaa mi'aawaa daandii Wonjii irratti.",
    },
  };

  const meta = metaDataByLocale[locale] || metaDataByLocale.en;
  const canonicalUrl = `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.hotelName}`,
    },
    description: meta.description,
    keywords: [
      'Dosha Hotel Adama',
      'Hotels in Adama',
      'Hotels in Nazret',
      'Luxury hotel Ethiopia',
      'Wonji Mazoria hotel',
      'Dembela School hotel',
      'Adama hotel rooms',
      'Adama restaurant bar',
      'ዶሻ ሆቴል አዳማ',
      'Hoteela Dooshaa Adaamaa',
    ],
    authors: [{ name: 'Dosha Hotel Adama' }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en`,
        am: `${siteUrl}/am`,
        om: `${siteUrl}/om`,
        'x-default': `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: siteConfig.hotelName,
      locale: locale === 'am' ? 'am_ET' : locale === 'om' ? 'om_ET' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/dosha-hotel-adama-01-exterior-building.jpg`,
          width: 1200,
          height: 800,
          alt: 'Dosha Hotel Adama Exterior Building',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/images/dosha-hotel-adama-01-exterior-building.jpg`],
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doshahoteladama.com';

  const hotelJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: siteConfig.hotelName,
    description: "Where Adama's warmth meets quiet luxury.",
    url: siteUrl,
    telephone: siteConfig.phone,
    image: [
      `${siteUrl}/images/dosha-hotel-adama-01-exterior-building.jpg`,
      `${siteUrl}/images/dosha-hotel-adama-02-lobby-reception.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: 'Adama',
      addressRegion: 'Oromia',
      postalCode: '1000',
      addressCountry: 'ET',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    priceRange: 'ETB',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    sameAs: [
      siteConfig.googleMapsUrl,
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
    ].filter(Boolean),
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Schema.org Hotel JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
      </head>
      <body className="bg-ink text-ivory antialiased selection:bg-gold/30 selection:text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <LoadingScreen />
            <Cursor />
            <div className="relative min-h-screen flex flex-col">{children}</div>
            <FloatingActions />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
