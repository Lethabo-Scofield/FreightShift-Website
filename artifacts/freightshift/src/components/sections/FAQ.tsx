import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does shipping from China to SA take?",
    a: "Air: 5–9 days. Sea: 28–40 days port-to-port, plus a few days for customs and delivery."
  },
  {
    q: "FCL or LCL — which should I use?",
    a: "FCL = your own 20ft/40ft container. Best for orders over 15 CBM. LCL = shared space, best for smaller cargo to save cost."
  },
  {
    q: "Do you handle SARS customs and duties?",
    a: "Yes. Full SARS clearance, correct tariff codes, duties paid on time. No demurrage."
  },
  {
    q: "Can you pick up from my supplier in China?",
    a: "Yes. EXW or FOB terms. We collect from the factory and consolidate at our China warehouse."
  },
  {
    q: "What documents do I need?",
    a: "Commercial Invoice, Packing List, Bill of Lading (or AWB), Certificate of Origin. You'll also need SARS importer registration. We review everything for you."
  },
  {
    q: "How do I get a quote?",
    a: "Use our quote form or WhatsApp. Tell us pickup, destination, cargo size, and air or sea."
  }
];

export function FAQ() {
  return (
    <section className="py-14 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Quick answers.</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-brand-blue transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-base leading-relaxed pt-2 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
