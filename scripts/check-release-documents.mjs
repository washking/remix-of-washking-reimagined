import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const require = createRequire(resolve(root, "package.json"));
const { JSDOM } = require("jsdom");
const routes = [
  "/",
  "/about",
  "/contact",
  "/customer-survey",
  "/employment",
  "/privacy",
  "/thank-you",
  "/location/vineland",
  "/location/vineland-dante",
  "/location/somerset",
  "/location/landisville",
  "/location/cherry-hill",
];
const failures = [];
const canonicals = new Set();

const routeFile = (route) =>
  resolve(root, "dist", route === "/" ? "index.html" : `${route.slice(1)}.html`);

for (const route of routes) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    failures.push(`${route}: missing generated HTML`);
    continue;
  }

  const document = new JSDOM(readFileSync(file, "utf8")).window.document;
  const title = document.title.trim();
  const description = document.querySelector('meta[name="description"]')?.content.trim() ?? "";
  const canonical = document.querySelector('link[rel="canonical"]')?.href ?? "";

  if (title.length < 20 || title.length > 65) failures.push(`${route}: title length ${title.length}`);
  if (description.length < 50 || description.length > 170) {
    failures.push(`${route}: description length ${description.length}`);
  }
  if (!canonical.startsWith("https://www.washking.net/")) {
    failures.push(`${route}: invalid canonical ${canonical}`);
  }
  if (canonicals.has(canonical)) failures.push(`${route}: duplicate canonical ${canonical}`);
  canonicals.add(canonical);
  if (document.querySelectorAll("h1").length !== 1) failures.push(`${route}: expected one h1`);
  if (!document.querySelector('meta[property="og:image"]')) failures.push(`${route}: missing og:image`);
  if (!document.querySelector('meta[name="twitter:card"]')) failures.push(`${route}: missing Twitter card`);

  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      JSON.parse(script.textContent ?? "");
    } catch {
      failures.push(`${route}: invalid JSON-LD`);
    }
  }

  for (const image of document.querySelectorAll("img")) {
    if (!image.hasAttribute("alt")) failures.push(`${route}: image missing alt text`);
    const source = image.getAttribute("src");
    if (source?.startsWith("/") && !existsSync(resolve(root, "dist", source.slice(1)))) {
      failures.push(`${route}: missing image asset ${source}`);
    }
  }

  for (const link of document.querySelectorAll('a[href^="/"]')) {
    const href = link.getAttribute("href");
    const path = href?.split("#")[0].split("?")[0] || "/";
    if (!routes.includes(path)) failures.push(`${route}: unknown internal link ${href}`);
  }

  for (const control of document.querySelectorAll("button, a")) {
    const explicitLabel = control.id
      ? document.querySelector(`label[for="${control.id}"]`)?.textContent
      : "";
    const name = [
      control.textContent,
      control.getAttribute("aria-label"),
      control.querySelector("img")?.alt,
      explicitLabel,
    ]
      .filter(Boolean)
      .join("")
      .trim();
    if (!name) failures.push(`${route}: unnamed ${control.tagName.toLowerCase()}`);
  }
}

const sitemap = new JSDOM(readFileSync(resolve(root, "public/sitemap.xml"), "utf8"), {
  contentType: "application/xml",
}).window.document;
const sitemapRoutes = [...sitemap.querySelectorAll("loc")].map((node) =>
  new URL(node.textContent.trim()).pathname.replace(/\/$/, "") || "/",
);

for (const route of routes) {
  const document = new JSDOM(readFileSync(routeFile(route), "utf8")).window.document;
  const robots = document.querySelector('meta[name="robots"]')?.content ?? "";
  if (!robots.startsWith("noindex") && !sitemapRoutes.includes(route)) {
    failures.push(`sitemap: missing ${route}`);
  }
}
for (const route of sitemapRoutes) {
  if (!routes.includes(route)) failures.push(`sitemap: unknown route ${route}`);
}

const robots = readFileSync(resolve(root, "public/robots.txt"), "utf8");
if (!robots.includes("https://www.washking.net/sitemap.xml")) {
  failures.push("robots: missing sitemap URL");
}

const manifest = JSON.parse(readFileSync(resolve(root, "public/site.webmanifest"), "utf8"));
for (const icon of manifest.icons ?? []) {
  if (!existsSync(resolve(root, "public", icon.src.replace(/^\//, "")))) {
    failures.push(`manifest: missing ${icon.src}`);
  }
}

if (!existsSync(resolve(root, "dist/404.html"))) failures.push("missing static 404 page");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Release document audit passed: ${routes.length} routes, ${sitemapRoutes.length} sitemap URLs.`);
