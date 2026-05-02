import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHeader({ eyebrow, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative pt-24 pb-12 md:pt-40 md:pb-24 bg-zinc-50 border-b border-zinc-200/60 overflow-hidden">
      {/* Soft accent glow */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-3xl" />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue bg-white border border-zinc-200 shadow-sm px-3 py-1.5 rounded-full mb-5">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4 md:mb-5 break-words">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
