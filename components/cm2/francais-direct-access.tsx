import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  type FicheDomain,
  type FicheNotion,
} from "@/content/cm2-francais-fiches";
import { cm2Subjects } from "@/content/cm2-subjects";
import { getPublicStatusKey } from "@/content/public-status";

const DOMAIN_ORDER: FicheDomain[] = [
  "conjugaison",
  "grammaire",
  "orthographe",
  "vocabulaire",
  "lecture-comprehension",
];

const UPCOMING_DOMAIN_LABELS = ["Écriture", "Oral"];

function firstSheet(notion: FicheNotion) {
  const key = (["f1", "f2", "f3"] as const).find((k) => notion.sheets[k]);
  return key ? { key, href: `/primaire/cm2/fiches/francais/${notion.slug}/${key}` } : undefined;
}

export function Cm2FrancaisDirectAccess() {
  const byDomain = Object.fromEntries(
    DOMAIN_ORDER.map((d) => [d, cm2FrancaisFiches.filter((n) => n.domain === d)]),
  ) as Record<FicheDomain, FicheNotion[]>;

  const otherAvailableSubjects = cm2Subjects.filter(
    (subject) => subject.slug !== "francais" && getPublicStatusKey(subject.status) === "available",
  );

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Matières", href: "/primaire/cm2/matieres" },
              { label: "Français" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Français
          </h1>
        </div>
      </section>

      <div className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          {DOMAIN_ORDER.map((domain) => {
            const notions = byDomain[domain];
            if (!notions.length) return null;
            return (
              <section key={domain}>
                <h2 className="mb-3 text-xl font-black text-foreground">
                  {FICHE_DOMAIN_LABELS[domain]}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {notions.map((notion) => {
                    const sheet = firstSheet(notion);
                    if (!sheet) return null;
                    return (
                      <Link
                        key={notion.slug}
                        href={sheet.href}
                        className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-foreground transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
                      >
                        {notion.title}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section>
            <h2 className="mb-3 text-xl font-black text-foreground">À venir</h2>
            <div className="flex flex-wrap gap-3">
              {UPCOMING_DOMAIN_LABELS.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.025] px-4 py-2.5 text-sm font-bold text-muted"
                >
                  {label}
                  <PublicStatusBadge status="upcoming" />
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-3">
          <Link
            href="/primaire/cm2"
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
          >
            ← CM2
          </Link>
          <Link
            href="/primaire/cm2/matieres"
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
          >
            Toutes les matières CM2
          </Link>
          {otherAvailableSubjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/primaire/cm2/matieres/${subject.slug}`}
              className="rounded-md border border-jade/25 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]"
            >
              {subject.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
