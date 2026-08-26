import { notFound } from "next/navigation";
import { SecondaryCompetencyPage } from "@/components/academy/secondary-resource-catalog";
import { getSecondaryCompetency } from "@/content/secondary-resource-catalog";

type Props = { params: Promise<{ level: string; subject: string; competency: string }> };

export default async function Page({ params }: Props) {
  const { level, subject, competency } = await params;
  const item = getSecondaryCompetency(level, subject, competency);
  if (!item || item.level !== "seconde") notFound();
  return <SecondaryCompetencyPage item={item} />;
}
