// app/layout.tsx

import type { Metadata } from "next";
import Header from "./components/Header";
import "./globals.css";

// This is the brain of the fix.
// We are explicitly telling Next.js where to find the icons.
export const metadata: Metadata = {
  title: "RyvX",
  description: "An invite-only collective for the world's most discerning creative professionals.",
  icons: {
    icon: "/icon.jpg", // The new, correct path to your icon in the 'public' folder.
    apple: "/icon.jpg", // Also use this for Apple touch icons.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Header />
        {children}
      </body>
    </html>
  );
}