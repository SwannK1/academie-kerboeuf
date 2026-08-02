#!/usr/bin/env node
// Audit d'intégrité des routes, liens internes et fichiers publics.
// Usage: node scripts/audit-links.mjs [baseUrl]
// Nécessite un serveur `next start` déjà lancé sur baseUrl (défaut http://localhost:3100).

import { readFileSync } from "node:fs";
import path from "node:path";

const baseUrl = process.argv[2] || "http://localhost:3100";
const repoRoot = process.cwd();

const HREF_RE = /(?:href|src)="([^"]+)"/g;

function loadSeedRoutes() {
  const manifestPath = path.join(repoRoot, ".next/prerender-manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return Object.keys(manifest.routes || {});
}

function isIgnorable(href) {
  if (!href) return true;
  if (href.startsWith("#")) return true;
  if (href.startsWith("mailto:")) return true;
  if (href.startsWith("tel:")) return true;
  if (href.startsWith("javascript:")) return true;
  if (href.startsWith("data:")) return true;
  if (/^https?:\/\//i.test(href)) return true;
  if (href.startsWith("//")) return true;
  // Next.js internal image-optimization endpoint: only valid with its query
  // string (url=...&w=...&q=...), not as a bare path.
  if (href.startsWith("/_next/")) return true;
  return false;
}

// Framework-internal special routes that appear in prerender-manifest but
// are never linked to by real pages (App Router boilerplate for 404/500).
const FRAMEWORK_INTERNAL_ROUTES = new Set(["/_not-found", "/_global-error"]);

function normalize(href) {
  let url = href.split("#")[0];
  if (url === "") return "/";
  if (!url.startsWith("/")) return null;
  // strip query string but keep for record separately if needed
  url = url.split("?")[0];
  if (url.length > 1 && url.endsWith("/")) url = url.slice(0, -1);
  return url;
}

async function fetchStatus(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    return { status: res.status, redirected: false, location: res.headers.get("location") };
  } catch (err) {
    return { status: null, error: String(err && err.message ? err.message : err) };
  }
}

async function main() {
  const seedRoutes = loadSeedRoutes();
  console.log(`Seed routes (prerender-manifest): ${seedRoutes.length}`);

  const pageQueue = [...new Set(seedRoutes)];
  const visitedPages = new Set();
  const extractedLinksRaw = [];
  const discoveredHtmlLinks = new Set();

  while (pageQueue.length > 0) {
    const route = pageQueue.shift();
    if (visitedPages.has(route)) continue;
    visitedPages.add(route);

    const res = await fetchStatus(baseUrl + route);
    if (res.status !== 200) continue;

    let html;
    try {
      const r = await fetch(baseUrl + route);
      html = await r.text();
    } catch {
      continue;
    }

    let match;
    HREF_RE.lastIndex = 0;
    while ((match = HREF_RE.exec(html)) !== null) {
      const raw = match[1];
      extractedLinksRaw.push(raw);
      if (isIgnorable(raw)) continue;
      const norm = normalize(raw);
      if (!norm) continue;
      discoveredHtmlLinks.add(norm);
    }
  }

  console.log(`Pages crawled: ${visitedPages.size}`);
  console.log(`Links extracted (raw, incl. duplicates): ${extractedLinksRaw.length}`);
  console.log(`Unique internal links discovered: ${discoveredHtmlLinks.size}`);

  // Separate public files (has a file extension) from routes.
  const routeTargets = new Set();
  const fileTargets = new Set();
  const linkedTargets = new Set(); // targets actually referenced by an <a>/<img> somewhere
  for (const link of discoveredHtmlLinks) {
    const lastSegment = link.split("/").pop() || "";
    if (lastSegment.includes(".") && !lastSegment.endsWith(".")) {
      fileTargets.add(link);
    } else {
      routeTargets.add(link);
    }
    linkedTargets.add(link);
  }
  // Also include all seed routes as routes to test (may not all be linked —
  // e.g. a slug can be statically pre-rendered as an intentional 404 page
  // for unpublished content, with no live page ever linking to it).
  for (const r of seedRoutes) routeTargets.add(r);
  for (const r of FRAMEWORK_INTERNAL_ROUTES) routeTargets.delete(r);

  const results = {
    ok: [],
    redirect: [],
    notFound: [],
    serverError: [],
    networkError: [],
  };

  async function testUrl(url, kind) {
    const res = await fetchStatus(baseUrl + url);
    const entry = { url, kind, status: res.status, linked: linkedTargets.has(url) };
    if (res.status === null) {
      entry.error = res.error;
      results.networkError.push(entry);
    } else if (res.status >= 200 && res.status < 300) {
      results.ok.push(entry);
    } else if (res.status >= 300 && res.status < 400) {
      entry.location = res.location;
      results.redirect.push(entry);
    } else if (res.status === 404) {
      results.notFound.push(entry);
    } else if (res.status >= 500) {
      results.serverError.push(entry);
    } else {
      results.notFound.push(entry);
    }
  }

  for (const url of routeTargets) {
    await testUrl(url, "route");
  }
  for (const url of fileTargets) {
    await testUrl(url, "file");
  }

  // Sitemap check
  const sitemapRes = await fetch(baseUrl + "/sitemap.xml");
  const sitemapXml = await sitemapRes.text();
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const sitemapPaths = sitemapUrls.map((u) => {
    try {
      return new URL(u).pathname;
    } catch {
      return u;
    }
  });
  const sitemapResults = { ok: [], redirect: [], notFound: [], serverError: [], networkError: [] };
  for (const p of sitemapPaths) {
    const res = await fetchStatus(baseUrl + p);
    const entry = { url: p, status: res.status };
    if (res.status === null) sitemapResults.networkError.push(entry);
    else if (res.status >= 200 && res.status < 300) sitemapResults.ok.push(entry);
    else if (res.status >= 300 && res.status < 400) sitemapResults.redirect.push(entry);
    else if (res.status === 404) sitemapResults.notFound.push(entry);
    else if (res.status >= 500) sitemapResults.serverError.push(entry);
  }
  const sitemapDupes = sitemapPaths.length - new Set(sitemapPaths).size;

  const linkedNotFound = results.notFound.filter((e) => e.linked);
  const orphanNotFound = results.notFound.filter((e) => !e.linked);

  const summary = {
    pagesCrawled: visitedPages.size,
    linksExtractedRaw: extractedLinksRaw.length,
    uniqueLinks: discoveredHtmlLinks.size,
    routesTested: routeTargets.size,
    filesTested: fileTargets.size,
    redirects: results.redirect.length,
    notFound: results.notFound.length,
    notFoundLinked: linkedNotFound.length,
    notFoundOrphanSeedOnly: orphanNotFound.length,
    serverErrors: results.serverError.length,
    networkErrors: results.networkError.length,
    sitemapUrlCount: sitemapPaths.length,
    sitemapDupes,
    sitemapNotFound: sitemapResults.notFound.length,
    sitemapServerErrors: sitemapResults.serverError.length,
  };

  console.log("\n=== SUMMARY ===");
  console.log(JSON.stringify(summary, null, 2));

  if (linkedNotFound.length) {
    console.log("\n=== 404 REACHABLE FROM A REAL LINK (broken links) ===");
    for (const e of linkedNotFound) console.log(`${e.kind}\t${e.url}`);
  }
  if (orphanNotFound.length) {
    console.log("\n=== 404 seed-only, not linked from any page (expected: pre-rendered notFound() for unpublished content) ===");
    for (const e of orphanNotFound) console.log(`${e.kind}\t${e.url}`);
  }
  if (results.serverError.length) {
    console.log("\n=== 5xx ===");
    for (const e of results.serverError) console.log(`${e.kind}\t${e.status}\t${e.url}`);
  }
  if (results.networkError.length) {
    console.log("\n=== network errors ===");
    for (const e of results.networkError) console.log(`${e.kind}\t${e.url}\t${e.error}`);
  }
  if (sitemapResults.notFound.length) {
    console.log("\n=== sitemap 404 ===");
    for (const e of sitemapResults.notFound) console.log(e.url);
  }
  if (sitemapResults.serverError.length) {
    console.log("\n=== sitemap 5xx ===");
    for (const e of sitemapResults.serverError) console.log(e.url);
  }

  // Write full JSON report for later inspection
  const fs = await import("node:fs");
  fs.writeFileSync(
    path.join(repoRoot, "scratch-audit-results.json"),
    JSON.stringify({ summary, results, sitemapResults, sitemapPaths }, null, 2),
  );
  console.log("\nFull results written to scratch-audit-results.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
