import { motion } from "framer-motion";
import { Link } from "wouter";
import { Anchor, Plane, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ddpImage from "@assets/image_1777424859406.png";

export function MultimodalFeature() {
  return (
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight mb-6 leading-[1.05] uppercase">
              Sea, Air, or DDP. <br/>
              <span className="text-accent">One team.</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 font-mono tracking-tight mb-10 max-w-lg">
              One invoice. One contact. Every mode covered.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Anchor, label: "Sea FCL & LCL", note: "Weekly sailings" },
                { icon: Plane, label: "Air Freight", note: "5-9 day transit" },
                { icon: ShieldCheck, label: "Full DDP", note: "Duties included" },
                { icon: Truck, label: "Last-Mile", note: "Door-to-door" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors group rounded-none"
                >
                  <div className="w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center shrink-0 rounded-none group-hover:border-background group-hover:bg-foreground">
                    <item.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-mono font-bold uppercase tracking-wider text-foreground group-hover:text-background leading-tight">{item.label}</div>
                    <div className="text-xs font-sans text-foreground/60 group-hover:text-background/60 mt-1 uppercase tracking-wide">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-background border-none rounded-none font-mono font-bold uppercase tracking-wider h-14 px-8"
              >
                Get a DDP Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative border-2 border-foreground bg-foreground overflow-hidden rounded-none aspect-[4/5] sm:aspect-square">
              <img
                src={ddpImage}
                alt="Multimodal freight: cargo plane and container ship connecting China and South Africa under DDP terms"
                className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 border-[16px] border-background mix-blend-overlay pointer-events-none" />
            </div>
            <div className="absolute -top-4 -right-4 bg-background border-2 border-foreground text-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-none bg-accent" />
              China ↔ SA
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
