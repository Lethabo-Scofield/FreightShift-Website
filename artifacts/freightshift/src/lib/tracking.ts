export type TrackingStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "customs"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "failed_delivery"
  | "returned"
  | "cancelled";

export type TrackingEvent = {
  at: string;
  status: TrackingStatus;
  label: string;
  message?: string;
  location?: string;
};

export type TrackingOrder = {
  trackingId: string;
  reference?: string;
  origin?: string;
  destination?: string;
  mode?: "sea" | "air" | "road";
  weightKg?: number;
  volumeCbm?: number;
  estimatedDeliveryDate?: string;
  currentStatus: TrackingStatus;
  events: TrackingEvent[];
};

export const STATUS_META: Record<
  TrackingStatus,
  { label: string; tone: "neutral" | "info" | "warn" | "success" | "danger"; whatNext?: string }
> = {
  pending: { label: "Pending pickup", tone: "neutral", whatNext: "We'll collect your cargo from the origin and update this page once it's on the move." },
  picked_up: { label: "Picked up", tone: "info" },
  in_transit: { label: "In transit", tone: "info" },
  customs: { label: "At customs", tone: "warn", whatNext: "SARS clearance is in progress. We'll push the next update as soon as it's released." },
  out_for_delivery: { label: "Out for delivery", tone: "info" },
  delivered: { label: "Delivered", tone: "success", whatNext: "This shipment has been delivered. Thank you for shipping with FreightShift." },
  delayed: { label: "Delayed", tone: "warn", whatNext: "Your shipment has hit a delay. We're on it — a fresh update will appear here as soon as we have one." },
  failed_delivery: { label: "Failed delivery attempt", tone: "danger", whatNext: "Our team will re-attempt delivery. Please reach out on WhatsApp if you need to coordinate a new time." },
  returned: { label: "Returned to sender", tone: "danger", whatNext: "This shipment has been returned. Get in touch and we'll walk you through the next steps." },
  cancelled: { label: "Cancelled", tone: "neutral", whatNext: "This order has been cancelled. Please contact us if this was unexpected." },
};

const DEFAULT_API_BASE = "/api/olyxee";

function getApiBase(): string {
  const fromEnv = import.meta.env.VITE_OLYXEE_API_BASE as string | undefined;
  return (fromEnv ?? DEFAULT_API_BASE).replace(/\/$/, "");
}

export async function fetchTracking(code: string): Promise<TrackingOrder | null> {
  const trimmed = code.trim();
  if (!trimmed) return null;
  const url = `${getApiBase()}/api/public/track/${encodeURIComponent(trimmed)}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Tracking lookup failed (${res.status})`);
  }
  return (await res.json()) as TrackingOrder;
}
