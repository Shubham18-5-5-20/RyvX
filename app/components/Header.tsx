// components/Header.tsx

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    // 'fixed' makes it stay in place. 'w-full' for full width. 'z-50' to stay on top.
    <header className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className='p-0 sm:0'
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: -60 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 1.0 }} // Slight delay to fade in after hero text
      >
        <Link href="/" className="inline-block">
          <Image
            
            src="/logo.png" // The path to your logo in the 'public' folder.
            alt="RyvX Logo"
            width={200} // The displayed width of the logo (you can adjust this).
            height={200} // The displayed height of the logo.
            priority // Helps Next.js optimize loading for this important image.
          />
        </Link>
      </motion.div>
    </header>
  );
};

export default Header;