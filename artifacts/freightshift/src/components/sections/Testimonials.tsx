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
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 tracking-tight">
            Trusted by SA importers.
          </h2>
        </div>

        <div className="relative">
          {/* Big decorative quote mark */}
          <div className="absolute -top-8 -left-2 md:-top-12 md:-left-6 text-[10rem] md:text-[14rem] leading-none font-serif text-brand-blue/10 select-none pointer-events-none">
            "
          </div>

          <div className="relative min-h-[260px] md:min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="relative z-10"
              >
                <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight leading-[1.2] mb-8 md:mb-10">
                  "{current.quote}"
                </p>

                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{current.name}</div>
                    <div className="text-sm text-foreground/60">
                      {current.role}, {current.company}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-10 md:mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className="group relative h-2 outline-none"
                style={{ width: i === index ? 32 : 12 }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    i === index ? "bg-brand-blue" : "bg-border group-hover:bg-foreground/30"
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-xs text-foreground/40 font-mono">
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
