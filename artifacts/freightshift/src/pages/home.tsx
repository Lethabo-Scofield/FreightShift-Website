import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Lanes } from "@/components/sections/Lanes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { ChinaSACorridor } from "@/components/sections/ChinaSACorridor";
import { VisionMission } from "@/components/sections/VisionMission";
import { FAQ } from "@/components/sections/FAQ";
import { Quote } from "@/components/sections/Quote";
import { Contact } from "@/components/sections/Contact";
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
        <Industries />
        <Services />
        <WhyUs />
        <Testimonials />
        <ChinaSACorridor />
        <VisionMission />
        <FAQ />
        <Quote />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
