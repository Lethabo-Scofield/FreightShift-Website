import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import storageBg from "@/assets/warehouse-team-tablet.png";

export function MovingStorageHighlight() {
  const capabilities = [
    "Short and long-term warehousing",
    "Packing and unpacking",
    "Home and office relocations",
    "Inventory and distribution",
  ];

  return (
    <section className="section-alt relative border-b border-border py-16 text-foreground md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Moving &amp; Storage. Done Right.
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
              Moving and storage support for homes, offices and commercial goods across South Africa.
            </p>

            <ul className="mb-9 grid gap-x-8 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li key={item} className="flex min-h-16 items-center gap-3 border-t border-border py-4">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                  <span className="text-sm font-medium leading-snug text-foreground/85 md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-blue transition-colors hover:text-brand-navy"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[360px] overflow-hidden border border-border md:h-[440px] lg:h-[500px]"
          >
            <img
              src={storageBg}
              alt="Warehouse team managing storage operations"
              className="absolute inset-0 h-full w-full object-cover"
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
