#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(process.argv[2] ?? "/Users/swann/Desktop/CE1 - QUATREMAIRE");
const auditPath = path.resolve(process.argv[3] ?? "docs/ce1-resource-audit.json");
const outputPath = path.resolve(process.argv[4] ?? "docs/ce1-png-forensic-inventory.json");
const sheetsDirectory = path.resolve(process.argv[5] ?? "/tmp/ce1-png-forensic-sheets");

const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
const pngFiles = audit.files.filter(
  (file) => file.extension === ".png" && file.integrity === "valid",
);
const filesByHash = Map.groupBy(pngFiles, (file) => file.sha256);

function evidenceRank(file) {
  const ranks = {
    "active-tree": 0,
    "historical-tree": 1,
    "historical-sequences": 2,
    unclassified: 3,
    archive: 4,
    "safety-backup": 5,
    "structure-backup": 6,
  };
  return ranks[file.layer] ?? 99;
}

function possibleSequence(paths) {
  const values = paths.flatMap((candidate) => {
    const match = candidate.match(/(?:sequence|notionnelle)[_-](\d{1,3})/i);
    return match ? [Number(match[1])] : [];
  });
  return [...new Set(values)].sort((left, right) => left - right);
}

function presumedSubject(paths) {
  const joined = paths.join(" ").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const candidates = [
    ["francais", "français"],
    ["mathematiques", "mathématiques"],
    ["questionner_le_monde", "questionner-le-monde"],
    ["qlm", "questionner-le-monde"],
    ["eps", "eps"],
    ["anglais", "anglais"],
    ["arts", "arts-plastiques"],
    ["musique", "éducation-musicale"],
  ];
  return candidates.find(([needle]) => joined.includes(needle))?.[1] ?? null;
}

const inventory = [];
for (const [sha256, matches] of [...filesByHash].sort(([left], [right]) => left.localeCompare(right))) {
  const sortedMatches = [...matches].sort((left, right) =>
    evidenceRank(left) - evidenceRank(right) || left.relativePath.localeCompare(right.relativePath),
  );
  const representative = sortedMatches[0];
  const absolutePath = path.join(root, representative.relativePath);
  const metadata = await sharp(absolutePath).metadata();
  const paths = sortedMatches.map((match) => match.relativePath);
  inventory.push({
    index: inventory.length + 1,
    sha256,
    paths,
    name: representative.basename,
    folder: path.dirname(representative.relativePath),
    dimensions: { width: metadata.width, height: metadata.height },
    sequence: possibleSequence(paths),
    presumedSubject: presumedSubject(paths),
    possibleSkill: null,
    possibleResourceType: null,
    confidence: null,
    title: null,
    visualEvidence: [],
    archaeologicalEvidence: [],
    decision: "pending",
  });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify({ source: root, count: inventory.length, items: inventory }, null, 2)}\n`);

fs.mkdirSync(sheetsDirectory, { recursive: true });
const columns = 4;
const rows = 4;
const cellWidth = 420;
const cellHeight = 630;
const imageWidth = 400;
const imageHeight = 570;

for (let offset = 0; offset < inventory.length; offset += columns * rows) {
  const sheetNumber = String(Math.floor(offset / (columns * rows)) + 1).padStart(2, "0");
  const sheetPath = path.join(sheetsDirectory, `sheet-${sheetNumber}.png`);
  if (fs.existsSync(sheetPath)) continue;
  const page = inventory.slice(offset, offset + columns * rows);
  const composites = [];
  for (let slot = 0; slot < page.length; slot += 1) {
    const item = page[slot];
    const representativePath = path.join(root, item.paths[0]);
    const thumbnail = await sharp(representativePath)
      .resize(imageWidth, imageHeight, { fit: "inside", background: "white" })
      .flatten({ background: "white" })
      .png()
      .toBuffer();
    const left = (slot % columns) * cellWidth + 10;
    const top = Math.floor(slot / columns) * cellHeight + 45;
    composites.push({ input: thumbnail, left, top });
    composites.push({
      input: Buffer.from(`<svg width="${cellWidth}" height="40"><rect width="100%" height="100%" fill="#071a3d"/><text x="12" y="28" fill="white" font-size="22" font-family="Arial">#${item.index} · ${item.sha256.slice(0, 8)}</text></svg>`),
      left: (slot % columns) * cellWidth,
      top: Math.floor(slot / columns) * cellHeight,
    });
  }
  await sharp({
    create: {
      width: columns * cellWidth,
      height: rows * cellHeight,
      channels: 3,
      background: "#d9dde7",
    },
  }).composite(composites).png().toFile(sheetPath);
}

console.log(JSON.stringify({ inventory: inventory.length, sheets: Math.ceil(inventory.length / 16), outputPath, sheetsDirectory }, null, 2));
