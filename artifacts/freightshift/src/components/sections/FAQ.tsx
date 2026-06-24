import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
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
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-4 uppercase tracking-tight">Quick answers.</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="w-full border-t-2 border-foreground">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-foreground rounded-none">
                <AccordionTrigger className="text-left text-lg md:text-xl font-display font-bold hover:text-accent transition-colors py-6 uppercase tracking-tight">
                  <span className="flex items-center gap-4">
                    <span className="text-foreground/30 font-mono text-sm">0{i + 1}</span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-sans text-base md:text-lg leading-relaxed pt-2 pb-8 max-w-3xl ml-10">
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
