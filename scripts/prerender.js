import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../src/config/site.js";
import {
  allRoutes,
  breadcrumbJsonLd,
  canonicalForRoute,
  faqJsonLd,
  localBusinessJsonLd,
  notFoundRoute,
  tourJsonLd,
} from "./seoRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const indexPath = path.join(distDir, "index.html");
const googleVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION;
const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html was not found. Run vite build before prerendering.");
}

const baseHtml = fs.readFileSync(indexPath, "utf8");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const escapeAttr = escapeHtml;

const sanitizeJson = (data) =>
  JSON.stringify(data).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e");

const replaceOrInsert = (html, pattern, replacement) =>
  pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);

const routeImage = (route) => {
  const image = route.image || siteConfig.defaultOgImage;
  return image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`;
};

const routeTitle = (route) => `${route.title} | ${siteConfig.name}`;

const breadcrumbsFor = (route) => {
  if (route.path === "/") return [{ name: "Home", path: "/" }];
  if (route.tour) {
    return [
      { name: "Home", path: "/" },
      { name: "Tours", path: "/tours" },
      { name: route.tour.title, path: route.path },
    ];
  }
  return [
    { name: "Home", path: "/" },
    { name: route.h1.replace(/^404 - /, ""), path: route.path },
  ];
};

const jsonLdFor = (route) => {
  const blocks = [breadcrumbJsonLd(breadcrumbsFor(route))];

  if (route.path === "/") blocks.unshift(localBusinessJsonLd());
  if (route.path === "/faq") blocks.push(faqJsonLd());
  if (route.tour) blocks.push(tourJsonLd(route.tour));

  return blocks
    .map((block) => `    <script type="application/ld+json">${sanitizeJson(block)}</script>`)
    .join("\n");
};

const renderStaticContent = (route) => {
  const bullets = (route.bullets || [])
    .slice(0, 12)
    .map((item) => `          <li>${escapeHtml(item)}</li>`)
    .join("\n");

  const tourDetails = route.tour
    ? `
        <section>
          <h2>Tour Details</h2>
          <p>${escapeHtml(route.tour.duration)} in ${escapeHtml(route.tour.location)}. Difficulty: ${escapeHtml(route.tour.difficultyLabel)}. Group size: ${escapeHtml(route.tour.groupSize)}.</p>
          <h2>Itinerary</h2>
          ${route.tour.itinerary
            .map(
              (day) => `<article>
            <h3>Day ${escapeHtml(day.day)}: ${escapeHtml(day.title)}</h3>
            <p>${escapeHtml(day.description)}</p>
          </article>`
            )
            .join("\n")}
        </section>`
    : "";

  return `
    <main class="seo-prerender" data-prerendered="true">
      <section>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.intro)}</p>
        ${bullets ? `<ul>\n${bullets}\n        </ul>` : ""}
      </section>
      ${tourDetails}
    </main>`;
};

const renderRouteHtml = (route) => {
  const canonical = canonicalForRoute(route);
  const title = routeTitle(route);
  const robots = route.index === false || isPreview ? "noindex, nofollow" : "index, follow";
  let html = baseHtml;

  html = html.replace(/<html[^>]*>/i, `<html lang="${siteConfig.language}">`);
  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${robots}" />`
  );
  html = replaceOrInsert(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:locale["'][^>]*>/i,
    `<meta property="og:locale" content="${siteConfig.defaultLocale}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:site_name["'][^>]*>/i,
    `<meta property="og:site_name" content="${siteConfig.name}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${route.tour ? "article" : "website"}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeAttr(title)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${escapeAttr(routeImage(route))}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${escapeAttr(routeImage(route))}" />`
  );

  html = html.replace(/\s*<meta\s+name=["']google-site-verification["'][^>]*>\s*/gi, "\n");
  if (googleVerification) {
    html = html.replace(
      "</head>",
      `    <meta name="google-site-verification" content="${escapeAttr(googleVerification)}" />\n  </head>`
    );
  }

  html = html.replace("</head>", `${jsonLdFor(route)}\n  </head>`);
  html = html.replace(/<div id=["']root["']><\/div>/i, `<div id="root">${renderStaticContent(route)}\n    </div>`);

  return html;
};

const routeOutputPath = (routePath) => {
  if (routePath === "/") return indexPath;
  const clean = routePath.replace(/^\/+/, "");
  return path.join(distDir, clean, "index.html");
};

for (const route of allRoutes) {
  const outputPath = routeOutputPath(route.path);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderRouteHtml(route), "utf8");
}

fs.writeFileSync(path.join(distDir, "404.html"), renderRouteHtml(notFoundRoute), "utf8");

console.log(`Prerendered ${allRoutes.length} public routes and 404.html`);
