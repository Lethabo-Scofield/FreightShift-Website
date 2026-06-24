import { motion } from "framer-motion";
import { Anchor, Plane, Truck, CheckCircle2, AlertTriangle, Clock, PackageCheck, FileSearch, XCircle, RotateCcw, type LucideIcon } from "lucide-react";
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
  neutral: "bg-background text-foreground border-foreground",
  info: "bg-foreground text-background border-foreground",
  warn: "bg-accent text-background border-accent",
  success: "bg-foreground text-accent border-foreground",
  danger: "bg-red-600 text-white border-red-600",
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
    <ol className="relative border-l-2 border-foreground pl-6 md:pl-8 ml-3">
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
            className="relative pb-10 last:pb-0"
          >
            <span
              className={`absolute -left-[35px] md:-left-[43px] top-0 flex h-10 w-10 items-center justify-center border-2 rounded-none ${TONE_DOT[meta.tone]}`}
            >
              <Icon className="w-5 h-5" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/60">
                {formatDate(ev.at)}
              </span>
              {isLatest && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-background bg-foreground px-2 py-0.5 rounded-none">
                  Latest
                </span>
              )}
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mt-2 uppercase tracking-tight">{ev.label}</h3>
            {ev.message && <p className="text-sm font-sans text-foreground/80 mt-1">{ev.message}</p>}
            {ev.location && (
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-foreground/50 mt-2">
                {ev.location}
              </p>
            )}
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
