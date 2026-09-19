import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import storageBg from "@/assets/warehouse-team-tablet.png";

export function MovingStorageHighlight() {
  const [, navigate] = useLocation();

  return (
    <section className="section-alt py-16 md:py-32 text-foreground relative border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-8 leading-none tracking-tight">
              Moving &amp; Storage, <br/>
              Done Right.
            </h2>
            <p className="font-medium text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed font-medium">
              Whether you're relocating your corporate office, moving homes, or need secure warehousing for your commercial goods, our team handles it with precision. We operate secure facilities and maintain a fleet ready to move your assets safely across South Africa.
            </p>

            <ul className="space-y-4 mb-12">
              {['Secure short and long-term warehousing', 'Professional packing and unpacking', 'Commercial and residential relocations', 'Inventory management and distribution'].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary shrink-0 mt-2" />
                  <span className="font-sans text-foreground/90 text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate("/contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide text-sm h-14 px-8 border-none rounded-xl w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] lg:h-[600px] border border-border overflow-hidden"
          >
            <img
              src={storageBg}
              alt="Warehouse team managing storage operations"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-80"
            />
            {/* Grid overlay for texture */}
            <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-light)" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
