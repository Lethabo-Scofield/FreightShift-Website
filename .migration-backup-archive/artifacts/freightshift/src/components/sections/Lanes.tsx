import { motion } from "framer-motion";
import { Anchor, Plane, ArrowRight } from "lucide-react";

const lanes = [
  { origin: "Shanghai", dest: "Durban", mode: "sea", modeLabel: "Sea FCL/LCL", time: "28–35 days", freq: "Weekly" },
  { origin: "Shenzhen (Yantian)", dest: "Durban", mode: "sea", modeLabel: "Sea FCL", time: "26–32 days", freq: "Weekly" },
  { origin: "Ningbo", dest: "Cape Town", mode: "sea", modeLabel: "Sea FCL/LCL", time: "30–38 days", freq: "Weekly" },
  { origin: "Qingdao", dest: "Port Elizabeth", mode: "sea", modeLabel: "Sea FCL", time: "32–40 days", freq: "Bi-weekly" },
  { origin: "Guangzhou", dest: "Joburg (OR Tambo)", mode: "air", modeLabel: "Air freight", time: "5–8 days", freq: "Daily" },
  { origin: "Hong Kong", dest: "Cape Town", mode: "air", modeLabel: "Air freight", time: "6–9 days", freq: "5× weekly" },
];

export function Lanes() {
  return (
    <section id="lanes" className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Our lanes</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 tracking-tight">
              Six lanes. <span className="text-foreground/40">Always running.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            All routes departing this week
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60 bg-white"
        >
          {/* Header row (desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-muted/60 text-[11px] font-bold uppercase tracking-widest text-foreground/50">
            <div className="col-span-5">Route</div>
            <div className="col-span-3">Mode</div>
            <div className="col-span-2">Transit</div>
            <div className="col-span-2 text-right">Departures</div>
          </div>

          {lanes.map((lane, i) => {
            const Icon = lane.mode === "sea" ? Anchor : Plane;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 md:px-6 py-5 md:py-5 group hover:bg-muted/40 transition-colors"
              >
                {/* Route */}
                <div className="md:col-span-5 flex items-center gap-3">
                  <span className="text-2xl leading-none" aria-label="China" role="img">🇨🇳</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground">{lane.origin}</span>
                    <ArrowRight className="w-4 h-4 text-brand-blue/60 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                    <span className="font-bold text-foreground">{lane.dest}</span>
                  </div>
                  <span className="text-2xl leading-none" aria-label="South Africa" role="img">🇿🇦</span>
                </div>

                {/* Mode */}
                <div className="md:col-span-3 flex items-center gap-2 text-sm text-foreground/70">
                  <Icon className="w-4 h-4 text-brand-blue" />
                  <span className="md:hidden text-[11px] font-bold uppercase tracking-widest text-foreground/40 mr-1">Mode:</span>
                  {lane.modeLabel}
                </div>

                {/* Transit */}
                <div className="md:col-span-2 flex items-center">
                  <span className="inline-block bg-muted px-2.5 py-1 rounded-md text-xs font-mono font-medium text-brand-navy">
                    {lane.time}
                  </span>
                </div>

                {/* Frequency */}
                <div className="md:col-span-2 flex md:justify-end items-center gap-2 text-sm">
                  <span className="md:hidden text-[11px] font-bold uppercase tracking-widest text-foreground/40">Departures:</span>
                  <span className="text-foreground/80 font-medium">{lane.freq}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-6 text-sm text-foreground/50">
          Don't see your route? <a href="/contact" className="text-brand-blue font-semibold hover:underline">Ask us about it →</a>
        </p>
      </div>
    </section>
  );
}
