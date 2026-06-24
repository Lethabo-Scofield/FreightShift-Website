import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { Hero } from "@/components/sections/Hero";
import { CompaniesServed } from "@/components/sections/CompaniesServed";
import { ChinaSACorridor } from "@/components/sections/ChinaSACorridor";
import { MovingStorageHighlight } from "@/components/sections/MovingStorageHighlight";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { IndustryEngagement } from "@/components/sections/IndustryEngagement";
import { ServicePartners } from "@/components/sections/ServicePartners";
import { Testimonials } from "@/components/sections/Testimonials";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
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
        <CompaniesServed />
        <ChinaSACorridor />
        <MovingStorageHighlight />
        <HowItWorks />
        <IndustryEngagement />
        <Industries />
        <ServicePartners />
        <Testimonials />
        <GoogleReviews />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
