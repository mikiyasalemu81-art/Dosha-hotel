'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickBookingBar from '@/components/QuickBookingBar';
import About from '@/components/About';
import Rooms from '@/components/Rooms';
import Restaurant from '@/components/Restaurant';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [bookingPrefill, setBookingPrefill] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

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

  return (
    <>
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Quick Booking Bar */}
        <QuickBookingBar onCheckAvailability={handleQuickCheck} />

        {/* About Section */}
        <About />

        {/* Rooms Section */}
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

      {/* WhatsApp Booking Modal */}
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
