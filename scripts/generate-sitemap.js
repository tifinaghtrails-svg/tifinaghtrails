import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../src/config/site.js";
import { sitemapRoutes } from "./seoRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const distDir = path.join(projectRoot, "dist");
const today = new Date().toISOString().slice(0, 10);
const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(`${siteConfig.siteUrl}${route.path === "/" ? "/" : route.path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = isPreview
  ? `User-agent: *
Disallow: /

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
`
  : `User-agent: *
Allow: /

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
`;

const writeFile = (dir, fileName, contents) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), contents, "utf8");
};

writeFile(publicDir, "sitemap.xml", sitemap);
writeFile(publicDir, "robots.txt", robots);

if (fs.existsSync(distDir)) {
  writeFile(distDir, "sitemap.xml", sitemap);
  writeFile(distDir, "robots.txt", robots);
}

console.log(`Generated ${sitemapRoutes.length} sitemap URLs and robots.txt`);
