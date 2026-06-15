import type { Metadata } from "next";
import { HierarchyPage } from "@/app/personnages/_components/hierarchy";

export const metadata: Metadata = {
  title: "Comment fonctionne l'Académie | Académie Kerboeuf",
  description:
    "Le rôle du site, des PDF, des séquences, des programmations et des progressions.",
};

const principles = [
  "Le site organise.",
  "Les PDF enseignent.",
  "1 séquence = 1 compétence.",
  "Les fiches sont rangées dans les matières.",
  "La programmation est globale.",
  "La progression organise l'ordre des apprentissages.",
];

export default function MethodePage() {
  return (
    <HierarchyPage
      eyebrow="Méthode"
      title="Comment fonctionne l'Académie"
      description="Une architecture simple pour retrouver les apprentissages et comprendre le rôle de chaque ressource."
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Univers", href: "/univers" },
        { label: "Méthode" },
      ]}
    >
      <section className="md:col-span-2">
        <h2 className="text-xl font-black text-foreground">
          La logique pédagogique
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <li
              key={principle}
              className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-gold/10 text-xs font-black text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-sm font-bold leading-6 text-foreground sm:text-base">
                {principle}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-gold/30 bg-gold/[0.06] p-5 md:col-span-2 sm:p-6">
        <h2 className="text-xl font-black text-foreground">Le parcours</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-foreground sm:text-base">
          Niveau → Matière → Domaine → Sous-domaine → Compétence → Fiches/PDF
        </p>
      </section>
    </HierarchyPage>
  );
}
