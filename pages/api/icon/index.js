// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Axios from "axios";
export default async function handler(req, res) {
  try {
    const { query } = req;
    let { url } = query;
    if (!url) throw new Error("url is required");
    if (url.startsWith("https://")) url = url.replace("https://", "http://");
    const resp = await Axios.get(url, { responseType: "arraybuffer" });
    res.setHeader('Content-Type', 'image/png');
    res.send(resp.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
