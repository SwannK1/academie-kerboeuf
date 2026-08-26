import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const levels = ["6e", "5e", "4e", "3e", "seconde"];
const resourceTypes = ["lecon", "exercices", "evaluation"];

const catalog = [];

for (const level of levels) {
  const levelRoot = join(publicRoot, "fiches", level);
  for (const subject of readdirSync(levelRoot).sort()) {
    const subjectRoot = join(levelRoot, subject);
    if (!statSync(subjectRoot).isDirectory()) continue;

    for (const competency of readdirSync(subjectRoot).sort()) {
      const competencyRoot = join(subjectRoot, competency);
      if (!statSync(competencyRoot).isDirectory()) continue;

      const files = readdirSync(competencyRoot)
        .filter((file) => file.endsWith(".pdf"))
        .sort();
      const resources = resourceTypes.map((type) => {
        const file = files.find((candidate) => candidate.endsWith(`-${type}.pdf`));
        if (!file) return null;
        return {
          type,
          href: `/${relative(publicRoot, join(competencyRoot, file)).split(sep).join("/")}`,
        };
      }).filter(Boolean);

      catalog.push({ level, subject, competency, resources });
    }
  }
}

writeFileSync(
  join(root, "content", "secondary-resource-catalog.generated.json"),
  `${JSON.stringify(catalog, null, 2)}\n`,
);

const pdfCount = catalog.reduce((total, item) => total + item.resources.length, 0);
console.log(`Catalogue secondaire: ${catalog.length} compétences, ${pdfCount} PDF.`);
