import { redirect } from "next/navigation";
import { cm1Level } from "@/content/levels/cm1";
import { getPublishedSubdomainPage } from "@/content/levels/published-subdomain-pages";
import { getPublicStatusKey } from "@/content/public-status";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cm1Level.domains
    .flatMap((d) => d.subdomains)
    .flatMap((s) => s.lessons)
    .filter((l) => getPublicStatusKey(l.status) === "available")
    .map((l) => ({ slug: l.slug }));
}

export default async function Cm1LessonRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  for (const domain of cm1Level.domains) {
    for (const subdomain of domain.subdomains) {
      if (subdomain.lessons.some((l) => l.slug === slug)) {
        const published = getPublishedSubdomainPage("cm1", domain.slug, subdomain.slug);
        redirect(published?.route ?? "/primaire/cm1");
      }
    }
  }

  redirect("/primaire/cm1");
}
