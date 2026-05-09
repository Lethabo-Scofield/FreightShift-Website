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
      className={`relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden border-b ${
        hasImage
          ? "bg-foreground text-white border-black/20"
          : "bg-zinc-50 border-zinc-200/60"
      }`}
    >
      {hasImage ? (
        <>
          {/* Background photo */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </>
      ) : (
        <>
          {/* Soft accent glow */}
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-3xl" />
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.06) 1px, transparent 0)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 100%)",
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className={`flex items-center gap-2 text-sm mb-6 ${
              hasImage ? "text-white/70" : "text-foreground/50"
            }`}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className={`transition-colors ${
                hasImage ? "hover:text-white" : "hover:text-foreground"
              }`}
            >
              Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={`transition-colors ${
                      hasImage ? "hover:text-white" : "hover:text-foreground"
                    }`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={`font-medium ${
                      hasImage ? "text-white" : "text-foreground"
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
          className="max-w-3xl"
        >
          {eyebrow && (
            <span
              className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border shadow-sm ${
                hasImage
                  ? "text-white bg-white/10 border-white/20 backdrop-blur-sm"
                  : "text-brand-blue bg-white border-zinc-200"
              }`}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4 md:mb-5 break-words ${
              hasImage ? "text-white" : "text-foreground"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl ${
                hasImage ? "text-white/80" : "text-foreground/60"
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
