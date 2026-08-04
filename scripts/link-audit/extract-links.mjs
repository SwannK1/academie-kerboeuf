// Extrait tous les liens internes (href) et fichiers référencés (src, PDF)
// depuis le HTML statique généré par le build. Usage temporaire pour
// l'audit d'intégrité des routes/liens — ne fait pas partie du build.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, ".next/server/app");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const htmlFiles = walk(APP_DIR);

const hrefRe = /\shref="([^"]*)"/g;
const srcRe = /\ssrc="([^"]*)"/g;

const linksByPage = new Map(); // href -> Set(source page route)
const filesByPage = new Map(); // src -> Set(source page route)

function routeFromFile(f) {
  let r = f.slice(APP_DIR.length).replace(/\.html$/, "");
  r = r.replace(/\/index$/, "");
  return r === "" ? "/" : r;
}

for (const f of htmlFiles) {
  const route = routeFromFile(f);
  const content = readFileSync(f, "utf8");

  let m;
  hrefRe.lastIndex = 0;
  while ((m = hrefRe.exec(content))) {
    const href = m[1];
    if (!linksByPage.has(href)) linksByPage.set(href, new Set());
    linksByPage.get(href).add(route);
  }
  srcRe.lastIndex = 0;
  while ((m = srcRe.exec(content))) {
    const src = m[1];
    if (!filesByPage.has(src)) filesByPage.set(src, new Set());
    filesByPage.get(src).add(route);
  }
}

function classify(href) {
  if (href.startsWith("#")) return "anchor";
  if (href.startsWith("mailto:")) return "mailto";
  if (href.startsWith("tel:")) return "tel";
  if (/^https?:\/\//.test(href)) return "external";
  if (href.startsWith("//")) return "external";
  if (href.startsWith("/_next/image")) return "next-image-optimizer";
  if (href.startsWith("/")) return "internal";
  return "relative-or-other";
}

const grouped = {};
for (const [href, pages] of linksByPage) {
  const cat = classify(href);
  grouped[cat] ??= [];
  grouped[cat].push({ href, pages: [...pages] });
}

const fileGrouped = {};
for (const [src, pages] of filesByPage) {
  const cat = classify(src);
  fileGrouped[cat] ??= [];
  fileGrouped[cat].push({ src, pages: [...pages] });
}

const out = {
  totalHtmlPages: htmlFiles.length,
  totalUniqueHrefs: linksByPage.size,
  totalUniqueSrcs: filesByPage.size,
  hrefsByCategory: Object.fromEntries(
    Object.entries(grouped).map(([k, v]) => [k, v.length]),
  ),
  srcsByCategory: Object.fromEntries(
    Object.entries(fileGrouped).map(([k, v]) => [k, v.length]),
  ),
  internal: (grouped.internal ?? []).sort((a, b) => a.href.localeCompare(b.href)),
  internalSrcs: (fileGrouped.internal ?? []).sort((a, b) => a.src.localeCompare(b.src)),
};

writeFileSync(
  path.join(ROOT, "scripts/link-audit/extracted-links.json"),
  JSON.stringify(out, null, 2),
);

console.log("HTML pages scanned:", out.totalHtmlPages);
console.log("Unique hrefs:", out.totalUniqueHrefs);
console.log("Unique srcs:", out.totalUniqueSrcs);
console.log("hrefs by category:", out.hrefsByCategory);
console.log("srcs by category:", out.srcsByCategory);
