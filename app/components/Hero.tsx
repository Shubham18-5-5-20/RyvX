// components/Hero.tsx

"use client";

import { motion, useMotionValue, useTransform, animate, useAnimationControls, Variants } from 'framer-motion';
import { useEffect } from 'react';

// --- PROPS INTERFACE (Unchanged) ---
interface HeroProps {
  onCtaClick: () => void;
}

// --- ANIMATION VARIANTS (Unchanged) ---
const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scrollCueVariants: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
  },
};


const Hero = ({ onCtaClick }: HeroProps) => {
  const headlineText = "WHERE TASTE IS THE ONLY METRIC.";
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => headlineText.slice(0, latest));
  
  const secondaryControls = useAnimationControls();

  useEffect(() => {
    const controls = animate(count, headlineText.length, {
      type: "tween",
      // --- SPEED ADJUSTMENT ---
      // Changed from 4 to 2.5 for a faster effect.
      duration: 2.5, 
      ease: "linear",
      onComplete: () => {
        secondaryControls.start("animate");
      }
    });
    return controls.stop;
  }, []); // The empty dependency array ensures this runs only once.


  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background and Overlays (Unchanged) */}
      <div className="absolute inset-0 bg-black" />
      <video key="/videos/video-editing.mp4" className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline>
        <source src="/videos/video-editing.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent/50 to-transparent" />

      {/* Foreground Content (Unchanged) */}
      <div className="relative z-10 h-full w-full">
        <div className="flex h-full flex-col items-center justify-center space-y-8 p-4 text-center">
          
          <h1 className="text-5xl font-bold text-white tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <motion.span>{displayText}</motion.span>
            <motion.span 
              className="blinking-cursor"
              animate={secondaryControls} 
              variants={{ animate: { opacity: 0 }, initial: { opacity: 1 } }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              |
            </motion.span>
          </h1>

          <motion.div
            initial="initial"
            animate={secondaryControls}
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.3,
                }
              }
            }}
            className="flex flex-col items-center space-y-8"
          >
            <motion.p variants={itemVariants} className="max-w-3xl text-lg text-gray-200">
              The Curated Home for Top-Tier Video Editors. Zero Commission. Maximum Impact.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button onClick={onCtaClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block rounded-md border border-white bg-transparent px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white/10 cursor-pointer">
                Request An Invitation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial="initial"
          animate={secondaryControls}
          variants={itemVariants}
        >
          <motion.div variants={scrollCueVariants} animate="animate">
            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;