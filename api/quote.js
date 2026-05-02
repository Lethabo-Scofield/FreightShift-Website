function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateBody(body) {
  if (!body || typeof body !== "object") return "Invalid request body";
  if (!body.name || body.name.length < 2 || body.name.length > 120) return "Invalid name";
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return "Invalid email";
  if (!body.mobile || body.mobile.length < 10) return "Invalid mobile";
  if (!body.goodsType || body.goodsType.length < 2) return "Invalid goodsType";
  if (!body.volumeWeight || body.volumeWeight.length < 2) return "Invalid volumeWeight";
  if (body.mode !== "sea" && body.mode !== "air") return "Invalid mode";
  return null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const data = req.body;
  const validationError = validateBody(data);
  if (validationError) return res.status(400).json({ error: validationError });

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) return res.status(500).json({ error: "Email service is not configured" });
  if (!toEmail) return res.status(500).json({ error: "Quote recipient is not configured" });

  const modeLabel = data.mode === "sea" ? "Sea Freight" : "Air Freight";
  const subject = `New Quote Request — ${data.name} (${modeLabel})`;

  const optionalRow = (label, value) =>
    value && value.trim().length > 0
      ? `<tr><td style="padding:8px 0;color:#666;">${label}</td><td style="padding:8px 0;">${escapeHtml(value)}</td></tr>`
      : "";

  const notesBlock =
    data.notes && data.notes.trim().length > 0
      ? `<div style="margin-top:16px;padding:14px 16px;background:#fff;border-left:3px solid #1F73D8;font-size:14px;color:#333;white-space:pre-wrap;"><strong style="display:block;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Notes</strong>${escapeHtml(data.notes)}</div>`
      : "";

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1E1E1E;">
      <div style="background:#0F3D75;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:20px;">New Quote Request</h1>
        <p style="margin:4px 0 0;opacity:0.85;font-size:13px;">FreightShift International Logistics</p>
      </div>
      <div style="background:#F7F7F7;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:0;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#666;width:160px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#1F73D8;text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Mobile</td><td style="padding:8px 0;"><a href="tel:${escapeHtml(data.mobile)}" style="color:#1F73D8;text-decoration:none;">${escapeHtml(data.mobile)}</a></td></tr>
          <tr><td colspan="2" style="padding:8px 0;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:4px 0;" /></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Mode</td><td style="padding:8px 0;"><span style="background:#F28C28;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;">${modeLabel}</span></td></tr>
          ${optionalRow("Origin", data.origin)}
          ${optionalRow("Destination", data.destination)}
          ${optionalRow("Cargo type", data.cargoType)}
          <tr><td style="padding:8px 0;color:#666;">Goods</td><td style="padding:8px 0;">${escapeHtml(data.goodsType)}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Vol. / Weight</td><td style="padding:8px 0;">${escapeHtml(data.volumeWeight)}</td></tr>
        </table>
        ${notesBlock}
        <p style="margin-top:24px;font-size:12px;color:#888;">Submitted ${new Date().toUTCString()}</p>
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
  ].filter(Boolean).join("\n");

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
      console.error("Resend error", response.status, errBody);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Resend fetch failed", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
