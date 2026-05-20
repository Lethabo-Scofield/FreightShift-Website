import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod/v4";

const router: IRouter = Router();

const quoteRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many quote requests. Please try again later or WhatsApp us." },
});

const quoteBodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  mobile: z.string().min(10).max(32),
  goodsType: z.string().min(2).max(500),
  volumeWeight: z.string().min(2).max(500),
  mode: z.enum(["sea", "air"]),
  origin: z.string().min(2).max(120).optional(),
  destination: z.string().min(2).max(120).optional(),
  cargoType: z.string().min(2).max(200).optional(),
  notes: z.string().max(2000).optional(),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

router.post("/quote", quoteRateLimiter, async (req, res) => {
  const parsed = quoteBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid quote payload", details: parsed.error.issues });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = process.env["QUOTE_TO_EMAIL"];
  const fromEmail = process.env["QUOTE_FROM_EMAIL"] ?? "onboarding@resend.dev";

  if (!apiKey) {
    req.log.error("RESEND_API_KEY is not set");
    res.status(500).json({ error: "Email service is not configured" });
    return;
  }
  if (!toEmail) {
    req.log.error("QUOTE_TO_EMAIL is not set");
    res.status(500).json({ error: "Quote recipient is not configured" });
    return;
  }

  const data = parsed.data;
  const modeLabel = data.mode === "sea" ? "Sea Freight" : "Air Freight";

  const subject = `New Quote Request — ${data.name} (${modeLabel})`;

  const optionalRow = (label: string, value?: string) =>
    value && value.trim().length > 0
      ? `<tr><td style="padding: 8px 0; color: #666;">${label}</td><td style="padding: 8px 0;">${escapeHtml(value)}</td></tr>`
      : "";

  const notesBlock =
    data.notes && data.notes.trim().length > 0
      ? `<div style="margin-top: 16px; padding: 14px 16px; background: #fff; border-left: 3px solid #1F73D8; border-radius: 8px; font-size: 14px; color: #333; white-space: pre-wrap;"><strong style="display:block; color:#666; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Notes</strong>${escapeHtml(data.notes)}</div>`
      : "";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1E1E1E;">
      <div style="background: #0F3D75; color: #fff; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 20px;">New Quote Request</h1>
        <p style="margin: 4px 0 0; opacity: 0.85; font-size: 13px;">FreightShift International Logistics</p>
      </div>
      <div style="background: #F7F7F7; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5; border-top: 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #666; width: 160px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #1F73D8; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Mobile</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(data.mobile)}" style="color: #1F73D8; text-decoration: none;">${escapeHtml(data.mobile)}</a></td></tr>
          <tr><td colspan="2" style="padding: 8px 0;"><hr style="border: none; border-top: 1px solid #e5e5e5; margin: 4px 0;" /></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Mode</td><td style="padding: 8px 0;"><span style="background: #F28C28; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;">${modeLabel}</span></td></tr>
          ${optionalRow("Origin", data.origin)}
          ${optionalRow("Destination", data.destination)}
          ${optionalRow("Cargo type", data.cargoType)}
          <tr><td style="padding: 8px 0; color: #666;">Goods</td><td style="padding: 8px 0;">${escapeHtml(data.goodsType)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Vol. / Weight</td><td style="padding: 8px 0;">${escapeHtml(data.volumeWeight)}</td></tr>
        </table>
        ${notesBlock}
        <p style="margin-top: 24px; font-size: 12px; color: #888;">Submitted ${new Date().toUTCString()}</p>
      </div>
    </div>
  `;

  const textLine = (label: string, value?: string) =>
    value && value.trim().length > 0 ? `${label}: ${value}` : null;

  const text = [
    `New Quote Request — FreightShift`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile: ${data.mobile}`,
    ``,
    `Mode: ${modeLabel}`,
    textLine("Origin", data.origin),
    textLine("Destination", data.destination),
    textLine("Cargo type", data.cargoType),
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
        text,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      req.log.error({ status: response.status, errBody }, "Resend API error");
      res.status(502).json({ error: "Failed to send email" });
      return;
    }

    const body = (await response.json()) as { id?: string };
    req.log.info({ id: body.id }, "Quote email sent");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to call Resend");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
