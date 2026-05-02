import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import heroIllustration from "@assets/image_1777425040113.png";

export function Hero() {
  const [, navigate] = useLocation();
  const goToQuote = () => navigate("/contact");

  return (
    <section id="home" className="relative pt-24 pb-12 md:pt-40 md:pb-28 overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Container ship at port"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/90 to-brand-navy" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-5">
              We deliver{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-brand-blue">
                freight solutions.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/75 max-w-xl mb-8 md:mb-10 leading-relaxed font-light">
              Reliable freight forwarding, customs clearance, warehousing, and delivery between China and South Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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
          </div>

          <div className="hidden lg:block">
            <div className="relative aspect-square w-full max-w-lg mx-auto rounded-3xl overflow-hidden bg-white ring-1 ring-white/10 shadow-2xl">
              <img
                src={heroIllustration}
                alt="Global logistics network with sea, air, and road freight"
                className="absolute inset-0 w-full h-full object-cover scale-[1.55] origin-center"
                style={{ objectPosition: "center 58%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
