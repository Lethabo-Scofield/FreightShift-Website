import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Anchor, Plane, ArrowDownRight } from "lucide-react";
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
      {/* Background photo */}
      <img
        src={heroBg}
        alt="Container ship and port cranes on the China to South Africa freight corridor"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8 text-white break-words [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]"
            >
              Ship from <span className="text-sky-300">China.</span>
              <br />
              Land in <span className="text-sky-300">South Africa.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl max-w-xl mb-8 md:mb-10 font-medium text-white/90 font-mono tracking-tight [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]"
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
                className="bg-brand-orange hover:bg-brand-orange/90 text-foreground font-mono font-bold uppercase tracking-wider text-sm h-14 px-8 border-none gap-2 rounded-none"
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
              className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider text-white/90 font-bold border-t-2 border-white/20 pt-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
            >
              <span className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-sky-300" />
                Sea · 28–35 days
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 bg-white/40 rounded-none" />
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-sky-300" />
                Air · 5–9 days
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 bg-white/40 rounded-none" />
              <span className="flex items-center gap-2 text-white">
                <span className="inline-block w-2 h-2 rounded-none bg-sky-300" />
                Full DDP available
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
