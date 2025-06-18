// components/Footer.tsx

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="border-t border-zinc-800 pt-8 flex flex-col-reverse items-center gap-y-6 sm:flex-row sm:justify-between">
          
          <p className="text-sm leading-5 text-zinc-500">
            © {new Date().getFullYear()} Axis. Built on principle.
          </p>

          <div className="flex items-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/shubham-bhardwaj-h07s12" 
              // **REVISION:** Added transition classes for a smooth hover effect.
              className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              A Vision by Shubham Bhardwaj
            </a>
            
            <Link 
              href="/privacy" 
              // **REVISION:** Added transition classes here as well.
              className="text-sm leading-6 text-zinc-600 hover:text-white transition-colors duration-300"
            >
              Privacy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;