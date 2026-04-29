import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

export function FinalCTA() {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to move your cargo?</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Partner with FreightShift for predictable, transparent, and efficient logistics between China and South Africa.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white h-14 px-8 text-lg border-none shadow-lg shadow-brand-orange/20 w-full sm:w-auto"
            >
              Get a Quote
            </Button>
          </Link>
          <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-8 gap-2 w-full sm:w-auto text-lg"
            >
              <FaWhatsapp className="w-5 h-5 text-green-400" />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
