import { motion } from "framer-motion";
import corridorMap from "@assets/image_1777424831181.png";

export function ChinaSACorridor() {
  return (
    <section id="china-sa" className="bg-background py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 leading-[1.15] tracking-tight">
              Direct China-SA Link.
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-6 font-medium leading-relaxed">
              Source, ship, clear, deliver. Securely. Affordably.
            </p>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              From supplier pickup in China to final delivery anywhere in South Africa, we manage freight, customs clearance and delivery through one team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative bg-section-alt overflow-hidden border border-border">
              <img
                src={corridorMap}
                alt="World map showing the shipping route from China to South Africa"
                className="w-full h-auto object-cover mix-blend-multiply opacity-90 grayscale"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
