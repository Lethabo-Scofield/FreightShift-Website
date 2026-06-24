import { ShoppingBag, Building2, Wrench, Hammer, Box, Cog } from "lucide-react";

const industries = [
  { icon: ShoppingBag, name: "Retail & E-commerce" },
  { icon: Building2, name: "Manufacturing" },
  { icon: Cog, name: "Automotive Parts" },
  { icon: Hammer, name: "Construction" },
  { icon: Box, name: "FMCG" },
  { icon: Wrench, name: "Industrial Equipment" },
];

export function Industries() {
  const looped = [...industries, ...industries];

  return (
    <section className="py-12 md:py-16 bg-background border-b-2 border-foreground overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-5 mix-blend-multiply pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-industries" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-industries)" />
        </svg>
      </div>

      {/* Marquee */}
      <div className="relative z-10">
        {/* Edge covers */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee shrink-0">
            {looped.map((ind, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-background border-2 border-foreground rounded-none px-6 py-4 shrink-0 transition-colors hover:bg-foreground hover:text-background group"
              >
                <ind.icon className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
                <span className="font-mono text-sm uppercase tracking-widest font-bold whitespace-nowrap">
                  {ind.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fs-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: fs-marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
