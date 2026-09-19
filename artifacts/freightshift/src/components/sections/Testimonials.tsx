import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portImage from "@assets/hero-corridor.webp";
import deliveryImage from "@assets/image_1789777181414.png";
import warehouseImage from "@/assets/warehouse-team-tablet.png";

const testimonials = [
  {
    quote: "Used to wait 50+ days. Now containers land in Durban in 30. Exceptional team.",
    name: "Aisha Naidoo",
    company: "Durban Home Goods",
    role: "Founder",
    image: portImage,
    imageAlt: "Container terminal on the China to South Africa freight corridor",
  },
  {
    quote: "SARS clearance, handled. No more delays. Highly recommend.",
    name: "Sipho Khumalo",
    company: "Joburg Auto Parts",
    role: "Operations Manager",
    image: warehouseImage,
    imageAlt: "Logistics team coordinating work inside a warehouse",
  },
  {
    quote: "Real-time updates. Delivered on time, every time.",
    name: "Reza Patel",
    company: "Cape Town Imports Co.",
    role: "MD",
    image: deliveryImage,
    imageAlt: "Customer receiving and checking a delivered parcel",
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
    <section id="testimonials" className="relative overflow-hidden border-b border-brand-blue/20 bg-brand-navy py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-blue/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-brand-blue/15 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              Importer experiences
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Trusted by SA Importers.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/65 md:text-base">
            Feedback from South African businesses moving goods through the corridor.
          </p>
        </motion.div>

        <div className="grid overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[340px] overflow-hidden md:min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-brand-navy/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur">
              China → South Africa
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col justify-between bg-background p-6 text-foreground md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-3xl font-semibold text-white">
                  “
                </div>
                <p className="font-serif text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl">
                  {current.quote}
                </p>

                <footer className="mt-10 flex items-center gap-4 border-t border-border pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-lg font-bold text-brand-blue">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-foreground">{current.name}</div>
                    <div className="mt-1 text-xs font-medium tracking-wide text-foreground/60">
                      {current.role} • {current.company}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((testimonial, i) => (
                  <button
                    key={testimonial.name}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-10 bg-brand-blue"
                        : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold tracking-[0.15em] text-foreground/50">
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
