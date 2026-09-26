import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Anchor, Plane, ArrowDownRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import heroBg from "@assets/hero-corridor.webp";
import { goToQuote as routeToQuote } from "@/lib/scroll-to-quote";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => routeToQuote(navigate);

  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-background pt-24 pb-14 md:min-h-screen md:pt-32 md:pb-24"
    >
      {/* Background photo */}
      <img
        src={heroBg}
        alt="Container ship and port cranes on the China to South Africa freight corridor"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Keep the copy legible while letting the port image remain visible. */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-navy/95 via-brand-navy/65 to-brand-navy/20 pointer-events-none md:from-brand-navy/90 md:via-brand-navy/50 md:to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-white break-words"
            >
              Ship from <span className="text-brand-gold">China.</span>
              <br />
              Land in <span className="text-brand-blue">South Africa.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl max-w-xl mb-8 md:mb-10 font-medium text-white/90 tracking-tight"
            >
              Door to door. One team. Zero surprises.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 mb-10 sm:items-center sm:justify-start"
            >
              <Button
                size="lg"
                className="group bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-semibold text-base h-14 px-8 border border-brand-gold gap-3 rounded-xl shadow-lg shadow-brand-navy/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy w-full sm:w-auto"
                onClick={goToQuote}
              >
                Get a Quote
                <ArrowDownRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </Button>
              <a
                href="https://wa.me/message/EVTMLWYQY2OCG1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-white/70 bg-brand-navy/25 px-7 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                <FaWhatsapp className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                WhatsApp Us
              </a>
            </motion.div>

            {/* Mode chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white/90 border-t border-white/20 pt-8"
            >
              <span className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-brand-gold" />
                Sea · 28–35 days
              </span>
              <span className="hidden sm:inline-block w-1 h-1 bg-white/40 rounded-full" />
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-brand-gold" />
                Air · 5–9 days
              </span>
              <span className="hidden sm:inline-block w-1 h-1 bg-white/40 rounded-full" />
              <span className="flex items-center gap-2 text-white">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-gold" />
                Full DDP available
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
