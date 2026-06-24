import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import logoUrl from "@/assets/freightshift-logo.png";
import { goToQuote } from "@/lib/scroll-to-quote";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Track", href: "/track" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location === href || (href !== "/" && location.startsWith(href));

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-white py-3"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center group"
          aria-label="FreightShift International Logistics, Home"
        >
          <img
            src={logoUrl}
            alt="FreightShift International Logistics"
            className="h-12 md:h-14 w-auto object-contain transition-opacity group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    active ? "text-brand-blue" : "text-foreground hover:text-brand-blue"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/message/EVTMLWYQY2OCG1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5">
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
            <Button
              size="sm"
              onClick={() => goToQuote(navigate)}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none"
            >
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col pt-16">
              <VisuallyHidden>
                <SheetTitle>Navigation menu</SheetTitle>
                <SheetDescription>
                  Site navigation links and quick actions for FreightShift International Logistics.
                </SheetDescription>
              </VisuallyHidden>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-semibold py-2 px-3 rounded-lg transition-colors ${
                        active
                          ? "text-brand-blue bg-brand-blue/5"
                          : "text-foreground hover:text-brand-blue hover:bg-brand-blue/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto flex flex-col gap-3 pb-8">
                <a
                  href="https://wa.me/message/EVTMLWYQY2OCG1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full gap-2 border-brand-blue text-brand-blue">
                    <FaWhatsapp className="w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </a>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    goToQuote(navigate);
                  }}
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                >
                  Get a Quote
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
