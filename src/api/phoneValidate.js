import axios from "axios";

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

  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone required" });

  try {
    const vp = await axios.get(
      "https://api.veriphone.io/v2/verify",
      {
        params: {
          key: process.env.VERIPHONE_KEY,
          phone,
        },
      }
    );

    return res.status(200).json(vp.data);
  } catch (err) {
    return res.status(500).json({ error: "Validation failed" });
  }
}