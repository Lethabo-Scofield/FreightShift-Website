# Olyxee → FreightShift Tracking Integration Brief

**To:** Olyxee Admin dev team (`logistics.olyxee.com`)
**From:** FreightShift International Logistics
**Status:** FreightShift website is live with a `/track?code=XXX` page running on **mock data**. We need three things from the Olyxee side to switch it to real data.

---

## TL;DR — what we need from you

1. **Ship the public tracking endpoint** (Option A from your own integration guide):
   `GET https://logistics.olyxee.com/api/public/track/:trackingId`
2. **Add our origin to `ALLOWED_ORIGINS`** so the browser can call you.
3. **Set our Website URL in Olyxee Admin → Settings → Business** so your status emails link back to us.

When all three are done, we flip a single function on our side and tracking goes live. No further changes needed from you.

---

## 1. Public tracking endpoint (required)

### Endpoint

```
GET https://logistics.olyxee.com/api/public/track/:trackingId
```

- **No login required.** This is the only public read endpoint we need.
- **404** if the tracking ID does not exist.
- **200** with the payload below if found.

### Response shape (must match exactly)

```json
{
  "trackingId": "OLY-7K3-9PQ4",
  "reference": "FSL-2026-0418",
  "origin": "Shenzhen, CN",
  "destination": "Johannesburg, ZA",
  "mode": "sea",
  "estimatedDeliveryDate": "2026-05-22",
  "currentStatus": "out_for_delivery",
  "events": [
    {
      "at": "2026-05-20T07:12:00Z",
      "status": "out_for_delivery",
      "label": "Out for delivery",
      "message": "On the truck for final-mile delivery.",
      "location": "Joburg Hub"
    },
    {
      "at": "2026-05-19T16:40:00Z",
      "status": "in_transit",
      "label": "Released from customs",
      "location": "OR Tambo"
    }
  ]
}
```

### Field rules

| Field                   | Type     | Required | Notes                                                                 |
| ----------------------- | -------- | -------- | --------------------------------------------------------------------- |
| `trackingId`            | string   | ✅       | Echo back the canonical ID (uppercase, with dashes).                  |
| `currentStatus`         | enum     | ✅       | One of the status values below.                                       |
| `events[]`              | array    | ✅       | Newest first. Empty array is OK for brand-new orders.                 |
| `events[].at`           | ISO 8601 | ✅       | UTC, e.g. `2026-05-20T07:12:00Z`.                                     |
| `events[].status`       | enum     | ✅       | One of the status values below.                                       |
| `events[].label`        | string   | ✅       | Short human label, e.g. "Out for delivery", "Released from customs".  |
| `events[].message`      | string   | ⛔️      | Optional one-line note shown under the label.                         |
| `events[].location`     | string   | ⛔️      | Optional, e.g. "OR Tambo".                                            |
| `reference`             | string   | ⛔️      | Our internal order ref. Shown next to the tracking ID.                |
| `origin`, `destination` | string   | ⛔️      | "City, CC" format preferred.                                          |
| `mode`                  | enum     | ⛔️      | `sea` \| `air` \| `road`.                                             |
| `estimatedDeliveryDate` | ISO date | ⛔️      | Date only (`YYYY-MM-DD`) or full ISO 8601. We render as a local date. |

### Allowed `status` values

```
pending
picked_up
in_transit
customs
out_for_delivery
delivered
delayed
failed_delivery
returned
cancelled
```

If you add a new status later, please let us know — unrecognised values will render as "Unknown status" until we add it on our side.

### What NOT to return

This endpoint is unauthenticated and reachable by anyone with a tracking ID. Please **do not** include:

- Customer email, phone, address
- Pricing, invoice, or commercial terms
- Internal staff notes
- Other orders for the same customer

Only the safe fields above.

### Operational requirements

- **Rate limit:** 60 req/min/IP is fine. Return `429` with a `Retry-After` header when exceeded.
- **Caching:** `Cache-Control: public, max-age=30` is ideal. 30 seconds is more than enough — customers refresh, not poll.
- **CORS:** see section 2.
- **Errors:** standard JSON `{ "error": "message" }` body on 4xx/5xx.

---

## 2. CORS (required)

Add the FreightShift origins to your `ALLOWED_ORIGINS` env var on the API:

```
ALLOWED_ORIGINS=https://freightshiftlogistics.co.za,https://www.freightshiftlogistics.co.za
```

If you already have other origins listed, just append ours — comma-separated, no spaces.

Until this is done, browsers will block the request and our `/track` page will show "Tracking is temporarily unavailable".

> While we're testing on Replit, please also temporarily allow our preview domain. We'll send you the exact URL when we're ready to test end-to-end and you can drop it once we go live.

---

## 3. Website URL setting (required for emails)

In Olyxee Admin → **Settings → Business → Website URL**, set:

```
https://freightshiftlogistics.co.za
```

This is what your system uses to build the tracking button inside every status email. Per your own integration guide, the link template is:

```
{websiteUrl}/track?code={trackingId}
```

So a customer with tracking ID `OLY-7K3-9PQ4` will receive an email with a button pointing to:

```
https://freightshiftlogistics.co.za/track?code=OLY-7K3-9PQ4
```

Our `/track` page is already built and reads `?code=` correctly — once the website URL is set, the emails will link straight to a working page.

---

## 4. How to test end-to-end (suggested flow)

1. Deploy the public endpoint on `logistics.olyxee.com`.
2. Add our origin to `ALLOWED_ORIGINS`.
3. Set the Website URL in admin settings.
4. Create a test order in Olyxee for a FreightShift test customer.
5. Push it through a couple of statuses (e.g. Pending → Picked up → In transit).
6. Open the email, click the button — you should land on
   `https://freightshiftlogistics.co.za/track?code=OLY-XXX-XXXX` and see the
   live status and timeline.
7. Hit the endpoint directly to sanity-check the payload:
   ```bash
   curl -i https://logistics.olyxee.com/api/public/track/OLY-XXX-XXXX
   ```

---

## 5. What we do on our side once you're done

A single function in our codebase (`src/lib/tracking.ts → fetchTracking`) currently returns mock data. The swap is one block of code, already drafted and commented in the file:

```ts
const base = import.meta.env.VITE_OLYXEE_API_BASE
  ?? "https://logistics.olyxee.com";
const res = await fetch(
  `${base}/api/public/track/${encodeURIComponent(code)}`,
  { headers: { Accept: "application/json" } },
);
if (res.status === 404) return null;
if (!res.ok) throw new Error(`Tracking lookup failed (${res.status})`);
return (await res.json()) as TrackingOrder;
```

We'll uncomment that, remove the mock data, and ship.

---

## 6. Open questions for you

Please confirm by reply:

- [ ] **Endpoint URL** — will it be exactly `https://logistics.olyxee.com/api/public/track/:trackingId`, or a different path? If different, give us the final URL.
- [ ] **Field names** — can you match the JSON shape in section 1 exactly? If a field has to be named differently (e.g. `status` instead of `currentStatus`), tell us now so we adapt the mapper in one place.
- [ ] **Timezone** — confirm `events[].at` will be UTC ISO 8601.
- [ ] **ETA timing** — when there's no ETA, please omit `estimatedDeliveryDate` rather than sending `null` or an empty string (or document which you'll use).
- [ ] **Rate limit / caching** — let us know the actual limits so we can show a sensible error if a customer ever trips them.
- [ ] **Status taxonomy** — confirm the 10 statuses in section 1 cover everything Olyxee can emit today.

---

## 7. Contact

Anything unclear, or want to change the contract above before you build — reach out and we'll update this brief. The faster we lock the shape, the faster customers get real tracking.

**FreightShift technical contact:** info@freightshiftlogistics.co.za
**WhatsApp:** +27 68 109 5543
