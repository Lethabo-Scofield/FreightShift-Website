import { motion } from "framer-motion";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const methods = [
  {
    icon: FaWhatsapp,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    accentBar: "bg-green-500",
    label: "WhatsApp",
    headline: "Message us now",
    detail: "wa.me/freightshift",
    sub: "Replies within minutes",
    badge: "Fastest",
    badgeColor: "bg-green-500",
    href: "https://wa.me/message/EVTMLWYQY2OCG1",
    external: true,
    cta: "Open WhatsApp",
  },
  {
    icon: Phone,
    iconColor: "text-brand-blue",
    iconBg: "bg-blue-50",
    accentBar: "bg-brand-blue",
    label: "Phone",
    headline: "Talk to a coordinator",
    detail: "010 011 3971",
    sub: "Mon–Fri · 08:00–17:00 SAST",
    badge: null,
    badgeColor: "",
    href: "tel:+27100113971",
    external: false,
    cta: "Call now",
  },
  {
    icon: MapPin,
    iconColor: "text-foreground",
    iconBg: "bg-zinc-100",
    accentBar: "bg-foreground",
    label: "Office",
    headline: "Johannesburg HQ",
    detail: "Nationwide SA delivery",
    sub: "Gauteng · KZN · W. Cape",
    badge: null,
    badgeColor: "",
    href: null,
    external: false,
    cta: null,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-14 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 max-w-5xl mx-auto">
          <div>
            <span className="text-brand-blue font-semibold tracking-widest uppercase text-xs">
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 tracking-tight">
              Three ways to reach us.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Clock className="w-4 h-4 text-brand-blue" />
            <span>Reply in 24 hours, faster on WhatsApp</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 max-w-5xl mx-auto">
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
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white"
              >
                <Wrapper
                  {...wrapperProps}
                  className={`relative h-full p-7 md:p-8 flex flex-col gap-5 group transition-colors ${
                    m.href ? "hover:bg-zinc-50/60 cursor-pointer" : ""
                  }`}
                >
                  {/* Top accent bar */}
                  <span
                    className={`absolute top-0 left-0 right-0 h-1 ${m.accentBar}`}
                    aria-hidden="true"
                  />

                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${m.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${m.iconColor}`} />
                    </div>
                    {m.badge && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest text-white px-2 py-1 ${m.badgeColor}`}
                      >
                        {m.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                      {m.label}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1.5 mb-2 tracking-tight">
                      {m.headline}
                    </h3>
                    <p className="text-base font-mono text-foreground/85 break-all">
                      {m.detail}
                    </p>
                    <p className="text-sm text-foreground/55 mt-2">{m.sub}</p>
                  </div>

                  {/* Footer CTA */}
                  {m.cta && (
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <span className={`font-semibold text-sm ${m.iconColor}`}>
                        {m.cta}
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 ${m.iconColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}
                      />
                    </div>
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Helper line */}
        <p className="text-center text-sm text-foreground/50 mt-8 max-w-5xl mx-auto">
          Have a quote ready?{" "}
          <a
            href="#quote"
            className="text-brand-blue font-semibold hover:underline"
          >
            Skip to the quote form ↓
          </a>
        </p>
      </div>
    </section>
  );
}
