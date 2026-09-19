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
    <section className="section-alt py-16 md:py-32 border-b border-border relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mt-4 mb-6 tracking-tight">
              The corridor,<br />simplified.
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 font-medium tracking-tight leading-relaxed mb-10 max-w-lg">
              Shenzhen to Joburg. We handle every step in between.
            </p>

            <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[4/3] rounded-2xl shadow-lg border border-border bg-foreground">
              <img
                src={teamImg}
                alt="The FreightShift International Logistics team outside their warehouse"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

              <div className="absolute left-4 bottom-4 right-4 flex items-center gap-3 text-foreground">
                <div className="w-12 h-12 bg-background/90 backdrop-blur border border-border flex items-center justify-center shrink-0 rounded-full shadow-sm">
                  <Users className="w-6 h-6 text-foreground" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-medium tracking-[0.2em] text-foreground/60">
                    The team
                  </div>
                  <div className="text-sm md:text-base font-semibold tracking-tight text-foreground">
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
            className="bg-card text-card-foreground p-8 md:p-12 border border-border rounded-2xl shadow-md"
          >
            <h3 className="text-3xl font-serif font-semibold mb-10 tracking-tight">Why us.</h3>
            <ul className="space-y-6">
              {valueProps.map((prop, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-medium font-semibold tracking-tight text-foreground">
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
