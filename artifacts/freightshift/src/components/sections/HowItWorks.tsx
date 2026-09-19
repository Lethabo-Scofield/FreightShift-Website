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
    <section className="section-alt py-16 md:py-32 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl md:text-6xl font-semibold text-foreground tracking-tight leading-none">
            Factory to Door <br/>
            <span className="text-foreground/40">In 5 Steps.</span>
          </h2>
          <p className="font-medium text-foreground/80 mt-6 text-lg tracking-wider font-semibold">
            We handle the complexity. You track the cargo.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-foreground/10 z-0" />
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Mobile connecting line */}
                {i !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-[5.5rem] bottom-[-3rem] left-1/2 w-[2px] bg-foreground/10 -translate-x-1/2 z-[-1]" />
                )}
                
                <div className="w-24 h-24 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center mb-8 relative transition-colors duration-300 group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg">
                  <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background font-medium text-xs flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-foreground mb-3 tracking-wide">{step.title}</h3>
                <p className="font-sans text-base text-foreground/70 leading-relaxed px-4">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
