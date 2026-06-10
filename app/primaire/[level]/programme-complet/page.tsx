import { redirect } from "next/navigation";
import { getCurriculumMapLevels } from "@/content/curriculum-maps";

type PageProps = {
  params: Promise<{ level: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCurriculumMapLevels().map((level) => ({ level }));
}

export default async function PrimaryLevelFullProgramRedirect({ params }: PageProps) {
  const { level } = await params;
  redirect(`/primaire/${level}/programme`);
}
