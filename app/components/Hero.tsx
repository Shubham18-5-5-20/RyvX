// components/Hero.tsx

"use client";

import { motion, Variants } from 'framer-motion';

// --- PROPS INTERFACE (Unchanged) ---
interface HeroProps {
  onCtaClick: () => void;
}

// --- ANIMATION VARIANTS (With a new addition) ---

const mainContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const letterContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const letterVariants: Variants = {
  initial: { opacity: 0, y: 25, rotateX: -90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      duration: 0.5,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- NEW VARIANT ---
// This variant creates the gentle, looping bounce animation for the scroll cue.
const scrollCueVariants: Variants = {
  animate: {
    y: [0, 10, 0], // The vertical positions for the bounce effect
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity, // This makes the animation loop forever
    },
  },
};


const Hero = ({ onCtaClick }: HeroProps) => {
  const headlineText = "WHERE TASTE IS THE ONLY METRIC.";

  return (
    // The main section now has an inner div to contain the scroll cue's absolute positioning
    <section className="relative h-screen w-full overflow-hidden">
      {/* --- BACKGROUND ELEMENTS (Unchanged) --- */}
      <div className="absolute inset-0 bg-black" />
      <video
        key="/videos/video-editing.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay loop muted playsInline
      >
        <source src="/videos/video-editing.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent/50 to-transparent" />

      {/* --- FOREGROUND CONTENT (With the addition of the scroll cue) --- */}
      <div className="relative z-10 h-full w-full">
        <motion.div
          className="flex h-full flex-col items-center justify-center space-y-8 p-4 text-center"
          variants={mainContainerVariants}
          initial="initial"
          animate="animate"
        >
          {/* The Headline (Unchanged) */}
          <motion.h1
            variants={letterContainerVariants}
            className="text-5xl font-bold text-white tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
            aria-label={headlineText}
          >
            {headlineText.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* The Sub-headline (Unchanged) */}
          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-lg text-gray-200"
          >
            The Curated Home for Top-Tier Video Editors. Zero Commission. Maximum Impact.
          </motion.p>
          
          {/* The Button (Unchanged) */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block rounded-md border border-white bg-transparent px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white/10 cursor-pointer"
            >
              Request An Invitation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* --- NEW SCROLL CUE ELEMENT --- */}
        {/* It animates in with `itemVariants` and then starts its own looping animation. */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          variants={itemVariants} // Fades in with the other items
          initial="initial"
          animate="animate"
          transition={{ delay: 1.2 }} // A slight delay so it appears last
        >
          <motion.div variants={scrollCueVariants} animate="animate">
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;