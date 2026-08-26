import { notFound } from "next/navigation";
import { SecondarySubjectPage } from "@/components/academy/secondary-resource-catalog";
import { getSecondarySubject } from "@/content/secondary-resource-catalog";

type Props = { params: Promise<{ level: string; subject: string }> };

export default async function Page({ params }: Props) {
  const { level, subject } = await params;
  if (level !== "seconde") notFound();
  const catalogSubject = getSecondarySubject(level, subject);
  if (!catalogSubject) notFound();
  return <SecondarySubjectPage level="seconde" subject={subject} competencies={catalogSubject.competencies} />;
}
