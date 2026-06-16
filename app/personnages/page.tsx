import type { Metadata } from "next";
import { HierarchyCard, HierarchyPage } from "./_components/hierarchy";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description: "Les élèves-guides et les professeurs de l'Académie Kerboeuf.",
};

export default function PersonnagesPage() {
  return (
    <HierarchyPage
      eyebrow="Personnages"
      title="Qui accompagne les apprentissages ?"
      description="Deux galeries complémentaires donnent des repères narratifs et pédagogiques à chaque étape du parcours."
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Univers", href: "/univers" },
        { label: "Personnages" },
      ]}
    >
      <HierarchyCard
        number="01"
        title="Élèves-guides"
        description="Des personnages qui incarnent les postures d'apprentissage, de la maternelle au lycée."
        href="/personnages/eleves"
        accent="jade"
      />
      <HierarchyCard
        number="02"
        title="Professeurs"
        description="Les référents pédagogiques qui portent les méthodes et les univers des niveaux."
        href="/personnages/professeurs"
        accent="gold"
      />
    </HierarchyPage>
  );
}
