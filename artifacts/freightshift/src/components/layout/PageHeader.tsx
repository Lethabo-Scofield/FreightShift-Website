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
      className={`relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden border-b-2 border-foreground ${
        hasImage
          ? "bg-foreground text-background"
          : "bg-background"
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
          <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid-header" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-header)" />
            </svg>
          </div>
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-8 ${
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
            <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1 font-mono text-xs uppercase tracking-widest font-bold ${
              hasImage ? "bg-background text-foreground" : "bg-foreground text-background"
            }`}>
               <span className="w-1.5 h-1.5 bg-accent inline-block rounded-none" />
               {eyebrow}
            </div>
          )}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display font-bold tracking-tight leading-[0.95] mb-6 uppercase break-words ${
              hasImage ? "text-background" : "text-foreground"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`text-lg md:text-xl font-mono tracking-tight max-w-2xl ${
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
