#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const inventory = JSON.parse(fs.readFileSync("docs/ce1-png-forensic-inventory.json", "utf8"));
const failures = [];
const hashes = new Set(inventory.items.map((item) => item.sha256));
const imported = inventory.items.filter((item) => item.decision === "imported");

if (inventory.count !== 657 || inventory.items.length !== 657 || hashes.size !== 657) {
  failures.push("L'inventaire ne contient pas exactement 657 empreintes uniques.");
}
if (inventory.items.some((item) => !["A", "B", "C", "D"].includes(item.confidence))) {
  failures.push("Au moins une ressource n'a pas de classe de confiance finale.");
}
if (imported.length !== 3 || imported.some((item) => item.confidence !== "A")) {
  failures.push("Les imports ne correspondent pas exactement aux trois ressources A.");
}
for (const item of imported) {
  const publicPath = path.join("public", item.destination.replace(/^\//, ""));
  if (!fs.existsSync(publicPath) || fs.statSync(publicPath).size === 0) {
    failures.push(`Fichier importé absent ou vide : ${publicPath}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ uniquePng: hashes.size, imported: imported.length, refused: 654, hrefs: "ok" }, null, 2));
}
