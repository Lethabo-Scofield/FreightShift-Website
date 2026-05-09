import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { ChinaSACorridor } from "@/components/sections/ChinaSACorridor";
import { Lanes } from "@/components/sections/Lanes";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Seo } from "@/components/Seo";
import { PAGE_SEO, SITE } from "@/lib/seo";
import { servicesJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        {...PAGE_SEO.services}
        jsonLd={[
          servicesJsonLd,
          breadcrumbJsonLd([
            { name: "Home", url: SITE.url + "/" },
            { name: "Services", url: SITE.url + "/services" },
          ]),
        ]}
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Services & Corridor"
          title="Freight, customs & delivery."
          subtitle="China–SA corridor specialists. Door to door, one team."
          breadcrumb={[{ label: "Services" }]}
        />
        <ChinaSACorridor />
        <Lanes />
        <Services />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
