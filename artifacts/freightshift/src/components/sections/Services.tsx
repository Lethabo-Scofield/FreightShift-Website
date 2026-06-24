import { motion } from "framer-motion";
import { Globe, ShieldCheck, Box, BarChart3, Truck, Package } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Freight Transport",
      desc: "Air, sea, and road. FCL, LCL, express — China to South Africa.",
      icon: Globe,
      colSpan: "lg:col-span-2"
    },
    {
      title: "Customs Clearance",
      desc: "SARS-compliant. No delays, no penalties.",
      icon: ShieldCheck,
      colSpan: "lg:col-span-1"
    },
    {
      title: "Storage",
      desc: "Secure short and long-term warehousing, packing, distribution.",
      icon: Box,
      colSpan: "lg:col-span-1"
    },
    {
      title: "Moving Services",
      desc: "Home and office relocations. Packed, moved, safe.",
      icon: Package,
      colSpan: "lg:col-span-2"
    },
    {
      title: "Courier Services",
      desc: "Fast local courier and last-mile delivery nationwide.",
      icon: Truck,
      colSpan: "lg:col-span-2"
    },
    {
      title: "Logistics Operations",
      desc: "End-to-end planning. Lower cost, faster lanes.",
      icon: BarChart3,
      colSpan: "lg:col-span-1"
    }
  ];

  return (
    <section id="services" className="py-14 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Capabilities</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">What we do.</h2>
          <p className="text-lg text-foreground/70">Freight, customs, storage, moving, courier and logistics — one trusted team.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-muted rounded-2xl p-8 relative group hover:bg-brand-navy hover:text-white transition-colors duration-300 ${service.colSpan} flex flex-col`}
            >
              <div className="absolute top-8 right-8 text-4xl font-black text-border group-hover:text-white/10 transition-colors pointer-events-none select-none">
                0{i + 1}
              </div>
              <service.icon className="w-10 h-10 text-brand-blue group-hover:text-brand-orange transition-colors mb-12" />
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-foreground group-hover:text-white mb-3 transition-colors">{service.title}</h3>
                <p className="text-foreground/70 group-hover:text-white/70 transition-colors mb-6">
                  {service.desc}
                </p>
                <div className="text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors flex items-center gap-2">
                  Learn more <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
