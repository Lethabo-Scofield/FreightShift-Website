import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const valueProps = [
  "China to SA freight expertise",
  "Competitive & flexible pricing",
  "Real-time shipment tracking",
  "Customs compliance knowledge",
  "Dedicated logistics support",
  "Reliable, fast, transparent service"
];

export function WhyUs() {
  return (
    <section className="py-14 md:py-32 bg-muted border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Why FreightShift</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">The China-South Africa corridor, simplified.</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              FreightShift International Logistics is a South African-based company delivering efficient, reliable, and cost-effective supply chain solutions.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-10">
              We manage the complexities of international trade so you don't have to. From factory floors in Shenzhen to warehouses in Johannesburg.
            </p>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-lg">
              <img 
                src="/warehouse.png" 
                alt="Modern logistics warehouse interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/60"
          >
            <h3 className="text-2xl font-bold mb-8">The FreightShift Advantage</h3>
            <ul className="space-y-6">
              {valueProps.map((prop, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-blue group-hover:text-brand-orange transition-colors" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground/90">{prop}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
