"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

type ProgrammingPeriod = {
  id: string;
  label: string;
};

type ProgrammingItem = {
  id: string;
  label: string;
  href?: string;
};

type LevelProgramming = {
  levelId: string;
  label: string;
  status: "available" | "upcoming" | "in-progress";
  order: number;
  periods: ProgrammingPeriod[];
  items: ProgrammingItem[];
};

const levels: LevelProgramming[] = [
  { levelId: "maternelle", label: "Maternelle", status: "in-progress", order: 1, periods: [], items: [] },
  { levelId: "cp", label: "CP", status: "in-progress", order: 2, periods: [], items: [] },
  { levelId: "ce1", label: "CE1", status: "in-progress", order: 3, periods: [], items: [] },
  { levelId: "ce2", label: "CE2", status: "in-progress", order: 4, periods: [], items: [] },
  { levelId: "cm1", label: "CM1", status: "in-progress", order: 5, periods: [], items: [] },
  {
    levelId: "cm2",
    label: "CM2",
    status: "available",
    order: 6,
    periods: [
      { id: "periode-1", label: "Période 1" },
      { id: "periode-2", label: "Période 2" },
      { id: "periode-3", label: "Période 3" },
      { id: "periode-4", label: "Période 4" },
      { id: "periode-5", label: "Période 5" },
    ],
    items: [
      { id: "mathematiques", label: "Mathématiques", href: "/primaire/cm2/matieres/mathematiques" },
      { id: "francais", label: "Français", href: "/primaire/cm2/matieres/francais" },
      { id: "sciences-technologie", label: "Sciences et technologie", href: "/primaire/cm2/matieres/sciences-technologie" },
    ],
  },
  { levelId: "college", label: "Collège", status: "in-progress", order: 7, periods: [], items: [] },
  { levelId: "lycee", label: "Lycée", status: "in-progress", order: 8, periods: [], items: [] },
];

export default function ProgrammingPage() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>("cm2");
  const selectedLevel = levels.find((level) => level.levelId === selectedLevelId)!;

  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Outil public pour toutes les classes
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Programmation et progression
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau pour voir sa programmation, organisez vos
            progressions par période et préparez l’année scolaire.
          </p>
        </header>

        <nav
          aria-label="Actions rapides"
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="#choisir-niveau"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-jade px-5 text-sm font-black text-ink transition hover:bg-jade/90"
          >
            Créer ma programmation
          </Link>
          <Link
            href="#progression"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Créer ma progression
          </Link>
          <Link
            href="#organisation"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Organiser mes classes
          </Link>
        </nav>

        <section id="choisir-niveau" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-black text-foreground">
            Choisir un niveau
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {levels.map((level) => (
              <button
                key={level.levelId}
                type="button"
                onClick={() => setSelectedLevelId(level.levelId)}
                aria-pressed={level.levelId === selectedLevelId}
                className={[
                  "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                  level.levelId === selectedLevelId
                    ? "border-jade/60 bg-jade/10 text-jade"
                    : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
                ].join(" ")}
              >
                {level.label}
              </button>
            ))}
          </div>
        </section>

        <section
          aria-label="Programmation du niveau"
          className="mt-10 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-foreground">
              Programmation — {selectedLevel.label}
            </h2>
            <PublicStatusBadge status={selectedLevel.status} />
          </div>

          {selectedLevel.items.length > 0 ? (
            <>
              <p className="mt-3 text-sm leading-7 text-muted">
                Matières disponibles pour ce niveau :
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {selectedLevel.items.map((item) =>
                  item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:bg-sky/[0.08]"
                    >
                      {item.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <span
                      key={item.id}
                      className="flex min-h-11 items-center rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-muted"
                    >
                      {item.label}
                    </span>
                  ),
                )}
              </div>

              {selectedLevel.periods.length > 0 ? (
                <div className="mt-5">
                  <p className="text-sm font-bold text-foreground">
                    Périodes de l’année
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedLevel.periods.map((period) => (
                      <span
                        key={period.id}
                        className="rounded-md border border-white/10 bg-background/45 px-3 py-1 text-xs font-bold text-muted"
                      >
                        {period.label}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <p className="mt-3 text-sm leading-7 text-muted">
              La programmation de ce niveau est en préparation. Elle
              s’appuiera sur les ressources publiées au fur et à mesure de
              leur disponibilité.
            </p>
          )}
        </section>

        <section
          id="progression"
          className="mt-10 scroll-mt-24 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-foreground">
            Organiser une progression
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Ordonnez les notions et les compétences du niveau choisi pour
            construire une progression cohérente sur l’année.
          </p>
        </section>

        <section
          id="organisation"
          className="mt-6 scroll-mt-24 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-foreground">
            Organiser mes classes
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Retrouvez la programmation et la progression de chacune de vos
            classes à partir d’un même point d’entrée.
          </p>
        </section>

        <section className="mt-6 rounded-lg border border-gold/25 bg-gold/[0.05] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Fonctionnalités à venir
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted">
            <li>Déplacer les items entre les périodes</li>
            <li>Ajouter une compétence ou un élément personnalisé</li>
            <li>Réordonner la progression par période</li>
            <li>Sauvegarder sa progression</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
