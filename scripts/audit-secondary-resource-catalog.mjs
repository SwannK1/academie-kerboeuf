import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const levels = ["6e", "5e", "4e", "3e", "seconde"];
const resourceTypes = ["lecon", "exercices", "evaluation"];
const catalog = JSON.parse(readFileSync(join(root, "content", "secondary-resource-catalog.generated.json"), "utf8"));
const errors = [];
const linkedHrefs = new Set();
const hrefsByHash = new Map();

function inspectPdf(href) {
  const path = join(publicRoot, href);
  if (!existsSync(path)) {
    errors.push(`Fichier absent: ${href}`);
    return;
  }
  const contents = readFileSync(path);
  if (contents.subarray(0, 5).toString("ascii") !== "%PDF-") errors.push(`Signature PDF invalide: ${href}`);
  const hash = createHash("sha256").update(contents).digest("hex");
  hrefsByHash.set(hash, [...(hrefsByHash.get(hash) ?? []), href]);
}

for (const item of catalog) {
  const types = item.resources.map((resource) => resource.type);
  if (new Set(types).size !== types.length) errors.push(`${item.level}/${item.subject}/${item.competency}: type dupliqué`);
  for (const type of types) if (!resourceTypes.includes(type)) errors.push(`${item.level}/${item.subject}/${item.competency}: type inconnu (${type})`);
  for (const resource of item.resources) {
    if (linkedHrefs.has(resource.href)) errors.push(`Lien dupliqué: ${resource.href}`);
    linkedHrefs.add(resource.href);
    inspectPdf(resource.href);
  }
}

const allPdfHrefs = [];
function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (entry.toLowerCase().endsWith(".pdf")) allPdfHrefs.push(path.slice(publicRoot.length));
  }
}
for (const level of levels) walk(join(publicRoot, "fiches", level));
for (const href of allPdfHrefs) if (!linkedHrefs.has(href)) errors.push(`PDF orphelin: ${href}`);
for (const href of linkedHrefs) if (!allPdfHrefs.includes(href)) errors.push(`Lien hors inventaire: ${href}`);

const duplicateGroups = [...hrefsByHash.values()].filter((hrefs) => hrefs.length > 1);
for (const hrefs of duplicateGroups) errors.push(`Doublon SHA-256: ${hrefs.join(" = ")}`);

const sixiemeSource = readFileSync(join(root, "content", "levels", "college", "6e-curriculum.ts"), "utf8");
const sixiemeIds = new Set([...sixiemeSource.matchAll(/id: "(6e-[^"]+-entry)"/g)].map((match) => match[1]));
const sixiemeCatalogIds = new Set(catalog.filter((item) => item.level === "6e").map((item) => item.competency));
for (const id of sixiemeCatalogIds) if (!sixiemeIds.has(id)) errors.push(`6e sans curriculum existant: ${id}`);
for (const id of sixiemeIds) if (!sixiemeCatalogIds.has(id)) errors.push(`6e sans PDF: ${id}`);

const secondeSource = readFileSync(join(root, "content", "lycee-curriculum.ts"), "utf8");
const secondeBlock = secondeSource.slice(secondeSource.indexOf("const secondeTroncCommun"), secondeSource.indexOf("const premiereTroncCommun"));
const secondeIds = new Set([...secondeBlock.matchAll(/competence\("([^"]+)"/g)].map((match) => match[1]));
for (const item of catalog.filter((entry) => entry.level === "seconde")) {
  const slug = item.competency.replace(`seconde-${item.subject}-`, "");
  if (!secondeIds.has(slug)) errors.push(`Seconde sans curriculum existant: ${item.competency}`);
}

const complete = catalog.filter((item) => resourceTypes.every((type) => item.resources.some((resource) => resource.type === type)));
const partial = catalog.filter((item) => item.resources.length > 0 && !complete.includes(item));
for (const level of levels) {
  const items = catalog.filter((item) => item.level === level);
  console.log(`${level}: ${new Set(items.map((item) => item.subject)).size} matières, ${items.length} compétences, ${items.reduce((sum, item) => sum + item.resources.length, 0)} PDF, ${items.filter((item) => complete.includes(item)).length} triplets, ${items.filter((item) => partial.includes(item)).length} partiel(s)`);
}
console.log(`Total: ${allPdfHrefs.length} PDF, ${hrefsByHash.size} uniques, ${catalog.length} compétences, ${complete.length} triplets, ${partial.length} partiel(s), ${allPdfHrefs.length - linkedHrefs.size} orphelin(s), ${duplicateGroups.length} groupe(s) de doublons.`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
