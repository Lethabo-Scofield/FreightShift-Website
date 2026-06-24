import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background border-8 border-foreground p-4">
      <Seo
        title="Page not found — FreightShift International Logistics"
        description="The page you’re looking for doesn’t exist. Head back to FreightShift’s home page or contact us for freight quotes."
        path="/404"
        noindex
      />
      <div className="w-full max-w-md bg-background border-2 border-foreground p-8 md:p-12 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-foreground flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-background" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground uppercase tracking-tight">404 Page Not Found</h1>
        </div>

        <p className="mt-4 text-base font-mono font-bold tracking-tight text-foreground/70 uppercase">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-accent text-background font-mono font-bold text-sm uppercase tracking-wider px-6 py-4 hover:bg-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
