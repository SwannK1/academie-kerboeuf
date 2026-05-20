import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { maternelleLevels, maternelleWorld } from "@/content/students";

export const metadata: Metadata = {
  title: "Maternelle | Académie Kerboeuf",
  description:
    "Le Jardin des Premières Découvertes de l'Académie Kerboeuf, pour structurer les premiers apprentissages de maternelle.",
};

const COMING_SOON = [
  "Séquences par domaine et sous-domaine",
  "Fiches ateliers avec consignes",
  "Grilles d'observation intégrées aux fiches",
  "Supports PDF récupérables",
];

export default function MaternellePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Maternelle" }]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Cycle 1
          </p>
          <h1 className="mt-6 text-6xl font-black leading-[0.95] text-foreground sm:text-7xl">
            Maternelle
          </h1>
          <p className="mt-4 text-xl font-black text-gold">
            {maternelleWorld.title}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {maternelleWorld.description}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Choisissez un niveau pour accéder aux domaines et aux séquences à venir.
          </p>
        </div>
      </section>

      {/* ── PS / MS / GS ── */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-jade">
            PS · MS · GS
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {maternelleLevels.map((level) => (
              <Link
                key={level.slug}
                href={level.href}
                aria-label={`Explorer ${level.label}`}
                className="group flex flex-col rounded-md border border-jade/30 bg-jade/[0.05] p-6 transition hover:-translate-y-0.5 hover:border-jade/50 hover:bg-jade/[0.09]"
              >
                <span className="w-fit rounded border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gold">
                  Cycle 1
                </span>
                <h2 className="mt-5 text-2xl font-black text-foreground">
                  {level.label}
                </h2>
                <p className="mt-2 text-sm font-bold text-jade">{level.universe}</p>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                  {level.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                  Explorer →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Organisation ── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
              Organisation
            </p>
            <h2 className="mt-3 text-xl font-black text-foreground">
              Comment la maternelle est structurée
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
              {[
                "Maternelle",
                "PS · MS · GS",
                "5 domaines",
                "Sous-domaines",
                "Séquences",
                "Ateliers intégrés",
                "Grilles d'observation",
              ].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{step}</span>
                  {i < arr.length - 1 && (
                    <span className="text-muted" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-muted">
              Séquences, ateliers et fiches sont accessibles depuis chaque
              domaine. Les grilles d&apos;observation seront intégrées aux
              fiches ateliers. Les supports projetables ne sont pas
              prioritaires en maternelle — le geste et la manipulation
              priment.
            </p>
          </div>
        </div>
      </section>

      {/* ── À venir ── */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.025] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              À venir
            </p>
            <p className="mt-2 text-sm font-bold text-foreground">
              En cours de structuration — aucun lien avant disponibilité réelle
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {COMING_SOON.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/25"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
