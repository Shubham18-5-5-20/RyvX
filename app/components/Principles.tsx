// components/Principles.tsx

"use client";

import { motion } from 'framer-motion';
// This will now be found after you run the installation command.
import { KeyRound, Users, Compass } from 'lucide-react';

// --- DATA STRUCTURE (No changes needed) ---
const principlesData = [
  {
    icon: <KeyRound className="h-10 w-10 text-amber-400" />,
    title: "Vetted & Curated",
    description: "Every member is hand-selected based on a proven standard of excellence. You will be surrounded by peers, not prospects."
  },
  {
    icon: <Users className="h-10 w-10 text-amber-400" />,
    title: "Peer-to-Peer",
    description: "This is a community, not a content feed. A space to share knowledge, give constructive feedback, and grow alongside the best."
  },
  {
    icon: <Compass className="h-10 w-10 text-amber-400" />,
    title: "Craft-Focused",
    description: "Our conversations are centered on the art and business of creative work—from workflow secrets to pricing and building a personal brand."
  }
];

// --- ANIMATION VARIANTS (Corrected) ---

// This parent variant correctly uses 'transition' to orchestrate its children.
// This is the INTENDED use and does not cause a TypeScript error.
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

// ** THE FIX IS HERE **
// The item variant now ONLY defines the target state properties (opacity, y).
// The 'transition' key has been completely removed.
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Principles = () => {
  return (
    <section className="bg-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3"
        >
          {principlesData.map((principle) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              // ** THE FIX IS ALSO HERE **
              // The 'transition' prop is now placed directly on this motion component.
              // This cleanly separates the animation's behavior from its state.
              transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-zinc-800">
                {principle.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-wide text-white">
                {principle.title}
              </h3>
              <p className="text-base leading-7 text-gray-400">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Principles;