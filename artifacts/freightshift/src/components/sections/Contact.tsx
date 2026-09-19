import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  ArrowUpRight,
  ArrowDown,
  Mail,
  PhoneCall,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const methods = [
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    iconColor: "text-white",
    iconBg: "bg-primary",
    accentBar: "bg-primary",
    label: "WhatsApp",
    headline: "Message us now",
    detail: "wa.me/freightshift",
    sub: "Replies within minutes",
    badge: "Fastest",
    badgeColor: "bg-primary text-primary-foreground",
    href: "https://wa.me/message/EVTMLWYQY2OCG1",
    external: true,
    cta: "Open WhatsApp",
    isPrimary: true,
  },
  {
    id: "phone",
    icon: Phone,
    iconColor: "text-white",
    iconBg: "bg-brand-blue",
    accentBar: "bg-brand-blue",
    label: "Phone",
    headline: "Talk to a coordinator",
    detail: "010 011 3971",
    secondaryDetail: "011 385 0010",
    sub: "General enquiries · Operations support",
    badge: null,
    badgeColor: "",
    href: "tel:0100113971",
    external: false,
    cta: "Call now",
    isPrimary: false,
  },
  {
    id: "email",
    icon: Mail,
    iconColor: "text-white",
    iconBg: "bg-foreground",
    accentBar: "bg-foreground",
    label: "Email",
    headline: "Email our team",
    detail: "info@freightshiftlogistics.co.za",
    secondaryDetail: "admin@freightshiftlogistics.co.za",
    sub: "General enquiries · Shipment support",
    badge: null,
    badgeColor: "",
    href: null,
    external: false,
    cta: null,
    isPrimary: false,
    emailLinks: [
      {
        label: "General enquiries",
        href: "mailto:info@freightshiftlogistics.co.za",
      },
      {
        label: "Operations support",
        href: "mailto:admin@freightshiftlogistics.co.za",
      },
    ],
  },
];

const contactCategories = [
  {
    id: "general-enquiries",
    label: "General Enquiries",
    description:
      "For general information, quotations, service enquiries, partnerships, and any other general enquiries about FreightShift.",
    email: "info@freightshiftlogistics.co.za",
    phone: "010 011 3971",
    phoneHref: "tel:0100113971",
    emailHref: "mailto:info@freightshiftlogistics.co.za",
    accent: "bg-brand-blue",
    emailCta: "Send email",
    phoneCta: "Call now",
  },
  {
    id: "shipment-operations-support",
    label: "Shipment & Operations Support",
    description:
      "For questions regarding shipments, tracking, operations, delivery status, customs documentation, invoices, payments, accounts, and other shipment-related enquiries.",
    email: "admin@freightshiftlogistics.co.za",
    phone: "011 385 0010",
    phoneHref: "tel:0113850010",
    emailHref: "mailto:admin@freightshiftlogistics.co.za",
    accent: "bg-brand-blue",
    emailCta: "Email operations",
    phoneCta: "Call operations",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-16 md:py-32 bg-background border-b border-border overflow-hidden">
      {/* Subtle operational grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none text-foreground"
        style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, currentColor 1.5px, transparent 0)', backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16 max-w-6xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <div
              data-testid="contact-reply-time-badge"
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand-blue/5 border border-brand-blue/20 rounded-xl text-brand-blue font-medium text-sm font-semibold tracking-wider shadow-sm"
            >
              <Clock className="w-4 h-4" />
              <span>Reply in 24 hours, faster on WhatsApp</span>
            </div>
            <h2
              data-testid="contact-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground tracking-tight"
            >
              Three ways to reach us.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
          {contactCategories.map((category, i) => (
            <motion.article
              key={category.id}
              data-testid={`contact-category-${category.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden border border-border bg-card shadow-lg rounded-2xl"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 ${category.accent}`}
                aria-hidden="true"
              />
              <div className="p-5 md:p-8">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-2 block font-medium text-xs font-semibold tracking-[0.18em] text-foreground/50">
                      Contact category
                    </span>
                    <h3
                      data-testid={`contact-category-title-${category.id}`}
                      className="max-w-sm text-2xl font-serif font-semibold tracking-tight text-foreground md:text-3xl"
                    >
                      {category.label}
                    </h3>
                  </div>
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${category.accent}`}
                    aria-hidden="true"
                  >
                    <PhoneCall className="h-5 w-5" />
                  </div>
                </div>

                <p
                  data-testid={`contact-category-description-${category.id}`}
                  className="max-w-xl text-sm leading-6 text-foreground/70 md:min-h-24"
                >
                  {category.description}
                </p>

                <div className="mt-7 grid gap-4 border-y border-border py-5 sm:grid-cols-2">
                  <a
                    href={category.phoneHref}
                    data-testid={`link-${category.id}-phone`}
                    className="group flex min-w-0 items-center gap-3 text-foreground transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background text-brand-blue">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-[10px] font-semibold tracking-widest text-foreground/50">
                        Phone
                      </span>
                      <span className="block truncate font-medium text-sm font-semibold">
                        {category.phone}
                      </span>
                    </span>
                  </a>
                  <a
                    href={category.emailHref}
                    data-testid={`link-${category.id}-email`}
                    className="group flex min-w-0 items-center gap-3 text-foreground transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background text-brand-blue">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-[10px] font-semibold tracking-widest text-foreground/50">
                        Email
                      </span>
                      <span className="block break-all font-medium text-sm font-semibold">
                        {category.email}
                      </span>
                    </span>
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={category.phoneHref}
                    data-testid={`button-${category.id}-call`}
                     className="inline-flex items-center justify-center gap-2 border border-brand-blue bg-brand-blue px-4 py-3 rounded-full font-medium text-xs font-semibold tracking-wider text-white transition-all hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <PhoneCall className="h-4 w-4" />
                    {category.phoneCta}
                  </a>
                  <a
                    href={category.emailHref}
                    data-testid={`button-${category.id}-email`}
                     className="inline-flex items-center justify-center gap-2 border border-brand-blue bg-background px-4 py-3 rounded-full font-medium text-xs font-semibold tracking-wider text-brand-blue transition-all hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <Mail className="h-4 w-4" />
                    {category.emailCta}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid items-start gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {methods.map((m, i) => {
            const Icon = m.icon;
            const Wrapper = m.href ? "a" : "div";
            const wrapperProps = m.href
              ? {
                  href: m.href,
                  ...(m.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {}),
                }
              : {};

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-auto"
              >
                <Wrapper
                  {...wrapperProps}
                  data-testid={`contact-method-${m.id}`}
                   className={`relative block bg-card border border-border shadow-md rounded-2xl transition-all duration-300 ${
 m.href
 ? "hover:border-primary hover:shadow-md group cursor-pointer hover:-translate-y-1"
 : ""
 }`}
                >
                  {/* Top Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${m.accentBar}`}
                    aria-hidden="true"
                  />

                  <div className="p-5 md:p-8 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${m.iconBg}`}>
                        <Icon className={`w-7 h-7 ${m.iconColor}`} />
                      </div>
                      {m.badge && (
                        <span className={`text-[10px] font-medium tracking-wide px-3 py-1.5 rounded-xl shadow-sm ${m.badgeColor}`}>
                          {m.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <span className="text-xs font-medium font-semibold tracking-widest text-foreground/50 mb-3">
                        {m.label}
                      </span>
                      <h3 className="text-2xl font-serif font-semibold text-foreground tracking-tight mb-2">
                        {m.headline}
                      </h3>
                      <p className="text-base md:text-lg font-medium font-medium text-foreground tracking-tight break-words">
                        {m.detail}
                      </p>
                      {m.secondaryDetail && (
                        <p className="text-base md:text-lg font-medium font-medium text-foreground tracking-tight break-words">
                          {m.secondaryDetail}
                        </p>
                      )}
                      <p className="text-sm  text-foreground/70 mt-3">
                        {m.sub}
                      </p>
                    </div>

                    {/* CTA */}
                    {m.id === "email" && m.emailLinks ? (
                      <div className="mt-6 pt-5 border-t border-border grid gap-3">
                        {m.emailLinks.map((emailLink) => (
                          <a
                            key={emailLink.href}
                            href={emailLink.href}
                            data-testid={`link-email-${emailLink.label.toLowerCase().replaceAll(" ", "-")}`}
                            className="inline-flex items-center justify-between gap-3 border border-brand-blue bg-background px-4 py-3 rounded-full font-medium text-xs font-semibold tracking-wider text-brand-blue transition-all hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                          >
                            <span>{emailLink.label}</span>
                            <Mail className="h-4 w-4 shrink-0" />
                          </a>
                        ))}
                      </div>
                    ) : m.cta ? (
                      <div className="mt-6 pt-5 border-t border-border">
                        <div
                           className={`inline-flex items-center justify-between px-5 py-3.5 w-full font-medium tracking-wide text-sm transition-all duration-300 border shadow-sm ${
 m.isPrimary
                              ? 'bg-primary border-primary text-primary-foreground group-hover:brightness-110'
                              : 'bg-brand-blue border-brand-blue text-white group-hover:bg-brand-navy'
 }`}
                        >
                          <span>{m.cta}</span>
                          <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 md:p-8 bg-card border border-border shadow-sm">
            <div className="flex items-center gap-5 mb-6 sm:mb-0">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl border border-primary/20 hidden sm:flex">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>
              <p className="text-lg md:text-xl font-medium font-semibold tracking-wider text-foreground">
                Have a quote ready?
              </p>
            </div>
            <a
              href="#quote"
              data-testid="link-skip-to-quote"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide text-sm transition-all hover:bg-primary/90 shadow-sm rounded-full"
            >
              <span>Skip to the quote form</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
