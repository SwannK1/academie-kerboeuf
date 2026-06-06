import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Élèves | Personnages | Académie Kerboeuf",
  description:
    "Les personnages élèves de l'Académie Kerboeuf, par niveau scolaire.",
};

const CATEGORIES = [
  { label: "Élèves maternelle", key: "maternelle" },
  { label: "Élèves primaire", key: "primaire" },
  { label: "Élèves collège", key: "college" },
  { label: "Élèves lycée", key: "lycee" },
] as const;

export default function ElevesPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Univers", href: "/univers" },
              { label: "Personnages", href: "/univers/personnages" },
              { label: "Élèves" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Académie Kerboeuf
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Les élèves
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Les personnages élèves de l&apos;Académie, répartis par niveau
              scolaire.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CATEGORIES.map((category) => (
              <div
                key={category.key}
                className="rounded-md border border-white/10 bg-white/[0.04] p-6"
              >
                <h2 className="text-base font-black text-foreground">
                  {category.label}
                </h2>
                <p className="mt-3 text-xs leading-6 text-muted">
                  Aucun personnage élève disponible pour ce niveau pour le
                  moment.
                </p>
                <div className="mt-4">
                  <span className="rounded bg-white/[0.07] px-2 py-0.5 font-mono text-xs font-semibold text-muted">
                    En préparation
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
