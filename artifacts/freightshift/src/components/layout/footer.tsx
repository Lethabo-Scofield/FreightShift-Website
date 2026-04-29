import { FaWhatsapp } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-navy text-white/90 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-brand-navy font-bold text-xl">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Freight<span className="text-brand-blue">Shift</span>
              </span>
            </a>
            <p className="text-sm text-white/70 max-w-xs mt-2">
              We deliver freight solutions. Reliable freight forwarding, customs clearance, warehousing, and delivery between China and South Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'About', 'Services', 'China to SA', 'Get a Quote', 'Contact'].map((link) => {
                const href = `#${link.toLowerCase().replace(/\s+/g, '-').replace('to-', '')}`;
                return (
                  <li key={link}>
                    <a 
                      href={href}
                      onClick={(e) => scrollToSection(e, href === '#get-a-quote' ? '#quote' : href)}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:+27681095543" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-brand-blue" />
                  068 109 5543
                </a>
              </li>
              <li>
                <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                  <FaWhatsapp className="w-4 h-4 text-brand-blue" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-1" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Expertise</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-white/70">International Freight Forwarding</li>
              <li className="text-sm text-white/70">Customs Clearance</li>
              <li className="text-sm text-white/70">Warehousing & Distribution</li>
              <li className="text-sm text-white/70">China–SA Corridor Specialists</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © 2026 FreightShift International Logistics (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
