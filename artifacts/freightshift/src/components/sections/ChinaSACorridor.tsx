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
    <section id="china-sa" className="section-alt py-16 md:py-32 relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-2 lg:order-1"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 tracking-tight leading-none">
              Direct China-SA <br/>Link.
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 font-medium tracking-tight font-medium max-w-lg">
              Source, ship, clear, deliver. Securely. Affordably.
            </p>

            <div className="space-y-4">
              <div className="bg-background rounded-xl p-6 flex gap-6 items-start shadow-sm border border-border group hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Anchor className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg tracking-wide mb-2 text-foreground">Sea Freight (FCL & LCL)</h4>
                  <p className="font-sans text-foreground/70 leading-relaxed">Bulk or shared space via Durban and Cape Town.</p>
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 flex gap-6 items-start shadow-sm border border-border group hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg tracking-wide mb-2 text-foreground">Air Freight & Express</h4>
                  <p className="font-sans text-foreground/70 leading-relaxed">Fast transit to OR Tambo and Cape Town Int.</p>
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 flex gap-6 items-start shadow-sm border border-border group hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg tracking-wide mb-2 text-foreground">Door-to-Door & Customs</h4>
                  <p className="font-sans text-foreground/70 leading-relaxed">Supplier pickup to SA delivery, with SARS clearance.</p>
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
            <div className="relative rounded-2xl bg-zinc-200 overflow-hidden aspect-square md:aspect-[4/3] shadow-lg">
              <img
                src={corridorMap}
                alt="World map showing the shipping route from China to South Africa"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 pointer-events-none rounded-2xl" />

              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 font-medium text-sm rounded-full shadow-sm">
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
          className="mt-16 md:mt-24 pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm tracking-wide text-foreground/60">We also do</span>
              <div className="hidden sm:block h-[1px] flex-1 w-12 bg-border" />
            </div>

            <div className="flex flex-wrap gap-4 flex-1 md:justify-center">
              {alsoOffer.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full text-foreground/80 font-medium text-sm transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <item.icon className="w-4 h-4 text-primary/70" />
                  {item.label}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-medium text-sm tracking-wide text-foreground hover:text-primary transition-colors whitespace-nowrap"
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
