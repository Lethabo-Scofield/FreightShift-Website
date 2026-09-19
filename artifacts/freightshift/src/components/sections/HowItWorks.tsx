import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardEdit, Truck, Ship, FileCheck, MapPin } from "lucide-react";

const steps = [
  {
    icon: ClipboardEdit,
    title: "Quote & Book",
    desc: "Rates within 24 hours.",
    color: "#1478b8",
  },
  {
    icon: Truck,
    title: "Origin Pickup",
    desc: "We collect from your supplier in China.",
    color: "#0e7490",
  },
  {
    icon: Ship,
    title: "Sea or Air",
    desc: "Scheduled corridor services with tracking.",
    color: "#2563eb",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    desc: "We handle SARS, duties, and compliance.",
    color: "#4f46e5",
  },
  {
    icon: MapPin,
    title: "Final Delivery",
    desc: "Door-to-door anywhere in SA.",
    color: "#0f766e",
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-border bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 md:mb-20"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            How it works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-6">
            Factory to Door. In 5 Steps.
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl font-medium leading-relaxed">
            We handle the complexity. You track the cargo.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute left-7 top-7 h-[calc(100%-3.5rem)] w-px bg-border lg:left-[10%] lg:right-[10%] lg:top-7 lg:h-px lg:w-auto" />
          <motion.div
            className="absolute left-7 top-7 h-[calc(100%-3.5rem)] w-0.5 origin-top lg:hidden"
            animate={{
              scaleY: activeStep / (steps.length - 1),
              backgroundColor: steps[activeStep].color,
            }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[10%] top-7 hidden h-0.5 origin-left lg:block"
            animate={{
              width: `${(activeStep / (steps.length - 1)) * 80}%`,
              backgroundColor: steps[activeStep].color,
            }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setActiveStep(i)}
                aria-current={i === activeStep ? "step" : undefined}
                className="group grid grid-cols-[3.5rem_1fr] gap-5 text-left lg:block lg:text-center"
              >
                <motion.span
                  animate={{
                    scale: i === activeStep ? 1.12 : 1,
                    backgroundColor: i === activeStep ? step.color : "#ffffff",
                    borderColor: i === activeStep ? step.color : "#d9e0e7",
                    color: i === activeStep ? "#ffffff" : "#718096",
                    boxShadow:
                      i === activeStep
                        ? `0 10px 30px ${step.color}40`
                        : "0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2"
                >
                  <step.icon className="h-6 w-6" strokeWidth={1.8} />
                  {i === activeStep && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.55, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: step.color }}
                    />
                  )}
                </motion.span>

                <div className="pt-1 lg:pt-0">
                  <div
                    className="mb-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors lg:mt-7"
                    style={{ color: i === activeStep ? step.color : undefined }}
                  >
                    Step 0{i + 1}
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-foreground md:text-xl">
                    {step.title}
                  </h3>
                  <motion.div
                    animate={{
                      opacity: i === activeStep ? 1 : 0.38,
                      y: i === activeStep ? 0 : 4,
                    }}
                    transition={{ duration: 0.35 }}
                    className="min-h-12"
                  >
                    <p className="text-sm leading-relaxed text-foreground/65">{step.desc}</p>
                  </motion.div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
