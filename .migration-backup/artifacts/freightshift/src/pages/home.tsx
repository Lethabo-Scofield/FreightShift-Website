import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Lanes } from "@/components/sections/Lanes";
import { ChinaSACorridor } from "@/components/sections/ChinaSACorridor";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Seo } from "@/components/Seo";
import { PAGE_SEO } from "@/lib/seo";
import { localBusinessJsonLd, servicesJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Seo {...PAGE_SEO.home} jsonLd={[localBusinessJsonLd, servicesJsonLd]} />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ChinaSACorridor />
        <Lanes />
        <HowItWorks />
        <Industries />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
