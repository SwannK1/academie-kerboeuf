import { redirect } from "next/navigation";
import { cpLearningTree } from "@/content/levels/cp-learning-tree";
import { getPublishedSubdomainPage } from "@/content/levels/published-subdomain-pages";
import { getPublicStatusKey } from "@/content/public-status";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cpLearningTree.domains
    .flatMap((d) => d.subdomains)
    .flatMap((s) => s.lessons)
    .filter((l) => getPublicStatusKey(l.status) === "available")
    .map((l) => ({ slug: l.slug }));
}

export default async function CpLessonRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  for (const domain of cpLearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      if (subdomain.lessons.some((l) => l.slug === slug)) {
        const published = getPublishedSubdomainPage("cp", domain.slug, subdomain.slug);
        redirect(published?.route ?? "/primaire/cp");
      }
    }
  }

  redirect("/primaire/cp");
}
