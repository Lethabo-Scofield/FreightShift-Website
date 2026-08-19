import { motion } from "framer-motion";
import { Anchor, Plane, Truck, CheckCircle2, AlertTriangle, Clock, PackageCheck, FileSearch, XCircle, RotateCcw, MapPin, type LucideIcon } from "lucide-react";
import { STATUS_META, type TrackingEvent, type TrackingStatus } from "@/lib/tracking";

const ICON_BY_STATUS: Record<TrackingStatus, LucideIcon> = {
  pending: Clock,
  picked_up: PackageCheck,
  in_transit: Truck,
  customs: FileSearch,
  out_for_delivery: Truck,
  delivered: CheckCircle2,
  delayed: AlertTriangle,
  failed_delivery: AlertTriangle,
  returned: RotateCcw,
  cancelled: XCircle,
};

const MODE_ICON: Record<string, LucideIcon> = {
  sea: Anchor,
  air: Plane,
  road: Truck,
};

const TONE_DOT: Record<string, string> = {
  neutral: "bg-secondary text-foreground border-foreground",
  info: "bg-brand-blue text-background border-brand-blue",
  warn: "bg-brand-orange text-background border-brand-orange",
  success: "bg-emerald-700 text-background border-emerald-700",
  danger: "bg-destructive text-destructive-foreground border-destructive",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="border-2 border-dashed border-foreground/20 bg-background p-8 text-center text-sm font-mono font-bold uppercase tracking-wider text-foreground/60">
        No timeline events yet. We'll post updates here as your shipment moves.
      </div>
    );
  }

  return (
    <ol className="relative ml-4 border-l-2 border-foreground/20 pl-7 md:ml-5 md:pl-10">
      {events.map((ev, i) => {
        const meta = STATUS_META[ev.status];
        const Icon = ICON_BY_STATUS[ev.status];
        const isLatest = i === 0;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
            className="relative pb-9 last:pb-0"
          >
            <span
              className={`absolute -left-[44px] md:-left-[53px] top-0 flex h-9 w-9 items-center justify-center border-2 shadow-[3px_3px_0_hsl(var(--foreground)/0.12)] ${TONE_DOT[meta.tone]}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="border-l-2 border-foreground/10 pl-4 pb-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/55">
                {formatDate(ev.at)}
                </span>
                {isLatest && (
                  <span className="bg-foreground px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-background">
                    Latest update
                  </span>
                )}
              </div>
              <h3 className="mt-1 text-xl font-display font-bold uppercase leading-none tracking-wide text-foreground">{ev.label}</h3>
              {ev.message && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/75">{ev.message}</p>}
              {ev.location && (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/55">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {ev.location}
                </p>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

export function ModeBadge({ mode }: { mode?: "sea" | "air" | "road" }) {
  if (!mode) return null;
  const Icon = MODE_ICON[mode] ?? Truck;
  const label = mode === "sea" ? "Sea freight" : mode === "air" ? "Air freight" : "Road";
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-background bg-foreground px-3 py-1.5 rounded-none">
      <Icon className="w-4 h-4 text-accent" />
      {label}
    </span>
  );
}
