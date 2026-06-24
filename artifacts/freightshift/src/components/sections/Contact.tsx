import { motion } from "framer-motion";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const methods = [
  {
    icon: FaWhatsapp,
    iconColor: "text-accent",
    iconBg: "bg-background border-2 border-foreground",
    accentBar: "bg-accent",
    label: "WhatsApp",
    headline: "Message us now",
    detail: "wa.me/freightshift",
    sub: "Replies within minutes",
    badge: "Fastest",
    badgeColor: "bg-accent text-background",
    href: "https://wa.me/message/EVTMLWYQY2OCG1",
    external: true,
    cta: "Open WhatsApp",
  },
  {
    icon: Phone,
    iconColor: "text-foreground",
    iconBg: "bg-background border-2 border-foreground",
    accentBar: "bg-foreground",
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
    iconColor: "text-background",
    iconBg: "bg-foreground border-2 border-foreground",
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
    <section id="contact" className="py-20 md:py-32 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 max-w-5xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-4 tracking-tight uppercase">
              Three ways to reach us.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/60 font-mono font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-accent" />
            <span>Reply in 24 hours, faster on WhatsApp</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

            const isDark = m.label === "Office";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="h-full"
              >
                <Wrapper
                  {...wrapperProps}
                  className={`relative h-full p-8 flex flex-col gap-5 border-2 border-foreground transition-colors rounded-none ${
                    isDark ? "bg-foreground text-background" : "bg-background text-foreground"
                  } ${m.href ? (isDark ? "hover:bg-foreground/90 cursor-pointer" : "hover:bg-foreground hover:text-background cursor-pointer") : ""}`}
                >
                  <span
                    className={`absolute top-0 left-0 right-0 h-1.5 ${m.accentBar}`}
                    aria-hidden="true"
                  />

                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${m.iconBg} flex items-center justify-center rounded-none`}>
                      <Icon className={`w-6 h-6 ${m.iconColor}`} />
                    </div>
                    {m.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-none ${m.badgeColor}`}
                      >
                        {m.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 mt-4">
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] ${isDark ? "text-background/50" : "text-foreground/50"}`}>
                      {m.label}
                    </span>
                    <h3 className="text-2xl font-display font-bold mt-2 mb-2 tracking-tight uppercase">
                      {m.headline}
                    </h3>
                    <p className="text-base font-mono font-bold tracking-tight break-all">
                      {m.detail}
                    </p>
                    <p className={`text-sm mt-4 font-sans ${isDark ? "text-background/70" : "text-foreground/70"}`}>{m.sub}</p>
                  </div>

                  {m.cta && (
                    <div className={`flex items-center justify-between pt-6 mt-4 border-t-2 ${isDark ? "border-background/20" : "border-foreground/10"}`}>
                      <span className={`font-mono font-bold uppercase tracking-wider text-sm ${isDark ? "text-background" : "text-foreground"} group-hover:text-accent transition-colors`}>
                        {m.cta}
                      </span>
                      <ArrowUpRight
                        className={`w-5 h-5 ${isDark ? "text-background" : "text-foreground"} group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`}
                      />
                    </div>
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm font-mono font-bold tracking-wider uppercase text-foreground/60 mt-16 max-w-5xl mx-auto">
          Have a quote ready?{" "}
          <a
            href="#quote"
            className="text-accent font-bold hover:underline"
          >
            Skip to the quote form ↓
          </a>
        </p>
      </div>
    </section>
  );
}
