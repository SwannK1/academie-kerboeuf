#!/usr/bin/env python3
"""
Construit l'index unique de la bibliothèque à partir des PDF réellement
présents dans public/fiches.

Règle : une ressource n'apparaît dans l'index que si son fichier existe.
Le titre, le domaine et l'objectif sont lus dans l'en-tête des PDF Kerboeuf
(« CE2 · MATHÉMATIQUES · NOMBRES ET CALCULS · LEÇON | Titre | Objectif : … »).
Pour les fiches CM2 sans couche texte, le titre vient des registres TS.

Sorties :
  content/resource-index.generated.json
  public/apercus/<unit-id>.jpg  (miniature de la première page, une par unité)

Usage : python3 scripts/build-resource-index.py
Dépendance locale uniquement : PyMuPDF (fitz). Le build Vercel lit le JSON
commité et n'exécute pas ce script.
"""

from __future__ import annotations

import json
import re
import unicodedata
from datetime import date
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FICHES = PUBLIC / "fiches"
APERCUS = PUBLIC / "apercus"
OUT = ROOT / "content" / "resource-index.generated.json"

EXCLUDED_LEVEL_DIRS = {"seconde"}  # lycée retiré du périmètre

LEVELS = ["ps", "ms", "gs", "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"]
CYCLE = {
    "ps": "1", "ms": "1", "gs": "1",
    "cp": "2", "ce1": "2", "ce2": "2",
    "cm1": "3", "cm2": "3", "6e": "3",
    "5e": "4", "4e": "4", "3e": "4",
}

SUBJECTS = {
    "francais": "francais",
    "francais-pdf": "francais",
    "mathematiques": "maths",
    "mathematiques-pdf": "maths",
    "langage": "langage",
    "anglais": "langues",
    "langues-vivantes": "langues",
    "histoire-geographie-emc": "hg-emc",
    "histoire-geographie": "hg-emc",
    "emc": "emc",
    "sciences-technologie": "sciences",
    "sciences": "sciences",
    "questionner-le-monde": "qlm",
    "eps": "eps",
    "arts-plastiques": "arts",
    "arts": "arts",
    "education-musicale": "arts",
}

TYPE_BY_SUFFIX = [
    ("fiche-atelier", "atelier"),
    ("grille-observation", "grille"),
    ("fiche-parent", "parent"),
    ("lecon", "lecon"),
    ("exercices", "exercices"),
    ("evaluation", "evaluation"),
    ("f1", "lecon"),
    ("f2", "exercices"),
    ("f3", "evaluation"),
]

TYPE_ORDER = {"lecon": 0, "exercices": 1, "evaluation": 2, "atelier": 0, "grille": 1, "parent": 2, "texte": 0}

HEADER_TYPE_WORDS = ("LEÇON", "LECON", "EXERCICES", "ÉVALUATION", "EVALUATION", "FICHE", "GRILLE")

# Fiches scannées sans couche texte : titre repris du registre éditorial.
TITLE_OVERRIDES = {
    "ce1-francais-reconnaitre-nom-evaluation": ("Reconnaître un nom", "Étude de la langue"),
    "ce1-francais-nom-commun-propre-evaluation": ("Nom commun et nom propre", "Étude de la langue"),
    "ce1-francais-pluriel-regulier-evaluation": ("Singulier et pluriel", "Étude de la langue"),
}


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def sentence_case(value: str) -> str:
    value = value.strip().lower()
    return value[:1].upper() + value[1:]


def detect_type(stem: str, path: Path) -> str:
    if "tapuscrits" in path.parts:
        return "texte"
    for suffix, kind in TYPE_BY_SUFFIX:
        if stem == suffix or stem.endswith("-" + suffix):
            return kind
    return "fiche"


def parse_header(pdf: fitz.Document) -> dict:
    text = pdf[0].get_text() if pdf.page_count else ""
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    result: dict = {}
    for index, line in enumerate(lines[:8]):
        if " · " in line and any(word in line.upper() for word in HEADER_TYPE_WORDS):
            parts = [p.strip() for p in line.split(" · ")]
            if len(parts) >= 4:
                result["domain"] = sentence_case(parts[2].split(" - ")[0])
            elif len(parts) == 3:
                result["domain"] = sentence_case(parts[1])
            title_lines = []
            for follow in lines[index + 1 : index + 4]:
                if follow.lower().startswith("objectif"):
                    break
                title_lines.append(follow)
            if title_lines:
                title = " ".join(title_lines[:2])
                title = re.sub(r"^(Exercices|Évaluation|Evaluation|Leçon)\s*[-–:]\s*", "", title)
                result["title"] = title
            for follow in lines[index + 1 : index + 5]:
                if follow.lower().startswith("objectif"):
                    result["objective"] = follow.split(":", 1)[-1].strip()
                    break
            break
    if "title" not in result and lines:
        result["firstLine"] = lines[0]
    return result


def load_cm2_titles() -> dict[str, tuple[str, str]]:
    """slug → (titre, domaine) depuis les registres CM2."""
    titles: dict[str, tuple[str, str]] = {}
    fr = (ROOT / "content" / "cm2-francais-fiches.ts").read_text()
    for match in re.finditer(r'slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*domain:\s*"([^"]+)"', fr):
        titles[f"fr:{match.group(1)}"] = (match.group(2), match.group(3))
    ma = (ROOT / "content" / "cm2-fiches-maths.ts").read_text()
    for match in re.finditer(r'notionSlug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*domain:\s*"([^"]+)"', ma):
        titles[f"ma:{match.group(1)}"] = (match.group(2), match.group(3))
    return titles


DOMAIN_LABELS = {
    "conjugaison": "Conjugaison",
    "grammaire": "Grammaire",
    "orthographe": "Orthographe",
    "vocabulaire": "Vocabulaire",
    "lecture-comprehension": "Lecture et compréhension",
    "etude-de-la-langue": "Étude de la langue",
}


def level_of(rel: Path) -> str | None:
    parts = rel.parts
    if parts[0] == "maternelle":
        return parts[1] if len(parts) > 1 and parts[1] in LEVELS else None
    return parts[0] if parts[0] in LEVELS else None


def subject_of(rel: Path) -> str:
    parts = rel.parts
    raw = parts[2] if parts[0] == "maternelle" else parts[1]
    return SUBJECTS.get(raw, slugify(raw))


def main() -> None:
    cm2_titles = load_cm2_titles()
    units: dict[str, dict] = {}
    skipped: list[str] = []

    for path in sorted(FICHES.rglob("*.pdf")):
        rel = path.relative_to(FICHES)
        if rel.parts[0] in EXCLUDED_LEVEL_DIRS:
            continue
        level = level_of(rel)
        if not level:
            skipped.append(str(rel))
            continue
        subject = subject_of(rel)
        stem = path.stem
        kind = detect_type(stem, path)

        try:
            pdf = fitz.open(path)
        except Exception:  # fichier illisible : on ne l'annonce pas
            skipped.append(str(rel))
            continue
        pages = pdf.page_count
        header = parse_header(pdf)

        # Identifiant d'unité : dossier de la notion, ou notion + fiche pour les fiches CM2 à plat.
        title = header.get("title")
        domain = header.get("domain")
        if stem in TITLE_OVERRIDES:
            title, domain = TITLE_OVERRIDES[stem]
        if level == "cm2" and rel.parts[1] == "francais-pdf":
            notion = re.sub(r"-f[123]$", "", stem)
            unit_key = f"cm2-francais-{notion}"
            known = cm2_titles.get(f"fr:{notion}")
            title = title or (known[0] if known else None)
            domain = domain or DOMAIN_LABELS.get(rel.parts[2]) or (known and DOMAIN_LABELS.get(known[1]))
        elif level == "cm2" and rel.parts[1] == "mathematiques-pdf":
            notion = rel.parts[2]
            unit_key = f"cm2-maths-{notion}"
            known = cm2_titles.get(f"ma:{notion}")
            title = title or (known[0] if known else None)
            domain = domain or (known[1] if known else None)
        elif kind == "texte":
            unit_key = f"{level}-{subject}-{slugify(stem)}"
            first = header.get("firstLine", "")
            title = first or stem.split("_")[-1].replace("-", " ")
            domain = "Lecture"
        else:
            unit_key = f"{level}-{subject}-{slugify(path.parent.name)}"
            if path.parent.name in ("evaluations",):
                unit_key = f"{level}-{subject}-{slugify(stem.rsplit('-', 1)[0])}"
            domain = domain or DOMAIN_LABELS.get(path.parent.parent.name)

        if not title:
            skipped.append(str(rel))
            pdf.close()
            continue

        unit = units.setdefault(
            unit_key,
            {
                "id": unit_key,
                "level": level,
                "cycle": CYCLE[level],
                "subject": subject,
                "domain": domain or "",
                "title": title,
                "objective": header.get("objective", ""),
                "files": [],
                "preview": None,
                "collections": [],
                "status": "publiee",
                "validatedAt": date.today().isoformat(),
            },
        )
        if not unit["domain"] and domain:
            unit["domain"] = domain
        if not unit["objective"] and header.get("objective"):
            unit["objective"] = header["objective"]
        # Le titre de la leçon prime sur celui d'une évaluation ou d'exercices.
        if kind == "lecon" and title:
            unit["title"] = title

        unit["files"].append(
            {"type": kind, "href": "/" + str(path.relative_to(PUBLIC)), "pages": pages}
        )
        pdf.close()

    APERCUS.mkdir(exist_ok=True)
    for unit in units.values():
        unit["files"].sort(key=lambda f: (TYPE_ORDER.get(f["type"], 9), f["href"]))
        first = unit["files"][0]
        thumb = APERCUS / f"{unit['id']}.jpg"
        if not thumb.exists():
            with fitz.open(PUBLIC / first["href"].lstrip("/")) as pdf:
                page = pdf[0]
                zoom = 320 / page.rect.width
                pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
                pix.save(thumb, jpg_quality=62)
        unit["preview"] = f"/apercus/{unit['id']}.jpg"
        if unit["level"] in ("cm2", "6e"):
            unit["collections"].append("liaison-cm2-6e")

    ordered = sorted(
        units.values(),
        key=lambda u: (LEVELS.index(u["level"]), u["subject"], u["domain"], u["title"]),
    )
    # Une unité par ligne : diff lisible, fichier compact dans le bundle.
    lines = ",\n".join(json.dumps(u, ensure_ascii=False, separators=(",", ":")) for u in ordered)
    OUT.write_text("[\n" + lines + "\n]\n")
    print(f"{len(ordered)} unités, {sum(len(u['files']) for u in ordered)} fichiers → {OUT.relative_to(ROOT)}")
    if skipped:
        print(f"{len(skipped)} fichiers ignorés (niveau ou titre introuvable) :")
        for item in skipped:
            print("  -", item)


if __name__ == "__main__":
    main()
