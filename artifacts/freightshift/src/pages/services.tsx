import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { Services } from "@/components/sections/Services";
import { MultimodalFeature } from "@/components/sections/MultimodalFeature";
import { Industries } from "@/components/sections/Industries";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our Services"
          title="End-to-end freight, customs & last-mile in one team."
          subtitle="From a single carton to multi-container projects, our team manages every step of the corridor — so you focus on selling, not chasing shipments."
          breadcrumb={[{ label: "Services" }]}
        />
        <MultimodalFeature />
        <Services />
        <Industries />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
