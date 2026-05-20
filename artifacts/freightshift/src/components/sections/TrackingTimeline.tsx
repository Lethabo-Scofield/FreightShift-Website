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
  neutral: "bg-zinc-300 text-zinc-700",
  info: "bg-brand-blue/15 text-brand-blue",
  warn: "bg-amber-100 text-amber-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-red-100 text-red-700",
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
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center text-sm text-foreground/60">
        No timeline events yet. We'll post updates here as your shipment moves.
      </div>
    );
  }

  return (
    <ol className="relative border-l-2 border-zinc-100 pl-6 md:pl-8 ml-3">
      {events.map((ev, i) => {
        const meta = STATUS_META[ev.status];
        const Icon = ICON_BY_STATUS[ev.status];
        const isLatest = i === 0;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
            className="relative pb-8 last:pb-0"
          >
            <span
              className={`absolute -left-[37px] md:-left-[45px] top-0 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-white ${TONE_DOT[meta.tone]}`}
            >
              <Icon className="w-4 h-4" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
                {formatDate(ev.at)}
              </span>
              {isLatest && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">
                  Latest
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-foreground mt-1">{ev.label}</h3>
            {ev.message && <p className="text-sm text-foreground/70 mt-1">{ev.message}</p>}
            {ev.location && (
              <p className="text-xs font-medium text-foreground/50 mt-1.5">
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
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 bg-zinc-100 px-2.5 py-1 rounded-full">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
