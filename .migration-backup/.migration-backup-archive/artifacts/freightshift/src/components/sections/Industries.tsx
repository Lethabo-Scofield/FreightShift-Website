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
  // Duplicate the list so the marquee can loop seamlessly
  const looped = [...industries, ...industries];

  return (
    <section className="py-12 md:py-16 bg-muted border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-border" />
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">
            Built for South African business
          </span>
          <div className="h-px w-8 bg-border" />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee shrink-0">
            {looped.map((ind, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white border border-border/60 rounded-xl px-5 py-3 shrink-0"
              >
                <ind.icon className="w-5 h-5 text-brand-blue/80" />
                <span className="text-sm font-semibold text-foreground/90 whitespace-nowrap">
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
