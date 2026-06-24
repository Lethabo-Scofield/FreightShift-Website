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
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="mb-6 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
            How It Works
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight leading-none">
            Factory to Door <br/>
            <span className="text-foreground/40">In 5 Steps.</span>
          </h2>
          <p className="font-mono text-foreground/80 mt-6 text-lg uppercase tracking-wider font-bold">
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
                
                <div className="w-24 h-24 rounded-none bg-background border-2 border-foreground flex items-center justify-center mb-8 relative transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                  <step.icon className="w-10 h-10 text-foreground group-hover:text-background transition-colors" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent text-background font-mono text-sm font-bold flex items-center justify-center border-2 border-foreground">
                    0{i + 1}
                  </div>
                </div>

                <h3 className="font-mono text-lg font-bold text-foreground mb-3 uppercase tracking-wider">{step.title}</h3>
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
