import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Anchor, Plane, ArrowDownRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import heroBg from "@assets/image_1777730034034.png";
import { goToQuote as routeToQuote } from "@/lib/scroll-to-quote";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => routeToQuote(navigate);

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden bg-background border-b-2 border-foreground"
    >
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-8">
            <div className="mb-4 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none animate-pulse" />
              Manifest // FS-ZA
            </div>
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9] mb-8 text-foreground uppercase"
            >
              Ship from <br className="hidden sm:block" />
              <span className="text-accent underline decoration-4 underline-offset-8">China.</span>
              <br />
              Land in <br className="hidden sm:block" />
              <span className="bg-foreground text-background px-2 py-1 inline-block mt-2">South Africa.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl max-w-xl mb-8 md:mb-10 font-medium text-foreground/80 font-mono tracking-tight"
            >
              Door to door. One team. Zero surprises.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-background font-mono font-bold uppercase tracking-wider text-sm h-14 px-8 border-none gap-2 rounded-none"
                onClick={goToQuote}
              >
                Get a Quote
                <ArrowDownRight className="w-4 h-4" />
              </Button>
              <a
                href="https://wa.me/message/EVTMLWYQY2OCG1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-mono font-bold uppercase tracking-wider text-sm h-14 px-8 gap-2 w-full rounded-none"
                >
                  <FaWhatsapp className="w-5 h-5 text-green-600" />
                  WhatsApp Us
                </Button>
              </a>
            </motion.div>

            {/* Mode chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider text-foreground/80 font-bold border-t-2 border-foreground/10 pt-6"
            >
              <span className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-accent" />
                Sea · 28–35 days
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 bg-foreground/20 rounded-none" />
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-accent" />
                Air · 5–9 days
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 bg-foreground/20 rounded-none" />
              <span className="flex items-center gap-2 text-foreground">
                <span className="inline-block w-2 h-2 rounded-none bg-accent" />
                Full DDP available
              </span>
            </motion.div>
          </div>

          {/* Right: floating stat card over the photo */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative">
            <div className="relative w-full aspect-[3/4] border-2 border-foreground bg-zinc-200 overflow-hidden">
               <img
                  src={heroBg}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute top-4 right-4 bg-background text-foreground border-2 border-foreground px-4 py-2 font-mono text-sm font-bold uppercase">
                  China → South Africa
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 bg-background border-2 border-foreground p-4 flex flex-col gap-1"
                >
                  <div className="text-[10px] text-foreground font-mono uppercase tracking-widest font-bold">
                    On-time
                  </div>
                  <div className="text-3xl font-display font-bold text-foreground">
                    98%
                  </div>
                  <div className="text-xs font-mono uppercase text-foreground/70">
                    12,000+ shipments
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
