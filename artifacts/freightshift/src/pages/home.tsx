import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Lanes } from "@/components/sections/Lanes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Lanes />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
