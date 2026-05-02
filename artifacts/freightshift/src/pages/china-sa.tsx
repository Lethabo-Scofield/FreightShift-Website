import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { ChinaSACorridor } from "@/components/sections/ChinaSACorridor";
import { Lanes } from "@/components/sections/Lanes";
import { TrustBar } from "@/components/sections/TrustBar";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export default function ChinaSA() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="China ↔ South Africa"
          title="The corridor we know best."
          subtitle="Reliable schedules, port relationships, SARS expertise."
          breadcrumb={[{ label: "China to SA" }]}
        />
        <ChinaSACorridor />
        <Lanes />
        <TrustBar />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
