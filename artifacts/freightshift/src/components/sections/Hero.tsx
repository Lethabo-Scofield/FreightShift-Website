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

      {/* Readability shade: darkens the left so the white copy stays clear while the photo stays visible on the right */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/20 pointer-events-none md:from-foreground/80 md:via-foreground/35 md:to-transparent" />

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
              Ship from China.
              <br />
              Land in South Africa.
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
              className="flex flex-col sm:flex-row items-center gap-6 mb-10 sm:items-center sm:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base h-14 px-8 border-none gap-2 rounded-full shadow-lg transition-all w-full sm:w-auto"
                onClick={goToQuote}
              >
                Get a Quote
                <ArrowDownRight className="w-5 h-5" />
              </Button>
              <a
                href="https://wa.me/message/EVTMLWYQY2OCG1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors font-medium text-sm tracking-wide group w-full justify-center sm:w-auto sm:justify-start"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-colors group-hover:bg-[#20bd5a]">
                  <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                </span>
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
                <Anchor className="w-4 h-4 text-primary" />
                Sea · 28–35 days
              </span>
              <span className="hidden sm:inline-block w-1 h-1 bg-white/40 rounded-full" />
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-primary" />
                Air · 5–9 days
              </span>
              <span className="hidden sm:inline-block w-1 h-1 bg-white/40 rounded-full" />
              <span className="flex items-center gap-2 text-white">
                <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                Full DDP available
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
