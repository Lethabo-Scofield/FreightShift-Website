import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/message/EVTMLWYQY2OCG1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_rgba(10,15,24,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8 relative z-10" />
      <span className="absolute -top-3 -right-3 w-4 h-4 bg-accent border-2 border-foreground rounded-none flex items-center justify-center animate-pulse">
        <span className="w-1 h-1 bg-background" />
      </span>
    </a>
  );
}
