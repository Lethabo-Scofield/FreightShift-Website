# Olyxee → FreightShift Tracking Integration Brief

**To:** Olyxee Admin dev team (`logistics.olyxee.com`)
**From:** FreightShift International Logistics

The FreightShift `/track?code=…` page is **built, deployed, and wired to call your API**. It's currently calling `https://logistics.olyxee.com/api/public/track/:trackingId` — that endpoint doesn't exist yet, so the page shows a "no shipment found" or "temporarily unavailable" state.

Once the three items below are done on your side, tracking goes live. **Zero further changes needed from us.**

---

## What you need to do

### 1. Ship the public tracking endpoint

```
GET https://logistics.olyxee.com/api/public/track/:trackingId
```

- No authentication.
- `404` if the tracking ID isn't found.
- `200` with the JSON payload below if found.
- Rate limit ~60 req/min/IP, `Cache-Control: public, max-age=30`.

**Response shape (must match exactly — this is what our page already expects):**

```json
{
  "trackingId": "FSL-7K3-9PQ4",
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

**Field rules**

| Field                   | Type     | Required | Notes                                                                 |
| ----------------------- | -------- | -------- | --------------------------------------------------------------------- |
| `trackingId`            | string   | ✅       | Echo back the canonical ID (uppercase, with dashes).                  |
| `currentStatus`         | enum     | ✅       | One of the status values below.                                       |
| `events[]`              | array    | ✅       | Newest first. Empty array is OK for brand-new orders.                 |
| `events[].at`           | ISO 8601 | ✅       | UTC, e.g. `2026-05-20T07:12:00Z`.                                     |
| `events[].status`       | enum     | ✅       | One of the status values below.                                       |
| `events[].label`        | string   | ✅       | Short human label (e.g. "Out for delivery").                          |
| `events[].message`      | string   | ⛔       | Optional one-line note shown under the label.                         |
| `events[].location`     | string   | ⛔       | Optional, e.g. "OR Tambo".                                            |
| `reference`             | string   | ⛔       | Our internal order ref. Shown next to the tracking ID.                |
| `origin`, `destination` | string   | ⛔       | "City, CC" format preferred.                                          |
| `mode`                  | enum     | ⛔       | `sea` \| `air` \| `road`.                                             |
| `estimatedDeliveryDate` | ISO date | ⛔       | Date only (`YYYY-MM-DD`) or full ISO 8601. Omit if unknown.           |

**Allowed `currentStatus` / `events[].status` values:**

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

**Do NOT include** in the response (it's a public endpoint):
- Customer email, phone, or address
- Pricing, invoice, or commercial terms
- Internal staff notes
- Other orders for the same customer

---

### 2. Whitelist our origin (CORS)

Add these to your `ALLOWED_ORIGINS` env var on the API:

```
ALLOWED_ORIGINS=https://freightshiftlogistics.co.za,https://www.freightshiftlogistics.co.za
```

If you already have other origins, just append ours — comma-separated, no spaces. Without this, browsers block the request and our page shows "Tracking is temporarily unavailable".

---

### 3. Set our Website URL in Olyxee Admin

In **Settings → Business → Website URL**, set:

```
https://freightshiftlogistics.co.za
```

Your system uses this to build the tracking button in every customer email. The template (per your own integration guide) is `{websiteUrl}/track?code={trackingId}`, so emails will land customers on a working page automatically.

---

## How to test it's working

1. Deploy the endpoint.
2. Add the CORS origin.
3. Set the Website URL.
4. Create a test order in Olyxee and push it through a couple of statuses.
5. Click the button in the email → should land on `https://freightshiftlogistics.co.za/track?code=FSL-XXX-XXXX` and show the live status + timeline.
6. Sanity-check the payload directly:
   ```bash
   curl -i https://logistics.olyxee.com/api/public/track/FSL-XXX-XXXX
   ```

---

## A few things to confirm

Quick reply on these would unblock us:

- [ ] Confirm the endpoint URL will be exactly `https://logistics.olyxee.com/api/public/track/:trackingId`. If different, send the final URL — we use it via `VITE_OLYXEE_API_BASE` on our side.
- [ ] Confirm the JSON shape above matches what you'll return. If a field has to be renamed (e.g. `status` vs `currentStatus`), tell us now.
- [ ] Confirm `events[].at` is UTC ISO 8601.
- [ ] Confirm the 10 status values cover everything Olyxee can emit today.

---

## Contact

**FreightShift technical contact:** info@freightshiftlogistics.co.za
**WhatsApp:** +27 68 109 5543
