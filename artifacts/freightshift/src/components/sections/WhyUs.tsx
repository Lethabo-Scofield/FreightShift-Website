import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
    <section className="py-20 md:py-32 border-b border-border bg-section-alt">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground tracking-tight mb-6 leading-tight">
              The corridor,<br />simplified.
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-12">
              Shenzhen to Joburg. We handle every step in between.
            </p>

            <div className="space-y-6">
              <h3 className="text-lg font-serif font-semibold text-foreground border-b border-border pb-4">
                Why choose FreightShift
              </h3>
              <ul className="space-y-5">
                {valueProps.map((prop, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-brand-gold-ink shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium text-lg">
                      {prop}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
              <img
                src={teamImg}
                alt="The FreightShift International Logistics team outside their warehouse"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase text-right">
              Real people behind every shipment.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
