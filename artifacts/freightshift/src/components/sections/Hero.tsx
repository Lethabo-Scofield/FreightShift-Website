import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => navigate("/contact");

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Container ship at port"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/85 to-brand-navy" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            We deliver{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-brand-blue">
              freight solutions.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Reliable freight forwarding, customs clearance, warehousing, and delivery between China and South Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-8 gap-2 w-full"
              >
                <FaWhatsapp className="w-5 h-5 text-green-400" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
