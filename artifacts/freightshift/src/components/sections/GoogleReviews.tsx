import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEWS_LINK = "GOOGLE_REVIEWS_LINK_HERE";

export function GoogleReviews() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-zinc-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 text-brand-orange">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current" />
              ))}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See What Our Clients Say</h2>
          <p className="text-lg text-foreground/70 mb-10">
            Hear directly from the businesses we move cargo for. Read our reviews on Google.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="w-full sm:w-auto bg-brand-blue hover:bg-brand-navy text-white rounded-none h-12 px-8">
              <a href={GOOGLE_REVIEWS_LINK} target="_blank" rel="noopener noreferrer">
                Read Our Google Reviews
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto rounded-none h-12 px-8 border-zinc-300 text-foreground hover:bg-zinc-50">
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
