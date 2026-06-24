import { motion } from "framer-motion";
import { CheckCircle2, Users } from "lucide-react";
import teamImg from "@assets/WhatsApp_Image_2026-06-24_at_4.51.08_PM_1782339811172.jpeg";

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
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
               <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
               Why FreightShift // 05
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-4 mb-6 uppercase tracking-tight">
              The corridor,<br />simplified.
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 font-mono tracking-tight leading-relaxed mb-10 max-w-lg">
              Shenzhen to Joburg. We handle every step in between.
            </p>

            <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[4/3] border-2 border-foreground bg-foreground">
              <img
                src={teamImg}
                alt="The FreightShift International Logistics team outside their warehouse"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

              <div className="absolute left-4 bottom-4 right-4 flex items-center gap-3 text-foreground">
                <div className="w-12 h-12 bg-background border-2 border-foreground flex items-center justify-center shrink-0 rounded-none">
                  <Users className="w-6 h-6" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/60">
                    The team
                  </div>
                  <div className="text-sm md:text-base font-mono font-bold uppercase tracking-tight">
                    Real people behind every shipment.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="bg-foreground text-background p-8 md:p-12 border-2 border-foreground rounded-none"
          >
            <h3 className="text-3xl font-display font-bold mb-10 uppercase tracking-tight">Why us.</h3>
            <ul className="space-y-6">
              {valueProps.map((prop, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-mono font-bold uppercase tracking-tight text-background">
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
