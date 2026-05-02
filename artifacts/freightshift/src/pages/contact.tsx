import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { Contact } from "@/components/sections/Contact";
import { Quote } from "@/components/sections/Quote";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Get in Touch"
          title="Let's move your cargo."
          subtitle="Quote in 24 hours. WhatsApp for instant replies."
          breadcrumb={[{ label: "Contact" }]}
        />
        <Contact />
        <Quote />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
