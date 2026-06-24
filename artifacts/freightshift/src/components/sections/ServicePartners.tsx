import { motion } from "framer-motion";
import { Handshake } from "lucide-react";

const partners = [
  { name: "Courier Guy", desc: "Local courier services" },
  { name: "Just In Time Logistics", desc: "Moving services" },
  { name: "Olyxee", desc: "Technology & digital support" }
];

export function ServicePartners() {
  return (
    <section className="py-16 md:py-24 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Handshake className="w-10 h-10 text-brand-blue mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Service Partners</h2>
          <p className="text-foreground/70">
            We collaborate with industry leaders to ensure comprehensive, reliable support across our entire logistics network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 border border-zinc-200 text-center"
            >
              <h3 className="font-bold text-lg text-foreground mb-2">{partner.name}</h3>
              <p className="text-sm text-foreground/60">{partner.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
