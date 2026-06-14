import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS,
  isNotionComplete,
  type FicheDomain,
  type FicheNotion,
} from "@/content/cm2-francais-fiches";

export const metadata: Metadata = {
  title: "Catalogue complet des fiches Français CM2 — Académie Kerboeuf",
  description:
    "Catalogue des fiches de Français CM2 : conjugaison, grammaire, orthographe, vocabulaire et lecture. Feuilles imprimables par notion.",
};

const DOMAIN_ORDER: FicheDomain[] = [
  "conjugaison",
  "grammaire",
  "orthographe",
  "vocabulaire",
  "lecture-comprehension",
];

const DOMAIN_ACCENTS: Record<FicheDomain, { badge: string; border: string; heading: string }> = {
  conjugaison:           { badge: "bg-sky/10 text-sky border-sky/25",   border: "border-sky/20",   heading: "text-sky"   },
  grammaire:             { badge: "bg-jade/10 text-jade border-jade/25", border: "border-jade/20",  heading: "text-jade"  },
  orthographe:           { badge: "bg-gold/10 text-gold border-gold/25", border: "border-gold/20",  heading: "text-gold"  },
  vocabulaire:           { badge: "bg-ember/10 text-ember border-ember/25", border: "border-ember/20", heading: "text-ember" },
  "lecture-comprehension": { badge: "bg-white/10 text-muted border-white/15", border: "border-white/15", heading: "text-muted" },
};

export default function Cm2FichesFrancaisPage() {
  const byDomain = Object.fromEntries(
    DOMAIN_ORDER.map((d) => [d, cm2FrancaisFiches.filter((n) => n.domain === d)])
  ) as Record<FicheDomain, FicheNotion[]>;

  const total = cm2FrancaisFiches.length;
  const complete = cm2FrancaisFiches.filter(isNotionComplete).length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Fiches Français" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            CM2 · Français
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Catalogue complet des fiches Français CM2
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {total} notions réparties en {DOMAIN_ORDER.length} domaines —{" "}
            {complete} complètes (f1 + f2 + f3), {total - complete} partielles.
          </p>
          <p className="mt-4 max-w-2xl rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-muted">
            Les fiches sont accessibles directement depuis la page matière, classées
            par sous-domaine et compétence.
          </p>
          <Link
            href="/primaire/cm2/matieres/francais"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-jade hover:underline"
          >
            ← Retour à la page Français CM2
          </Link>
        </div>
      </section>

      {/* Catalogue par domaine */}
      <div className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-14">
          {DOMAIN_ORDER.map((domain) => {
            const notions = byDomain[domain];
            if (!notions.length) return null;
            const accent = DOMAIN_ACCENTS[domain];
            return (
              <section key={domain}>
                <div className="mb-6 border-b border-white/10 pb-4">
                  <h2 className={`text-2xl font-black ${accent.heading}`}>
                    {FICHE_DOMAIN_LABELS[domain]}
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    {notions.length} notion{notions.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {notions.map((notion) => (
                    <NotionCard key={notion.slug} notion={notion} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function NotionCard({ notion }: { notion: FicheNotion }) {
  const complete = isNotionComplete(notion);
  const sheetKeys = (["f1", "f2", "f3"] as const).filter((k) => notion.sheets[k]);

  return (
    <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold leading-6 text-foreground">{notion.title}</p>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            complete
              ? "bg-jade/10 text-jade"
              : "bg-white/5 text-white/40"
          }`}
        >
          {complete ? "Complète" : "Partielle"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sheetKeys.map((key) => (
          <Link
            key={key}
            href={`/primaire/cm2/fiches/francais/${notion.slug}/${key}`}
            className="rounded-md border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-foreground transition hover:border-white/30 hover:bg-white/10"
          >
            {SHEET_LABELS[key]}
          </Link>
        ))}
      </div>
    </div>
  );
}
