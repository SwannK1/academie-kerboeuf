import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const catalog = JSON.parse(readFileSync(join(root, "content", "secondary-resource-catalog.generated.json"), "utf8"));
const expected = { "6e": 186, "5e": 66, "4e": 57, "3e": 75, seconde: 108 };
const errors = [];
const linkedHrefs = new Set();

for (const item of catalog) {
  const types = item.resources.map((resource) => resource.type).sort().join(",");
  if (types !== "evaluation,exercices,lecon") errors.push(`${item.level}/${item.subject}/${item.competency}: triplet incomplet (${types})`);
  for (const resource of item.resources) {
    if (linkedHrefs.has(resource.href)) errors.push(`Lien dupliqué: ${resource.href}`);
    linkedHrefs.add(resource.href);
    if (!existsSync(join(root, "public", resource.href))) errors.push(`Fichier absent: ${resource.href}`);
  }
}

for (const [level, expectedCount] of Object.entries(expected)) {
  const actual = [...linkedHrefs].filter((href) => href.startsWith(`/fiches/${level}/`)).length;
  if (actual !== expectedCount) errors.push(`${level}: ${actual} PDF catalogués, ${expectedCount} attendus`);
}

const allPdfHrefs = [];
function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (entry.endsWith(".pdf")) allPdfHrefs.push(path.slice(join(root, "public").length));
  }
}
for (const level of Object.keys(expected)) walk(join(root, "public", "fiches", level));
for (const href of allPdfHrefs) if (!linkedHrefs.has(href)) errors.push(`PDF orphelin: ${href}`);

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

const stats = Object.keys(expected).map((level) => {
  const items = catalog.filter((item) => item.level === level);
  return `${level}: ${new Set(items.map((item) => item.subject)).size} matières, ${items.length} compétences, ${items.reduce((sum, item) => sum + item.resources.length, 0)} PDF`;
});
console.log(stats.join("\n"));
console.log(`Total: ${catalog.length} compétences, ${linkedHrefs.size} PDF, ${allPdfHrefs.length - linkedHrefs.size} orphelin(s).`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
