#!/usr/bin/env node

/**
 * Génère un décompte statique des PDF réellement présents dans public/fiches,
 * regroupés par section (maternelle / primaire / collège / lycée).
 *
 * Pourquoi ce script existe :
 * app/etat-du-site/page.tsx affichait auparavant ce décompte en appelant
 * fs.readdirSync(...) directement au niveau de la route. Le traceur de
 * dépendances de Vercel (Output File Tracing) ne peut pas distinguer "lire
 * des noms de fichiers" de "lire du contenu" : dès qu'une route appelle fs
 * sur un chemin, Vercel embarque tout le sous-arbre dans le bundle de la
 * fonction. public/fiches pesant ~377 Mo (154 PDF), la fonction /etat-du-site
 * dépassait la limite de taille Vercel (250 Mo).
 *
 * Ce script déplace le scan filesystem en dehors du runtime de la route :
 * il tourne une fois (localement ou en CI), écrit un petit JSON de comptage,
 * et la page importe ce JSON au lieu d'appeler fs à l'exécution.
 *
 * À relancer après tout ajout/suppression de PDF dans public/fiches :
 *   npm run generate:pdf-counts
 */

import { existsSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");
const pdfRoot = join(projectRoot, "public", "fiches");
const outputPath = join(projectRoot, "content", "pdf-counts.generated.json");

function collectPdfFiles(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return collectPdfFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".pdf") ? [fullPath] : [];
  });
}

function countPdfFilesFor(allFiles, prefixes) {
  const normalizedRoot = `${pdfRoot}/`;

  return allFiles.filter((file) => {
    const relativePath = file.replace(normalizedRoot, "");
    return prefixes.some((prefix) => relativePath.startsWith(prefix));
  }).length;
}

const allFiles = collectPdfFiles(pdfRoot);

const counts = {
  generatedAt: new Date().toISOString(),
  maternelle: countPdfFilesFor(allFiles, ["maternelle/"]),
  primaire: countPdfFilesFor(allFiles, ["cp/", "ce1/", "ce2/", "cm1/", "cm2/"]),
  college: countPdfFilesFor(allFiles, ["college/", "6e/", "5e/", "4e/", "3e/"]),
  lycee: countPdfFilesFor(allFiles, ["lycee/", "seconde/", "premiere/", "terminale/"]),
};

writeFileSync(outputPath, `${JSON.stringify(counts, null, 2)}\n`, "utf-8");

console.log(`✅ Décompte PDF généré : ${outputPath}`);
console.log(counts);
