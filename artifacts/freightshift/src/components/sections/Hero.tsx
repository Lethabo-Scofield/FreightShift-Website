import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroBg from "@/assets/port-cranes.png";
import { goToQuote as routeToQuote } from "@/lib/scroll-to-quote";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => routeToQuote(navigate);

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-40 overflow-hidden bg-zinc-100"
    >
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 lg:bg-black/50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-4xl pt-10 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30 text-white rounded-none text-sm font-semibold tracking-widest uppercase mb-8">
              South Africa's Trusted Logistics Partner
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
              We move it. <br/>
              <span className="text-brand-orange">We store it.</span> <br/>
              You grow.
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mb-10 font-light text-zinc-200">
              End-to-end logistics operations, moving, courier, and freight transport—handled by a real team with real assets on the ground.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base h-14 px-8 border-none rounded-none w-full sm:w-auto gap-2"
                onClick={goToQuote}
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white h-14 px-8 rounded-none gap-2 w-full sm:w-auto"
              >
                <a href="tel:+27100113971">
                  <Phone className="w-5 h-5" />
                  Call 010 011 3971
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
