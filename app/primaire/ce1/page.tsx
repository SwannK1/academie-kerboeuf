import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { ce1PdfLibrary, type Ce1LibraryItem } from "@/content/ce1-pdf-library";
import { ce1LearningTree } from "@/content/levels/ce1-learning-tree";
import { Ce1GastonLearningMap } from "@/components/academy/Ce1GastonLearningMap";

export const metadata: Metadata = {
  title: "CE1 — Fiches PDF | Académie Kerboeuf",
  description:
    "CE1 — bibliothèque de fiches PDF par matière : Français, Mathématiques, Questionner le monde, EMC, Arts, EPS. Guide : Gaston le Hérisson.",
};

export default function Ce1Page() {
  const domainCount = ce1LearningTree.domains.length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CE1" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.10),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-sky/35 bg-sky/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Cycle 2 · Guide : Gaston le Hérisson
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            CE1 — Fiches PDF
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Le CE1 est le niveau prioritaire de l&apos;Académie Kerboeuf pour l&apos;année
            à venir. Cette page rassemble, matière par matière, l&apos;état des
            ressources pédagogiques du CE1 : ce qui est déjà publié et ce qui reste
            en préparation, en {domainCount} grandes matières du Cycle 2.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/ce1/matieres"
              className="rounded-md border border-sky/35 bg-sky/10 px-5 py-3 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
            >
              Explorer les matières CE1
            </Link>
            <Link
              href="/primaire/ce1/programmes/francais/etude-de-la-langue"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Étude de la langue — sous-domaine publié
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bibliothèque par matière ─────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Bibliothèque CE1
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Fiches PDF par matière
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Un lien n&apos;apparaît que si la page correspondante est publiée.
              Les ressources non encore publiées sont indiquées « à venir » ou
              « en préparation ».
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ce1PdfLibrary.map((subject) => (
              <SubjectLibraryCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Carte des espaces pédagogiques ──────────────────────────────── */}
      <Ce1GastonLearningMap />

      {/* ── Navigation rapide ────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Accès direct
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/ce1/matieres"
              className="group inline-flex items-center gap-2 rounded-md border border-sky/25 bg-sky/[0.05] px-4 py-2.5 text-sm font-bold text-sky transition hover:bg-sky/[0.09]"
            >
              Matières CE1 <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/primaire/ce1/programmes/francais/etude-de-la-langue"
              className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Étude de la langue CE1 <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/enseignants/affichages"
              className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Affichages de classe (tous niveaux) <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SubjectLibraryCard({
  subject,
}: {
  subject: (typeof ce1PdfLibrary)[number];
}) {
  return (
    <article className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={subject.href}
          className="text-lg font-black text-foreground transition hover:text-sky"
        >
          {subject.title}
        </Link>
        <PublicStatusBadge status={subject.status} className="shrink-0" />
      </div>

      <ul className="mt-4 space-y-2.5" aria-label={`Fiches ${subject.title}`}>
        {subject.items.map((item) => (
          <LibraryItemRow key={item.label} item={item} />
        ))}
      </ul>

      <Link
        href={subject.href}
        className="group mt-4 inline-flex items-center gap-2 border-t border-white/10 pt-3 text-xs font-bold uppercase tracking-[0.12em] text-sky transition"
      >
        Voir la matière
        <span className="transition group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}

function LibraryItemRow({ item }: { item: Ce1LibraryItem }) {
  return (
    <li className="flex items-start justify-between gap-3 text-sm leading-6 text-muted">
      <div className="min-w-0 flex-1">
        {item.href ? (
          <Link href={item.href} className="font-semibold text-foreground hover:underline">
            {item.label}
          </Link>
        ) : (
          <p className="font-semibold text-foreground">{item.label}</p>
        )}
        {item.note ? <p className="mt-0.5 text-xs leading-5 text-muted">{item.note}</p> : null}
      </div>
      <PublicStatusBadge status={item.status} className="shrink-0" />
    </li>
  );
}
