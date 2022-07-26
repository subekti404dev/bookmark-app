// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import getConfig from "next/config";
import path from "path";
const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
  try {
    const { data } = req.body;
    const dbFilePath = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./db/data.json"
    );
    if (data && typeof data === "object") {
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
