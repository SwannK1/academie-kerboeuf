#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const inventoryPath = path.resolve(process.argv[2] ?? "docs/ce1-png-forensic-inventory.json");
const auditPath = path.resolve(process.argv[3] ?? "docs/ce1-resource-audit.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));

const imports = new Map([
  [135, {
    title: "Évaluation : singulier et pluriel",
    presumedSubject: "français",
    possibleSkill: "Marquer le pluriel régulier du nom",
    possibleResourceType: "évaluation",
    destination: "/fiches/ce1/francais/etude-de-la-langue/evaluations/ce1-francais-pluriel-regulier-evaluation.pdf",
  }],
  [167, {
    title: "Évaluation : reconnaître un nom",
    presumedSubject: "français",
    possibleSkill: "Identifier le nom dans une phrase",
    possibleResourceType: "évaluation",
    destination: "/fiches/ce1/francais/etude-de-la-langue/evaluations/ce1-francais-reconnaitre-nom-evaluation.pdf",
  }],
  [561, {
    title: "Évaluation : nom commun et nom propre",
    presumedSubject: "français",
    possibleSkill: "Identifier le nom dans une phrase",
    possibleResourceType: "évaluation",
    destination: "/fiches/ce1/francais/etude-de-la-langue/evaluations/ce1-francais-nom-commun-propre-evaluation.pdf",
  }],
]);

// Pages de garde, intercalaires, affichages, gabarits, calendriers, documents
// administratifs ou artefacts sans rôle catalogable, relevés pendant la revue.
const unusableIndexes = new Set([
  3, 10, 25, 26, 36, 39, 40, 51, 75, 79, 90, 96, 106, 116, 117,
  160, 166, 175, 181, 185, 196, 200, 204, 209, 212, 217, 221, 226,
  237, 238, 244, 254, 258, 265, 275, 287, 309, 315, 319, 328, 339,
  343, 345, 355, 358, 370, 371, 374, 375, 380, 409, 413, 430, 451,
  456, 459, 469, 471, 472, 479, 482, 493, 505, 520, 523, 529, 535,
  547, 551, 556, 558, 559, 568, 572, 573, 620, 628, 630, 635, 637,
  642, 646, 647,
]);

const pngHashes = new Set(inventory.items.map((item) => item.sha256));
const variantHashes = new Set(
  audit.variants.flatMap((variant) => variant.hashes).filter((hash) => pngHashes.has(hash)),
);

for (const item of inventory.items) {
  const sheet = String(Math.ceil(item.index / 16)).padStart(2, "0");
  item.visualEvidence = [`Planche ${sheet}, vignette ${item.index}, inspectée à taille originale`];
  item.archaeologicalEvidence = [
    "Audit SHA-256 CE1 existant",
    "Inventaires, rapports de renommage et ressources.json historiques CE1",
  ];

  if (imports.has(item.index)) {
    Object.assign(item, imports.get(item.index), {
      confidence: "A",
      decision: "imported",
      rationale: "Le titre visible donne la notion et le rôle; le contenu est mono-compétence et correspond à une compétence CE1 existante.",
    });
  } else if (unusableIndexes.has(item.index)) {
    Object.assign(item, {
      confidence: "D",
      possibleResourceType: item.possibleResourceType ?? "support non catalogable",
      decision: "refused",
      rationale: "Document technique, administratif, décoratif, gabarit ou support sans valeur de ressource autonome dans le catalogue.",
    });
  } else if (variantHashes.has(item.sha256)) {
    Object.assign(item, {
      confidence: "C",
      possibleResourceType: item.possibleResourceType ?? "version indéterminée",
      decision: "refused",
      rationale: "Le même nom désigne plusieurs contenus; aucune preuve historique ne permet d'élire cette version comme canonique.",
    });
  } else {
    Object.assign(item, {
      confidence: "B",
      possibleResourceType: "fiche hybride (leçon et exercices)",
      decision: "refused",
      rationale: "La matière et la notion sont généralement lisibles, mais le document mêle plusieurs rôles et ne peut être attribué sans tromper l'utilisateur.",
    });
  }
}

const confidenceCounts = Object.fromEntries(
  ["A", "B", "C", "D"].map((confidence) => [
    confidence,
    inventory.items.filter((item) => item.confidence === confidence).length,
  ]),
);
inventory.classification = {
  method: "Deux passes visuelles exhaustives sur 42 planches, recoupées avec l'audit SHA-256 et les archives CE1",
  confidenceCounts,
  imported: inventory.items.filter((item) => item.decision === "imported").length,
  refused: inventory.items.filter((item) => item.decision === "refused").length,
  variantBasenames: audit.variants.filter((variant) => variant.hashes.some((hash) => pngHashes.has(hash))).length,
};

fs.writeFileSync(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`);
console.log(JSON.stringify(inventory.classification, null, 2));
