import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { goToQuote } from "@/lib/scroll-to-quote";

export function FinalCTA() {
  const [, navigate] = useLocation();
  return (
    <section className="py-24 md:py-40 bg-neutral-800 text-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>
      
      {/* Decorative accent element */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 border-l-2 border-b-2 border-accent/20 bg-background/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 border-r-2 border-t-2 border-accent/20 bg-background/5 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        
        <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold text-background mb-8 uppercase tracking-tight leading-[0.9]">
          Ready to <span className="text-accent underline decoration-4 underline-offset-8">Move?</span>
        </h2>
        
        <p className="font-mono text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-12 uppercase tracking-widest">
          Quick reply. Honest pricing. No back-and-forth.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
          <Button
            size="lg"
            onClick={() => goToQuote(navigate)}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background font-mono font-bold uppercase tracking-wider text-sm h-16 px-10 border-none gap-3 rounded-none shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
          >
            Get a Quote
            <ArrowDownRight className="w-5 h-5" />
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
              className="w-full bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground font-mono font-bold uppercase tracking-wider text-sm h-16 px-10 gap-3 rounded-none transition-colors"
            >
              <FaWhatsapp className="w-5 h-5 text-green-500 group-hover:text-green-600" />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
