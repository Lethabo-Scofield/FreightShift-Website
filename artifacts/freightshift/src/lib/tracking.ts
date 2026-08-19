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
  statusLabel?: string;
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

type OlyxeeTrackingResponse = {
  trackingId?: unknown;
  reference?: unknown;
  orderReference?: unknown;
  origin?: unknown;
  destination?: unknown;
  mode?: unknown;
  transportMode?: unknown;
  statusLabel?: unknown;
  estimatedDeliveryDate?: unknown;
  currentStatus?: unknown;
  status?: unknown;
  events?: unknown;
};

const STATUS_BY_API_VALUE: Record<string, TrackingStatus> = {
  PENDING: "pending",
  ORDER_CONFIRMED: "pending",
  PICKED_UP: "picked_up",
  COLLECTED_FROM_SUPPLIER: "picked_up",
  IN_TRANSIT: "in_transit",
  ARRIVED_AT_DESTINATION: "customs",
  CUSTOMS: "customs",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  DELIVERED_COLLECTED: "delivered",
  DELAYED: "delayed",
  FAILED_DELIVERY: "failed_delivery",
  RETURNED: "returned",
  CANCELLED: "cancelled",
};

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function normalizeStatus(value: unknown): TrackingStatus {
  const key = asOptionalString(value)?.trim().toUpperCase().replace(/[\s-]+/g, "_");
  return (key && STATUS_BY_API_VALUE[key]) || "pending";
}

function normalizeMode(value: unknown): TrackingOrder["mode"] {
  const mode = asOptionalString(value)?.trim().toLowerCase();
  return mode === "sea" || mode === "air" || mode === "road" ? mode : undefined;
}

function normalizeEvents(value: unknown): TrackingEvent[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((event) => {
    if (!event || typeof event !== "object") return [];
    const item = event as Record<string, unknown>;
    const at = asOptionalString(item.at) ?? asOptionalString(item.timestamp);
    const label = asOptionalString(item.label) ?? asOptionalString(item.statusLabel);
    if (!at || !label) return [];

    return [{
      at,
      status: normalizeStatus(item.status),
      label,
      message: asOptionalString(item.message) ?? asOptionalString(item.notes),
      location: asOptionalString(item.location),
    }];
  });
}

function normalizeTrackingResponse(data: unknown): TrackingOrder {
  if (!data || typeof data !== "object") {
    throw new Error("Tracking service returned an invalid response.");
  }

  const response = data as OlyxeeTrackingResponse;
  const trackingId = asOptionalString(response.trackingId);
  if (!trackingId) {
    throw new Error("Tracking service returned an invalid shipment.");
  }

  return {
    trackingId,
    reference: asOptionalString(response.reference) ?? asOptionalString(response.orderReference),
    origin: asOptionalString(response.origin),
    destination: asOptionalString(response.destination),
    mode: normalizeMode(response.transportMode) ?? normalizeMode(response.mode),
    statusLabel: asOptionalString(response.statusLabel),
    estimatedDeliveryDate: asOptionalString(response.estimatedDeliveryDate),
    currentStatus: normalizeStatus(response.currentStatus ?? response.status),
    events: normalizeEvents(response.events),
  };
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
  return normalizeTrackingResponse(await res.json());
}
