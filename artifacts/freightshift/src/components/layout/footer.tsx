import { Link, useLocation } from "wouter";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import logoUrl from "@/assets/freightshift-logo.png";
import { goToQuote } from "@/lib/scroll-to-quote";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const [, navigate] = useLocation();
  return (
    <footer className="bg-background text-foreground pt-12 md:pt-24 pb-8 md:pb-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-10 md:mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center self-start"
              aria-label="FreightShift International Logistics, Home"
            >
              <img
                src={logoUrl}
                alt="FreightShift International Logistics"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-foreground/70 max-w-xs font-medium">
              China to South Africa. Door to door. One trusted team.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium font-semibold tracking-widest text-foreground/40 mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary inline-block" />
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => goToQuote(navigate)}
                  className="text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-2 group text-left"
                >
                  <ArrowUpRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium font-semibold tracking-widest text-foreground/40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary inline-block" />
              General Enquiries
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:info@freightshiftlogistics.co.za"
                  data-testid="link-footer-general-email"
                  className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="break-all">info@freightshiftlogistics.co.za</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:0100113971"
                  data-testid="link-footer-general-phone"
                  className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  010 011 3971
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  data-testid="link-footer-operations-support"
                  className="flex items-center gap-2 text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors"
                >
                  Shipment &amp; Operations Support
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-foreground/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-foreground/40" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-medium font-semibold tracking-widest text-foreground/40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary inline-block" />
              What we do
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="text-sm font-medium tracking-wider text-foreground/70">Freight Forwarding</li>
              <li className="text-sm font-medium tracking-wider text-foreground/70">Customs Clearance</li>
              <li className="text-sm font-medium tracking-wider text-foreground/70">Warehousing</li>
              <li className="text-sm font-medium tracking-wider text-foreground/70">China-SA Corridor</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 font-medium text-xs tracking-widest text-foreground/40 text-center md:text-left">
          <p>
            © 2026 FreightShift International Logistics (Pty) Ltd. All rights reserved.
          </p>
          <p>
            Created by{" "}
            <a
              href="https://olyxee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              olyxee.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
