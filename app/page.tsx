// app/page.tsx
"use client";

import { useRef } from 'react';
import Hero from "./components/Hero";
import FoundingMembers from './components/FoundingMembers';
import Manifesto from "./components/Manifesto";
import Principles from "./components/Principles";
import Footer from "./components/Footer";

export default function HomePage() {
  // The ref is now typed to point to a generic HTMLElement, which is safer.
  const waitlistSectionRef = useRef<HTMLElement>(null);

  const handleScrollToWaitlist = () => {
    waitlistSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="bg-black">
      <Hero onCtaClick={handleScrollToWaitlist} />

      {/* 
        FIX: The ref is now passed directly to the component.
        This is cleaner and the correct TypeScript/React pattern.
      */}
      <FoundingMembers ref={waitlistSectionRef} />

      <Manifesto />
      <Principles />
      <Footer />
    </main>
  );
}