// app/join-waitlist/page.tsx
'use client'; // Needed for hooks and event handling

import React, { useState } from 'react';
// FIX: Import the 'Variants' type
import { motion, Variants } from 'framer-motion';

// --- ANIMATION VARIANTS ---
// FIX: Orchestrate stagger from the parent container
const formContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Animate children one after another
      delayChildren: 0.2,   // Wait before starting the animation
    },
  },
};

// A single variant for all items inside the form
const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { ease: 'easeOut', duration: 0.5 } },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  tap: { scale: 0.95 },
};

const JoinWaitlistPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- IMPORTANT: REPLACE WITH YOUR FORMSPREE ENDPOINT ---
  const FORM_ACTION_URL = "https://formspree.io/f/xkgzbjrj"; // Example URL

  // FIX: Re-implement AJAX submission to control the UI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form navigation
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORM_ACTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Formspree recommends this header
        },
        body: JSON.stringify({ email, name, program: 'founding_100' }),
      });

      if (response.ok) {
        setSubmitted(true); // Show the success message
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An unexpected error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // The "Thank You" screen shown after a successful submission
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white flex items-center justify-center p-4">
        <motion.div
          className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-lg text-center border border-indigo-700/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <h2 className="text-4xl font-extrabold text-indigo-400 mb-4">Thank You!</h2>
          <p className="text-xl text-gray-300 mb-6">You are on the waitlist for the RyvX Founding 100.</p>
          <p className="text-md text-gray-400">We will be in touch soon with exclusive updates!</p>
          <motion.a
            href="/" // Link back to the homepage
            className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Return to Homepage
          </motion.a>
        </motion.div>
      </div>
    );
  }

  // The form itself
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-lg border border-indigo-700/50"
        variants={formContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-400" variants={formItemVariants}>
          Join the Founding 100 Waitlist
        </motion.h1>
        <motion.p className="text-lg text-center mb-8 text-gray-300" variants={formItemVariants}>
          Secure your spot among the elite. This is your invitation to help shape the future of freelance creative work.
        </motion.p>

        {/* FIX: Removed action/method, using onSubmit for AJAX */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={formItemVariants}>
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
              Full Name (Optional)
            </label>
            <input
              type="text" id="name" name="name"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none"
              value={name} onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting} aria-label="Your full name"
            />
          </motion.div>

          {/* FIX: Removed problematic inline transition prop */}
          <motion.div variants={formItemVariants}>
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email" id="email" name="email"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required disabled={isSubmitting} aria-label="Your email address"
            />
          </motion.div>

          {error && <p className="text-red-400 text-center font-medium">{error}</p>}

          <motion.div variants={buttonVariants}>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Join Waitlist Now'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default JoinWaitlistPage;