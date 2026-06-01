import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getAcademyLevel } from "@/content/academy";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";

export const metadata: Metadata = {
  title: "CP — Première Classe | Académie Kerboeuf",
  description:
    "Page niveau CP : matières, domaines et séquences-compétences guidés par Kiwi. Décodage, combinatoire, fluence et premiers calculs.",
};

const DOMAIN_LABELS: Record<string, string> = {
  francais: "Français",
  mathematiques: "Mathématiques",
};

const SUBDOMAIN_LABELS: Record<string, string> = {
  "lecture-comprehension": "Lecture-compréhension",
};

export default function CpPage() {
  const level = getAcademyLevel("primaire", "cp");

  const resources = publishedSubdomainPages
    .filter((p) => (p.level as string) === "cp")
    .map((p) => ({
      subject: DOMAIN_LABELS[p.domain] ?? p.domain,
      label: SUBDOMAIN_LABELS[p.subdomain] ?? p.subdomain,
      href: p.route,
    }));

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CP" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-jade">
              Cycle 2 · CP
            </span>
          </div>
          <h1 className="mt-5 text-5xl font-black leading-none text-foreground sm:text-6xl">
            CP
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {level?.description ??
              "Première année du Cycle 2. Décodage, combinatoire, fluence, compréhension et premiers calculs avec Kiwi."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/primaire/cp/matieres"
              className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Explorer les matières CP
            </Link>
          </div>
        </div>
      </section>

      {resources.length > 0 ? (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 border-b border-white/10 pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Ressources disponibles
              </p>
              <h2 className="mt-1.5 text-xl font-black text-foreground">
                Premiers contenus publiés
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/25 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky">
                      {resource.subject}
                    </p>
                    <p className="mt-1 font-black text-foreground">
                      {resource.label}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-black text-muted transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Ressources prévues
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Les ressources PDF du CP sont en cours de préparation. Aucun
                lien n&apos;est affiché tant que la ressource n&apos;existe pas.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
