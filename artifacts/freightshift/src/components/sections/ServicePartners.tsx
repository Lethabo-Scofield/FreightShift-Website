import { motion } from "framer-motion";
import olyxeeLogo from "@assets/olyxee-logo-transparent.png";
import courierGuyLogo from "@assets/image_1789777991413.png";

const partners = [
  {
    name: "Courier Guy",
    desc: "Local courier services",
    wordmarkClass: "font-sans font-extrabold tracking-[-0.05em]",
    logo: courierGuyLogo,
    logoClass: "h-12 w-auto max-w-[11rem]",
    showName: false,
  },
  {
    name: "Just In Time Logistics",
    desc: "Moving services",
    wordmarkClass: "font-sans font-bold tracking-[-0.035em]",
  },
  {
    name: "Olyxee",
    desc: "Technology & digital support",
    wordmarkClass: "font-serif font-semibold tracking-[-0.04em]",
    logo: olyxeeLogo,
    logoClass: "h-12 w-12 brightness-0 opacity-80",
    showName: true,
  },
];

export function ServicePartners() {
  return (
    <section id="partners" className="bg-background border-y border-border">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Extended support network
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              Partners &amp; Support Providers.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground/65 md:text-base">
              We work with trusted providers to extend our courier, moving and digital support.
            </p>
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-1 border-t border-border sm:grid-cols-3 sm:border-y"
          >
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex min-h-28 flex-col justify-center border-b border-border px-1 py-6 sm:min-h-32 sm:border-b-0 sm:border-r sm:px-6 sm:py-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                {partner.logo ? (
                  <span className="flex items-center gap-3">
                    <img
                      src={partner.logo}
                      alt={partner.showName ? "" : partner.name}
                      className={`${partner.logoClass} shrink-0 object-contain`}
                    />
                    {partner.showName && (
                      <span className={`${partner.wordmarkClass} text-xl leading-tight text-foreground md:text-2xl`}>
                        {partner.name}
                      </span>
                    )}
                  </span>
                ) : (
                  <span
                    className={`${partner.wordmarkClass} text-xl leading-tight text-foreground md:text-2xl`}
                    aria-label={partner.name}
                  >
                    {partner.name}
                  </span>
                )}
                <span className="mt-2 text-xs leading-snug text-foreground/55">
                  {partner.desc}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
