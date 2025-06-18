// components/Hero.tsx

"use client"; // This directive is necessary because we are using React hooks (via Framer Motion)

import { motion } from 'framer-motion';

// --- Props Interface ---
interface HeroProps {
  videoUrl?: string;
  headline?: string;
  subheading?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// --- Animation Variants ---
// Defining animation variants here keeps the JSX clean and the animations consistent.
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// --- The Hero Component ---
const Hero = ({
  // IMPORTANT: Replace this placeholder with the actual path to your video in the `public` folder
  videoUrl = "/ink-background.mp4",
  headline = "WHERE TASTE IS THE ONLY METRIC.",
  subheading = "An invite-only collective for the world's most discerning creative professionals.",
  ctaText = "Request An Invitation",
  onCtaClick,
}: HeroProps) => {

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 
        A solid black background acts as an instant, on-brand fallback. 
        If the video fails, the experience is not broken.
      */}
      <div className="absolute inset-0 bg-black" />

      {/* Background Video */}
      <video
        // Adding a key ensures the component re-renders if the videoUrl prop changes.
        key={videoUrl}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline // Essential for video autoplay on mobile browsers (especially iOS)
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-8 p-4 text-center">
        {/* Headline */}
        <motion.h1
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="text-5xl font-bold text-white tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {headline}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          className="max-w-2xl text-lg text-gray-200 md:text-xl"
        >
          {subheading}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCtaClick}
          // Tailwind handles the static and basic hover styles
          // Framer Motion handles the dynamic physical interactions
          className="rounded-md border border-white bg-transparent px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white/10"
        >
          {ctaText}
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;