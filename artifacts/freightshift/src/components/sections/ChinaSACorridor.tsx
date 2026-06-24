import { motion } from "framer-motion";
import { Link } from "wouter";
import { Anchor, Plane, MapPin, ArrowRight, Box, BarChart3, Truck, Package } from "lucide-react";
import corridorMap from "@assets/image_1777424831181.png";

const alsoOffer = [
  { icon: Box, label: "Warehousing" },
  { icon: BarChart3, label: "Supply Chain" },
  { icon: Truck, label: "Domestic" },
  { icon: Package, label: "Relocation" },
];

export function ChinaSACorridor() {
  return (
    <section id="china-sa" className="py-20 md:py-32 bg-background relative overflow-hidden border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
              Core Route
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 uppercase tracking-tight leading-none">
              Direct China-SA <br/>Link.
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 font-mono tracking-tight font-medium max-w-lg">
              Source, ship, clear, deliver. Securely. Affordably.
            </p>

            <div className="space-y-4">
              <div className="bg-background border-2 border-foreground p-6 flex gap-6 items-start group hover:bg-foreground hover:text-background transition-colors">
                <div className="w-12 h-12 border-2 border-foreground bg-accent flex items-center justify-center shrink-0">
                  <Anchor className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h4 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">Sea Freight (FCL & LCL)</h4>
                  <p className="font-sans text-foreground/70 group-hover:text-background/70 leading-relaxed">Bulk or shared space via Durban and Cape Town.</p>
                </div>
              </div>

              <div className="bg-background border-2 border-foreground p-6 flex gap-6 items-start group hover:bg-foreground hover:text-background transition-colors">
                <div className="w-12 h-12 border-2 border-foreground bg-accent flex items-center justify-center shrink-0">
                  <Plane className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h4 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">Air Freight & Express</h4>
                  <p className="font-sans text-foreground/70 group-hover:text-background/70 leading-relaxed">Fast transit to OR Tambo and Cape Town Int.</p>
                </div>
              </div>

              <div className="bg-background border-2 border-foreground p-6 flex gap-6 items-start group hover:bg-foreground hover:text-background transition-colors">
                <div className="w-12 h-12 border-2 border-foreground bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h4 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">Door-to-Door & Customs</h4>
                  <p className="font-sans text-foreground/70 group-hover:text-background/70 leading-relaxed">Supplier pickup to SA delivery, with SARS clearance.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative border-2 border-foreground bg-zinc-200 overflow-hidden aspect-square md:aspect-[4/3]">
              <img
                src={corridorMap}
                alt="World map showing the shipping route from China to South Africa"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 mix-blend-multiply opacity-80"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/20 pointer-events-none" />

              <div className="absolute bottom-4 left-4 bg-accent text-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest border-2 border-foreground">
                Live Corridor
              </div>
            </div>
          </motion.div>
        </div>

        {/* We also do — compact strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 md:mt-24 pt-8 border-t-2 border-foreground/10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/50">We also do</span>
              <div className="hidden sm:block h-0.5 flex-1 w-12 bg-foreground/10" />
            </div>

            <div className="flex flex-wrap gap-4 flex-1 md:justify-center">
              {alsoOffer.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background border-2 border-foreground text-foreground font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors whitespace-nowrap"
            >
              See all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
