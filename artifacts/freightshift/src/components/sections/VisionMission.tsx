import { motion } from "framer-motion";
import officeImage from "@assets/WhatsApp_Image_2026-04-29_at_2.53.56_AM_1777424384686.jpeg";

export function VisionMission() {
  return (
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col justify-center space-y-16"
          >
            <div className="relative">
              <h3 className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
                 <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
                 Our Vision //
              </h3>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight uppercase tracking-tight">
                Be the leading link between China and South Africa.
              </p>
            </div>
            
            <div className="relative">
              <h3 className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
                 <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
                 Our Mission //
              </h3>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight uppercase tracking-tight">
                Deliver fast, fair, and reliable logistics that grow our clients.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="relative border-2 border-foreground overflow-hidden min-h-[520px] lg:min-h-full rounded-none bg-foreground"
          >
            <img
              src={officeImage}
              alt="FreightShift International Logistics office"
              className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-40"
            />
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end">
              <span className="inline-block self-start font-mono text-xs font-bold uppercase tracking-widest text-background bg-foreground border-2 border-background px-3 py-1.5 mb-8">
                // INSIDE FREIGHTSHIFT
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-background uppercase tracking-tight mb-8">Strategic Goals</h3>
              <ul className="space-y-4 w-full">
                {[
                  "Transparent service",
                  "Faster lead times",
                  "Wider global network",
                  "Real-time tracking",
                  "Compliance & ethics"
                ].map((goal, i) => (
                  <li key={i} className="flex items-center gap-4 pb-4 border-b-2 border-background/20 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-background text-foreground flex items-center justify-center shrink-0 font-mono text-sm font-bold">
                      0{i + 1}
                    </div>
                    <span className="text-background font-mono font-bold uppercase tracking-wider text-base md:text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
