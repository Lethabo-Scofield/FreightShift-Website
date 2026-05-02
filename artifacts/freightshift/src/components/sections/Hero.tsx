import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Anchor, Plane } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import heroIllustration from "@assets/image_1777425040113.png";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => navigate("/contact");

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden bg-white"
    >
      {/* Background — light, editorial */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(0 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          }}
        />
        {/* Soft top glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/10 blur-3xl" />
        {/* Bottom fade to grey */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zinc-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left */}
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
                <span className="font-semibold">Durban</span>
                <span aria-label="South Africa" role="img">🇿🇦</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold text-foreground tracking-[-0.03em] leading-[0.98] mb-6"
            >
              Ship from{" "}
              <span className="relative inline-block">
                <span className="relative z-10">China.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-orange/30 -z-0 rounded-sm" />
              </span>
              <br />
              Land in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-blue to-brand-navy whitespace-nowrap">
                South Africa.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-foreground/60 max-w-xl mb-8 md:mb-10 font-light"
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
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/60"
            >
              <span className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-brand-blue" />
                Sea · 28–35 days
              </span>
              <span className="hidden sm:inline-block w-px h-4 bg-zinc-300" />
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-brand-blue" />
                Air · 5–9 days
              </span>
              <span className="hidden sm:inline-block w-px h-4 bg-zinc-300" />
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange" />
                Full DDP available
              </span>
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative offset blocks */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-brand-blue/20" />
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl bg-zinc-100" />

              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white ring-1 ring-zinc-200 shadow-xl">
                <img
                  src={heroIllustration}
                  alt="Global logistics network with sea, air, and road freight"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.55] origin-center"
                  style={{ objectPosition: "center 58%" }}
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-2xl border border-zinc-100 px-5 py-4 flex items-center gap-3.5 whitespace-nowrap"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0">
                  <span className="text-brand-orange font-bold text-base">98%</span>
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] text-foreground/60 font-medium uppercase tracking-wider">On-time</div>
                  <div className="text-sm font-bold text-foreground">12,000+ shipments</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
