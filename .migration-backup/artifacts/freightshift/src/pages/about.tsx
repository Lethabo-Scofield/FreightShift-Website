import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { VisionMission } from "@/components/sections/VisionMission";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Seo } from "@/components/Seo";
import { PAGE_SEO, SITE } from "@/lib/seo";
import { organizationJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

import aboutHeroImg from "@assets/image_1777729909208.png";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        {...PAGE_SEO.about}
        jsonLd={[
          organizationJsonLd,
          breadcrumbJsonLd([
            { name: "Home", url: SITE.url + "/" },
            { name: "About", url: SITE.url + "/about" },
          ]),
        ]}
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About Us"
          title="Your trusted China trade partner."
          subtitle="A South African freight forwarder built for transparent, reliable imports."
          breadcrumb={[{ label: "About" }]}
          backgroundImage={aboutHeroImg}
        />
        <VisionMission />
        <WhyUs />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
