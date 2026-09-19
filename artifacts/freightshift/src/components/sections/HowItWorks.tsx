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
    <section className="bg-background py-20 md:py-32 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-6">
            Factory to Door. In 5 Steps.
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl font-medium leading-relaxed">
            We handle the complexity. You track the cargo.
          </p>
        </div>

        <div className="relative">
          {/* Continuous Line desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[28px] right-[28px] h-px bg-border z-0" />
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col"
              >
                {/* Mobile connecting line */}
                {i !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-14 -bottom-12 left-7 w-px bg-border z-[-1]" />
                )}
                
                <div className="flex items-center lg:block mb-6 lg:mb-8">
                  <div className="w-14 h-14 rounded-full bg-section-alt border border-border flex items-center justify-center shrink-0 z-10 relative">
                    <step.icon className="w-6 h-6 text-foreground/80" strokeWidth={1.5} />
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-6 text-sm font-semibold text-foreground/40 tracking-widest uppercase">
                    Step 0{i + 1}
                  </div>
                </div>

                <div>
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
