import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";
import logoUrl from "@/assets/freightshift-logo.png";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Track", href: "/track" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-white/10 bg-brand-navy text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center self-start"
              aria-label="FreightShift International Logistics, Home"
            >
              <img
                src={logoUrl}
                alt="FreightShift International Logistics"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              China to South Africa. Door to door. One trusted team.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Navigate
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@freightshiftlogistics.co.za"
                  data-testid="link-footer-general-email"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white/40" />
                  <span className="break-all">info@freightshiftlogistics.co.za</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:0100113971"
                  data-testid="link-footer-general-phone"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-white/40" />
                  010 011 3971
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  data-testid="link-footer-operations-support"
                  className="inline-flex text-sm text-white/70 transition-colors hover:text-white"
                >
                  Shipment &amp; Operations Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-white/35 md:text-left">
          <p>
            © 2026 FreightShift International Logistics (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
