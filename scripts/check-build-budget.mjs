import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";

const root = process.cwd();
const manifest = JSON.parse(
  readFileSync(resolve(root, "dist/.vite/manifest.json"), "utf8"),
);
const visited = new Set();

const visit = (key) => {
  if (!key || visited.has(key)) return;
  const chunk = manifest[key];
  if (!chunk) throw new Error(`Missing build manifest entry: ${key}`);
  visited.add(key);
  (chunk.imports || []).forEach(visit);
};

visit("index.html");
visit("src/pages/Index.tsx");

const files = [...visited]
  .map((key) => manifest[key].file)
  .filter((file) => file?.endsWith(".js"));
const gzipBytes = files.reduce(
  (total, file) =>
    total + gzipSync(readFileSync(resolve(root, "dist", file))).byteLength,
  0,
);
const gzipKilobytes = gzipBytes / 1024;
const budgetKilobytes = 150;

if (gzipKilobytes > budgetKilobytes) {
  throw new Error(
    `Homepage JavaScript is ${gzipKilobytes.toFixed(1)} kB gzip; budget is ${budgetKilobytes} kB.`,
  );
}

console.log(
  `Homepage JavaScript: ${gzipKilobytes.toFixed(1)} kB gzip across ${files.length} chunks (budget ${budgetKilobytes} kB).`,
);
