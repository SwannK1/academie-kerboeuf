import type { Metadata } from "next";
import {
  HierarchyCard,
  HierarchyPage,
  ProfileLinks,
} from "@/app/personnages/_components/hierarchy";
import { emblematicStudents } from "@/content/students";

export const metadata: Metadata = {
  title: "Élèves-guides | Personnages | Académie Kerboeuf",
  description: "Les élèves-guides de la maternelle au lycée.",
};

const categories = [
  {
    title: "Élèves-guides maternelle",
    description: "Les guides des premiers apprentissages.",
    levels: ["ps", "ms", "gs"],
    accent: "jade",
  },
  {
    title: "Élèves-guides primaire",
    description: "Les guides du CP au CM2.",
    levels: ["cp", "ce1", "ce2", "cm1", "cm2"],
    accent: "gold",
  },
  {
    title: "Élèves-guides collège",
    description: "Les guides de la 6e à la 3e.",
    levels: ["6e", "5e", "4e", "3e"],
    accent: "sky",
  },
  {
    title: "Élèves-guides lycée",
    description: "Les guides de la Seconde à la Terminale.",
    levels: ["seconde", "premiere", "terminale"],
    accent: "ember",
  },
] as const;

export default function PersonnagesElevesPage() {
  return (
    <HierarchyPage
      eyebrow="Personnages · Élèves-guides"
      title="Les élèves-guides par niveau"
      description="Chaque portrait illustre une posture d'apprentissage et renvoie uniquement vers une fiche existante."
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Univers", href: "/univers" },
        { label: "Personnages", href: "/personnages" },
        { label: "Élèves-guides" },
      ]}
    >
      {categories.map((category) => {
        const profiles = emblematicStudents
          .filter((student) =>
            (category.levels as readonly string[]).includes(student.levelSlug),
          )
          .map((student) => ({
            name: student.name,
            href: `/eleves/${student.slug}`,
            detail: student.level,
          }));

        return (
          <HierarchyCard
            key={category.title}
            title={category.title}
            description={category.description}
            accent={category.accent}
            available={profiles.length > 0}
          >
            {profiles.length > 0 ? <ProfileLinks profiles={profiles} /> : null}
          </HierarchyCard>
        );
      })}
    </HierarchyPage>
  );
}
