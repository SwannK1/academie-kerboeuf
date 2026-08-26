import { notFound } from "next/navigation";
import { SecondarySubjectPage } from "@/components/academy/secondary-resource-catalog";
import { getSecondarySubject, isSecondaryLevelSlug } from "@/content/secondary-resource-catalog";

type Props = { params: Promise<{ level: string; subject: string }> };

export default async function Page({ params }: Props) {
  const { level, subject } = await params;
  if (!isSecondaryLevelSlug(level) || level === "seconde") notFound();
  const catalogSubject = getSecondarySubject(level, subject);
  if (!catalogSubject) notFound();
  return <SecondarySubjectPage level={level} subject={subject} competencies={catalogSubject.competencies} />;
}
