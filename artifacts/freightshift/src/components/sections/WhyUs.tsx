import { motion } from "framer-motion";
import { CheckCircle2, Users } from "lucide-react";
import teamImg from "@assets/image_1777730074520.png";

const valueProps = [
  "China-SA corridor expertise",
  "Flexible, competitive pricing",
  "Real-time tracking",
  "Full SARS customs support",
  "Dedicated account manager",
  "Reliable & transparent",
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
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">
              Why FreightShift
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              The corridor, simplified.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-10">
              Shenzhen to Joburg. We handle every step in between.
            </p>

            <div className="relative overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src={teamImg}
                alt="FreightShift logistics team celebrating a successful delivery"
                className="w-full h-full object-cover"
              />
              {/* Subtle bottom gradient for badge legibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent" />

              {/* Overlay badge */}
              <div className="absolute left-4 bottom-4 right-4 flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                    The team
                  </div>
                  <div className="text-sm md:text-base font-semibold">
                    Real people behind every shipment.
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border border-black/5 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/60"
          >
            <h3 className="text-2xl font-bold mb-8">Why us.</h3>
            <ul className="space-y-6">
              {valueProps.map((prop, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-blue group-hover:text-brand-orange transition-colors" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground/90">
                      {prop}
                    </div>
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
