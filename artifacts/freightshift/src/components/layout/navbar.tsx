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
          ? "bg-background border-b-2 border-foreground py-2"
          : "bg-background py-4"
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
            className="h-10 md:h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
                    active ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/message/EVTMLWYQY2OCG1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-mono font-bold uppercase tracking-wider text-xs h-10 px-4 gap-2 rounded-none">
                <FaWhatsapp className="w-4 h-4 text-green-600" />
                WhatsApp Us
              </Button>
            </a>
            <Button
              size="sm"
              onClick={() => goToQuote(navigate)}
              className="bg-yellow-400 hover:bg-yellow-300 text-foreground font-mono font-bold uppercase tracking-wider text-xs h-10 px-6 border-none rounded-none"
            >
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground rounded-none hover:bg-foreground/5">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col pt-16 bg-background border-l-2 border-foreground rounded-none">
              <VisuallyHidden>
                <SheetTitle>Navigation menu</SheetTitle>
                <SheetDescription>
                  Site navigation links and quick actions for FreightShift International Logistics.
                </SheetDescription>
              </VisuallyHidden>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-mono text-sm uppercase tracking-widest font-bold py-2 border-b-2 border-foreground/10 transition-colors ${
                        active
                          ? "text-accent border-accent/30"
                          : "text-foreground hover:text-accent"
                      }`}
                    >
                      {active && <span className="inline-block w-2 h-2 bg-accent mr-2" />}
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto flex flex-col gap-4 pb-8">
                <a
                  href="https://wa.me/message/EVTMLWYQY2OCG1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-mono font-bold uppercase tracking-wider text-xs h-12 gap-2 rounded-none">
                    <FaWhatsapp className="w-4 h-4 text-green-600" />
                    WhatsApp Us
                  </Button>
                </a>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    goToQuote(navigate);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-foreground font-mono font-bold uppercase tracking-wider text-xs h-12 border-none rounded-none"
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
