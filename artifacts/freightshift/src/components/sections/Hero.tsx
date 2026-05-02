import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Anchor, Plane } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import heroBg from "@assets/image_1777730034034.png";
import { goToQuote as routeToQuote } from "@/lib/scroll-to-quote";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => routeToQuote(navigate);

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden bg-zinc-100"
    >
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Mobile: dark overlay so the white text reads */}
        <div className="absolute inset-0 bg-black/55 lg:hidden" />

        {/* Desktop: light overlay fading from solid white on the left
            to transparent on the right, so the dark headline stays
            crisp while the colourful container yard shows through. */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/0" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-zinc-50/60" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            {/* Live route ticker */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-6"
            >
              <span className="relative flex w-2 h-2 ml-1">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                Live route
              </span>
              <span className="h-3 w-px bg-zinc-300" />
              <span className="inline-flex items-center gap-1.5 text-xs text-foreground/85">
                <span aria-label="China" role="img">🇨🇳</span>
                <span className="font-semibold">Shanghai</span>
                <ArrowRight className="w-3 h-3 text-foreground/40" />
                <span className="font-semibold">OR Tambo</span>
                <span aria-label="South Africa" role="img">🇿🇦</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold tracking-[-0.03em] leading-[0.98] mb-6 text-white lg:text-foreground"
            >
              Ship from{" "}
              <span className="relative inline-block">
                <span className="relative z-10">China.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-orange/40 -z-0 rounded-sm" />
              </span>
              <br />
              Land in{" "}
              <span className="lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-brand-blue lg:via-brand-blue lg:to-brand-navy whitespace-nowrap">
                South Africa.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl max-w-xl mb-8 md:mb-10 font-light text-white/85 lg:text-foreground/65"
            >
              Door to door. One team. Zero surprises.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10"
            >
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base h-14 px-8 border-none shadow-lg shadow-brand-orange/20 gap-2"
                onClick={goToQuote}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
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
                  className="bg-white border-zinc-200 text-foreground hover:bg-zinc-50 hover:text-foreground h-14 px-8 gap-2 w-full"
                >
                  <FaWhatsapp className="w-5 h-5 text-green-500" />
                  WhatsApp Us
                </Button>
              </a>
            </motion.div>

            {/* Mode chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80 lg:text-foreground/65"
            >
              <span className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-brand-orange lg:text-brand-blue" />
                Sea · 28–35 days
              </span>
              <span className="hidden sm:inline-block w-px h-4 bg-white/40 lg:bg-zinc-300" />
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-brand-orange lg:text-brand-blue" />
                Air · 5–9 days
              </span>
              <span className="hidden sm:inline-block w-px h-4 bg-white/40 lg:bg-zinc-300" />
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange" />
                Full DDP available
              </span>
            </motion.div>
          </div>

          {/* Right: floating stat card over the photo */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white shadow-2xl border border-zinc-100 px-6 py-5 flex items-center gap-4 whitespace-nowrap"
            >
              <div className="w-14 h-14 bg-brand-orange/15 flex items-center justify-center shrink-0">
                <span className="text-brand-orange font-bold text-lg">98%</span>
              </div>
              <div className="leading-tight">
                <div className="text-[11px] text-foreground/60 font-medium uppercase tracking-wider">
                  On-time
                </div>
                <div className="text-base font-bold text-foreground">
                  12,000+ shipments
                </div>
                <div className="text-xs text-foreground/55 mt-1">
                  China → South Africa
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
