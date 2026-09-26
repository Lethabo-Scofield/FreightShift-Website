import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Freight Transport",
    desc: "Air, sea, and road. FCL, LCL, express — China to South Africa.",
    details: [
      "Sea Freight: Bulk or shared space via Durban and Cape Town.",
      "Air Freight: Fast transit to OR Tambo and Cape Town Int."
    ]
  },
  {
    id: "02",
    title: "Customs Clearance",
    desc: "SARS-compliant. No delays, no penalties.",
    details: [
      "Supplier pickup to SA delivery, with SARS clearance."
    ]
  },
  {
    id: "03",
    title: "Courier Services",
    desc: "Fast local courier and last-mile delivery nationwide.",
    details: [
      "Door-to-door tracking from factory floor to final destination anywhere in SA."
    ]
  },
  {
    id: "04",
    title: "Storage",
    desc: "Secure short and long-term warehousing, packing, distribution.",
    details: []
  },
  {
    id: "05",
    title: "Moving Services",
    desc: "Home and office relocations. Packed, moved, safe.",
    details: []
  },
  {
    id: "06",
    title: "Logistics Operations",
    desc: "End-to-end planning. Lower cost, faster lanes.",
    details: []
  }
];

export function Services() {
  return (
    <section id="services" className="bg-section-alt py-16 md:py-32 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 tracking-tight">
            What we do.
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 font-medium leading-relaxed">
            Freight, customs, storage, moving, courier and logistics — one trusted team.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {services.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group grid md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-12 border-b border-border hover:bg-background/40 transition-colors"
            >
              <div className="md:col-span-1 text-sm font-semibold text-brand-gold-ink pt-1 tracking-widest">
                {service.id}
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <div>
                  <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  {service.details.length > 0 && (
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="text-base text-foreground/60 flex items-start gap-3">
                          <span className="block w-1 h-1 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
