import axios from "axios";

/**
 * Simple in-memory rate limit (per function instance)
 */
const rateMap = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const count = rateMap.get(ip) || 0;
  if (count >= 10) {
    return res.status(429).json({ error: "Too many requests" });
  }

  rateMap.set(ip, count + 1);

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const zb = await axios.get(
      "https://api.zerobounce.net/v2/validate",
      {
        params: {
          api_key: process.env.ZEROBOUNCE_KEY,
          email,
        },
      }
    );

    return res.status(200).json(zb.data);
  } catch (err) {
    return res.status(500).json({ error: "Validation failed" });
  }
}