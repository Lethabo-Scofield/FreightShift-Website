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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return res.status(500).json({ error: "Email service is not configured" });

  const modeLabel = data.mode === "sea" ? "Sea Freight" : "Air Freight";

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile: ${data.mobile}`,
    ``,
    `Mode: ${modeLabel}`,
    data.origin ? `Origin: ${data.origin}` : null,
    data.destination ? `Destination: ${data.destination}` : null,
    data.cargoType ? `Cargo type: ${data.cargoType}` : null,
    `Goods: ${data.goodsType}`,
    `Vol / Weight: ${data.volumeWeight}`,
    data.notes ? `\nNotes:\n${data.notes}` : null,
    ``,
    `Submitted: ${new Date().toUTCString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Quote Request — ${data.name} (${modeLabel})`,
        from_name: "FreightShift Website",
        replyto: data.email,
        message: lines,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Web3Forms error", result);
      return res.status(502).json({ error: "Failed to send quote" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Web3Forms fetch failed", err);
    return res.status(500).json({ error: "Failed to send quote" });
  }
}
