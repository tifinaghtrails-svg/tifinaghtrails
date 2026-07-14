import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allRoutes, sitemapRoutes } from "./seoRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const failures = [];

const routeOutputPath = (routePath) => {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath.replace(/^\/+/, ""), "index.html");
};

const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const route of allRoutes) {
  const outputPath = routeOutputPath(route.path);
  const html = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";

  assert(Boolean(html), `Missing prerendered file for ${route.path}`);
  assert(/<title>[^<]+<\/title>/i.test(html), `Missing title for ${route.path}`);
  assert(/<meta\s+name=["']description["']/i.test(html), `Missing description for ${route.path}`);
  assert(/<link\s+rel=["']canonical["']/i.test(html), `Missing canonical for ${route.path}`);
  assert(!/<meta\s+name=["']keywords["']/i.test(html), `Meta keywords found on ${route.path}`);
  assert(/<h1[\s>]/i.test(html), `Missing prerendered H1 for ${route.path}`);
  assert(/application\/ld\+json/i.test(html), `Missing JSON-LD for ${route.path}`);
}

const sitemapPath = path.join(distDir, "sitemap.xml");
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const uniqueLocs = new Set(sitemapLocs);

assert(Boolean(sitemap), "Missing dist/sitemap.xml");
assert(sitemapLocs.length === sitemapRoutes.length, "Sitemap URL count does not match route inventory");
assert(uniqueLocs.size === sitemapLocs.length, "Sitemap contains duplicate URLs");

const robotsPath = path.join(distDir, "robots.txt");
const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "";
assert(/Sitemap:\s*https:\/\/tifinaghtrails\.com\/sitemap\.xml/i.test(robots), "robots.txt missing sitemap directive");

if (failures.length) {
  console.error("SEO checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO checks passed for ${allRoutes.length} prerendered routes and ${sitemapRoutes.length} sitemap URLs.`);
