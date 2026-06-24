import { motion } from "framer-motion";
import ujVisit1 from "@assets/WhatsApp_Image_2026-06-24_at_5.03.54_PM_1782337748102.jpeg";
import ujVisit2 from "@assets/WhatsApp_Image_2026-06-24_at_5.03.54_PM_1782337764607.jpeg";

export function IndustryEngagement() {
  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 grid grid-cols-5 grid-rows-5 gap-4 h-[420px]"
          >
            <div className="col-span-3 row-span-5 border border-zinc-200 overflow-hidden">
              <img
                src={ujVisit1}
                alt="Road Freight Transport students from the University of Johannesburg visiting Freight Shift Logistics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-5 border border-zinc-200 overflow-hidden">
              <img
                src={ujVisit2}
                alt="University of Johannesburg students touring the Freight Shift Logistics warehouse"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">UJ Site Visit</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">Industry Engagement</h2>
            <div className="w-12 h-1 bg-brand-orange mb-8" />
            <blockquote className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic border-l-4 border-brand-blue pl-6 py-2">
              "Road Freight Transport students from the University of Johannesburg visited Freight Shift Logistics to learn more about real-world logistics and transport operations. The visit helped students connect classroom theory with practical industry experience."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
