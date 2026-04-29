import { motion } from "framer-motion";
import { Anchor, Plane, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const lanes = [
  { origin: "Shanghai", dest: "Durban", mode: "Sea FCL/LCL", time: "28-35 days", freq: "Weekly", icon: Anchor },
  { origin: "Ningbo", dest: "Cape Town", mode: "Sea FCL/LCL", time: "30-38 days", freq: "Weekly", icon: Anchor },
  { origin: "Shenzhen (Yantian)", dest: "Durban", mode: "Sea FCL", time: "26-32 days", freq: "Weekly", icon: Anchor },
  { origin: "Guangzhou", dest: "Joburg (OR Tambo)", mode: "Air freight", time: "5-8 days", freq: "Daily", icon: Plane },
  { origin: "Hong Kong", dest: "Cape Town", mode: "Air freight", time: "6-9 days", freq: "5x weekly", icon: Plane },
  { origin: "Qingdao", dest: "Port Elizabeth", mode: "Sea FCL", time: "32-40 days", freq: "Bi-weekly", icon: Anchor },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export function Lanes() {
  return (
    <section id="lanes" className="py-14 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Our Lanes</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Our China-South Africa Lanes</h2>
          <p className="text-foreground/70 mt-4 max-w-2xl text-lg">Predictable, scheduled departures connecting major Chinese hubs directly to South African ports and airports.</p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {lanes.map((lane, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="h-full bg-white border-border/50 hover:border-brand-blue/30 hover:shadow-md transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none" aria-label="China" role="img">🇨🇳</span>
                        <div className="text-left leading-tight">
                          <div className="font-bold text-foreground">{lane.origin}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-brand-blue opacity-50" />
                      <div className="flex items-center gap-3">
                        <div className="text-right leading-tight">
                          <div className="font-bold text-foreground">{lane.dest}</div>
                        </div>
                        <span className="text-3xl leading-none" aria-label="South Africa" role="img">🇿🇦</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <lane.icon className="w-4 h-4 text-brand-blue" />
                        <span className="text-sm font-medium text-foreground/80">{lane.mode}</span>
                      </div>
                      <div className="bg-muted px-3 py-1 rounded-md text-xs font-mono font-medium text-brand-navy">
                        {lane.time}
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-blue/5 px-6 py-3 border-t border-brand-blue/10 flex justify-between items-center text-xs font-medium">
                    <span className="text-brand-blue uppercase tracking-wider">Departure Frequency</span>
                    <span className="text-foreground/80">{lane.freq}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
