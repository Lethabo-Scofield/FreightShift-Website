import { motion } from "framer-motion";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const contactCategories = [
  {
    id: "general-enquiries",
    label: "General Enquiries",
    description: "For quotations, services, partnerships and general information.",
    email: "info@freightshiftlogistics.co.za",
    phone: "010 011 3971",
    phoneHref: "tel:0100113971",
    emailHref: "mailto:info@freightshiftlogistics.co.za",
  },
  {
    id: "shipment-operations-support",
    label: "Shipment & Operations Support",
    description: "For shipments, tracking, customs documents, invoices, payments and accounts.",
    email: "admin@freightshiftlogistics.co.za",
    phone: "011 385 0010",
    phoneHref: "tel:0113850010",
    emailHref: "mailto:admin@freightshiftlogistics.co.za",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-b border-border bg-background py-14 md:py-20">
      {/* Subtle operational grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none text-foreground"
        style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, currentColor 1.5px, transparent 0)', backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 max-w-3xl"
        >
          <div
            data-testid="contact-reply-time-badge"
            className="mb-3 text-sm font-medium text-brand-blue"
          >
            Direct lines for every enquiry
          </div>
          <h2
            data-testid="contact-heading"
            className="text-4xl md:text-5xl font-serif font-semibold text-foreground tracking-tight"
          >
            Contact the right team.
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <a
              href="https://wa.me/message/EVTMLWYQY2OCG1"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-method-whatsapp"
              className="group relative block overflow-hidden rounded-xl bg-brand-blue p-6 text-white shadow-sm transition-all hover:bg-brand-navy md:p-7"
            >
              <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <FaWhatsapp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium tracking-tight">WhatsApp Us</h3>
                    <p className="mt-1 max-w-2xl text-sm text-white/75">
                      Start a direct conversation with our team.
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
                  Start a chat
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </motion.div>

          {contactCategories.map((category, i) => (
            <motion.div
              key={category.id}
              data-testid={`contact-category-${category.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
                <h3
                  data-testid={`contact-category-title-${category.id}`}
                  className="text-xl font-serif font-medium text-foreground tracking-tight mb-3"
                >
                  {category.label}
                </h3>
                <p
                  data-testid={`contact-category-description-${category.id}`}
                  className="text-foreground/70 text-sm leading-relaxed mb-8 flex-grow"
                >
                  {category.description}
                </p>

                <div className="space-y-3 mt-auto">
                  <a
                    href={category.phoneHref}
                    data-testid={category.id === "general-enquiries" ? "contact-method-phone" : undefined}
                    className="flex items-center gap-4 w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <span data-testid={`link-${category.id}-phone`} className="contents">
                      <span data-testid={`button-${category.id}-call`} className="contents">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-sm transition-colors group-hover:border-brand-blue/40">
                          <Phone className="h-4 w-4 text-brand-blue" />
                        </span>
                        <span className="flex flex-col">
                          <span className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-foreground/50">Call</span>
                          <span className="text-sm font-medium text-foreground">{category.phone}</span>
                        </span>
                      </span>
                    </span>
                  </a>

                  <a
                    href={category.emailHref}
                    data-testid={category.id === "general-enquiries" ? "contact-method-email" : undefined}
                    className="flex items-center gap-4 w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <span data-testid={`link-${category.id}-email`} className="contents">
                      <span data-testid={`button-${category.id}-email`} className="contents">
                        <span
                          data-testid={category.id === "general-enquiries" ? "link-email-general-enquiries" : "link-email-operations-support"}
                          className="contents"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-sm transition-colors group-hover:border-brand-blue/40">
                            <Mail className="h-4 w-4 text-brand-blue" />
                          </span>
                          <span className="flex min-w-0 flex-col overflow-hidden">
                            <span className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-foreground/50">Email</span>
                            <span className="truncate text-sm font-medium text-foreground">{category.email}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
