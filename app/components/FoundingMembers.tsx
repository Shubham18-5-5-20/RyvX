// components/FoundingMembers.tsx

"use client";

// Import 'forwardRef' to allow this component to receive a ref
import React, { forwardRef, useState, useEffect } from 'react';

// Import motion and the Variants type for TypeScript
import { motion, Variants } from 'framer-motion';

// Define the type for an incentive.
// In a real app, this might live in a separate `types.ts` file.
export interface FoundingMemberIncentive {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Simulate fetching data (in a real app, this would be an API call)
async function getFoundingMemberIncentives(): Promise<FoundingMemberIncentive[]> {
  return [
    {
      id: '1',
      title: 'Lifetime 0% Commission Guarantee',
      description: 'A permanent, contractually guaranteed 0% commission rate on all future projects. This ensures you retain 100% of your earnings.',
      icon: '💰',
    },
    {
      id: '2',
      title: '"Founding Member" Badge',
      description: 'A permanent, exclusive badge on your profile, signifying your status as a trusted, original member of the platform.',
      icon: '🏅',
    },
    {
      id: '3',
      title: 'Seat on the Creative Council',
      description: 'An invitation to an advisory council that provides direct input on platform features, vetting standards, and community guidelines.',
      icon: '🤝',
    },
    {
      id: '4',
      title: 'Guaranteed Promotion',
      description: 'Top placement in search results and features on the homepage and in client newsletters for the first year.',
      icon: '🚀',
    },
    {
      id: '5',
      title: 'Exclusive Perks & Discounts',
      description: 'Access to free or heavily discounted subscriptions to valuable SaaS tools (e.g., Akiflow, Frame.io) through strategic partnerships.',
      icon: '🎁',
    },
  ];
}

// --- Animation Variants with explicit TypeScript types ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const textVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
      delay: 0.3,
    },
  },
};

const titleVariants: Variants = {
  hidden: { y: 75, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      delay: 0.1,
    },
  },
};

const ctaVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.6,
    },
  },
};

// --- Component Definition ---

// We wrap the component in `forwardRef` to accept a `ref` from its parent.
// The ref is typed as being attached to a generic HTML element (like <section> or <div>).
const FoundingMembers = forwardRef<HTMLElement>((props, ref) => {
  const [incentives, setIncentives] = useState<FoundingMemberIncentive[]>([]);

  // Fetch data on the client-side when the component mounts.
  useEffect(() => {
    getFoundingMemberIncentives().then(setIncentives);
  }, []);

  return (
    // The `ref` is attached to the main <section> element. This is the element
    // that will be scrolled into view.
    <section ref={ref} className="bg-gray-50 py-16 md:py-24 overflow-hidden" id="founding-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-4"
            variants={titleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            Join the <span className="text-indigo-600">Founding 100</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            We are building a trusted ecosystem for elite video editors. Be among the first 100 and shape the future of freelance creative work.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {incentives.map((incentive) => (
            <motion.div
              key={incentive.id}
              className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                {incentive.icon && (
                  <span className="text-4xl mr-4">{incentive.icon}</span>
                )}
                <h3 className="text-2xl font-semibold text-gray-900">
                  {incentive.title}
                </h3>
              </div>
              <p className="text-gray-700">{incentive.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <motion.p
            className="text-lg text-gray-700 mb-6"
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            Ready to be a part of the exclusive cohort that sets the standard?
          </motion.p>
          <motion.a
            href="/join-waitlist" // This button navigates to the waitlist page
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            variants={ctaVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            Join the Exclusive Waitlist
            <svg
              className="ml-3 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>
          <motion.p
            className="mt-4 text-sm text-gray-500"
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            Limited spots available for truly elite video editors.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

// Add a displayName for better debugging in React DevTools
FoundingMembers.displayName = 'FoundingMembers';

export default FoundingMembers;