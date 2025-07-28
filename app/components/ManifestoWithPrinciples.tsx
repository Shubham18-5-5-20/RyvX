// components/ManifestoWithPrinciples.tsx

"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- DATA FOR THE COMPONENT ---

// The text of your manifesto.
const manifestoText = [
  "Our industry has become a factory. A race to the bottom where speed is valued over substance, and algorithms dictate taste.",
  "We believe in a different path. A return to the principles of true craftsmanship, where the artist is empowered, not commoditized.",
  "RyvX is our declaration. It is a curated ecosystem built on trust, peer-to-peer respect, and an unwavering focus on the craft itself.",
  "This is not another marketplace. This is a guild hall for the digital age, defined by transparency and fairness."
];

// The core principles that will be displayed and highlighted on the right.
const principles = [
  {
    title: "Craft-Focused",
    description: "Quality and taste are the only metrics that matter. We prioritize substance over speed."
  },
  {
    title: "Vetted & Curated",
    description: "Our ecosystem is built on trust, populated by professionals who respect the craft."
  },
  {
    title: "Peer-to-Peer",
    description: "A network of equals, not a faceless marketplace. Direct collaboration and support."
  },
  {
    title: "Transparent & Fair",
    description: "With zero commission and clear guidelines, the focus remains on creative excellence."
  }
];

// --- HELPER COMPONENTS (for text animation) ---

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

const Paragraph = ({ text }: { text: string }) => {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.8', 'start 0.5']
  });
  const words = text.split(" ");
  return (
    <p ref={element} className="text-2xl lg:text-3xl max-w-xl font-medium leading-relaxed text-gray-300">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word + " "}</Word>;
      })}
    </p>
  );
};


// --- MAIN COMPONENT ---

const ManifestoWithPrinciples = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We use the scroll progress of the text container to determine which principle is active.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end']
  });

  useEffect(() => {
    // This is the magic part. We subscribe to changes in the scroll progress.
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const activeSegment = Math.floor(latest * principles.length);
      setActiveIndex(Math.min(activeSegment, principles.length - 1));
    });
    // Cleanup the subscription when the component unmounts.
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section className="bg-black text-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:space-x-16 lg:space-x-24">
          
          {/* Left Column: The scrolling text */}
          <div ref={containerRef} className="md:w-1/2">
            <div className="flex flex-col space-y-32">
              {manifestoText.map((paragraph, index) => (
                <Paragraph key={index} text={paragraph} />
              ))}
            </div>
          </div>

          {/* Right Column: The pinned principles */}
          <div className="md:w-1/2 mt-16 md:mt-0">
            <div className="sticky top-24"> {/* 'sticky top-24' pins the element */}
              <div className="flex flex-col space-y-12">
                {principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-lg"
                    animate={{
                      opacity: index === activeIndex ? 1 : 0.3,
                      backgroundColor: index === activeIndex ? "rgba(79, 70, 229, 0.1)" : "transparent"
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.h3
                      className="text-2xl font-bold mb-2"
                      animate={{ color: index === activeIndex ? "#a78bfa" : "#ffffff" }}
                      transition={{ duration: 0.5 }}
                    >
                      {principle.title}
                    </motion.h3>
                    <p className="text-lg text-gray-400">
                      {principle.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ManifestoWithPrinciples;