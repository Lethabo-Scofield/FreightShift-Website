import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const GOOGLE_REVIEWS_LINK = "GOOGLE_REVIEWS_LINK_HERE";

export function GoogleReviews() {
  return (
    <section className="section-alt py-16 md:py-32 border-b border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-4 py-2 border border-border rounded-xl">
              <FcGoogle className="w-6 h-6" />
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 text-primary ${i < 4 ? "fill-primary" : "fill-none"}`}
                />
              ))}
            </div>
          </div>
          
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 tracking-tight leading-[0.9]">
            See What Our Clients Say.
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 font-medium tracking-tight mb-12">
            Hear directly from the businesses we move cargo for. Read our reviews on Google.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
            <a
              href={GOOGLE_REVIEWS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-lg text-foreground hover:text-primary transition-colors pb-1 border-b-2 border-primary/30 hover:border-primary group"
            >
              Read our reviews on Google
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="hidden sm:inline-block w-1 h-1 bg-border rounded-full" />
            <a
              href={GOOGLE_REVIEWS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary text-sm font-medium tracking-wide transition-colors"
            >
              Leave a review
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
