import { motion } from "framer-motion";
import { Link } from "wouter";
import { Anchor, Plane, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ddpImage from "@assets/image_1777424859406.png";

export function MultimodalFeature() {
  return (
    <section className="py-14 md:py-28 bg-white border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1.5 rounded-full mb-5">
              Multimodal · DDP
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-5 md:mb-6 leading-[1.15]">
              Sea, Air, or DDP. <span className="text-brand-blue">One team, every mode.</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Whether you need budget-friendly sea freight, urgent air shipments, or fully-landed DDP (Delivered Duty Paid) where we handle every cost from factory to your warehouse. We coordinate it under one invoice, one contact.
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
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted border border-border/50 hover:border-brand-blue/40 hover:bg-brand-blue/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-tight">{item.label}</div>
                    <div className="text-xs text-foreground/60 mt-0.5">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none shadow-lg shadow-brand-orange/20 h-12 px-7"
              >
                Get a DDP Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-muted">
              <img
                src={ddpImage}
                alt="Multimodal freight: cargo plane and container ship connecting China and South Africa under DDP terms"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="hidden md:flex absolute -top-4 -right-4 bg-brand-navy text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              China ↔ SA
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
