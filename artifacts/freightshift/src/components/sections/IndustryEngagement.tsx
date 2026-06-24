import { motion } from "framer-motion";
import engagementImg from "@/assets/warehouse-team-highfive.png";

export function IndustryEngagement() {
  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 border border-zinc-200 aspect-[4/3] relative"
          >
            <img
              src={engagementImg}
              alt="Students and logistics team in warehouse"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Industry Engagement</h2>
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
