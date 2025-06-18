// app/page.tsx

"use client"; // This must be a Client Component to use hooks.

import { useRef } from 'react';
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Principles from "./components/Principles";
import InvitationForm from "./components/InvitationForm";
import Footer from "./components/Footer";

export default function HomePage() {
  // 1. Create a ref. This is like a handle to a specific DOM element.
  const formRef = useRef<HTMLDivElement>(null);

  // 2. Create the handler function that performs the actual smooth scroll.
  const handleScrollToForm = () => {
    // This command tells the browser to scroll the element attached to 'formRef' into view smoothly.
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // Aligns the top of the form with the top of the screen.
    });
  };

  return (
    <main className="bg-black">
      {/* 3. The Hero component receives the scroll function as a prop. */}
      <Hero onCtaClick={handleScrollToForm} />

      {/* The other sections require no changes. */}
      <Manifesto />
      <Principles />

      {/* 4. The InvitationForm component receives the ref itself. */}
      {/* This assumes your InvitationForm.tsx is wrapped in 'forwardRef'. */}
      <InvitationForm ref={formRef} />
      
      <Footer />
    </main>
  );
}