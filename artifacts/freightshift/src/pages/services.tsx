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
          eyebrow="Services"
          title="Freight, customs & delivery. One team."
          subtitle="From one carton to full containers. We manage every step."
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
