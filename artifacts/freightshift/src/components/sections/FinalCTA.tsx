import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { goToQuote } from "@/lib/scroll-to-quote";

export function FinalCTA() {
  const [, navigate] = useLocation();
  return (
    <section className="section-alt py-24 md:py-40 text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>
      
      {/* Decorative accent element */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 border-l border-b border-primary/20 bg-foreground/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 border-r border-t border-primary/20 bg-foreground/5 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        
        <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] font-semibold text-foreground mb-8 tracking-tight leading-[0.9]">
          Ready to Move?
        </h2>
        
        <p className="font-medium text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 tracking-widest">
          Quick reply. Honest pricing. No back-and-forth.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
          <Button
            size="lg"
            onClick={() => goToQuote(navigate)}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide text-sm h-16 px-10 border-none gap-3 rounded-full shadow-lg hover:shadow-xl transition-all"
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
              className="w-full bg-background border border-border text-foreground hover:bg-muted font-medium tracking-wide text-sm h-16 px-10 gap-3 rounded-full shadow-sm transition-colors"
            >
              <FaWhatsapp className="w-5 h-5 text-brand-blue" />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
