import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEWS_LINK = "GOOGLE_REVIEWS_LINK_HERE";

export function GoogleReviews() {
  return (
    <section className="py-20 md:py-32 bg-background border-b-2 border-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-2 bg-foreground text-background px-4 py-2 border-2 border-foreground rounded-none">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
          </div>
          
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 uppercase tracking-tight leading-[0.9]">
            See What Our Clients <span className="text-accent underline decoration-4 underline-offset-8">Say.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 font-mono tracking-tight mb-12">
            Hear directly from the businesses we move cargo for. Read our reviews on Google.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background font-mono font-bold uppercase tracking-wider text-sm h-14 px-8 border-none rounded-none">
              <a href={GOOGLE_REVIEWS_LINK} target="_blank" rel="noopener noreferrer">
                Read Our Google Reviews
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-mono font-bold uppercase tracking-wider text-sm h-14 px-8 rounded-none">
              <a href={GOOGLE_REVIEWS_LINK} target="_blank" rel="noopener noreferrer">
                Leave a Google Review
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
