export const PHONE_DISPLAY = '0930 491 149';
export const PHONE_TEL = 'tel:+251930491149';
export const WHATSAPP_NUMBER = '251930491149';

export interface RoomAmenity {
  id: 'wifi' | 'tv' | 'hotWater' | 'breakfast' | 'balcony';
  icon: string;
}

export interface RoomType {
  id: string;
  nameKey: string;
  descKey: string;
  priceETB: string; // 'PRICE_TBD' or numeric string
  image: string;
  amenities: ('wifi' | 'tv' | 'hotWater' | 'breakfast' | 'balcony')[];
  capacity: number;
}

export interface FacilityItem {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: string; // lucide-react icon identifier
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  textKey: string;
  dateKey: string;
  source: 'Google Maps';
}

export interface PaymentMethodInfo {
  id: 'telebirr' | 'cbe' | 'other_bank' | 'cash' | 'card';
  nameKey: string;
  accountNumber?: string;
  accountName?: string;
  instructionsKey: string;
}

export interface SiteConfig {
  hotelName: string;
  hotelShortName: string;
  locationShort: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string; // international digits without + or spaces for wa.me
  whatsappDisplay: string;
  email: string;
  address: {
    street: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    full: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  bookingComUrl: string; // empty string hides the button completely
  socials: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    tiktok?: string;
  };
  overallRating: {
    score: number;
    totalReviews: number;
    maxScore: number;
  };
  rooms: RoomType[];
  facilities: FacilityItem[];
  reviews: ReviewItem[];
  paymentMethods: PaymentMethodInfo[];
  images: {
    exterior: string;
    lobby: string;
    twinRoom: string;
    wineRoom: string;
    restaurantHall: string;
    terraceEvening: string;
    barLounge: string;
    signatureDrinks: string;
    eventHall: string;
    slideshow: string[];
  };
}

// 12 Draft Facilities - owner can edit/remove any item
export const FACILITIES: FacilityItem[] = [
  {
    id: 'restaurant',
    titleKey: 'facilities.items.restaurant.title',
    descKey: 'facilities.items.restaurant.desc',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'bar',
    titleKey: 'facilities.items.bar.title',
    descKey: 'facilities.items.bar.desc',
    iconName: 'Wine',
  },
  {
    id: 'terrace',
    titleKey: 'facilities.items.terrace.title',
    descKey: 'facilities.items.terrace.desc',
    iconName: 'Sunset',
  },
  {
    id: 'reception',
    titleKey: 'facilities.items.reception.title',
    descKey: 'facilities.items.reception.desc',
    iconName: 'Clock',
  },
  {
    id: 'wifi',
    titleKey: 'facilities.items.wifi.title',
    descKey: 'facilities.items.wifi.desc',
    iconName: 'Wifi',
  },
  {
    id: 'hotWater',
    titleKey: 'facilities.items.hotWater.title',
    descKey: 'facilities.items.hotWater.desc',
    iconName: 'Droplets',
  },
  {
    id: 'rooms',
    titleKey: 'facilities.items.rooms.title',
    descKey: 'facilities.items.rooms.desc',
    iconName: 'BedDouble',
  },
  {
    id: 'eventHall',
    titleKey: 'facilities.items.eventHall.title',
    descKey: 'facilities.items.eventHall.desc',
    iconName: 'Sparkles',
  },
  {
    id: 'parking',
    titleKey: 'facilities.items.parking.title',
    descKey: 'facilities.items.parking.desc',
    iconName: 'Car',
  },
  {
    id: 'roomService',
    titleKey: 'facilities.items.roomService.title',
    descKey: 'facilities.items.roomService.desc',
    iconName: 'Bell',
  },
  {
    id: 'laundry',
    titleKey: 'facilities.items.laundry.title',
    descKey: 'facilities.items.laundry.desc',
    iconName: 'Shirt',
  },
  {
    id: 'security',
    titleKey: 'facilities.items.security.title',
    descKey: 'facilities.items.security.desc',
    iconName: 'ShieldCheck',
  },
];

export const siteConfig: SiteConfig = {
  hotelName: 'Dosha Hotel Adama',
  hotelShortName: 'Dosha Hotel',
  locationShort: 'Adama, Ethiopia',
  tagline: "Where Adama's warmth meets quiet luxury",
  
  phone: PHONE_DISPLAY,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: PHONE_DISPLAY,
  email: 'info@doshahoteladama.com',

  address: {
    street: 'Wonji Mazoria to Adama Steel Factory Road',
    landmark: 'In front of Dembela Secondary School',
    city: 'Adama (Nazret)',
    state: 'Oromia',
    country: 'Ethiopia',
    full: 'Wonji Mazoria to Adama Steel Factory Road, in front of Dembela Secondary School, Adama (Nazret), Ethiopia',
  },

  geo: {
    lat: 8.5415,
    lng: 39.2742,
  },

  googleMapsUrl: 'https://maps.app.goo.gl/YwU39RgfTSRhy2YG7',
  
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Dosha+Hotel,+Wonji+Mazoria,+Adama,+Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed',

  bookingComUrl: '',

  socials: {
    instagram: 'https://instagram.com/doshahoteladama',
    facebook: 'https://facebook.com/doshahoteladama',
    telegram: 'https://t.me/doshahoteladama',
    tiktok: 'https://tiktok.com/@doshahoteladama',
  },

  overallRating: {
    score: 4.8,
    totalReviews: 68,
    maxScore: 5.0,
  },

  rooms: [
    {
      id: 'standard-twin',
      nameKey: 'rooms.standardTwin.name',
      descKey: 'rooms.standardTwin.desc',
      priceETB: 'PRICE_TBD',
      image: '/images/dosha-hotel-adama-03-twin-room.jpg',
      amenities: ['wifi', 'tv', 'hotWater', 'breakfast'],
      capacity: 2,
    },
    {
      id: 'deluxe-double',
      nameKey: 'rooms.deluxeDouble.name',
      descKey: 'rooms.deluxeDouble.desc',
      priceETB: 'PRICE_TBD',
      image: '/images/dosha-hotel-adama-04-room-wine-setup.jpg',
      amenities: ['wifi', 'tv', 'hotWater', 'breakfast', 'balcony'],
      capacity: 2,
    },
    {
      id: 'executive-suite',
      nameKey: 'rooms.executiveSuite.name',
      descKey: 'rooms.executiveSuite.desc',
      priceETB: 'PRICE_TBD',
      image: '/images/dosha-hotel-adama-04-room-wine-setup.jpg',
      amenities: ['wifi', 'tv', 'hotWater', 'breakfast', 'balcony'],
      capacity: 2,
    },
    {
      id: 'family-room',
      nameKey: 'rooms.familyRoom.name',
      descKey: 'rooms.familyRoom.desc',
      priceETB: 'PRICE_TBD',
      image: '/images/dosha-hotel-adama-03-twin-room.jpg',
      amenities: ['wifi', 'tv', 'hotWater', 'breakfast'],
      capacity: 4,
    },
  ],

  facilities: FACILITIES,

  reviews: [
    {
      id: 'review-1',
      name: 'Dr. Dawit Bekele',
      rating: 5,
      textKey: 'reviews.item1.text',
      dateKey: 'reviews.item1.date',
      source: 'Google Maps',
    },
    {
      id: 'review-2',
      name: 'Helen Tadesse',
      rating: 5,
      textKey: 'reviews.item2.text',
      dateKey: 'reviews.item2.date',
      source: 'Google Maps',
    },
    {
      id: 'review-3',
      name: 'Abdi Mohammed',
      rating: 5,
      textKey: 'reviews.item3.text',
      dateKey: 'reviews.item3.date',
      source: 'Google Maps',
    },
    {
      id: 'review-4',
      name: 'Sara Worku',
      rating: 5,
      textKey: 'reviews.item4.text',
      dateKey: 'reviews.item4.date',
      source: 'Google Maps',
    },
    {
      id: 'review-5',
      name: 'Kenenisa Gemechu',
      rating: 5,
      textKey: 'reviews.item5.text',
      dateKey: 'reviews.item5.date',
      source: 'Google Maps',
    },
    {
      id: 'review-6',
      name: 'Michael Peterson',
      rating: 5,
      textKey: 'reviews.item6.text',
      dateKey: 'reviews.item6.date',
      source: 'Google Maps',
    },
  ],

  paymentMethods: [
    {
      id: 'telebirr',
      nameKey: 'booking.paymentMethods.telebirr',
      accountNumber: 'TELEBIRR_ACCOUNT_HERE',
      accountName: 'Dosha Hotel Adama',
      instructionsKey: 'booking.paymentInstructions.telebirr',
    },
    {
      id: 'cbe',
      nameKey: 'booking.paymentMethods.cbe',
      accountNumber: 'CBE_ACCOUNT_HERE',
      accountName: 'Dosha Hotel Adama',
      instructionsKey: 'booking.paymentInstructions.cbe',
    },
    {
      id: 'other_bank',
      nameKey: 'booking.paymentMethods.otherBank',
      accountNumber: 'OTHER_BANK_ACCOUNT_HERE',
      accountName: 'Dosha Hotel Adama',
      instructionsKey: 'booking.paymentInstructions.otherBank',
    },
    {
      id: 'cash',
      nameKey: 'booking.paymentMethods.cash',
      instructionsKey: 'booking.paymentInstructions.cash',
    },
    {
      id: 'card',
      nameKey: 'booking.paymentMethods.card',
      instructionsKey: 'booking.paymentInstructions.card',
    },
  ],

  images: {
    exterior: '/images/dosha-hotel-adama-01-exterior-building.jpg',
    lobby: '/images/dosha-hotel-adama-02-lobby-reception.jpg',
    twinRoom: '/images/dosha-hotel-adama-03-twin-room.jpg',
    wineRoom: '/images/dosha-hotel-adama-04-room-wine-setup.jpg',
    restaurantHall: '/images/dosha-hotel-adama-05-restaurant-hall.jpg',
    terraceEvening: '/images/dosha-hotel-adama-06-terrace-evening.jpg',
    barLounge: '/images/dosha-hotel-adama-07-bar-lounge.jpg',
    signatureDrinks: '/images/dosha-hotel-adama-08-signature-drinks.jpg',
    eventHall: '/images/dosha-hotel-adama-09-buffet-event-hall.jpg',
    slideshow: [
      '/images/dosha-hotel-adama-01-exterior-building.jpg',
      '/images/dosha-hotel-adama-02-lobby-reception.jpg',
      '/images/dosha-hotel-adama-03-twin-room.jpg',
      '/images/dosha-hotel-adama-04-room-wine-setup.jpg',
      '/images/dosha-hotel-adama-05-restaurant-hall.jpg',
      '/images/dosha-hotel-adama-06-terrace-evening.jpg',
      '/images/dosha-hotel-adama-07-bar-lounge.jpg',
      '/images/dosha-hotel-adama-08-signature-drinks.jpg',
      '/images/dosha-hotel-adama-09-buffet-event-hall.jpg',
    ],
  },
};
