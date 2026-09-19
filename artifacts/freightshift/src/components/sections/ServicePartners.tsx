import { motion } from "framer-motion";
import { Handshake } from "lucide-react";

const partners = [
  { name: "Courier Guy", desc: "Local courier services" },
  { name: "Just In Time Logistics", desc: "Moving services" },
  { name: "Olyxee", desc: "Technology & digital support" },
];

export function ServicePartners() {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-border relative">
      <div className="absolute inset-0 z-0 opacity-5 mix-blend-multiply pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-partners" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-partners)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground text-primary-foreground border border-border rounded-xl">
               <Handshake className="w-8 h-8" />
            </div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight leading-[0.9]">
            Partners &amp; Support <br className="hidden sm:block" />
            Providers.
          </h2>
          <p className="text-lg text-foreground/80 font-medium tracking-tight max-w-xl mx-auto">
            We work with trusted providers to extend our courier, moving and digital support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background border border-border p-8 flex flex-col relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              <div className="text-xs font-medium tracking-wide text-foreground/50 font-semibold mb-4">
                NODE_{String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 tracking-tight">
                {partner.name}
              </h3>
              <p className="text-foreground/70 font-sans text-base">
                {partner.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
