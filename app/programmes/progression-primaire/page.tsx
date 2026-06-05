import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getLevelsByStage, getLevelPath } from "@/content/academy";

export const metadata: Metadata = {
  title: "Progression primaire CP → CM2 | Académie Kerboeuf",
  description:
    "Vue d'ensemble de la progression pédagogique du CP au CM2 : objectifs par niveau, matières principales et statut de publication.",
};

const LEVEL_OBJECTIVES: Record<string, string> = {
  cp: "Entrer dans la lecture, l'écriture et les premiers nombres. Installer les repères fondamentaux.",
  ce1: "Consolider lecture et calcul. Apprendre à choisir une stratégie et à expliquer ses réponses.",
  ce2: "Structurer les connaissances. Prendre confiance dans les démarches et les consignes longues.",
  cm1: "Développer l'autonomie. Relier documents, disciplines et méthodes pour construire une réponse.",
  cm2: "Justifier, transférer, argumenter. Préparer l'entrée au collège par des missions intégrées.",
};

const METHODOLOGICAL_PILLARS = [
  {
    key: "automatismes",
    title: "Automatismes",
    description:
      "Rituels quotidiens de calcul mental, de lecture à voix haute et de copie pour libérer la mémoire de travail.",
  },
  {
    key: "application",
    title: "Application",
    description:
      "Exercices guidés où l'élève applique une règle ou une technique dans un contexte connu.",
  },
  {
    key: "raisonnement",
    title: "Raisonnement",
    description:
      "Problèmes ouverts, enquêtes documentaires et défis qui demandent de choisir une stratégie et de la justifier.",
  },
  {
    key: "expression",
    title: "Expression",
    description:
      "Production écrite ou orale pour reformuler, synthétiser et communiquer ce qui a été appris.",
  },
];

export default function ProgressionPrimairePage() {
  const levels = getLevelsByStage("primaire");

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Programmes", href: "/programmes" },
              { label: "Progression primaire" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,196,143,0.12),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Cycles 2 et 3
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Progression primaire
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Une progression organisée du CP au CM2.
          </p>
        </div>
      </section>

      {/* Level grid */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              CP · CE1 · CE2 · CM1 · CM2
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              Niveaux
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {levels.map((level) => {
              const objective = LEVEL_OBJECTIVES[level.slug] ?? level.description;
              const href = getLevelPath(level);
              const mainSubjects = level.subjects.slice(0, 4);

              return (
                <article
                  key={level.slug}
                  className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                        {level.cycle}
                      </p>
                      <h3 className="mt-1 text-3xl font-black text-foreground">
                        {level.label}
                      </h3>
                    </div>
                    <PublicStatusBadge status="bientôt" />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted">{objective}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mainSubjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold uppercase tracking-[0.1em] text-muted"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <Link
                      href={href}
                      className="block rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-foreground transition hover:bg-white/[0.08]"
                    >
                      Portail {level.label}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodological pillars */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              1 séquence = 1 compétence
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              Méthodologie
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Chaque séquence suit quatre temps complémentaires, du réflexe au
              sens.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METHODOLOGICAL_PILLARS.map((pillar, i) => (
              <div
                key={pillar.key}
                className="rounded-md border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="font-mono text-3xl font-black text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-black text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
          >
            ← Retour aux programmes
          </Link>
        </div>
      </section>
    </main>
  );
}
