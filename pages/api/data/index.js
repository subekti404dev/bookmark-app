// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import getConfig from "next/config";
import path from "path";
const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
  try {
    const dbFilePath = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./db/data.json"
    );
    let data;
    try {
      data = JSON.parse(fs.readFileSync(dbFilePath));
    } catch (error) {}

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
