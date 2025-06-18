// components/Hero.tsx

"use client";

import { motion } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    // We add `relative` here so we can position the new overlay.
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black" />

       <video 
         key="/videos/ink-flow.mp4" 
         className="absolute inset-0 h-full w-full object-cover" 
         autoPlay 
         loop 
         muted 
         playsInline 
       >
        <source src="/videos/ink-flow.mp4" type="video/mp4" />
      </video>

      {/* This overlay improves general text readability. */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 
        **THE DEFINITIVE FIX IS HERE**
        This new div creates the fade-to-black effect at the bottom of the section.
        - `absolute inset-0`: Makes it cover the entire section.
        - `bg-gradient-to-t`: Creates a gradient that goes from bottom TO top.
        - `from-black`: The gradient starts at the bottom with solid black.
        - `to-transparent`: The gradient ends at the top, fully transparent.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      {/* The rest of your content remains exactly the same. */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-8 p-4 text-center">
        <motion.h1
          variants={fadeIn} initial="initial" animate="animate"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold text-white tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
        >
          WHERE TASTE IS THE ONLY METRIC.
        </motion.h1>

        <motion.p
          variants={fadeIn} initial="initial" animate="animate"
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl text-lg text-gray-200"
        >
          An invite-only collective for the world&apos;s most discerning creative professionals.
        </motion.p>
        
        <motion.div
          variants={fadeIn} initial="initial" animate="animate"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-md border border-white bg-transparent px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white/10 cursor-pointer"
          >
            Request An Invitation
          </motion.button>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;