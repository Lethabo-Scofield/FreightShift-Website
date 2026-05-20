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
  neutral: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  info: "bg-brand-blue/10 text-brand-blue ring-brand-blue/20",
  warn: "bg-amber-50 text-amber-800 ring-amber-200",
  success: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  danger: "bg-red-50 text-red-800 ring-red-200",
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

  // Resolve ?code= on mount and whenever it changes (e.g. via back/forward).
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
    <div className="min-h-screen bg-white">
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

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            {/* Search */}
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-4 md:p-5 flex flex-col sm:flex-row gap-3"
              role="search"
              aria-label="Track a shipment"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your tracking ID"
                  aria-label="Tracking ID"
                  className="pl-10 h-12 text-base font-medium tracking-wide uppercase placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-foreground/40"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <Button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white h-12 px-6 gap-2"
              >
                Track
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="mt-3 text-xs text-foreground/50">
              Your tracking ID is in the email we sent you when your shipment was created.
            </p>

            {/* States */}
            <div className="mt-8">
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
    <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/40 p-8 md:p-12 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
        <Package className="w-5 h-5" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-1.5">Have a tracking ID?</h2>
      <p className="text-sm text-foreground/60 max-w-md mx-auto">
        Paste the ID from your FreightShift status email above. No account required.
      </p>
    </div>
  );
}

function LoadingCard({ code }: { code: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
      <Loader2 className="w-5 h-5 text-brand-blue animate-spin mx-auto mb-3" />
      <p className="text-sm text-foreground/60">
        Looking up <span className="font-mono font-medium text-foreground">{code}</span>…
      </p>
    </div>
  );
}

function MissingCard({ code }: { code: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">No shipment found</h2>
          <p className="text-sm text-foreground/70 mt-1">
            We couldn't find a shipment with the ID{" "}
            <span className="font-mono font-medium">{code}</span>. Double-check the
            email we sent, or get in touch and we'll look it up for you.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5">
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp us
              </Button>
            </a>
            <a href={`mailto:${SITE.email}?subject=Tracking%20help%20for%20${encodeURIComponent(code)}`}>
              <Button variant="ghost" size="sm">Email support</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/60 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Tracking is temporarily unavailable</h2>
          <p className="text-sm text-foreground/70 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: TrackingOrder }) {
  const meta = STATUS_META[order.currentStatus];
  const eta = formatEta(order.estimatedDeliveryDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-zinc-100">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/50 mb-1">
              Tracking ID
            </p>
            <p className="font-mono text-xl md:text-2xl font-semibold text-foreground">
              {order.trackingId}
            </p>
            {order.reference && (
              <p className="text-xs text-foreground/50 mt-1.5">
                Reference: <span className="font-medium text-foreground/70">{order.reference}</span>
              </p>
            )}
          </div>
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold ring-1 ring-inset ${TONE_RING[meta.tone]}`}
          >
            <span className="w-2 h-2 rounded-full bg-current" />
            {meta.label}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {(order.origin || order.destination) && (
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-foreground/50">Route</p>
                <p className="font-medium text-foreground truncate">
                  {order.origin ?? "—"} → {order.destination ?? "—"}
                </p>
              </div>
            </div>
          )}
          {eta && (
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-foreground/50">Estimated delivery</p>
                <p className="font-medium text-foreground">{eta}</p>
              </div>
            </div>
          )}
          {order.mode && (
            <div className="flex items-start gap-2.5">
              <Package className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-foreground/50">Mode</p>
                <div className="mt-0.5">
                  <ModeBadge mode={order.mode} />
                </div>
              </div>
            </div>
          )}
        </div>

        {meta.whatNext && (
          <div className="mt-5 rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm text-foreground/70">
            {meta.whatNext}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="p-6 md:p-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-6">
          Timeline
        </h3>
        <TrackingTimeline events={order.events} />
      </div>

      {/* Footer help */}
      <div className="bg-zinc-50/60 border-t border-zinc-100 px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-foreground/60">
        <span>Need help with this shipment? We reply fastest on WhatsApp.</span>
        <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="outline" className="gap-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5 h-8">
            <FaWhatsapp className="w-3.5 h-3.5" />
            Chat to us
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
