// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css"; // Ensure your global styles (especially Tailwind) are imported here

// Recommended: Define your primary font here (e.g., Satoshi, Inter)
// For simplicity, we'll assume a font is configured in your tailwind.config.js or globals.css
// If using next/font, you would configure it here.

export const metadata: Metadata = {
  title: "Axis",
  description: "An invite-only collective for the world's most discerning creative professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* This body tag contains everything */}
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}