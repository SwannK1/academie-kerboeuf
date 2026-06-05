import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getLyceeLevelStatus } from "@/content/levels/lycee-statuses";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Ressources lycée | Académie Kerboeuf",
  description:
    "Des ressources pour construire les méthodes et réussir l'entrée au lycée.",
};

export default function LyceeRessourcesPage() {
  const secondeStatus = getLyceeLevelStatus("seconde");
  const premiereStatus = getLyceeLevelStatus("premiere");
  const terminaleStatus = getLyceeLevelStatus("terminale");

  const secondeAvailable = getPublicStatusKey(secondeStatus) !== "upcoming";

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Lycée", href: "/lycee" },
              { label: "Ressources" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Seconde · Première · Terminale
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Ressources lycée
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Des ressources pour construire les méthodes et réussir l&apos;entrée
            au lycée.
          </p>
        </div>
      </section>

      {/* Seconde — bloc prioritaire */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Priorité
          </p>
          <h2 className="mt-3 text-3xl font-black text-foreground">
            Seconde V1
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Méthodologie lycée — les premières ressources disponibles couvrent
            les disciplines fondamentales de la Seconde.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SubjectCard
              label="Méthodologie lycée"
              description="Méthodes de travail, organisation et prise en main du lycée."
              status={secondeStatus}
              available={secondeAvailable}
              href="/lycee/seconde"
            />
            <SubjectCard
              label="Français"
              description="Lecture, analyse de textes et expression écrite."
              status={secondeStatus}
              available={secondeAvailable}
              href="/lycee/seconde"
            />
            <SubjectCard
              label="Mathématiques"
              description="Consolidation des bases et introduction aux notions lycée."
              status={secondeStatus}
              available={secondeAvailable}
              href="/lycee/seconde"
            />
          </div>
        </div>
      </section>

      {/* Première et Terminale — blocs prudents */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
            À venir
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground">
            Prochains niveaux
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <UpcomingLevelCard
              label="Première"
              description="Spécialités, méthodes d'analyse et préparation aux épreuves."
              status={premiereStatus}
            />
            <UpcomingLevelCard
              label="Terminale"
              description="Préparation au baccalauréat et à l'orientation post-bac."
              status={terminaleStatus}
            />
          </div>
        </div>
      </section>

      {/* Liens utiles */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Continuer dans le lycée
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/lycee/seconde/ressources"
              className="rounded-md bg-jade px-5 py-3 text-sm font-black text-ink transition hover:bg-jade/90"
            >
              Ressources Seconde
            </Link>
            <Link
              href="/lycee/seconde"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Seconde
            </Link>
            <Link
              href="/lycee"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Lycée
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SubjectCard({
  label,
  description,
  status,
  available,
  href,
}: {
  label: string;
  description: string;
  status: Parameters<typeof PublicStatusBadge>[0]["status"];
  available: boolean;
  href: string;
}) {
  const card = (
    <div
      className={`flex h-full flex-col rounded-md border p-6 transition ${
        available
          ? "group border-white/10 bg-white/[0.045] hover:-translate-y-0.5 hover:border-jade/30 hover:bg-white/[0.065]"
          : "border-white/10 bg-white/[0.025] opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-black text-foreground">{label}</h3>
        <div className="shrink-0">
          <PublicStatusBadge status={status} />
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{description}</p>
      {available && (
        <span className="mt-5 text-sm font-black text-jade transition group-hover:translate-x-1">
          Voir les ressources →
        </span>
      )}
    </div>
  );

  if (available) {
    return <Link href={href}>{card}</Link>;
  }
  return <div>{card}</div>;
}

function UpcomingLevelCard({
  label,
  description,
  status,
}: {
  label: string;
  description: string;
  status: Parameters<typeof PublicStatusBadge>[0]["status"];
}) {
  return (
    <div className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-6 opacity-60">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-black text-foreground">{label}</h3>
        <div className="shrink-0">
          <PublicStatusBadge status={status} />
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{description}</p>
      <span className="mt-5 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
        En préparation
      </span>
    </div>
  );
}
