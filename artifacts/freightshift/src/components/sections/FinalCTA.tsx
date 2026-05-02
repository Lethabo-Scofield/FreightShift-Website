import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      {/* Soft accent glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-blue bg-white border border-zinc-200 shadow-sm px-3 py-1.5 rounded-full mb-6">
          Get a quote in 24 hours
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 md:mb-6 tracking-tight">
          Ready to move?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-xl mx-auto mb-8 md:mb-10 font-light">
          Quick reply. Honest pricing. No back-and-forth.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white h-14 px-8 text-base border-none shadow-lg shadow-brand-orange/20 w-full sm:w-auto gap-2"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-zinc-200 text-foreground hover:bg-zinc-50 hover:text-foreground h-14 px-8 gap-2 w-full sm:w-auto text-base"
            >
              <FaWhatsapp className="w-5 h-5 text-green-500" />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
