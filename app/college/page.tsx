import type { Metadata } from "next";
import { LevelHub } from "@/components/academy/level-hub";
import { getLevelsByStage } from "@/content/academy";
import { getCollegeLevelStatus } from "@/content/levels/college-statuses";

export const metadata: Metadata = {
  title: "Collège | Académie Kerboeuf",
  description:
    "L’aile collège de l’Académie Kerboeuf, de la 6e à la 3e.",
};

export default function CollegePage() {
  return (
    <LevelHub
      stage="college"
      title="Aile Collège"
      description="De la 6e à la 3e, l’Académie propose une structure claire pour installer méthode, raisonnement et autonomie."
      levels={getLevelsByStage("college")}
      getStatus={getCollegeLevelStatus}
    />
  );
}
