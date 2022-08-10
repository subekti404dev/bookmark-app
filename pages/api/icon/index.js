// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Axios from "axios";

export default async function handler(req, res) {
  try {
    const { query } = req;
    let { host } = query;
    if (!host) throw new Error("host is required");
    const iconUrl = `http://urban-purple-guppy.faviconkit.com/${host}/128`;
    const resp = await Axios.get(iconUrl, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", "image/png");
    res.send(resp.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
