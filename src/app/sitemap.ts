import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doshahoteladama.com';
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    // Home page
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteUrl}/en`,
          am: `${siteUrl}/am`,
          om: `${siteUrl}/om`,
        },
      },
    });

    // Booking page
    entries.push({
      url: `${siteUrl}/${locale}/book`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/en/book`,
          am: `${siteUrl}/am/book`,
          om: `${siteUrl}/om/book`,
        },
      },
    });
  });

  return entries;
}
