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

export const siteConfig: SiteConfig = {
  hotelName: 'Dosha Hotel Adama',
  hotelShortName: 'Dosha Hotel',
  locationShort: 'Adama, Ethiopia',
  tagline: "Where Adama's warmth meets quiet luxury",
  
  // Editable contact placeholders
  phone: 'PHONE_NUMBER_HERE',
  whatsappNumber: 'WHATSAPP_NUMBER_HERE',
  whatsappDisplay: 'WHATSAPP_NUMBER_HERE',
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

  // Verified link from user prompt
  googleMapsUrl: 'https://maps.app.goo.gl/YwU39RgfTSRhy2YG7',
  
  // Clean, responsive embed for Adama location
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Dosha+Hotel,+Wonji+Mazoria,+Adama,+Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed',

  // Booking.com external URL (leave empty string to hide)
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

  // 4 Sample room types defined per spec
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

  // 6 structured reviews for owner replacement
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

  // Payment methods and account details
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
