import { notFound } from "next/navigation";
import { SecondaryCompetencyPage } from "@/components/academy/secondary-resource-catalog";
import { SECONDARY_LEVEL_SLUGS, getSecondaryCompetency, getSecondaryLevelCatalog } from "@/content/secondary-resource-catalog";

type Props = { params: Promise<{ level: string; subject: string; competency: string }> };

export function generateStaticParams() {
  return SECONDARY_LEVEL_SLUGS.filter((level) => level !== "seconde").flatMap((level) =>
    getSecondaryLevelCatalog(level).map(({ subject, competency }) => ({ level, subject, competency })),
  );
}

export default async function Page({ params }: Props) {
  const { level, subject, competency } = await params;
  const item = getSecondaryCompetency(level, subject, competency);
  if (!item || item.level === "seconde") notFound();
  return <SecondaryCompetencyPage item={item} />;
}
