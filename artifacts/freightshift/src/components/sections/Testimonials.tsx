import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Used to wait 50+ days. Now containers land in Durban in 30. Exceptional team.",
    name: "Aisha Naidoo",
    company: "Durban Home Goods",
    role: "Founder",
  },
  {
    quote: "SARS clearance, handled. No more delays. Highly recommend.",
    name: "Sipho Khumalo",
    company: "Joburg Auto Parts",
    role: "Operations Manager",
  },
  {
    quote: "Real-time updates. Delivered on time, every time.",
    name: "Reza Patel",
    company: "Cape Town Imports Co.",
    role: "MD",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-20 md:py-32 bg-background text-foreground border-b-2 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 mix-blend-screen pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-testimonials" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-testimonials)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-tight leading-[0.9]">
            Trusted by <br />
            <span className="text-accent">SA Importers.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-6 md:-top-16 md:-left-12 text-[12rem] md:text-[18rem] leading-none font-display font-bold text-foreground/5 select-none pointer-events-none">
            "
          </div>

          <div className="relative min-h-[280px] md:min-h-[240px] flex flex-col justify-center border-l-2 border-accent pl-6 md:pl-10 ml-2 md:ml-6">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <p className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-tight leading-[1.1] mb-10">
                  {current.quote}
                </p>

                <footer className="flex items-center gap-4 border-t-2 border-foreground/20 pt-6 mt-6">
                  <div className="w-14 h-14 bg-foreground text-background border-2 border-foreground flex items-center justify-center font-mono font-bold text-xl rounded-none shrink-0 uppercase">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-mono font-bold uppercase tracking-wider text-foreground text-lg">{current.name}</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-foreground/60">
                      {current.role} // {current.company}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-12 md:mt-16 ml-2 md:ml-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-foreground/30 hover:border-foreground/60 transition-colors group rounded-none outline-none"
                >
                  <span className={`w-3 h-3 rounded-none transition-all duration-300 ${
                    i === index ? "bg-accent" : "bg-foreground/20 group-hover:bg-foreground/50"
                  }`} />
                </button>
              ))}
            </div>
            <span className="ml-4 text-sm text-foreground/60 font-mono font-bold tracking-widest">
              [{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
