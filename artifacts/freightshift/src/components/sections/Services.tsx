import { motion } from "framer-motion";
import { Building, Package, Truck, Globe, Settings, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function Services() {
  const services = [
    {
      title: "Moving Services",
      desc: "Secure, reliable home and office relocations handled by experienced professionals.",
      icon: Truck,
      colSpan: "lg:col-span-2",
      highlight: true
    },
    {
      title: "Storage",
      desc: "Short-term and long-term secure warehousing solutions for commercial and residential needs.",
      icon: Building,
      colSpan: "lg:col-span-1",
      highlight: true
    },
    {
      title: "Courier Services",
      desc: "Fast, dependable parcel delivery and document logistics across South Africa.",
      icon: Package,
      colSpan: "lg:col-span-1"
    },
    {
      title: "Freight Transport",
      desc: "Comprehensive domestic and cross-border freight transport, moved reliably across South Africa and beyond.",
      icon: Globe,
      colSpan: "lg:col-span-1"
    },
    {
      title: "Logistics Operations",
      desc: "End-to-end supply chain management, customs clearance, and distribution.",
      icon: Settings,
      colSpan: "lg:col-span-1"
    }
  ];

  return (
    <section id="services" className="py-14 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">Complete Logistics Solutions.</h2>
          <p className="text-lg text-foreground/70">From moving your home to managing your global supply chain, we deliver reliability.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-zinc-50 rounded-none p-8 relative group hover:bg-brand-navy hover:text-white transition-colors duration-300 ${service.colSpan} flex flex-col border border-zinc-200 hover:border-transparent ${service.highlight ? 'ring-1 ring-brand-blue/20 bg-blue-50/30' : ''}`}
            >
              <service.icon className="w-10 h-10 text-brand-blue group-hover:text-brand-orange transition-colors mb-8" />
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-foreground group-hover:text-white mb-3 transition-colors">{service.title}</h3>
                <p className="text-foreground/70 group-hover:text-white/70 transition-colors mb-6">
                  {service.desc}
                </p>
                <Link href="/services" className="inline-flex text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors items-center gap-2">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
