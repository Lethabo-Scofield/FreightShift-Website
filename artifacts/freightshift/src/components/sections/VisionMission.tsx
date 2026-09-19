import { motion } from "framer-motion";
import officeImage from "@assets/WhatsApp_Image_2026-04-29_at_2.53.56_AM_1777424384686.jpeg";

export function VisionMission() {
  return (
    <section className="py-20 md:py-32 border-b border-border bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 space-y-16"
          >
            <div>
              <h3 className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-4">
                Our Vision
              </h3>
              <p className="text-3xl md:text-4xl font-serif font-medium text-foreground leading-snug tracking-tight">
                Be the leading link between China and South Africa.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-4">
                Our Mission
              </h3>
              <p className="text-3xl md:text-4xl font-serif font-medium text-foreground leading-snug tracking-tight">
                Deliver fast, fair, and reliable logistics that grow our clients.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
              <img
                src={officeImage}
                alt="FreightShift International Logistics office"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-6">Strategic Goals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Transparent service",
                  "Faster lead times",
                  "Wider global network",
                  "Real-time tracking",
                  "Compliance & ethics"
                ].map((goal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                    <span className="text-foreground/80 font-medium text-base">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
