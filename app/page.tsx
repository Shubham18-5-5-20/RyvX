// app/page.tsx

import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Principles from "./components/Principles";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Principles />
      <Footer />
    </main>
  );
}