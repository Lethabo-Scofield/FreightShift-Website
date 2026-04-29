import { motion } from "framer-motion";
import { Anchor, Plane, MapPin } from "lucide-react";
import corridorMap from "@assets/image_1777424831181.png";

export function ChinaSACorridor() {
  return (
    <section id="china-sa" className="py-20 md:py-32 bg-brand-navy relative overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The China–South Africa Direct Link
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed font-light">
              We help South African businesses source, ship, clear, and deliver goods from China securely and affordably.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 flex gap-5 items-start group">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Anchor className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Sea Freight (FCL & LCL)</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Cost-effective shipping for bulk orders, full containers, or shared space via major ports like Durban and Cape Town.</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 flex gap-5 items-start group">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Plane className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Air Freight & Express</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Rapid transit to OR Tambo and Cape Town Int. for time-sensitive cargo and high-value goods.</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 flex gap-5 items-start group">
                <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Door-to-Door & Customs</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Seamless handling from supplier origin to final delivery anywhere in SA, including full SARS customs clearance.</p>
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
      </div>
    </section>
  );
}
