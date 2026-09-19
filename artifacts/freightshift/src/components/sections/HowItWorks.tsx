import { motion } from "framer-motion";
import { ClipboardEdit, Truck, Ship, FileCheck, MapPin } from "lucide-react";

const steps = [
  {
    icon: ClipboardEdit,
    title: "Quote & Book",
    desc: "Rates within 24 hours."
  },
  {
    icon: Truck,
    title: "Origin Pickup",
    desc: "We collect from your supplier in China."
  },
  {
    icon: Ship,
    title: "Sea or Air",
    desc: "Scheduled corridor services with tracking."
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    desc: "We handle SARS, duties, and compliance."
  },
  {
    icon: MapPin,
    title: "Final Delivery",
    desc: "Door-to-door anywhere in SA."
  }
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-section-alt via-background to-background py-20 md:py-28">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            How it works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-6">
            Factory to Door. In 5 Steps.
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl font-medium leading-relaxed">
            We handle the complexity. You track the cargo.
          </p>
        </motion.div>

        <div className="relative">
          {/* Continuous Line desktop */}
          <div className="absolute left-[10%] right-[10%] top-7 z-0 hidden h-0.5 bg-brand-blue/15 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
            className="absolute left-[10%] right-[10%] top-7 z-0 hidden h-0.5 origin-left bg-brand-blue lg:block"
          />
          
          <div className="relative z-10 grid gap-5 lg:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
                className="relative flex min-h-64 flex-col rounded-2xl border border-brand-blue/15 bg-white/90 p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Mobile connecting line */}
                {i !== steps.length - 1 && (
                  <div className="absolute -bottom-5 left-12 top-16 z-[-1] w-0.5 bg-brand-blue/30 lg:hidden" />
                )}
                
                <div className="mb-8 flex items-center lg:block">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white shadow-[0_8px_24px_rgba(17,119,180,0.24)]">
                    <step.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div className="ml-6 text-xs font-bold uppercase tracking-[0.16em] text-brand-blue lg:ml-0 lg:mt-6">
                    Step 0{i + 1}
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-sm md:text-base pr-4 lg:pr-0">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
