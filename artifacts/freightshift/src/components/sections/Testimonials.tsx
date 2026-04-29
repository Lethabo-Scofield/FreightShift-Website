import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "FreightShift took over our China imports last year. We used to wait 50+ days, now our containers land in Durban in 30 days flat. Exceptional service.",
    name: "Aisha Naidoo",
    company: "Durban Home Goods",
    role: "Founder"
  },
  {
    quote: "They handle SARS clearance effortlessly. The team knows exactly what documents are needed, avoiding the delays we used to face. Highly recommend.",
    name: "Sipho Khumalo",
    company: "Joburg Auto Parts",
    role: "Operations Manager"
  },
  {
    quote: "Air freighting electronics from Shenzhen requires speed and precision. FreightShift gives us real-time updates and delivers exactly when promised.",
    name: "Reza Patel",
    company: "Cape Town Imports Co.",
    role: "MD"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Trusted by SA Importers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-muted border border-border/50 rounded-2xl p-8 flex flex-col"
            >
              <div className="mb-8">
                <svg className="w-8 h-8 text-brand-blue/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-foreground/80 leading-relaxed italic text-lg">"{test.quote}"</p>
              </div>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xl shrink-0">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">{test.name}</div>
                  <div className="text-sm text-foreground/60">{test.role}, {test.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
