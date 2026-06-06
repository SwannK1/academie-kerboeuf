import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Réussir son entrée en 6e | Collège | Académie Kerboeuf",
  description:
    "Six repères pour aborder sereinement le passage du CM2 au collège : emploi du temps, changements de salle, matériel, devoirs, apprentissage et questions.",
};

const reperes = [
  {
    numero: "01",
    title: "Comprendre son emploi du temps",
    description:
      "Au collège, chaque jour est différent. Apprendre à lire son emploi du temps permet d'anticiper les matières, les salles et les professeurs du lendemain.",
  },
  {
    numero: "02",
    title: "Changer de salle et de professeur",
    description:
      "À chaque cours, on change de salle et d'enseignant. Se repérer dans l'établissement et arriver à l'heure font partie des premières compétences collège.",
  },
  {
    numero: "03",
    title: "Gérer son matériel",
    description:
      "Chaque matière a son cahier, son classeur ou son manuel. Préparer son cartable la veille en consultant l'emploi du temps évite les oublis.",
  },
  {
    numero: "04",
    title: "Noter les devoirs",
    description:
      "L'agenda devient un outil quotidien. Noter les travaux à faire, les dates de contrôle et les leçons à apprendre permet de ne rien oublier.",
  },
  {
    numero: "05",
    title: "Apprendre régulièrement",
    description:
      "Au collège, les évaluations arrivent vite. Relire ses notes le soir même et réviser régulièrement, même vingt minutes par jour, ancre bien mieux les connaissances qu'une révision de dernière minute.",
  },
  {
    numero: "06",
    title: "Oser poser une question",
    description:
      "Si quelque chose n'est pas clair, lever la main ou aller voir le professeur après le cours est toujours une bonne idée. Les enseignants sont là pour accompagner.",
  },
] as const;

export default function ReussirEntree6ePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Collège", href: "/college" },
              { label: "6e", href: "/college/6e" },
              { label: "Réussir son entrée en 6e" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Collège · 6e
            </p>
            <PublicStatusBadge status={getPublicStatus("en-construction")} />
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Réussir son entrée en 6e
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Six repères pour aborder le collège avec sérénité. Le passage du
            CM2 à la 6e, c&apos;est surtout une nouvelle organisation à
            apprivoiser.
          </p>
        </div>
      </section>

      {/* Repères */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Les 6 repères du collège
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reperes.map((repere) => (
              <div
                key={repere.numero}
                className="rounded-md border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs font-black tracking-[0.18em] text-jade/60">
                  {repere.numero}
                </p>
                <h2 className="mt-2 text-base font-black text-foreground">
                  {repere.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {repere.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lien retour */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/college/6e"
            className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
          >
            ← Retour à la 6e
          </Link>
        </div>
      </section>
    </main>
  );
}
