import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Cartothèque des Lisières | Académie Kerboeuf",
  description:
    "La Cartothèque des Lisières — un lieu pour se repérer, relier les savoirs et construire des chemins d'apprentissage.",
};

const competences = [
  "Se repérer dans l'espace et dans les savoirs",
  "Organiser des informations et les hiérarchiser",
  "Relier des notions entre elles",
  "Construire une trace lisible et argumentée",
  "Justifier un itinéraire d'apprentissage",
];

const matieres = [
  "Géographie",
  "Mathématiques",
  "Français",
  "EMC",
];

const niveaux = ["Cycle 2", "Cycle 3", "Cycle 4"];

export default function CartothequePage() {
  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Univers", href: "/univers" },
              { label: "Cartothèque des Lisières" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
            Lieu pédagogique
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
            Cartothèque des Lisières
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Un lieu pour se repérer, relier les savoirs et construire des
            chemins d&apos;apprentissage.
          </p>
        </div>
      </section>

      {/* ── À quoi sert ce lieu ? ────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
            Fonction pédagogique
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground">
            À quoi sert ce lieu&nbsp;?
          </h2>
          <p className="mt-6 text-base leading-8 text-muted">
            La Cartothèque des Lisières est une salle de cartes, de plans et
            d&apos;itinéraires. On y apprend à lire l&apos;espace, à comparer
            des représentations et à justifier ses repères — dans la géographie
            comme dans l&apos;organisation des savoirs.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            Son rôle dépasse la cartographie : faire lire, comparer et produire
            des représentations utiles, c&apos;est aussi apprendre à donner une
            forme aux connaissances, à les relier entre elles et à tracer un
            chemin lisible vers la compréhension.
          </p>
        </div>
      </section>

      {/* ── Compétences travaillées ──────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
              Compétences travaillées
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground">
              Ce que l&apos;on apprend ici
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competences.map((comp) => (
              <div
                key={comp}
                className="rounded-md border border-sky/35 bg-white/[0.04] p-5"
              >
                <p className="text-sm leading-7 text-foreground">{comp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Matières et niveaux ──────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
                Matières associées
              </p>
              <h2 className="mt-4 text-2xl font-black text-foreground">
                Disciplines concernées
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {matieres.map((matiere) => (
                  <span
                    key={matiere}
                    className="rounded border border-sky/35 bg-white/[0.04] px-3 py-1 text-sm font-semibold text-foreground"
                  >
                    {matiere}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
                Niveaux concernés
              </p>
              <h2 className="mt-4 text-2xl font-black text-foreground">
                Cycles scolaires
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {niveaux.map((niveau) => (
                  <span
                    key={niveau}
                    className="rounded bg-white/[0.06] px-3 py-1 font-mono text-sm font-bold text-muted"
                  >
                    {niveau}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/univers"
              className="rounded-md border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/[0.08]"
            >
              ← Retour à l&apos;Univers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
