import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { goToQuote } from "@/lib/scroll-to-quote";

export function FinalCTA() {
  const [, navigate] = useLocation();

  return (
    <section className="bg-section-alt py-24 md:py-40 border-b border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-semibold text-foreground mb-6 tracking-tight leading-[1.05]">
          Ready to Move?
        </h2>
        
        <p className="font-sans font-medium text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 tracking-wide">
          Quick reply. Honest pricing. No back-and-forth.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-8 max-w-xl mx-auto">
          <Button
            size="lg"
            onClick={() => goToQuote(navigate)}
            className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-semibold text-lg h-16 px-12 rounded-xl transition-colors group"
            data-testid="button-final-cta-quote"
          >
            Get a Quote
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex items-center gap-4 text-foreground/40 text-sm font-medium tracking-widest uppercase">
            <span className="h-px w-8 bg-border" aria-hidden="true" />
            Prefer to chat?
            <span className="h-px w-8 bg-border" aria-hidden="true" />
          </div>

          <a
            href="https://wa.me/message/EVTMLWYQY2OCG1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-brand-gold-ink transition-colors inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
            data-testid="link-final-cta-whatsapp"
          >
            <FaWhatsapp className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
