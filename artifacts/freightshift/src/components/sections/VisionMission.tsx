import { motion } from "framer-motion";
import officeImage from "@assets/WhatsApp_Image_2026-04-29_at_2.53.56_AM_1777424384686.jpeg";

export function VisionMission() {
  return (
    <section className="py-14 md:py-32 bg-muted border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col justify-center"
          >
            <div className="mb-12 relative">
              <div className="absolute -left-6 -top-6 text-[8rem] leading-none font-serif text-brand-blue/10 select-none">"</div>
              <h3 className="text-xl font-bold text-brand-blue mb-4 uppercase tracking-widest text-sm">
                Our Vision
              </h3>
              <p className="text-2xl font-medium text-foreground leading-snug relative z-10">
                Be the leading link between China and South Africa.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-6 -top-6 text-[8rem] leading-none font-serif text-brand-orange/10 select-none">"</div>
              <h3 className="text-xl font-bold text-brand-orange mb-4 uppercase tracking-widest text-sm">
                Our Mission
              </h3>
              <p className="text-2xl font-medium text-foreground leading-snug relative z-10">
                Deliver fast, fair, and reliable logistics that grow our clients.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-xl min-h-[520px] lg:min-h-full"
          >
            <img
              src={officeImage}
              alt="FreightShift International Logistics office"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/85 to-brand-navy/70" />
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
              <span className="inline-block self-start text-xs font-bold uppercase tracking-widest text-brand-blue bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-6">
                Inside FreightShift
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Strategic Goals</h3>
              <ul className="space-y-5 flex-1">
                {[
                  "Transparent service",
                  "Faster lead times",
                  "Wider global network",
                  "Real-time tracking",
                  "Compliance & ethics"
                ].map((goal, i) => (
                  <li key={i} className="flex items-start gap-4 pb-5 border-b border-white/15 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 text-white font-mono text-sm">
                      {i + 1}
                    </div>
                    <span className="text-white font-medium text-base md:text-lg leading-snug mt-0.5">{goal}</span>
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
