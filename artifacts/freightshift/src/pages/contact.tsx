import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";

import { Contact } from "@/components/sections/Contact";
import { Quote } from "@/components/sections/Quote";
import { FAQ, faqs } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { consumePendingQuoteScroll } from "@/lib/scroll-to-quote";
import { Seo } from "@/components/Seo";
import { PAGE_SEO, SITE } from "@/lib/seo";
import {
  localBusinessJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/jsonld";

export default function ContactPage() {
  useEffect(() => {
    consumePendingQuoteScroll();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        {...PAGE_SEO.contact}
        jsonLd={[
          localBusinessJsonLd,
          faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          breadcrumbJsonLd([
            { name: "Home", url: SITE.url + "/" },
            { name: "Contact", url: SITE.url + "/contact" },
          ]),
        ]}
      />
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
