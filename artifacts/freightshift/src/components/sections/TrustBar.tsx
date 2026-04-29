import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration * 1000 / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration * 60)) || 1;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-2xl md:text-3xl text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function TrustBar() {
  return (
    <div className="bg-brand-navy border-t border-white/10 py-8 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-x-0 md:divide-x divide-white/10 text-center">
          <div className="flex flex-col gap-1 px-4">
            <Counter end={12000} suffix="+" />
            <span className="text-white/60 text-sm font-medium">Containers Cleared</span>
          </div>
          <div className="flex flex-col gap-1 px-4">
            <Counter end={98} suffix=".4%" />
            <span className="text-white/60 text-sm font-medium">On-Time Delivery</span>
          </div>
          <div className="flex flex-col gap-1 px-4">
            <span className="font-bold text-2xl md:text-3xl text-white">45<span className="text-xl">d</span></span>
            <span className="text-white/60 text-sm font-medium">Average Door-to-Door</span>
          </div>
          <div className="flex flex-col gap-1 px-4">
            <span className="font-bold text-2xl md:text-3xl text-white">24/7</span>
            <span className="text-white/60 text-sm font-medium">Corridor Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
