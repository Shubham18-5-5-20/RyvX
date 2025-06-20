// components/Manifesto.tsx

"use client";

import { motion } from 'framer-motion';

interface ManifestoProps {
  paragraphs?: string[];
}

// The variants define the start and end states of the animation.
// 'hidden' is how it looks off-screen.
// 'visible' is how it looks on-screen.
const focusVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
};

const DEFAULT_PARAGRAPHS = [
    "The modern internet has turned craftsmanship into a commodity. Platforms reward volume over quality, creating a race to the bottom that is an insult to the true artist.",
    "RyvX is the antidote. We are a private, vetted ecosystem where your work speaks for itself. A guild hall built for the masters of the craft, not a flea market for amateurs."
];

const Manifesto = ({ paragraphs = DEFAULT_PARAGRAPHS }: ManifestoProps) => {
  return (
    // This container creates the "empty space" with its height and black background.
    <section className="flex min-h-screen items-center bg-black py-24 sm:py-32">
      <motion.div
        className="mx-auto max-w-3xl px-6"
        variants={focusVariants}
        initial="hidden"
        whileInView="visible"
        // THE FIX FOR #1: Re-trigger animation on every view
        // 'once: false' ensures the animation runs every time the element enters the viewport.
        // 'amount: 0.5' means it triggers when the center of the element is visible.
        viewport={{ once: true, amount: 0.5 }}
        
        // THE FIX FOR #2: Slower, more graceful animation
        // Increased duration from 1.0 to 1.8 seconds for a more deliberate feel.
        transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="space-y-12">
          {paragraphs.map((paragraphText, index) => (
            <p
              key={index}
              className="text-center text-2xl font-medium leading-relaxed text-gray-200 md:text-3xl"
            >
              {paragraphText}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;