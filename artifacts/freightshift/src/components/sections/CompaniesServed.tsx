import { motion } from "framer-motion";

const companies = [
  "Mizu Innovations (Pty) Ltd",
  "CORE X (Pty) Ltd",
  "Sun International"
];

export function CompaniesServed() {
  return (
    <section className="py-12 bg-white border-y border-zinc-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 text-center md:text-left">
            Companies we have provided services for
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-lg font-semibold text-foreground/70"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
