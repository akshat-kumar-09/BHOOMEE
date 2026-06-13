/* Vercel serverless function — Jane's secure proxy.

   The frontend posts { system, messages, model, max_tokens } here, and
   this function calls Anthropic with the server-side ANTHROPIC_API_KEY.
   The key is NEVER exposed to the browser. Set ANTHROPIC_API_KEY (no
   VITE_ prefix) in your Vercel project's Environment Variables, and set
   VITE_JANE_PROXY=1 so the frontend knows to route through here.

   Runs on the Node.js runtime. */

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { system, messages, model = "claude-sonnet-4-5", max_tokens = 800 } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const upstream = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return res.status(upstream.status).json({ error: "Anthropic error", detail });
    }

    const data = await upstream.json();
    const text = (data.content || []).find((b) => b.type === "text")?.text || "";
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Proxy failure", detail: String(e) });
  }
}
