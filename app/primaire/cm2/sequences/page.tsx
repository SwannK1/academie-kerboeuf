import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Cm2SequenceRegistry } from "@/components/cm2/sequence-registry";
import { cm2Sequences } from "@/content/cm2-sequences";

export const metadata: Metadata = {
  title: "Séquences CM2 — Cartographie pédagogique | Académie Kerboeuf",
  description:
    "Cartographie des séquences CM2 par domaine et sous-domaine. Structure pédagogique en préparation : une compétence par séquence.",
};

export default function Cm2SequencesPage() {
  const totalSequences = cm2Sequences.length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"              },
              { label: "Primaire", href: "/primaire"       },
              { label: "CM2",      href: "/primaire/cm2"  },
              { label: "Séquences"                         },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Cycle 3 · CM2
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Cartographie pédagogique
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {totalSequences} séquences structurées par domaine et sous-domaine.
            Chaque séquence correspond à une compétence principale.
            Les contenus détaillés sont en cours de préparation.
          </p>
        </div>
      </section>

      {/* ── Registre des séquences ────────────────────────────────────────── */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Cm2SequenceRegistry />
        </div>
      </section>
    </main>
  );
}
