import { Router, type IRouter } from "express";

const router: IRouter = Router();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface QuoteBody {
  name?: string;
  email?: string;
  mobile?: string;
  goodsType?: string;
  volumeWeight?: string;
  mode?: "sea" | "air";
  origin?: string;
  destination?: string;
  cargoType?: string;
  notes?: string;
}

function validateBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Invalid request body";
  const b = body as QuoteBody;
  if (!b.name || b.name.length < 2 || b.name.length > 120) return "Invalid name";
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return "Invalid email";
  if (!b.mobile || b.mobile.length < 10) return "Invalid mobile";
  if (!b.goodsType || b.goodsType.length < 2) return "Invalid goodsType";
  if (!b.volumeWeight || b.volumeWeight.length < 2) return "Invalid volumeWeight";
  if (b.mode !== "sea" && b.mode !== "air") return "Invalid mode";
  return null;
}

router.post("/quote", async (req, res) => {
  const data = req.body as QuoteBody;
  const validationError = validateBody(data);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = process.env["QUOTE_TO_EMAIL"];
  const fromEmail = process.env["QUOTE_FROM_EMAIL"];

  if (!apiKey) {
    res.status(500).json({ error: "RESEND_API_KEY is not configured" });
    return;
  }
  if (!toEmail) {
    res.status(500).json({ error: "QUOTE_TO_EMAIL is not configured" });
    return;
  }
  if (!fromEmail) {
    res.status(500).json({ error: "QUOTE_FROM_EMAIL is not configured" });
    return;
  }

  const modeLabel = data.mode === "sea" ? "Sea Freight" : "Air Freight";
  const subject = `New Quote Request — ${data.name} (${modeLabel})`;

  const labelStyle =
    "padding:10px 12px 10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #ececec;vertical-align:top;width:150px;";
  const valueStyle =
    "padding:10px 0;color:#0a0f18;font-size:14px;font-weight:600;border-bottom:1px solid #ececec;";

  const optionalRow = (label: string, value?: string) =>
    value && value.trim().length > 0
      ? `<tr><td style="${labelStyle}">${label}</td><td style="${valueStyle}">${escapeHtml(value)}</td></tr>`
      : "";

  const notesBlock =
    data.notes && data.notes.trim().length > 0
      ? `<div style="margin-top:20px;padding:16px;background:#f5f4ef;border-left:4px solid #ff4a00;font-size:14px;color:#0a0f18;white-space:pre-wrap;"><strong style="display:block;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Notes</strong>${escapeHtml(data.notes)}</div>`
      : "";

  const logoUrl = "https://freightshiftlogistics.co.za/fsl-logo.png";

  const html = `
    <div style="background:#f5f4ef;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:2px solid #0a0f18;">
        <div style="padding:24px;text-align:center;border-bottom:2px solid #0a0f18;">
          <img src="${logoUrl}" alt="FreightShift International Logistics" width="200" style="display:inline-block;width:200px;max-width:62%;height:auto;" />
        </div>
        <div style="background:#0a0f18;color:#ffffff;padding:22px 24px;">
          <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ff4a00;font-weight:bold;">New Quote Request</div>
          <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;">${escapeHtml(data.name!)}</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#c7ccd4;">${modeLabel} &middot; ${new Date().toUTCString()}</p>
        </div>
        <div style="padding:8px 24px 24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="${labelStyle}">Email</td><td style="padding:10px 0;border-bottom:1px solid #ececec;"><a href="mailto:${escapeHtml(data.email!)}" style="color:#0a0f18;font-weight:600;text-decoration:none;">${escapeHtml(data.email!)}</a></td></tr>
            <tr><td style="${labelStyle}">Mobile</td><td style="padding:10px 0;border-bottom:1px solid #ececec;"><a href="tel:${escapeHtml(data.mobile!)}" style="color:#0a0f18;font-weight:600;text-decoration:none;">${escapeHtml(data.mobile!)}</a></td></tr>
            <tr><td style="${labelStyle}">Mode</td><td style="padding:10px 0;border-bottom:1px solid #ececec;"><span style="background:#ff4a00;color:#ffffff;padding:4px 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${modeLabel}</span></td></tr>
            ${optionalRow("Origin", data.origin)}
            ${optionalRow("Destination", data.destination)}
            ${optionalRow("Cargo type", data.cargoType)}
            <tr><td style="${labelStyle}">Goods</td><td style="${valueStyle}">${escapeHtml(data.goodsType!)}</td></tr>
            <tr><td style="padding:10px 12px 10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;width:150px;">Vol. / Weight</td><td style="padding:10px 0;color:#0a0f18;font-size:14px;font-weight:600;">${escapeHtml(data.volumeWeight!)}</td></tr>
          </table>
          ${notesBlock}
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #ececec;">
            <a href="mailto:${escapeHtml(data.email!)}" style="display:inline-block;background:#0a0f18;color:#ffffff;padding:12px 24px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;text-decoration:none;">Reply to ${escapeHtml(data.name!)}</a>
          </div>
        </div>
        <div style="background:#0a0f18;color:#8b93a1;padding:14px 24px;font-family:'Courier New',Courier,monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;">
          FreightShift International Logistics &middot; China &rarr; South Africa
        </div>
      </div>
    </div>
  `;

  const textParts = [
    `New Quote Request — FreightShift`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile: ${data.mobile}`,
    ``,
    `Mode: ${modeLabel}`,
    data.origin ? `Origin: ${data.origin}` : null,
    data.destination ? `Destination: ${data.destination}` : null,
    data.cargoType ? `Cargo type: ${data.cargoType}` : null,
    `Goods: ${data.goodsType}`,
    `Vol/Weight: ${data.volumeWeight}`,
    data.notes ? `\nNotes:\n${data.notes}` : null,
    ``,
    `Submitted ${new Date().toUTCString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `FreightShift Quotes <${fromEmail}>`,
        to: [toEmail],
        reply_to: data.email,
        subject,
        html,
        text: textParts,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      req.log.error({ status: response.status, errBody }, "Resend error");
      res.status(502).json({ error: "Failed to send email", detail: errBody });
      return;
    }

    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Resend fetch failed");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
