import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  backgroundImage?: string;
}

export function PageHeader({ eyebrow, title, subtitle, breadcrumb, backgroundImage }: PageHeaderProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <section
      className={`relative pt-20 pb-10 md:pt-40 md:pb-24 overflow-hidden border-b border-border ${
 hasImage
 ? "bg-foreground text-primary-foreground"
 : "bg-muted/30"
 }`}
    >
      {hasImage ? (
        <>
          {/* Background photo */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-40"
          />
        </>
      ) : (
        <>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.05] text-brand-blue pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid-header" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-header)" />
            </svg>
          </div>
          {/* Faint corridor lines add an operational, route-planning feel without competing with the copy. */}
          <svg
            className="absolute inset-0 z-0 h-full w-full text-brand-blue opacity-[0.1] pointer-events-none"
            viewBox="0 0 1200 480"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M-40 380 C170 315 205 92 470 160 S785 395 1240 86"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M-40 120 C185 170 300 35 535 106 S865 295 1240 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="470" cy="160" r="5" fill="currentColor" />
            <circle cx="785" cy="318" r="5" fill="currentColor" />
          </svg>
          <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-border/20 pointer-events-none md:h-40 md:w-40" />
          <div className="absolute bottom-0 left-0 h-16 w-16 border-r border-t border-border/20 pointer-events-none md:h-24 md:w-24" />
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className={`flex items-center gap-2 text-xs font-medium tracking-wide mb-6 md:mb-8 ${
 hasImage ? "text-background/70" : "text-foreground/50"
 }`}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className={`transition-colors ${
 hasImage ? "hover:text-background" : "hover:text-foreground"
 }`}
            >
              Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={`transition-colors ${
 hasImage ? "hover:text-background" : "hover:text-foreground"
 }`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={`${
 hasImage ? "text-background" : "text-foreground"
 }`}
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          {eyebrow && (
            <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1 text-sm font-medium tracking-wide ${
              hasImage ? "bg-background text-foreground" : "bg-foreground text-background"
 }`}>
               <span className="w-1.5 h-1.5 bg-primary inline-block rounded-xl" />
               {eyebrow}
            </div>
          )}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif font-semibold tracking-tight leading-[0.95] mb-6 break-words ${
 hasImage ? "text-background" : "text-foreground"
 }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`text-lg md:text-xl font-medium tracking-tight max-w-2xl ${
 hasImage ? "text-background/80" : "text-foreground/80"
 }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
