import { motion } from "framer-motion";
import { ClipboardEdit, Truck, Ship, FileCheck, MapPin } from "lucide-react";

const steps = [
  {
    icon: ClipboardEdit,
    title: "Quote & Plan",
    desc: "Detailed planning and transparent pricing for your logistics needs."
  },
  {
    icon: Truck,
    title: "Dispatch & Collection",
    desc: "Our fleet arrives on time, fully equipped for safe handling."
  },
  {
    icon: Ship,
    title: "Transit & Storage",
    desc: "Secure movement or warehousing of your goods."
  },
  {
    icon: FileCheck,
    title: "Compliance & Admin",
    desc: "We handle all necessary paperwork, including customs if needed."
  },
  {
    icon: MapPin,
    title: "Final Delivery",
    desc: "Safe, verified delivery to the final destination."
  }
];

export function HowItWorks() {
  return (
    <section className="py-14 md:py-32 bg-white border-y border-zinc-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Smooth operations from start to finish.</h2>
          <p className="text-foreground/70 mt-4 text-lg">We handle the complexity, so you can focus on your business.</p>
        </div>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-border z-0" />
          
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Mobile connecting line */}
                {i !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-16 bottom-[-32px] left-1/2 w-[2px] bg-border -translate-x-1/2 z-[-1]" />
                )}
                
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-brand-blue/20 shadow-sm flex items-center justify-center mb-6 relative group hover:border-brand-blue transition-colors duration-300">
                  <step.icon className="w-7 h-7 text-brand-blue group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-foreground text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed px-2">
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
