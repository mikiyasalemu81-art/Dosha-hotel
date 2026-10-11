# DOSHA HOTEL ADAMA — DESIGN V2 (Clean Bright Luxury)

A boutique hotel web platform for **Dosha Hotel Adama**, situated in Adama (Nazret), Ethiopia, along the Wonji Mazoria corridor facing Dembela Secondary School.

Redesigned according to **Design V2: Clean Bright Luxury with Unexpected Transitions**: sunlit ivory palettes, tall arch frames, 9 cycling clip-path hero animations, conversational 6-step WhatsApp booking, automatic Day/Evening mode (Africa/Addis_Ababa time), ambient lobby audio, and smooth motion across **English (en)**, **Amharic (am)**, and **Afan Oromo (om)**.

---

## 1. Quick Start

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

## 2. Configuration & Information to Provide (`src/config/site.ts`)

All content, telephone numbers, room rates, and bank accounts are centralized in [`src/config/site.ts`](file:///c:/Users/ps/Desktop/dosha%20hotel/src/config/site.ts).

### 1) Official Phone & WhatsApp Numbers
```typescript
export const PHONE_DISPLAY = '0930 491 149';
export const PHONE_TEL = 'tel:+251930491149';
export const WHATSAPP_NUMBER = '251930491149';
```

> **Important Note on Facilities**:
> The facilities list is a draft. Confirm each item with the hotel and remove anything not offered. Do not claim star ratings or any other facts not provided.

### 2) Room Rates
By default, room prices are set to `'PRICE_TBD'`. To display numeric rates:
```typescript
{
  id: 'standard-twin',
  nameKey: 'rooms.standardTwin.name',
  descKey: 'rooms.standardTwin.desc',
  priceETB: '2500', // Change from 'PRICE_TBD' to your price
  image: '/images/dosha-hotel-adama-03-twin-room.jpg',
  amenities: ['wifi', 'tv', 'hotWater', 'breakfast'],
  capacity: 2,
}
```

### 3) Payment Account Numbers
In `siteConfig.paymentMethods`, supply your real Telebirr, CBE, and bank account numbers:
```typescript
{
  id: 'telebirr',
  accountNumber: '0911234567', // Replace TELEBIRR_ACCOUNT_HERE
  accountName: 'Dosha Hotel Adama',
  ...
},
{
  id: 'cbe',
  accountNumber: '1000123456789', // Replace CBE_ACCOUNT_HERE
  accountName: 'Dosha Hotel Adama',
  ...
}
```

### 4) Optional Ambient Audio File
Place a royalty-free MP3 file at:
```
/public/audio/lobby-ambience.mp3
```
- **If the file is not present**: The audio toggle button in the navbar is automatically hidden so no broken controls are ever displayed.
- **When present**: Visitors can toggle soft lobby ambience (starts only on user tap, fades in over 1.5s, volume 0.25, pauses on tab blur).

### 5) External Booking.com Link (Optional)
If you wish to show the "Book on Booking.com" secondary button:
```typescript
bookingComUrl: 'https://www.booking.com/hotel/et/dosha-hotel-adama.html', // Set URL or leave '' to hide
```

---

## 3. Implemented Features & Micro-Details

- **Clean Bright Luxury Palette**: CSS variables `--paper` (`#FBF8F3`), `--white` (`#FFFFFF`), `--champagne` (`#EFE5D3`), `--sand` (`#D8C8AA`), `--bronze` (`#B08D57`), `--bronze-deep` (`#8A6A3B`), `--ink` (`#1C1A17`), and `--ink-soft` (`#5E574C`).
- **Hero Arch Slideshow**: 82vh tall arch frame looping all 9 photos every 3s with the exact 9 distinct clip-path transition sequences, 1.1s cubic-bezier timing, next-image preloading, 3s filling line progress, and accessible pause control.
- **Conversational 6-Step Booking**: One question per step (Dates, Guests, Room, Payment, Notes, Details), live summary card, sessionStorage persistence, input validation, and direct prefilled multilingual WhatsApp dispatch.
- **Pinned Horizontal Rooms Scroll**: Cards scroll horizontally on vertical scroll on desktop; snap carousel on mobile.
- **Automatic Day & Evening Mode**: Detects browser local time in Adama (`Africa/Addis_Ababa` UTC+3). Uses Day mode between 06:00 and 17:59, and Evening mode between 18:00 and 05:59 with a 1.2s smooth CSS variable transition. Includes a manual Auto/Day/Evening navbar toggle with localStorage memory and Anti-FOUC script.
- **Full-Screen Circle Page Transition**: Expanding bronze-to-champagne circle mask from clicked language switcher origin.
- **Marquee Ribbon**: Outlined-serif ribbon between sections reacting to scroll velocity.
- **Luxury Micro-Details**:
  - Interactive double-door swing on logo click.
  - 5-click easter egg revealing a multilingual "Welcome home" toast.
  - Tab title changer when inactive ("Your stay awaits · Dosha Hotel").
  - Bronze top hairline scroll progress & back-to-top button.
  - Custom bronze thin scrollbar and selection color.
  - Branded 404 page with arch emblem and trilingual return button.
  - Custom desktop cursor with trailing ring and "View" label over images.
