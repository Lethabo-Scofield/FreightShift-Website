import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { goToQuote as routeToQuote } from "@/lib/scroll-to-quote";
import storageBg from "@/assets/warehouse-team-tablet.png";

export function MovingStorageHighlight() {
  const [, navigate] = useLocation();
  const goToQuote = () => routeToQuote(navigate);

  return (
    <section className="py-16 md:py-32 bg-zinc-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6">
              Moving &amp; Storage
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Moving &amp; Storage, <br/>Done Right.
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Whether you're relocating your corporate office, moving homes, or need secure warehousing for your commercial goods, our team handles it with precision. We operate secure facilities and maintain a fleet ready to move your assets safely across South Africa.
            </p>

            <ul className="space-y-4 mb-10">
              {['Secure short and long-term warehousing', 'Professional packing and unpacking', 'Commercial and residential relocations', 'Inventory management and distribution'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-none" />
                  <span className="text-foreground/80 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={goToQuote}
              className="bg-brand-blue hover:bg-brand-navy text-white rounded-none h-12 px-8"
            >
              Request Moving Quote
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] lg:h-[600px] border border-zinc-200"
          >
            <img
              src={storageBg}
              alt="Warehouse team managing storage operations"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
