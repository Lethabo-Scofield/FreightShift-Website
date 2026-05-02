import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does shipping from China to South Africa take?",
    a: "Air freight takes 5-9 days depending on the carrier and clearance speed. Sea freight typically takes 28-40 days port-to-port, plus a few days for customs and local delivery."
  },
  {
    q: "What's the difference between FCL and LCL, and which should I use?",
    a: "FCL (Full Container Load) means you rent an entire 20ft or 40ft container. LCL (Less than Container Load) means you share space. Use FCL for large bulk orders (usually >15cbm) and LCL for smaller consignments to save costs."
  },
  {
    q: "Do you handle SARS customs clearance and duties?",
    a: "Yes. Our team manages the entire customs clearance process with SARS, ensuring the correct tariff codes are applied and duties are paid promptly to avoid demurrage and delays."
  },
  {
    q: "Can you collect goods from my supplier in China?",
    a: "Absolutely. We offer EXW (Ex Works) and FOB (Free on Board) terms, meaning we can collect your cargo directly from your supplier's factory in China and consolidate it at our origin warehouses."
  },
  {
    q: "What documents do I need to import from China to SA?",
    a: "You generally need a Commercial Invoice, Packing List, Bill of Lading (or Air Waybill), and a Certificate of Origin. You also must be registered as an importer with SARS. We assist with reviewing all documentation."
  },
  {
    q: "How do I get a quote, and what info do you need?",
    a: "Use our quote form or WhatsApp us. We need the pickup location, destination, cargo details (weight, dimensions/CBM, commodity type), and your preferred shipping mode (air/sea) to provide an accurate rate."
  }
];

export function FAQ() {
  return (
    <section className="py-14 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Common questions from SA importers</h2>
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
