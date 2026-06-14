import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Méthode | Académie Kerboeuf",
  description: "Comment fonctionne l'Académie Kerboeuf.",
};

const POINTS = [
  "Le site organise les ressources pédagogiques.",
  "Les PDF enseignent : leçon, exercices, correction, projection, fiche parent.",
  "1 séquence = 1 compétence.",
  "Les fiches sont rangées dans les matières.",
  "Parcours : Niveau → Matière → Sous-domaine → Compétence → Fiches.",
  "La programmation répartit les compétences sur l'année.",
  "La progression organise l'ordre des apprentissages.",
];

export default function MethodePage() {
  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Méthode" }]}
        />

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-gold">
          Académie Kerboeuf
        </p>
        <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
          Comment fonctionne l&apos;Académie
        </h1>

        <ul className="mt-10 space-y-4">
          {POINTS.map((point) => (
            <li
              key={point}
              className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-base leading-7 text-muted"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
