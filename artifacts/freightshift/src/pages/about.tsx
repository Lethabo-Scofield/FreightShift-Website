import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { VisionMission } from "@/components/sections/VisionMission";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About Us"
          title="South Africa's trusted China trade partner."
          subtitle="FreightShift International Logistics is a Pty Ltd freight forwarder founded to give South African importers a more transparent, reliable way to move cargo from China."
          breadcrumb={[{ label: "About" }]}
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
