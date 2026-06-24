import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Clock, Truck, Headphones } from "lucide-react";

interface StatProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  suffix?: string;
  label: string;
  isInView: boolean;
  delay?: number;
}

function Stat({ icon: Icon, value, suffix = "", label, isInView, delay = 0 }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group flex flex-col md:flex-row items-center md:items-start gap-4 p-4 sm:p-6 md:p-8"
    >
      <div className="w-12 h-12 bg-background border-2 border-foreground flex items-center justify-center shrink-0 rounded-none group-hover:bg-foreground group-hover:text-background transition-colors">
        <Icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
      </div>
      <div className="flex flex-col text-center md:text-left leading-none mt-2 md:mt-0">
        <span className="font-display font-bold text-3xl sm:text-4xl text-foreground uppercase tracking-tighter">
          {value}
          {suffix && <span className="text-accent ml-1">{suffix}</span>}
        </span>
        <span className="text-foreground/70 text-xs font-mono font-bold uppercase tracking-widest mt-2">{label}</span>
      </div>
    </motion.div>
  );
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="bg-background border-y-2 border-foreground relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x-2 divide-foreground border-x-2 border-foreground justify-items-stretch">
          <Stat icon={Container} value="12,000" suffix="+" label="Containers Cleared" isInView={isInView} delay={0} />
          <Stat icon={Clock} value="98.4" suffix="%" label="On-Time Delivery" isInView={isInView} delay={0.1} />
          <Stat icon={Truck} value="45" suffix="d" label="Door-to-Door" isInView={isInView} delay={0.2} />
          <Stat icon={Headphones} value="24" suffix="/7" label="Corridor Support" isInView={isInView} delay={0.3} />
        </div>
      </div>
    </div>
  );
}
