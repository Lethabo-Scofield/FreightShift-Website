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
    <section id="china-sa" className="py-14 md:py-32 bg-brand-navy relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-widest uppercase mb-6">
              Core Route
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 md:mb-6 leading-tight">
              Direct China-SA link.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-10 leading-relaxed font-light">
              Source, ship, clear, deliver. Securely. Affordably.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 flex gap-5 items-start group">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Anchor className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Sea Freight (FCL & LCL)</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Bulk or shared space via Durban and Cape Town.</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 flex gap-5 items-start group">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Plane className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Air Freight & Express</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Fast transit to OR Tambo and Cape Town Int.</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 flex gap-5 items-start group">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Door-to-Door & Customs</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Supplier pickup to SA delivery, with SARS clearance.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img
                src={corridorMap}
                alt="World map showing the shipping route from China to South Africa with a flagged container ship"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-brand-orange text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
              Live Corridor
            </div>
          </motion.div>
        </div>

        {/* We also do — compact strip linking out to full services */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 md:mt-20 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">We also do</span>
              <div className="hidden sm:block h-px flex-1 w-12 bg-white/10" />
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 flex-1 md:justify-center">
              {alsoOffer.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-white/85 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-blue-300" />
                  {item.label}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white transition-colors group whitespace-nowrap"
            >
              See all services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
