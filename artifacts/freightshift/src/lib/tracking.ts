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

// =====================================================================
// MOCK DATA — replace with a real API call when Olyxee's public tracking
// endpoint is live. See `fetchTracking()` below for the single swap point.
// =====================================================================

const MOCK_ORDERS: TrackingOrder[] = [
  {
    trackingId: "FSL-7K3-9PQ4",
    reference: "FSL-2026-0418",
    origin: "Shenzhen, CN",
    destination: "Johannesburg, ZA",
    mode: "sea",
    weightKg: 1840,
    volumeCbm: 6.4,
    estimatedDeliveryDate: "2026-05-22",
    currentStatus: "out_for_delivery",
    events: [
      { at: "2026-05-20T07:12:00Z", status: "out_for_delivery", label: "Out for delivery", message: "On the truck for final-mile delivery.", location: "Joburg Hub" },
      { at: "2026-05-19T16:40:00Z", status: "in_transit", label: "Released from customs", message: "SARS clearance complete. Moving to the final-mile hub.", location: "OR Tambo" },
      { at: "2026-05-18T09:05:00Z", status: "customs", label: "At SARS customs", message: "Documents lodged. Awaiting release.", location: "OR Tambo" },
      { at: "2026-05-16T22:10:00Z", status: "in_transit", label: "Arrived in South Africa", location: "OR Tambo, JNB" },
      { at: "2026-05-02T03:00:00Z", status: "in_transit", label: "Vessel departed", message: "MSC Tianjin — ETA Durban 16 May.", location: "Shenzhen, Yantian" },
      { at: "2026-04-29T08:00:00Z", status: "picked_up", label: "Picked up", location: "Shenzhen warehouse" },
      { at: "2026-04-28T14:22:00Z", status: "pending", label: "Order created" },
    ],
  },
  {
    trackingId: "FSL-A2X-0011",
    reference: "FSL-2026-0405",
    origin: "Guangzhou, CN",
    destination: "Cape Town, ZA",
    mode: "air",
    weightKg: 312,
    volumeCbm: 1.1,
    estimatedDeliveryDate: "2026-05-18",
    currentStatus: "delivered",
    events: [
      { at: "2026-05-18T11:48:00Z", status: "delivered", label: "Delivered", message: "Signed for by R. Naidoo.", location: "Cape Town, Woodstock" },
      { at: "2026-05-18T07:30:00Z", status: "out_for_delivery", label: "Out for delivery", location: "Cape Town Hub" },
      { at: "2026-05-17T19:14:00Z", status: "in_transit", label: "Released from customs", location: "CPT International" },
      { at: "2026-05-17T03:00:00Z", status: "customs", label: "At SARS customs", location: "CPT International" },
      { at: "2026-05-16T22:50:00Z", status: "in_transit", label: "Flight landed", location: "CPT International" },
      { at: "2026-05-15T18:10:00Z", status: "picked_up", label: "Picked up", location: "Guangzhou Baiyun" },
      { at: "2026-05-15T09:00:00Z", status: "pending", label: "Order created" },
    ],
  },
  {
    trackingId: "FSL-DEMO-001",
    reference: "FSL-DEMO-001",
    origin: "Ningbo, CN",
    destination: "Durban, ZA",
    mode: "sea",
    weightKg: 5210,
    volumeCbm: 18.0,
    estimatedDeliveryDate: "2026-06-04",
    currentStatus: "in_transit",
    events: [
      { at: "2026-05-19T06:20:00Z", status: "in_transit", label: "Vessel underway", message: "MSC Aurora — currently in the Indian Ocean.", location: "Indian Ocean" },
      { at: "2026-05-04T01:30:00Z", status: "in_transit", label: "Vessel departed", location: "Ningbo, Beilun" },
      { at: "2026-05-01T11:00:00Z", status: "picked_up", label: "Picked up", location: "Ningbo warehouse" },
      { at: "2026-04-30T10:00:00Z", status: "pending", label: "Order created" },
    ],
  },
];

export async function fetchTracking(code: string): Promise<TrackingOrder | null> {
  // -------------------------------------------------------------------
  // TODO(olyxee): when the Olyxee public tracking endpoint is live, swap
  // the mock lookup below for a real fetch. Suggested implementation:
  //
  //   const base = import.meta.env.VITE_OLYXEE_API_BASE
  //     ?? "https://logistics.olyxee.com";
  //   const res = await fetch(
  //     `${base}/api/public/track/${encodeURIComponent(code)}`,
  //     { headers: { Accept: "application/json" } },
  //   );
  //   if (res.status === 404) return null;
  //   if (!res.ok) throw new Error(`Tracking lookup failed (${res.status})`);
  //   return (await res.json()) as TrackingOrder;
  //
  // Until then, we resolve from MOCK_ORDERS so the page can be built,
  // styled and demoed end-to-end.
  // -------------------------------------------------------------------
  await new Promise((r) => setTimeout(r, 450));
  const normalized = code.trim().toUpperCase();
  const found = MOCK_ORDERS.find((o) => o.trackingId.toUpperCase() === normalized);
  return found ?? null;
}

export const DEMO_TRACKING_IDS = MOCK_ORDERS.map((o) => o.trackingId);
