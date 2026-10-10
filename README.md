# DOSHA HOTEL ADAMA — Luxury Hotel Website

A production-ready, cinematic, fully responsive luxury website for **Dosha Hotel Adama**, situated in Adama (Nazret), Ethiopia, on the Wonji Mazoria to Adama Steel Factory road, in front of Dembela Secondary School.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling, and full internationalization (`next-intl`) across **English (en)**, **Amharic (am)**, and **Afan Oromo (om)**.

---

## 1. Quick Start

### Prerequisites
- Node.js 18.18+ or 20+ (tested with v24.17.0)
- npm 9+ or 11+

### Installation & Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 2. Project Architecture & File Structure

```
/
├── messages/
│   ├── en.json              # English copy & alt text
│   ├── am.json              # Amharic (አማርኛ) copy & alt text
│   └── om.json              # Afan Oromo copy & alt text
├── public/
│   ├── favicon.svg          # Original vector emblem favicon
│   └── images/              # All 9 high-resolution photos
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx   # Root locale layout with SEO & Hotel JSON-LD
│   │   │   ├── page.tsx     # Home page
│   │   │   └── book/
│   │   │       └── page.tsx # Dedicated WhatsApp reservation page
│   │   ├── globals.css      # Luxury CSS variables, grain overlay & typography
│   │   ├── robots.ts        # Dynamic robots.txt
│   │   └── sitemap.ts       # Multilingual sitemap.xml with hreflang alternates
│   ├── components/
│   │   ├── About.tsx        # Welcome section with lobby parallax
│   │   ├── BookingForm.tsx  # WhatsApp reservation form & validation
│   │   ├── BookingModal.tsx # Accessible reservation modal
│   │   ├── Cursor.tsx       # Custom desktop cursor
│   │   ├── FloatingActions.tsx # WhatsApp, Call Now, Language popover
│   │   ├── Footer.tsx       # Footer with contacts & links
│   │   ├── Gallery.tsx      # Masonry photo grid
│   │   ├── Hero.tsx         # 9-slide Ken Burns loop & headline
│   │   ├── LanguageSwitcher.tsx # Instant multilingual switcher
│   │   ├── Lightbox.tsx     # Fullscreen photo lightbox
│   │   ├── LoadingScreen.tsx# SVG stroke splash screen
│   │   ├── Location.tsx     # Google Maps & contact information
│   │   ├── Logo.tsx         # Original Dosha SVG emblem & wordmark
│   │   ├── MagneticButton.tsx # Desktop cursor magnetic pull
│   │   ├── Navbar.tsx       # Glass navigation with scroll hide/reveal
│   │   ├── QuickBookingBar.tsx # Floating quick-booking card / mobile bar
│   │   ├── Restaurant.tsx   # Culinary collage & terrace highlights
│   │   ├── Reveal.tsx       # Viewport scroll animations
│   │   ├── Rooms.tsx        # 4 room types & amenity badges
│   │   └── SmoothScroll.tsx # Lenis smooth scrolling
│   ├── config/
│   │   └── site.ts          # SINGLE SOURCE OF TRUTH for all hotel data
│   └── i18n/
│       ├── request.ts       # next-intl server request config
│       └── routing.ts       # Supported locales [en, am, om]
├── tailwind.config.ts       # Custom luxury color palette & typography
└── tsconfig.json
```

---

## 3. How to Edit Hotel Information (`src/config/site.ts`)

All content, telephone numbers, WhatsApp numbers, room types, reviews, and payment instructions are consolidated in `src/config/site.ts`.

### Changing the WhatsApp Number and Phone
In `src/config/site.ts`:
```typescript
phone: '+251 91 123 4567', // For tel: links
whatsappNumber: '251911234567', // International format digits ONLY (no spaces or '+')
whatsappDisplay: '+251 91 123 4567', // Display format in UI
```

### Adding or Updating Booking.com Link
```typescript
bookingComUrl: 'https://www.booking.com/hotel/et/dosha-adama.html', // Set URL to show button, or '' to hide
```

### Setting Room Rates & Amenities
In `siteConfig.rooms`:
```typescript
{
  id: 'standard-twin',
  nameKey: 'rooms.standardTwin.name',
  descKey: 'rooms.standardTwin.desc',
  priceETB: '2500', // Set numeric rate or leave 'PRICE_TBD'
  image: '/images/dosha-hotel-adama-03-twin-room.jpg',
  amenities: ['wifi', 'tv', 'hotWater', 'breakfast'],
  capacity: 2,
}
```

### Updating Bank Accounts & Payment Methods
In `siteConfig.paymentMethods`:
```typescript
{
  id: 'telebirr',
  accountNumber: '0911234567',
  accountName: 'Dosha Hotel Adama',
  ...
}
```

---

## 4. How to Edit Translations

All translated copy is organized in `/messages/`:
- `en.json`: English
- `am.json`: Amharic (አማርኛ)
- `om.json`: Afan Oromo (Afaan Oromoo)

To change any headline, caption, or room description, edit the corresponding keys in each JSON file. Ethiopic glyph heights are safeguarded in `globals.css` so characters never get clipped.

---

## 5. Adding or Replacing Photos

Photos live in `/public/images/`. To replace a photo, keep the file name or update the path in `src/config/site.ts`:
1. `dosha-hotel-adama-01-exterior-building.jpg`
2. `dosha-hotel-adama-02-lobby-reception.jpg`
3. `dosha-hotel-adama-03-twin-room.jpg`
4. `dosha-hotel-adama-04-room-wine-setup.jpg`
5. `dosha-hotel-adama-05-restaurant-hall.jpg`
6. `dosha-hotel-adama-06-terrace-evening.jpg`
7. `dosha-hotel-adama-07-bar-lounge.jpg`
8. `dosha-hotel-adama-08-signature-drinks.jpg`
9. `dosha-hotel-adama-09-buffet-event-hall.jpg`

---

## 6. Deploying to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository.
4. Set the environment variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
5. Click **Deploy**. Vercel will build and serve the site globally with Edge routing and static generation.
