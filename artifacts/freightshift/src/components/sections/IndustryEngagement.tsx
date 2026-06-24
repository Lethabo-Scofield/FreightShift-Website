import { motion } from "framer-motion";
import ujVisit1 from "@assets/WhatsApp_Image_2026-06-24_at_5.03.54_PM_1782337748102.jpeg";
import ujVisit2 from "@assets/WhatsApp_Image_2026-06-24_at_5.03.54_PM_1782337764607.jpeg";

export function IndustryEngagement() {
  return (
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="mb-6 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
              UJ Site Visit
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 uppercase tracking-tight leading-[0.9]">
              Industry <br />
              <span className="text-accent underline decoration-4 underline-offset-8">Engagement.</span>
            </h2>
            
            <blockquote className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-sans border-l-4 border-accent pl-6 py-2 bg-foreground/5 relative">
              <div className="absolute top-2 -left-[3px] w-1.5 h-6 bg-accent" />
              "Road Freight Transport students from the University of Johannesburg visited Freight Shift Logistics to learn more about real-world logistics and transport operations. The visit helped students connect classroom theory with practical industry experience."
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 md:order-1 grid grid-cols-5 grid-rows-5 gap-4 h-[420px] lg:h-[520px]"
          >
            <div className="col-span-3 row-span-5 border-2 border-foreground bg-foreground overflow-hidden relative group">
              <img
                src={ujVisit1}
                alt="Road Freight Transport students from the University of Johannesburg visiting Freight Shift Logistics"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="col-span-2 row-span-5 border-2 border-foreground bg-foreground overflow-hidden relative group">
              <img
                src={ujVisit2}
                alt="University of Johannesburg students touring the Freight Shift Logistics warehouse"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
