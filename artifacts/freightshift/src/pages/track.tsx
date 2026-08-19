import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, Package, MapPin, Calendar, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { SITE } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  fetchTracking,
  STATUS_META,
  type TrackingOrder,
} from "@/lib/tracking";
import { TrackingTimeline, ModeBadge } from "@/components/sections/TrackingTimeline";

const TONE_RING: Record<string, string> = {
  neutral: "bg-background text-foreground ring-foreground border-2 border-foreground",
  info: "bg-foreground text-background ring-foreground border-2 border-foreground",
  warn: "bg-accent text-background ring-accent border-2 border-accent",
  success: "bg-foreground text-accent ring-foreground border-2 border-foreground",
  danger: "bg-red-600 text-white ring-red-600 border-2 border-red-600",
};

function readCodeFromUrl(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("code") ?? "";
}

function formatEta(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type LoadState =
  | { kind: "idle" }
  | { kind: "loading"; code: string }
  | { kind: "found"; order: TrackingOrder }
  | { kind: "missing"; code: string }
  | { kind: "error"; message: string };

export default function TrackPage() {
  const [, navigate] = useLocation();
  const [input, setInput] = useState("");
  const [state, setState] = useState<LoadState>({ kind: "idle" });

  useEffect(() => {
    const sync = () => {
      const code = readCodeFromUrl();
      if (!code) {
        setState({ kind: "idle" });
        setInput("");
        return;
      }
      setInput(code);
      void lookup(code);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  async function lookup(code: string) {
    const trimmed = code.trim();
    if (!trimmed) return;
    setState({ kind: "loading", code: trimmed });
    try {
      const order = await fetchTracking(trimmed);
      if (!order) {
        setState({ kind: "missing", code: trimmed });
      } else {
        setState({ kind: "found", order });
      }
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    navigate(`/track?code=${encodeURIComponent(trimmed)}`);
    void lookup(trimmed);
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Track your shipment | FreightShift International Logistics"
        description="Track your FreightShift shipment from China to South Africa. Paste your tracking ID to see real-time status, ETA and timeline."
        path="/track"
        noindex
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", url: SITE.url + "/" },
            { name: "Track", url: SITE.url + "/track" },
          ]),
        ]}
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Shipment Tracking"
          title="Track your shipment."
          subtitle="Paste the tracking ID from your FreightShift email to see status, timeline and ETA."
          breadcrumb={[{ label: "Track" }]}
        />

        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            {/* Search */}
            <form
              onSubmit={onSubmit}
              className="bg-background border-2 border-foreground rounded-none p-6 md:p-8 flex flex-col sm:flex-row gap-4"
              role="search"
              aria-label="Track a shipment"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your tracking ID"
                  aria-label="Tracking ID"
                  className="pl-12 h-14 bg-background border-2 border-foreground text-base font-mono font-bold tracking-widest uppercase rounded-none placeholder:text-foreground/30 focus-visible:ring-0 focus-visible:border-accent"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <Button
                type="submit"
                className="bg-accent hover:bg-foreground text-background h-14 px-8 gap-3 font-mono font-bold tracking-wider uppercase rounded-none border-none"
              >
                Track
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="mt-4 text-xs font-mono font-bold tracking-wider uppercase text-foreground/50">
              Your tracking ID is in the email we sent you when your shipment was created.
            </p>

            {/* States */}
            <div className="mt-12">
              {state.kind === "idle" && <IdleHint />}
              {state.kind === "loading" && <LoadingCard code={state.code} />}
              {state.kind === "missing" && <MissingCard code={state.code} />}
              {state.kind === "error" && <ErrorCard message={state.message} />}
              {state.kind === "found" && <OrderCard order={state.order} />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function IdleHint() {
  return (
    <div className="rounded-none border-2 border-dashed border-foreground/30 bg-background p-10 md:p-16 text-center">
      <div className="mx-auto w-16 h-16 border-2 border-foreground bg-foreground text-background flex items-center justify-center mb-6">
        <Package className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2 uppercase tracking-tight">Have a tracking ID?</h2>
      <p className="text-sm font-mono text-foreground/70 max-w-md mx-auto">
        Paste the ID from your FreightShift status email above. No account required.
      </p>
    </div>
  );
}

function LoadingCard({ code }: { code: string }) {
  return (
    <div className="rounded-none border-2 border-foreground bg-background p-10 md:p-16 text-center">
      <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
      <p className="text-sm font-mono font-bold uppercase tracking-wider text-foreground/60">
        Looking up <span className="text-foreground">{code}</span>…
      </p>
    </div>
  );
}

function MissingCard({ code }: { code: string }) {
  return (
    <div className="rounded-none border-2 border-foreground bg-background text-foreground p-8 md:p-10">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-12 h-12 bg-accent text-background flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight">No shipment found</h2>
          <p className="text-sm font-sans text-foreground/80 mt-2">
            We couldn't find a shipment with the ID{" "}
            <span className="font-mono font-bold text-foreground bg-foreground/10 px-2 py-0.5">{code}</span>. Double-check the
            email we sent, or get in touch and we'll look it up for you.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-accent hover:bg-foreground text-background hover:text-background font-mono font-bold uppercase tracking-wider rounded-none">
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp us
              </Button>
            </a>
            <a href={`mailto:${SITE.email}?subject=Tracking%20help%20for%20${encodeURIComponent(code)}`}>
              <Button size="lg" variant="outline" className="border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background font-mono font-bold uppercase tracking-wider rounded-none">
                Email support
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-none border-2 border-red-600 bg-red-600 text-white p-8 md:p-10">
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 border-2 border-white flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Tracking is temporarily unavailable</h2>
          <p className="text-sm font-sans text-white/90 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: TrackingOrder }) {
  const meta = STATUS_META[order.currentStatus];
  const eta = formatEta(order.estimatedDeliveryDate);
  const statusLabel = order.statusLabel ?? meta.label;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-none border-2 border-foreground bg-background shadow-none overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b-2 border-foreground">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/50 mb-2">
              // TRACKING ID
            </p>
            <p className="font-display text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">
              {order.trackingId}
            </p>
            {order.reference && (
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-foreground/50 mt-2">
                Reference: <span className="text-foreground">{order.reference}</span>
              </p>
            )}
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider rounded-none ${TONE_RING[meta.tone]}`}
          >
            <span className="w-2 h-2 bg-current rounded-none" />
            {statusLabel}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t-2 border-foreground/10">
          {(order.origin || order.destination) && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/50">Route</p>
              </div>
              <p className="font-mono font-bold text-foreground text-sm truncate uppercase">
                {order.origin ?? "—"} → {order.destination ?? "—"}
              </p>
            </div>
          )}
          {eta && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent shrink-0" />
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/50">Estimated Delivery</p>
              </div>
              <p className="font-mono font-bold text-foreground text-sm uppercase">{eta}</p>
            </div>
          )}
          {order.mode && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-accent shrink-0" />
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/50">Mode</p>
              </div>
              <div className="mt-0.5">
                <ModeBadge mode={order.mode} />
              </div>
            </div>
          )}
        </div>

        {meta.whatNext && (
          <div className="mt-8 border-2 border-foreground bg-background text-foreground px-6 py-4 text-sm font-sans">
            {meta.whatNext}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="p-6 md:p-8 bg-background">
        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/50 mb-8">
          // TIMELINE
        </h3>
        <TrackingTimeline events={order.events} />
      </div>

      {/* Footer help */}
      <div className="border-t-2 border-foreground px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold uppercase tracking-wider text-foreground/60 bg-background">
        <span className="text-center sm:text-left">Need help with this shipment? We reply fastest on WhatsApp.</span>
        <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline" className="gap-2 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background rounded-none font-mono font-bold uppercase tracking-wider">
            <FaWhatsapp className="w-4 h-4" />
            Chat to us
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
