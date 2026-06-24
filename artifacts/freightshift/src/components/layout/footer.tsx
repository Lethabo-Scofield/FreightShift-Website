import { Link, useLocation } from "wouter";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, MapPin } from "lucide-react";
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
    <footer className="bg-zinc-50 text-foreground/80 pt-12 md:pt-16 pb-24 md:pb-8 border-t border-zinc-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center self-start"
              aria-label="FreightShift International Logistics, Home"
            >
              <img
                src={logoUrl}
                alt="FreightShift International Logistics"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-foreground/60 max-w-xs mt-2">
              China to South Africa. Door to door. One trusted team.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-brand-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => goToQuote(navigate)}
                  className="text-sm text-foreground/70 hover:text-brand-blue transition-colors text-left"
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-5">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+27100113971"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-brand-blue transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-blue" />
                  010 011 3971
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/EVTMLWYQY2OCG1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-brand-blue transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4 text-green-600" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground/70">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-1" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-5">
              What we do
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-foreground/70">Freight Forwarding</li>
              <li className="text-sm text-foreground/70">Customs Clearance</li>
              <li className="text-sm text-foreground/70">Warehousing</li>
              <li className="text-sm text-foreground/70">China-SA Corridor</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            © 2026 FreightShift International Logistics (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
