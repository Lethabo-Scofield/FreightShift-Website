import { motion } from "framer-motion";

export function VisionMission() {
  return (
    <section className="py-20 md:py-32 bg-muted border-b border-border/50">
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
                To become a leading logistics provider connecting China and South Africa, recognized for innovation, reliability, and excellent service delivery.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-6 -top-6 text-[8rem] leading-none font-serif text-brand-orange/10 select-none">"</div>
              <h3 className="text-xl font-bold text-brand-orange mb-4 uppercase tracking-widest text-sm">
                Our Mission
              </h3>
              <p className="text-2xl font-medium text-foreground leading-snug relative z-10">
                To deliver seamless, efficient, and cost-effective logistics solutions that support client growth with high standards of operational performance.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-brand-navy rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Strategic Goals</h3>
            <ul className="space-y-6">
              {[
                "Clear communication and transparent service",
                "Reduced delivery lead times",
                "Expanded local and international logistics network",
                "Real-time visibility through technology",
                "Compliance, professionalism, and ethical business"
              ].map((goal, i) => (
                <li key={i} className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white font-mono text-sm">
                    {i + 1}
                  </div>
                  <span className="text-white/90 font-medium text-lg leading-tight mt-1">{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
