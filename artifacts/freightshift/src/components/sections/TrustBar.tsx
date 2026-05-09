import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Clock, Truck, Headphones } from "lucide-react";

function useCountUp(end: number, isActive: boolean, duration = 1.8, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, isActive, duration]);

  if (decimals > 0) return value.toFixed(decimals);
  return Math.floor(value).toLocaleString();
}

interface StatProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  isInView: boolean;
  delay?: number;
}

function Stat({ icon: Icon, value, suffix = "", decimals = 0, label, isInView, delay = 0 }: StatProps) {
  const display = useCountUp(value, isInView, 1.8, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group relative flex items-center gap-4 px-4 sm:px-6 py-2"
    >
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-xl bg-brand-blue/15 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-11 h-11 rounded-xl bg-white border border-zinc-200 flex items-center justify-center group-hover:border-brand-blue/40 transition-colors shadow-sm">
          <Icon className="w-5 h-5 text-brand-blue" />
        </div>
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span className="font-bold text-2xl md:text-3xl text-foreground tracking-tight tabular-nums">
          {display}
          {suffix && <span className="text-brand-blue ml-0.5">{suffix}</span>}
        </span>
        <span className="text-foreground/60 text-xs sm:text-[13px] font-medium">{label}</span>
      </div>
    </motion.div>
  );
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="bg-zinc-50 border-y border-zinc-200/60 py-6 md:py-10 relative z-20 overflow-hidden">
      {/* Live pulse line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent">
        <motion.div
          className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-transparent via-brand-blue to-transparent"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 md:divide-x divide-zinc-200 justify-items-center md:justify-items-stretch">
          <Stat icon={Container} value={12000} suffix="+" label="Containers Cleared" isInView={isInView} delay={0} />
          <Stat icon={Clock} value={98.4} decimals={1} suffix="%" label="On-Time Delivery" isInView={isInView} delay={0.1} />
          <Stat icon={Truck} value={45} suffix="d" label="Door-to-Door" isInView={isInView} delay={0.2} />
          <Stat icon={Headphones} value={24} suffix="/7" label="Corridor Support" isInView={isInView} delay={0.3} />
        </div>
      </div>
    </div>
  );
}
