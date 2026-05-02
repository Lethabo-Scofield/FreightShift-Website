import { motion } from "framer-motion";
import { ShoppingBag, Building2, Wrench, Hammer, Box, Cog } from "lucide-react";

const industries = [
  { icon: ShoppingBag, name: "Retail & E-commerce" },
  { icon: Building2, name: "Manufacturing" },
  { icon: Cog, name: "Automotive Parts" },
  { icon: Hammer, name: "Construction & Building" },
  { icon: Box, name: "FMCG" },
  { icon: Wrench, name: "Industrial Equipment" }
];

export function Industries() {
  return (
    <section className="py-16 bg-muted border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div>
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Industries</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">Built for SA business.</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-border/60 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-brand-blue/30 hover:shadow-sm transition-all"
            >
              <ind.icon className="w-6 h-6 text-brand-navy/60" />
              <span className="text-sm font-semibold text-foreground/90">{ind.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
