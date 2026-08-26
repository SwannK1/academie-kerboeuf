#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const source = path.resolve(process.argv[2] ?? "/Users/swann/Desktop/CE1 - QUATREMAIRE");
const output = path.resolve(process.argv[3] ?? "docs/ce1-resource-audit.json");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : entry.isFile() ? [absolutePath] : [];
  });
}

function extensionOf(file) {
  const extension = path.extname(file).toLowerCase();
  return extension || "[none]";
}

function inspectMagic(buffer, extension) {
  if (extension === ".pdf") {
    return buffer.subarray(0, 5).toString() === "%PDF-" ? "valid" : "corrupt";
  }
  if (extension === ".png") {
    return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      ? "valid"
      : "corrupt";
  }
  if (extension === ".jpg" || extension === ".jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 ? "valid" : "corrupt";
  }
  return "not-checked";
}

function corpusLayer(relativePath) {
  if (relativePath.startsWith("SAUVEGARDE_SECURITE_")) return "safety-backup";
  if (relativePath.startsWith("SAUVEGARDE_STRUCTURE_")) return "structure-backup";
  if (relativePath.startsWith("99_ARCHIVES_ET_DOUBLONS/")) return "archive";
  if (relativePath.startsWith("CE1-Academie-Kerboeuf/")) return "historical-tree";
  if (relativePath.startsWith("Sequences CE1 ")) return "historical-sequences";
  if (relativePath.startsWith("TAPUSCRIT/")) return "historical-tapuscrits";
  if (/^(0\d|1[0-2])_/.test(relativePath)) return "active-tree";
  return "unclassified";
}

const records = walk(source).sort().map((absolutePath) => {
  const buffer = fs.readFileSync(absolutePath);
  const relativePath = path.relative(source, absolutePath);
  const extension = extensionOf(absolutePath);
  return {
    relativePath,
    basename: path.basename(absolutePath),
    extension,
    bytes: buffer.length,
    sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
    integrity: inspectMagic(buffer, extension),
    layer: corpusLayer(relativePath),
  };
});

const byHash = Map.groupBy(records, (record) => record.sha256);
const byBasename = Map.groupBy(records, (record) => record.basename.toLocaleLowerCase("fr"));
const countBy = (key) => Object.fromEntries(
  [...Map.groupBy(records, (record) => record[key])]
    .map(([value, matches]) => [value, matches.length])
    .sort(([left], [right]) => left.localeCompare(right)),
);

const duplicateGroups = [...byHash]
  .filter(([, matches]) => matches.length > 1)
  .map(([sha256, matches]) => ({ sha256, count: matches.length, paths: matches.map((match) => match.relativePath) }));

const variants = [...byBasename]
  .filter(([, matches]) => new Set(matches.map((match) => match.sha256)).size > 1)
  .map(([basename, matches]) => ({
    basename,
    hashes: [...new Set(matches.map((match) => match.sha256))],
    paths: matches.map((match) => match.relativePath),
  }));

const uniquePdfGroups = [...byHash]
  .filter(([, matches]) => matches[0].extension === ".pdf")
  .map(([sha256, matches]) => ({ sha256, occurrences: matches.length, paths: matches.map((match) => match.relativePath) }));

const report = {
  generatedAt: new Date().toISOString(),
  source,
  summary: {
    filesExamined: records.length,
    uniqueContents: byHash.size,
    duplicateGroups: duplicateGroups.length,
    duplicateOccurrencesBeyondFirst: records.length - byHash.size,
    variants: variants.length,
    corruptOccurrences: records.filter((record) => record.integrity === "corrupt").length,
    corruptUniqueContents: new Set(records.filter((record) => record.integrity === "corrupt").map((record) => record.sha256)).size,
    pdfOccurrences: records.filter((record) => record.extension === ".pdf").length,
    uniquePdfs: uniquePdfGroups.length,
  },
  extensions: countBy("extension"),
  layers: countBy("layer"),
  corrupt: records.filter((record) => record.integrity === "corrupt"),
  variants,
  uniquePdfGroups,
  duplicateGroups,
  files: records,
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));
