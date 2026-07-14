import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Cm2FrancaisFichesEmbed } from "@/components/academy/Cm2FrancaisFichesEmbed";
import { Cm2MathFichesEmbed } from "@/components/academy/Cm2MathFichesEmbed";
import { getCm2FicheLibrary, type Cm2FicheSubdomain } from "@/content/cm2-fiches-library";

export const metadata: Metadata = {
  title: "CM2 — Fiches PDF | Académie Kerboeuf",
  description: "Retrouvez les fiches PDF CM2 classées par matière.",
};

export default function Cm2Page() {
  const library = getCm2FicheLibrary();

  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Primaire", href: "/primaire" },
            { label: "CM2" },
          ]}
        />

        <h1 className="mt-6 max-w-3xl text-4xl font-black text-foreground sm:text-5xl">
          CM2 — Fiches PDF
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Retrouvez les fiches PDF CM2 classées par matière.
        </p>

        <div className="mt-10 space-y-4">
          {library.map(({ subject, subdomains, hasCatalogue }) => (
            <details
              key={subject.slug}
              open={hasCatalogue}
              className="group rounded-md border border-white/10 bg-white/[0.03]"
            >
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-4">
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-lg font-black text-foreground">{subject.title}</span>
                  <PublicStatusBadge status={subject.status} />
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm font-bold text-muted transition group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>

              <div className="border-t border-white/10 px-5 py-4">
                <ul className="divide-y divide-white/5">
                  {subdomains.map((subdomain) => (
                    <SubdomainRow key={subdomain.label} subdomain={subdomain} />
                  ))}
                </ul>

                <Link
                  href={`/primaire/cm2/matieres/${subject.slug}`}
                  className="mt-4 inline-block text-sm font-bold text-gold transition hover:translate-x-1"
                >
                  Voir la matière complète →
                </Link>
              </div>

              {hasCatalogue ? (
                <div className="border-t border-white/10">
                  {subject.slug === "francais" ? <Cm2FrancaisFichesEmbed /> : <Cm2MathFichesEmbed />}
                </div>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}

function SubdomainRow({ subdomain }: { subdomain: Cm2FicheSubdomain }) {
  const { label, availableCount, totalCount } = subdomain;

  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-2.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {totalCount > 0 ? (
        <span className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted">
            {availableCount}/{totalCount} fiches
          </span>
          <PublicStatusBadge status="available" />
        </span>
      ) : (
        <PublicStatusBadge status="in-progress" />
      )}
    </li>
  );
}
