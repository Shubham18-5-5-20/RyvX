// app/page.tsx

"use client"; 

import { useRef } from 'react';
import Hero from "./components/Hero";
import FoundingMembers from './components/FoundingMembers';
// Import the new unified component
import ManifestoWithPrinciples from "./components/ManifestoWithPrinciples";
import Footer from "./components/Footer";

export default function HomePage() {
  // FIX: The ref is now specifically typed to an HTMLDivElement.
  // This exactly matches the type of the <div> it will be attached to.
  const waitlistSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToWaitlist = () => {
    waitlistSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="bg-black">
      <Hero onCtaClick={handleScrollToWaitlist} />

      {/* This ref now correctly matches the type of the <div> */}
      <div ref={waitlistSectionRef}>
        <FoundingMembers />
      </div>

      <ManifestoWithPrinciples />
      
      <Footer />
    </main>
  );
}