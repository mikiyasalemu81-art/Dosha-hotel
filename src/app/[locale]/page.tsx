'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickBookingBar from '@/components/QuickBookingBar';
import About from '@/components/About';
import Rooms from '@/components/Rooms';
import MarqueeRibbon from '@/components/MarqueeRibbon';
import Restaurant from '@/components/Restaurant';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import PageCircleTransition from '@/components/PageCircleTransition';
import { useRouter, usePathname } from '@/i18n/routing';

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [bookingPrefill, setBookingPrefill] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  // Circle page transition state
  const [circleTransition, setCircleTransition] = useState<{
    isActive: boolean;
    origin: { x: number; y: number } | null;
    targetLocale?: string;
  }>({
    isActive: false,
    origin: null,
  });

  const handleOpenBooking = (roomId?: string) => {
    setSelectedRoom(roomId);
    setIsBookingOpen(true);
  };

  const handleQuickCheck = (details: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => {
    setBookingPrefill(details);
    setIsBookingOpen(true);
  };

  const handleLanguageTransition = (
    coords: { x: number; y: number },
    targetLocale: string
  ) => {
    setCircleTransition({
      isActive: true,
      origin: coords,
      targetLocale,
    });
    setTimeout(() => {
      router.replace(pathname, { locale: targetLocale as any });
      setTimeout(() => {
        setCircleTransition({ isActive: false, origin: null });
      }, 500);
    }, 450);
  };

  return (
    <>
      {/* Expanding Bronze-to-Champagne Circle Transition */}
      <PageCircleTransition
        isActive={circleTransition.isActive}
        origin={circleTransition.origin}
      />

      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onLanguageTransition={handleLanguageTransition}
      />

      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Quick Booking Bar */}
        <QuickBookingBar onCheckAvailability={handleQuickCheck} />

        {/* About Section */}
        <About />

        {/* Marquee Ribbon */}
        <MarqueeRibbon />

        {/* Rooms Section (Pinned horizontal scroll) */}
        <Rooms onSelectRoom={(roomId) => handleOpenBooking(roomId)} />

        {/* Restaurant & Lounge Section */}
        <Restaurant />

        {/* Gallery Section */}
        <Gallery />

        {/* Reviews Section */}
        <Reviews />

        {/* Location Section */}
        <Location />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Conversational Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoomId={selectedRoom}
        initialCheckIn={bookingPrefill.checkIn}
        initialCheckOut={bookingPrefill.checkOut}
        initialGuests={bookingPrefill.guests}
      />
    </>
  );
}
