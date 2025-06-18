// components/InvitationForm.tsx

"use client";

import { forwardRef, useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

// FIX #1: Define a REAL interface for the component's props.
// This gives it a specific shape and satisfies the linter rule.
interface InvitationFormProps {
  title?: string;
  waitlistText?: string;
}

const itemTransition: Transition = { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

// FIX #2: Use the new, non-empty interface as the type for the props.
const InvitationForm = forwardRef<HTMLDivElement, InvitationFormProps>(({
  title = "Phase I: The Post-Production Guild",
  waitlistText = "Is your craft outside of post-production? Join the waitlist.",
}, ref) => {
  const [formStage, setFormStage] = useState<'awaitingEmail' | 'awaitingPortfolio' | 'submitting' | 'success' | 'error'>('awaitingEmail');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setFormStage('awaitingPortfolio');
  };

  const handleFinalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!portfolioUrl) return;
    setFormStage('submitting');
    try {
      await new Promise(res => setTimeout(res, 1500));
      setFormStage('success');
    } catch (err) {
      console.error("Final submission failed:", err);
      setErrorMsg('Submission failed. Please try again.');
      setFormStage('error');
    }
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formStage === 'error') setFormStage('awaitingPortfolio');
    setPortfolioUrl(e.target.value);
  };
  
  const currentFormSubmitHandler = formStage === 'awaitingEmail' ? handleEmailSubmit : handleFinalSubmit;

  return (
    <section ref={ref} id="apply" className="bg-black py-24 sm:py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-2xl text-center px-6 lg:px-8"
      >
        <motion.h2
          variants={itemVariants}
          transition={itemTransition}
          className="text-3xl font-bold tracking-tight text-amber-400 sm:text-4xl"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={itemVariants}
          transition={itemTransition}
          className="mt-10 min-h-[220px]"
        >
          <AnimatePresence mode="wait">
            {formStage === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="flex flex-col items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-amber-400" />
                  <p className="mt-4 text-2xl font-medium text-amber-400">YOUR REQUEST IS PENDING VETTING.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" className="w-full">
                <motion.form
                  animate={{ x: formStage === 'error' ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={currentFormSubmitHandler}
                  className="space-y-4"
                >
                  <div>
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@example.com" disabled={formStage !== 'awaitingEmail'}
                      className="w-full rounded-md border-0 bg-white/5 py-3 px-4 text-white ring-1 ring-inset transition-all duration-300 placeholder:text-gray-500 focus:ring-amber-400 disabled:opacity-50"
                    />
                  </div>

                  <AnimatePresence>
                    {formStage !== 'awaitingEmail' && (
                      <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -20, height: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="overflow-hidden">
                        <p className="mb-2 text-sm text-gray-400">One last step...</p>
                        <input
                          type="url" value={portfolioUrl} onChange={handlePortfolioChange} required placeholder="Link to your portfolio or best work"
                          className={`w-full rounded-md border-0 bg-white/5 py-3 px-4 text-white ring-1 ring-inset transition-all duration-300 placeholder:text-gray-500 focus:ring-amber-400 ${formStage === 'error' ? 'ring-red-500' : 'ring-white/10'}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-2">
                    <AnimatePresence mode="wait">
                      {formStage === 'awaitingEmail' ? (
                         <motion.button key="emailBtn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="submit"
                           className="w-full rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-amber-400"
                         >Request My Invite</motion.button>
                      ) : (
                        <motion.button key="portfolioBtn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="submit" disabled={formStage === 'submitting'}
                          className="w-full rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-gray-600"
                        >{formStage === 'submitting' ? 'Submitting...' : 'Submit Portfolio'}</motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  {errorMsg && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-red-500">{errorMsg}</p>
                    </div>
                  )}
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.p
          variants={itemVariants}
          transition={itemTransition}
          className="mt-8 text-sm leading-6 text-gray-500"
        >
          <a href="#" className="font-semibold text-gray-400 hover:text-amber-400 transition-colors duration-300">
            {waitlistText}
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
});

InvitationForm.displayName = "InvitationForm";
export default InvitationForm;