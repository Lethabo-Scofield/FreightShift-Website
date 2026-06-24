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
    <section id="services" className="py-20 md:py-32 bg-background border-b-2 border-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
             <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
             Capabilities // 01
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-4 mb-4 tracking-tight uppercase">What we do.</h2>
          <p className="text-lg md:text-xl text-foreground/80 font-mono">Freight, customs, storage, moving, courier and logistics — one trusted team.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-background border-2 border-foreground p-8 relative group hover:bg-foreground hover:text-background transition-colors duration-300 ${service.colSpan} flex flex-col rounded-none`}
            >
              <div className="absolute top-8 right-8 text-4xl font-display font-bold text-foreground/10 group-hover:text-background/10 transition-colors pointer-events-none select-none">
                0{i + 1}
              </div>
              <service.icon className="w-10 h-10 text-foreground group-hover:text-accent transition-colors mb-12" />
              <div className="mt-auto">
                <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-background mb-3 transition-colors uppercase">{service.title}</h3>
                <p className="text-foreground/70 group-hover:text-background/70 transition-colors mb-6 font-sans">
                  {service.desc}
                </p>
                <div className="text-sm font-mono font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
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
