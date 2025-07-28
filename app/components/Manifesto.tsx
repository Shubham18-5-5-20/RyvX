// components/Manifesto.tsx

"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- DATA & HELPER COMPONENTS (No changes here) ---

const manifestoText = [
  "Our industry has become a factory. A race to the bottom where speed is valued over substance, and algorithms dictate taste.",
  "We believe in a different path. A return to the principles of true craftsmanship, where the artist is empowered, not commoditized.",
  "RyvX is our declaration. It is a curated ecosystem built on trust, peer-to-peer respect, and an unwavering focus on the craft itself.",
  "This is not another marketplace. This is a guild hall for the digital age."
];

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span className="text-gray-300 transition-opacity duration-200" style={{ opacity }}>
      {children}
    </motion.span>
  );
};

const Paragraph = ({ text }: { text: string }) => {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.1']
  });
  const words = text.split(" ");
  return (
    <p ref={element} className="text-3xl lg:text-4xl max-w-2xl font-medium leading-relaxed">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word + " "}</Word>;
      })}
    </p>
  );
};


// --- MAIN MANIFESTO COMPONENT (Updated with new layout and animation logic) ---
const Manifesto = () => {
  // 1. Create a ref for the main section container.
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Track the scroll progress of the entire section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // Track from the moment the top hits the top, to when the bottom hits the bottom.
  });

  // 3. Map the scroll progress to a rotation value for our 3D graphic.
  // As we scroll through the whole section, the cube will rotate 360 degrees on the Y-axis.
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -360]);


  return (
    <section ref={containerRef} className="bg-black text-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* We now use a two-column layout */}
        <div className="flex flex-col md:flex-row md:space-x-12">
          
          {/* Left Column: The scrolling text */}
          <div className="md:w-3/5">
            <div className="flex flex-col space-y-32">
              {manifestoText.map((paragraph, index) => (
                <Paragraph key={index} text={paragraph} />
              ))}
            </div>
          </div>

          {/* Right Column: The pinned visual */}
          <div className="md:w-2/5 h-screen -mt-24">
            {/* The 'sticky' class is what pins this element to the top of the screen */}
            <div className="sticky top-0 h-full flex items-center justify-center">
              <motion.div 
                className="w-48 h-48 lg:w-64 lg:h-64"
                style={{
                  perspective: 800, // Adds depth to the 3D rotation
                }}
              >
                {/* This is our visual element, the rotating cube. */}
                <motion.div
                  className="w-full h-full bg-indigo-900/20 border border-indigo-500/50"
                  style={{
                    rotateY,
                    rotateX,
                  }}
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Manifesto;