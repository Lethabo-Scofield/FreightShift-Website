import { Link, useLocation } from "wouter";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
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
    <footer className="bg-foreground text-background pt-16 md:pt-24 pb-12 border-t-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center self-start bg-background p-3 border-2 border-foreground"
              aria-label="FreightShift International Logistics, Home"
            >
              <img
                src={logoUrl}
                alt="FreightShift International Logistics"
                className="h-10 w-auto object-contain filter invert"
              />
            </Link>
            <p className="text-sm text-background/70 max-w-xs font-mono">
              China to South Africa. Door to door. One trusted team.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-background/40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent inline-block" />
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-mono font-bold uppercase tracking-wider text-background hover:text-accent transition-colors flex items-center gap-2 group"
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
                  className="text-sm font-mono font-bold uppercase tracking-wider text-background hover:text-accent transition-colors flex items-center gap-2 group text-left"
                >
                  <ArrowUpRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-background/40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent inline-block" />
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+27100113971"
                  className="flex items-center gap-3 text-sm font-mono text-background hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  010 011 3971
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/EVTMLWYQY2OCG1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-mono text-background hover:text-accent transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-mono text-background/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-background/40" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-background/40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent inline-block" />
              What we do
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="text-sm font-mono uppercase tracking-wider text-background/70">Freight Forwarding</li>
              <li className="text-sm font-mono uppercase tracking-wider text-background/70">Customs Clearance</li>
              <li className="text-sm font-mono uppercase tracking-wider text-background/70">Warehousing</li>
              <li className="text-sm font-mono uppercase tracking-wider text-background/70">China-SA Corridor</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-background/40">
          <p>
            © 2026 FreightShift International Logistics (Pty) Ltd. All rights reserved.
          </p>
          <p>
            Created by{" "}
            <a
              href="https://olyxee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-accent transition-colors"
            >
              olyxee.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
