import { notFound } from "next/navigation";
import { SecondaryCompetencyPage } from "@/components/academy/secondary-resource-catalog";
import { getSecondaryCompetency, getSecondaryLevelCatalog } from "@/content/secondary-resource-catalog";

type Props = { params: Promise<{ level: string; subject: string; competency: string }> };

export function generateStaticParams() {
  return getSecondaryLevelCatalog("seconde").map(({ subject, competency }) => ({
    level: "seconde",
    subject,
    competency,
  }));
}

export default async function Page({ params }: Props) {
  const { level, subject, competency } = await params;
  const item = getSecondaryCompetency(level, subject, competency);
  if (!item || item.level !== "seconde") notFound();
  return <SecondaryCompetencyPage item={item} />;
}
