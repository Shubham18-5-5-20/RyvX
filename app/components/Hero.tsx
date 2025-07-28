// components/Hero.tsx

"use client";

import { motion } from 'framer-motion';

// 1. Define an interface for the props the Hero component will accept.
// This tells TypeScript that 'onCtaClick' is a function that takes no arguments and returns void.
interface HeroProps {
  onCtaClick: () => void;
}

// Animation variants remain the same
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// 2. Apply the HeroProps interface to your component's props.
// This makes TypeScript aware of the 'onCtaClick' prop.
const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black" />

       <video 
         key="/videos/video-editing.mp4" 
         className="absolute inset-0 h-full w-full object-cover" 
         autoPlay 
         loop 
         muted 
         playsInline 
       >
        <source src="/videos/video-editing.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

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
          The Curated Home for Top-Tier Video Editors. Zero Commission. Maximum Impact.
        </motion.p>
        
        <motion.div
          variants={fadeIn} initial="initial" animate="animate"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* 3. This onClick handler now correctly uses the passed-in prop. */}
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