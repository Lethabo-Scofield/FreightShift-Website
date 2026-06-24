import { handleQuote } from "../artifacts/freightshift/src/server/quote";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : (req.body ?? {});
    const result = await handleQuote(body);
    return res.status(result.status).json(result.json);
  } catch {
    return res.status(400).json({ error: "bad_request" });
  }
}
