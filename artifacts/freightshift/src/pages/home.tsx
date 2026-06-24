import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { MovingStorageHighlight } from "@/components/sections/MovingStorageHighlight";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CompaniesServed } from "@/components/sections/CompaniesServed";
import { ServicePartners } from "@/components/sections/ServicePartners";
import { IndustryEngagement } from "@/components/sections/IndustryEngagement";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { Contact } from "@/components/sections/Contact";
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
        <Services />
        <MovingStorageHighlight />
        <CompaniesServed />
        <HowItWorks />
        <ServicePartners />
        <IndustryEngagement />
        <ImageGallery />
        <GoogleReviews />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
