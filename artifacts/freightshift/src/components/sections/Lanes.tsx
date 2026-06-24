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
    <section id="lanes" className="py-20 md:py-32 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
              Our lanes
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-2 tracking-tight uppercase leading-none">
              Six Lanes. <br/><span className="text-foreground/40">Always Running.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            <span className="w-2 h-2 bg-accent inline-block animate-pulse" />
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
          className="border-2 border-foreground bg-background"
        >
          {/* Header row (desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-foreground">
            <div className="col-span-5">Route</div>
            <div className="col-span-3">Mode</div>
            <div className="col-span-2">Transit</div>
            <div className="col-span-2 text-right">Departures</div>
          </div>

          <div className="divide-y-2 divide-foreground">
            {lanes.map((lane, i) => {
              const Icon = lane.mode === "sea" ? Anchor : Plane;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 md:px-6 py-5 md:py-6 group hover:bg-foreground/5 transition-colors items-center"
                >
                  {/* Route */}
                  <div className="md:col-span-5 flex items-center gap-4">
                    <div className="flex items-center gap-3 font-mono font-bold uppercase tracking-wider text-foreground">
                      <span>{lane.origin}</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                      <span>{lane.dest}</span>
                    </div>
                  </div>

                  {/* Mode */}
                  <div className="md:col-span-3 flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-foreground">
                    <Icon className="w-5 h-5 text-foreground" />
                    <span className="md:hidden text-xs font-bold text-foreground/50">MODE:</span>
                    {lane.modeLabel}
                  </div>

                  {/* Transit */}
                  <div className="md:col-span-2 flex items-center">
                    <span className="inline-block bg-accent text-background px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest border-2 border-foreground">
                      {lane.time}
                    </span>
                  </div>

                  {/* Frequency */}
                  <div className="md:col-span-2 flex md:justify-end items-center gap-2 font-mono text-sm uppercase font-bold text-foreground">
                    <span className="md:hidden text-xs text-foreground/50">Departures:</span>
                    {lane.freq}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <p className="mt-8 font-mono text-xs font-bold uppercase tracking-widest text-foreground/60 text-center">
          Don't see your route? <a href="/contact" className="text-accent underline underline-offset-4 decoration-2">Ask us about it →</a>
        </p>
      </div>
    </section>
  );
}
