import { motion } from "framer-motion";

const companies = [
  "Mizu Innovations (Pty) Ltd",
  "CORE X (Pty) Ltd",
];

export function CompaniesServed() {
  return (
    <section className="section-alt py-12 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary inline-block rounded-xl" />
            <h3 className="text-sm font-medium tracking-wide text-foreground">
              Companies we have provided services for
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {companies.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="font-serif text-xl md:text-2xl font-semibold text-foreground/80 tracking-tight"
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
