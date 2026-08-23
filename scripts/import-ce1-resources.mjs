#!/usr/bin/env node

/**
 * Script d'import sécurisé pour ressources CE1
 * Académie Kerboeuf - Import des ressources CE1 depuis dossier local
 *
 * Usage:
 *   npm run import:resources -- "/path/to/CE1 - QUATREMAIRE" --dry-run
 *   npm run import:resources -- "/path/to/CE1 - QUATREMAIRE" --apply
 *
 * Options:
 *   --dry-run : Simulation sans copie (défaut)
 *   --apply   : Exécute l'import réel (NON IMPLÉMENTÉ - À USAGE FUTUR)
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import {
  CE1_CATALOG,
  FOLDER_MAPPING,
  FILE_PATTERNS,
  EXCLUDED_EXTENSIONS,
  EXCLUDED_FOLDERS,
  getAllValidSlugs,
} from "./import-ce1-resources.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// ============================================================================
// CONFIGURATION
// ============================================================================

const args = process.argv.slice(2);
const sourcePath = args[0];
const isDryRun = args.includes("--dry-run") || !args.includes("--apply");

if (!sourcePath) {
  console.error("\n❌ Erreur : Veuillez spécifier le chemin du dossier CE1");
  console.error(
    "\nUsage: npm run import:resources -- \"/path/to/CE1 - QUATREMAIRE\" --dry-run"
  );
  process.exit(1);
}

if (!fs.existsSync(sourcePath)) {
  console.error(`\n❌ Erreur : Le chemin n'existe pas : ${sourcePath}`);
  process.exit(1);
}

// ============================================================================
// ÉTAT GLOBAL
// ============================================================================

const importState = {
  processedFiles: [],
  identifiedFiles: [],
  filesToVerify: [],
  duplicates: new Map(), // hash → [ files ]
  errors: [],
  scannedAllFiles: [], // TOUS les fichiers scanné (avant exclusion)
  excludedFiles: [], // Fichiers exclus avant analyse
  stats: {
    totalScanned: 0, // Fichiers trouvés sur disque (avant exclusion)
    totalExcluded: 0, // Fichiers exclus
    totalAnalyzed: 0, // Fichiers effectivement analysés
    uniqueFiles: 0, // Fichiers uniques par hash
    duplicateCount: 0, // Nombre de fichiers en double (au-delà du premier)
    identifiedCount: 0,
    toVerifyCount: 0,
    errorCount: 0,
    extensions: new Map(), // Compte par extension
    domains: new Map(), // Compte par domaine
    types: new Map(), // Compte par type
  },
};

const validSlugs = getAllValidSlugs();

// ============================================================================
// UTILITAIRES
// ============================================================================

/**
 * Calcule le SHA-256 d'un fichier
 */
function calculateFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(content).digest("hex");
  } catch (err) {
    return null;
  }
}

/**
 * Vérifie si un fichier doit être exclu
 */
function shouldExcludeFile(filePath, fileName) {
  // Vérifier les extensions exclues
  for (const ext of EXCLUDED_EXTENSIONS) {
    if (fileName.toLowerCase().endsWith(ext)) {
      return true;
    }
  }

  // Vérifier les dossiers exclus
  for (const folder of EXCLUDED_FOLDERS) {
    if (filePath.includes(folder)) {
      return true;
    }
  }

  // Fichiers système macOS
  if (fileName.startsWith(".")) {
    return true;
  }

  // Exclure les fichiers au racine du CE1 (sauf les dossiers 00-12)
  // Cela évite d'importer les fichiers PNG/MD/SH techniques au racine
  const relativePath = path.relative(sourcePath, filePath);
  const pathParts = relativePath.split(path.sep);
  const isRootFile = pathParts.length === 1;
  const isInValidFolder = /^(0\d|1[0-2])_/.test(pathParts[0]);

  if (isRootFile || (!isInValidFolder && pathParts.length > 1)) {
    // Exclure explicitement les PNG/MD/Autres fichiers suspects au racine
    if (
      fileName.endsWith(".png") ||
      fileName.endsWith(".md") ||
      fileName.endsWith(".sh") ||
      fileName.endsWith(".json") ||
      fileName.startsWith("XX_") ||
      fileName.includes("RAPPORT_") ||
      fileName.includes("SIMULATION_") ||
      fileName.includes("INVENTAIRE_")
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Parcourt récursivement le dossier et retourne les fichiers
 */
function walkDirectory(dir, baseDir = dir) {
  let files = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      if (entry.isDirectory()) {
        if (!shouldExcludeFile(fullPath, entry.name)) {
          files = files.concat(walkDirectory(fullPath, baseDir));
        }
      } else if (entry.isFile()) {
        // Enregistrer TOUS les fichiers trouvés d'abord
        importState.scannedAllFiles.push(relativePath);

        if (!shouldExcludeFile(fullPath, entry.name)) {
          files.push({
            fullPath,
            relativePath,
            name: entry.name,
          });
        } else {
          // Enregistrer les fichiers exclus
          importState.excludedFiles.push(relativePath);
        }
      }
    }
  } catch (err) {
    importState.errors.push(`Erreur de lecture : ${dir} - ${err.message}`);
  }

  return files;
}

/**
 * Extrait le domaine et sous-domaine d'un chemin de fichier
 */
function extractDomainFromPath(relativePath) {
  // Chercher une correspondance exacte dans FOLDER_MAPPING
  const folderParts = relativePath.split(path.sep);

  for (let i = folderParts.length; i > 0; i--) {
    const potentialFolder = folderParts.slice(0, i).join("/");

    if (FOLDER_MAPPING[potentialFolder]) {
      return {
        folder: potentialFolder,
        ...FOLDER_MAPPING[potentialFolder],
      };
    }
  }

  // Si pas de correspondance, retourner null (orphelin)
  return null;
}

/**
 * Analyse un fichier et extrait ses métadonnées
 */
function analyzeFile(file, baseDir) {
  const { fullPath, relativePath, name } = file;
  const ext = path.extname(name).toLowerCase();
  const hash = calculateFileHash(fullPath);

  // Enregistrer le hash pour détecter les doublons
  if (hash) {
    if (!importState.duplicates.has(hash)) {
      importState.duplicates.set(hash, []);
    }
    importState.duplicates.get(hash).push(relativePath);
  }

  // Extraire domaine/subdomain du chemin
  const domainInfo = extractDomainFromPath(relativePath);

  // Analyser le nom du fichier pour la confiance
  let confidence = "low";
  let detectionMethod = "path";
  let typeDetected = "unknown";
  let resourceType = null;

  // Appliquer les patterns
  for (const [key, pattern] of Object.entries(FILE_PATTERNS)) {
    if (pattern.pattern.test(name)) {
      confidence = pattern.confidence;
      typeDetected = pattern.type;
      if (pattern.domain) {
        detectionMethod = `pattern-${key}`;
      }
      break;
    }
  }

  // Améliorer la confiance basée sur le domaine détecté
  if (domainInfo && domainInfo.domain) {
    if (confidence === "low") confidence = "medium";
    if (confidence === "medium") confidence = "medium";
  }

  // Classer les contes PDF comme "identifiés"
  if (ext === ".pdf" && name.includes("Conte")) {
    confidence = "high";
    typeDetected = "conte-litteraire";
    detectionMethod = "pattern-conte";
    resourceType = "conte";
  }

  // PNG numérotés sans métadonnées → À vérifier
  if (ext === ".png" && /Sequence_\d+/.test(name) && !domainInfo?.subgroup) {
    confidence = "low";
    resourceType = "needs-verification";
  }

  // Générer nom canonique
  const canonicalName = generateCanonicalName(
    name,
    domainInfo,
    confidence,
    ext
  );

  return {
    originalPath: relativePath,
    originalName: name,
    canonicalName,
    fileHash: hash,
    extension: ext,
    size: fs.statSync(fullPath).size,
    domain: domainInfo?.domain || null,
    subdomain: domainInfo?.subdomain || null,
    subgroup: domainInfo?.subgroup || null,
    folderType: domainInfo?.type || null,
    detectionMethod,
    confidence,
    typeDetected,
    resourceType,
    isIdentified: confidence === "high",
    needsVerification: confidence !== "high",
  };
}

/**
 * Génère un nom canonique pour le fichier
 */
function generateCanonicalName(
  originalName,
  domainInfo,
  confidence,
  ext
) {
  const baseName = path.parse(originalName).name;
  let canonical = baseName;

  if (domainInfo?.domain) {
    canonical = `${domainInfo.domain}-${baseName}`;
  }

  if (confidence !== "high") {
    canonical += "-TO-VERIFY";
  }

  return canonical + ext;
}

/**
 * Détecte les doublons par hash
 */
function detectDuplicates() {
  let totalWithDuplicates = 0;
  for (const [hash, files] of importState.duplicates.entries()) {
    if (files.length > 1) {
      // Chaque groupe de doublons compte le premier une fois + les extras
      totalWithDuplicates += 1; // Le fichier principal
      importState.stats.duplicateCount += files.length - 1; // Les doublons au-delà du premier
      importState.errors.push(
        `Doublon détecté (${hash.substring(0, 8)}...): ${files.join(", ")}`
      );
    } else {
      totalWithDuplicates += 1; // Fichier unique
    }
  }
  importState.stats.uniqueFiles = totalWithDuplicates;
}

/**
 * Catégorise les fichiers
 */
function categorizeFiles() {
  for (const file of importState.processedFiles) {
    if (file.isIdentified) {
      importState.identifiedFiles.push(file);
      importState.stats.identifiedCount++;
    } else if (file.needsVerification) {
      importState.filesToVerify.push(file);
      importState.stats.toVerifyCount++;
    }

    // Compter par extension
    const ext = file.extension || "unknown";
    importState.stats.extensions.set(
      ext,
      (importState.stats.extensions.get(ext) || 0) + 1
    );

    // Compter par domaine
    const domain = file.domain || "orphelins";
    importState.stats.domains.set(
      domain,
      (importState.stats.domains.get(domain) || 0) + 1
    );

    // Compter par type
    const type = file.typeDetected || "unknown";
    importState.stats.types.set(type, (importState.stats.types.get(type) || 0) + 1);
  }
}

/**
 * Valide les invariants statistiques
 */
function validateInvariants() {
  const invariants = [];

  // Invariant 1 : scanned = analyzed + excluded
  const inv1Pass =
    importState.stats.totalScanned ===
    importState.stats.totalAnalyzed + importState.stats.totalExcluded;
  invariants.push({
    name: "scanned = analyzed + excluded",
    pass: inv1Pass,
    values: `${importState.stats.totalScanned} = ${importState.stats.totalAnalyzed} + ${importState.stats.totalExcluded}`,
  });

  // Invariant 2 : analyzed = identified + to_verify
  const inv2Pass =
    importState.stats.totalAnalyzed ===
    importState.stats.identifiedCount + importState.stats.toVerifyCount;
  invariants.push({
    name: "analyzed = identified + to_verify",
    pass: inv2Pass,
    values: `${importState.stats.totalAnalyzed} = ${importState.stats.identifiedCount} + ${importState.stats.toVerifyCount}`,
  });

  // Invariant 3 : unique + duplicates = analyzed
  const inv3Pass =
    importState.stats.uniqueFiles + importState.stats.duplicateCount ===
    importState.stats.totalAnalyzed;
  invariants.push({
    name: "unique + duplicates = analyzed",
    pass: inv3Pass,
    values: `${importState.stats.uniqueFiles} + ${importState.stats.duplicateCount} = ${importState.stats.totalAnalyzed}`,
  });

  // Invariant 4 : Aucune catégorie > total
  const inv4Pass =
    Array.from(importState.stats.extensions.values()).every(
      (v) => v <= importState.stats.totalAnalyzed
    ) &&
    Array.from(importState.stats.domains.values()).every(
      (v) => v <= importState.stats.totalAnalyzed
    );
  invariants.push({
    name: "no_category_exceeds_total",
    pass: inv4Pass,
    values: "Toutes les catégories <= total",
  });

  // Afficher les résultats
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║          VÉRIFICATION DES INVARIANTS STATISTIQUES           ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  let allPass = true;
  for (const inv of invariants) {
    const status = inv.pass ? "✅ PASS" : "❌ FAIL";
    console.log(`${status} | ${inv.name}`);
    console.log(`       ${inv.values}\n`);
    if (!inv.pass) allPass = false;
  }

  if (!allPass) {
    console.error("\n❌ ERREUR CRITIQUE : Les invariants statistiques sont INCOHÉRENTS");
    console.error("Impossible de générer les rapports en confiance.");
    process.exit(1);
  }

  console.log("✅ Tous les invariants sont VALIDES\n");
  return true;
}

/**
 * Génère le rapport dry-run
 */
function generateDryRunReport() {
  const reportPath = path.join(projectRoot, "docs", "import-ce1-dry-run.md");
  const docsDir = path.dirname(reportPath);

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();
  const report = `# Rapport d'Import CE1 - Simulation (Dry-Run)

**Date** : ${timestamp}
**Mode** : Dry-run (aucune copie réelle)
**Source** : ${sourcePath}
**Destination** : Académie Kerboeuf (Next.js)

---

## Résumé Statistique

| Métrique | Valeur |
|----------|--------|
| **Total fichiers analysés** | ${importState.stats.totalAnalyzed} |
| **Fichiers identifiés** | ${importState.stats.identifiedCount} ✅ |
| **Fichiers à vérifier** | ${importState.stats.toVerifyCount} ⚠️ |
| **Doublons détectés** | ${importState.stats.duplicateCount} 🔄 |
| **Erreurs** | ${importState.stats.errorCount} ❌ |

---

## Fichiers Identifiés (${importState.stats.identifiedCount})

Ces fichiers ont une confiance **ÉLEVÉE** et peuvent être importés immédiatement.

### Contes Littéraires PDF (Lecture / Compréhension)

\`\`\`
Domaine : Français
Sous-domaine : Compréhension
Type : Ressource littéraire
Confiance : ÉLEVÉE ✅
\`\`\`

| # | Nom Original | Nom Canonique | Domaine | Sous-domaine | Hash |
|---|---|---|---|---|---|
${importState.identifiedFiles
  .filter((f) => f.extension === ".pdf")
  .map(
    (f, i) => `| ${i + 1} | \`${f.originalName}\` | \`${f.canonicalName}\` | ${f.domain || "-"} | ${f.subdomain || "-"} | \`${f.fileHash.substring(0, 8)}...\` |`
  )
  .join("\n")}

**Total PDF contes** : ${importState.identifiedFiles.filter((f) => f.extension === ".pdf").length}

---

## Fichiers à Vérifier (${importState.stats.toVerifyCount})

Ces fichiers ont une confiance **BASSE** ou **MOYENNE** et nécessitent une vérification manuelle.
**⚠️ NE PAS inventer de métadonnées** - Les PNG sans métadonnées restent sans titre/compétence attribués.

### PNG Numérotés (Séquences et Fiches)

**Caractéristiques** :
- Format : PNG
- Patterns : \`01_FRANCAIS_Sequence_XXX_Document.png\`
- Métadonnées : Aucune (numérotation uniquement)
- Action requise : Inspection manuelle du contenu

\`\`\`
Domaine : Détecté par dossier parent (si disponible)
Sous-domaine : À déterminer
Compétence : À déterminer (PAS D'INVENTION)
Confiance : BASSE/MOYENNE ⚠️
\`\`\`

| # | Nom Original | Domaine | Sous-domaine | Détection | Hash | Status |
|---|---|---|---|---|---|---|
${importState.filesToVerify
  .slice(0, 50)
  .map(
    (f, i) => `| ${i + 1} | \`${f.originalName}\` | ${f.domain || "❌ Orphelin"} | ${f.subdomain || "-"} | ${f.detectionMethod} | \`${f.fileHash ? f.fileHash.substring(0, 8) : "N/A"}...\` | À vérifier |`
  )
  .join("\n")}

${importState.filesToVerify.length > 50 ? `\n**... et ${importState.filesToVerify.length - 50} autres fichiers à vérifier**\n` : ""}

**Total fichiers à vérifier** : ${importState.stats.toVerifyCount}

### Répartition par Type

| Type | Nombre | Domaine Probable |
|------|--------|------------------|
| Séquences PNG (Français) | ${importState.filesToVerify.filter((f) => f.domain === "francais").length} | Français |
| Séquences PNG (Maths) | ${importState.filesToVerify.filter((f) => f.domain === "mathematiques").length} | Mathématiques |
| Séquences PNG (EPS) | ${importState.filesToVerify.filter((f) => f.domain === "eps").length} | EPS |
| Fichiers orphelins | ${importState.filesToVerify.filter((f) => !f.domain).length} | À déterminer |

---

## Doublons Détectés

**Total doublons** : ${importState.stats.duplicateCount}

${
  importState.stats.duplicateCount > 0
    ? `\n| Hash | Fichiers |
|------|----------|
${Array.from(importState.duplicates.entries())
  .filter(([_, files]) => files.length > 1)
  .map(
    ([hash, files]) =>
      `| \`${hash.substring(0, 16)}...\` | ${files.map((f) => `\`${f}\``).join(" / ")} |`
  )
  .join("\n")}
`
    : "\nAucun doublon détecté."
}

---

## Erreurs et Avertissements

**Total erreurs** : ${importState.stats.errorCount}

${
  importState.errors.length > 0
    ? importState.errors
        .slice(0, 20)
        .map((err, i) => `${i + 1}. ⚠️ ${err}`)
        .join("\n")
    : "Aucune erreur détectée."
}

${importState.errors.length > 20 ? `\n... et ${importState.errors.length - 20} autres erreurs` : ""}

---

## Recommandations

### Pour les fichiers identifiés ✅
1. Tous les contes PDF peuvent être importés directement
2. Ils seront placés dans : \`/primaire/ce1/francais/comprehension/\`
3. Vérifier les noms de fichiers : aucun doublon détecté

### Pour les fichiers à vérifier ⚠️
1. **PNG numérotés** : Ne pas inventer de compétences
2. **Inspection requise** : Ouvrir les fichiers pour déterminer le sujet exact
3. **Orphelins** : Les fichiers sans domaine détecté doivent être classés manuellement
4. **Doublons** : Fusionner ou supprimer les fichiers dupliqués avant import

### Prochaines étapes
1. Valider les fichiers à vérifier manuellement
2. Créer un mapping : Numéro de séquence → Titre/Compétence
3. Exécuter l'import avec \`--apply\` (à implémenter)

---

## Catalogue CE1 Valide

### Domaines disponibles
${Array.from(Object.entries(CE1_CATALOG))
  .map(
    ([key, domain]) =>
      `- **${domain.title}** (\`${domain.slug}\`): ${Object.values(domain.subdomains).length} sous-domaines`
  )
  .join("\n")}

### Tous les slugs valides
${Array.from(validSlugs)
  .sort()
  .map((slug) => `- \`${slug}\``)
  .join("\n")}

---

## Commande d'import réel (Futur)

\`\`\`bash
npm run import:resources -- "${sourcePath}" --apply
\`\`\`

**⚠️ Cette commande n'est pas encore implémentée.**

---

*Rapport généré automatiquement - ${timestamp}*
*Mode : Simulation (aucune action réelle)*
`;

  fs.writeFileSync(reportPath, report, "utf-8");
  console.log(`\n✅ Rapport dry-run généré : ${reportPath}`);

  return reportPath;
}

/**
 * Génère le rapport des fichiers à vérifier
 */
function generateToVerifyReport() {
  const reportPath = path.join(
    projectRoot,
    "docs",
    "import-ce1-a-verifier.md"
  );
  const docsDir = path.dirname(reportPath);

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();
  const report = `# Fichiers à Vérifier - Import CE1

**Date** : ${timestamp}
**Total** : ${importState.stats.toVerifyCount} fichiers

---

## Summary

${importState.stats.toVerifyCount} fichiers nécessitent une vérification manuelle avant import.
**⚠️ NE PAS INVENTER de métadonnées** - Inspecter le contenu réel de chaque fichier.

---

## Fichiers par Domaine

### Français (${importState.filesToVerify.filter((f) => f.domain === "francais").length} fichiers)

| # | Nom | Sous-domaine | Détection | Hash |
|---|---|---|---|---|
${importState.filesToVerify
  .filter((f) => f.domain === "francais")
  .map(
    (f, i) => `| ${i + 1} | \`${f.originalName}\` | ${f.subdomain || "-"} | ${f.detectionMethod} | \`${f.fileHash.substring(0, 8)}...\` |`
  )
  .join("\n")}

### Mathématiques (${importState.filesToVerify.filter((f) => f.domain === "mathematiques").length} fichiers)

| # | Nom | Détection | Hash |
|---|---|---|---|
${importState.filesToVerify
  .filter((f) => f.domain === "mathematiques")
  .map(
    (f, i) => `| ${i + 1} | \`${f.originalName}\` | ${f.detectionMethod} | \`${f.fileHash.substring(0, 8)}...\` |`
  )
  .join("\n")}

### EPS (${importState.filesToVerify.filter((f) => f.domain === "eps").length} fichiers)

| # | Nom | Détection | Hash |
|---|---|---|---|
${importState.filesToVerify
  .filter((f) => f.domain === "eps")
  .map(
    (f, i) => `| ${i + 1} | \`${f.originalName}\` | ${f.detectionMethod} | \`${f.fileHash.substring(0, 8)}...\` |`
  )
  .join("\n")}

### Orphelins (${importState.filesToVerify.filter((f) => !f.domain).length} fichiers)

| # | Nom | Hash |
|---|---|---|
${importState.filesToVerify
  .filter((f) => !f.domain)
  .map(
    (f, i) => `| ${i + 1} | \`${f.originalName}\` | \`${f.fileHash.substring(0, 8)}...\` |`
  )
  .join("\n")}

---

## Instructions de Vérification

1. **Ouvrir chaque fichier** pour déterminer son contenu exact
2. **Identifier le sujet** (ex: "Accords du verbe", "Numération jusqu'à 100")
3. **Mapper au catalogue** CE1 (domaine → sous-domaine → compétence)
4. **NE PAS INVENTER** de titres ou compétences
5. **Documenter le mapping** pour utilisation lors de l'import réel

---

*Rapport généré automatiquement - ${timestamp}*
`;

  fs.writeFileSync(reportPath, report, "utf-8");
  console.log(`✅ Rapport à vérifier généré : ${reportPath}`);

  return reportPath;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║   IMPORT SÉCURISÉ - RESSOURCES CE1 ACADÉMIE KERBOEUF       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  console.log(`\nMode : ${isDryRun ? "DRY-RUN (simulation)" : "APPLY (réel)"}`);
  console.log(`Source : ${sourcePath}`);
  console.log(`\n⏳ Analyse en cours...\n`);

  // Parcourir les fichiers
  const files = walkDirectory(sourcePath);
  importState.stats.totalScanned = importState.scannedAllFiles.length;
  importState.stats.totalExcluded = importState.excludedFiles.length;
  importState.stats.totalAnalyzed = files.length;

  console.log(`✅ ${importState.stats.totalScanned} fichiers trouvés`);
  console.log(`   - ${importState.stats.totalAnalyzed} à analyser`);
  console.log(`   - ${importState.stats.totalExcluded} exclus avant analyse\n`);

  // Analyser chaque fichier
  console.log("🔍 Analyse des fichiers...");
  for (const file of files) {
    const analyzed = analyzeFile(file, sourcePath);
    importState.processedFiles.push(analyzed);
  }

  console.log(`✅ Analyse terminée\n`);

  // Détecter les doublons
  console.log("🔎 Détection des doublons...");
  detectDuplicates();
  if (importState.stats.duplicateCount === 0) {
    console.log("✅ Aucun doublon détecté\n");
  } else {
    console.log(
      `⚠️ ${importState.stats.duplicateCount} doublons détectés\n`
    );
  }

  // Catégoriser les fichiers
  console.log("📂 Catégorisation...");
  categorizeFiles();
  console.log(
    `✅ Catégorisation terminée\n   - ${importState.stats.identifiedCount} identifiés ✅\n   - ${importState.stats.toVerifyCount} à vérifier ⚠️\n`
  );

  // Compter les erreurs
  importState.stats.errorCount = importState.errors.length;

  // Valider les invariants AVANT de générer les rapports
  console.log("🔐 Validation des invariants...");
  const invariantsValid = validateInvariants();

  if (!invariantsValid) {
    console.error("\n❌ IMPOSSIBLE DE CONTINUER : Les statistiques sont incohérentes");
    process.exit(1);
  }

  // Générer les rapports
  console.log("📝 Génération des rapports...\n");
  generateDryRunReport();
  generateToVerifyReport();

  // Afficher les statistiques finales détaillées
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║              STATISTIQUES FINALES DÉTAILLÉES                ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("=== SCAN ET ANALYSE ===");
  console.log(
    `Fichiers physiques scannés    : ${importState.stats.totalScanned}`
  );
  console.log(
    `Fichiers exclus avant analyse : ${importState.stats.totalExcluded}`
  );
  console.log(
    `Fichiers analysés             : ${importState.stats.totalAnalyzed}`
  );
  console.log(
    `Fichiers uniques (par hash)   : ${importState.stats.uniqueFiles}`
  );
  console.log(
    `Doublons exacts détectés      : ${importState.stats.duplicateCount}`
  );
  console.log();

  console.log("=== CATÉGORISATION ===");
  console.log(
    `Fichiers identifiés (confiance HAUTE)   : ${importState.stats.identifiedCount} ✅`
  );
  console.log(
    `Fichiers à vérifier (confiance BASSE)   : ${importState.stats.toVerifyCount} ⚠️`
  );
  console.log();

  console.log("=== RÉPARTITION PAR EXTENSION ===");
  for (const [ext, count] of Array.from(
    importState.stats.extensions.entries()
  ).sort((a, b) => b[1] - a[1])) {
    const pct = (
      ((count / importState.stats.totalAnalyzed) * 100).toFixed(1)
    );
    console.log(`${ext || "sans extension".padEnd(15)} : ${count.toString().padStart(4)} (${pct}%)`);
  }
  console.log();

  console.log("=== RÉPARTITION PAR DOMAINE ===");
  for (const [domain, count] of Array.from(
    importState.stats.domains.entries()
  ).sort((a, b) => b[1] - a[1])) {
    const pct = (
      ((count / importState.stats.totalAnalyzed) * 100).toFixed(1)
    );
    console.log(`${domain.padEnd(20)} : ${count.toString().padStart(4)} (${pct}%)`);
  }
  console.log();

  console.log("=== RÉPARTITION PAR TYPE DÉTECTÉ ===");
  for (const [type, count] of Array.from(importState.stats.types.entries()).sort(
    (a, b) => b[1] - a[1]
  )) {
    const pct = (
      ((count / importState.stats.totalAnalyzed) * 100).toFixed(1)
    );
    console.log(
      `${type.padEnd(25)} : ${count.toString().padStart(4)} (${pct}%)`
    );
  }
  console.log();

  console.log("=== RÉSUMÉ FINAL ===");
  console.log(
    `Total fichiers traités      : ${importState.stats.totalScanned}`
  );
  console.log(
    `Fichiers identifiés ✅      : ${importState.stats.identifiedCount}`
  );
  console.log(
    `Fichiers à vérifier ⚠️       : ${importState.stats.toVerifyCount}`
  );
  console.log(
    `Doublons détectés 🔄        : ${importState.stats.duplicateCount}`
  );
  console.log(
    `Erreurs ❌                   : ${importState.stats.errorCount}`
  );
  console.log();

  if (isDryRun) {
    console.log("✅ Simulation terminée - Aucun fichier n'a été copié\n");
    console.log("Consultez les rapports pour les détails:\n");
    console.log("  - docs/import-ce1-dry-run.md (rapport complet)\n");
    console.log("  - docs/import-ce1-a-verifier.md (fichiers ambigus)\n");
  }
}

// Lancer le script
main().catch((err) => {
  console.error("\n❌ Erreur fatale :", err);
  process.exit(1);
});
