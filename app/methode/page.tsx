import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Méthode | Académie Kerboeuf",
  description:
    "Comment fonctionne l'Académie Kerboeuf : du niveau jusqu'aux fiches PDF.",
};

const POINTS = [
  "Le site organise.",
  "Les PDF enseignent.",
  "1 séquence = 1 compétence.",
  "Les fiches sont rangées dans les matières.",
];

export default function MethodePage() {
  return (
    <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Univers", href: "/univers" },
            { label: "Méthode" },
          ]}
        />

        <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
          Méthode
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Comment fonctionne l&apos;Académie.
        </p>

        <ul className="mt-10 space-y-3">
          {POINTS.map((point) => (
            <li
              key={point}
              className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-base font-semibold text-foreground"
            >
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-md border border-jade/30 bg-jade/[0.06] p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-jade">
            Parcours
          </p>
          <p className="mt-3 text-base leading-7 text-foreground">
            Niveau → Matière → Domaine → Sous-domaine → Compétence → Fiches /
            PDF.
          </p>
        </div>

        <div className="mt-6 space-y-2 text-base leading-7 text-muted">
          <p>
            La programmation est globale et se fait dans la
            programmation de l&apos;Académie.
          </p>
          <p>La progression organise l&apos;ordre des apprentissages.</p>
        </div>
      </div>
    </main>
  );
}
