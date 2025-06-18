// components/Footer.tsx

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* A subtle top border provides clean visual separation. */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col-reverse items-center gap-y-6 sm:flex-row sm:justify-between">
          
          {/* Copyright & Brand Statement - Stays on the left for prominence. */}
          <p className="text-sm leading-5 text-zinc-500">
            © {new Date().getFullYear()} Axis. Built on principle.
          </p>

          {/* Attribution & Legal Links - The confident signature. */}
          <div className="flex items-center space-x-6">
            {/*
              REVISION 1: The language is elevated.
              We've removed "A Project by". The founder's name stands on its own,
              implying ownership and vision, not temporary work.
            */}
            <a 
              // REVISION 2: The URL is corrected as per your instruction.
              href="https://www.linkedin.com/in/shubham-bhardwaj-h07s12" 
              className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              A Vision by Shubham Bhardwaj
            </a>
            
            {/* Keeping legal links separate and subtle for a clean layout. */}
            <Link href="/privacy" className="text-sm leading-6 text-zinc-600 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;