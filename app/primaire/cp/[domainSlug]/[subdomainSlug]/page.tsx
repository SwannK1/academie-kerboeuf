import { notFound, permanentRedirect } from "next/navigation";
import {
  getPublishedSubdomainPage,
  publishedSubdomainPages,
} from "@/content/levels/published-subdomain-pages";

type PageProps = {
  params: Promise<{
    domainSlug: string;
    subdomainSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedSubdomainPages
    .filter((page) => page.level === "cp")
    .map((page) => ({
      domainSlug: page.domain,
      subdomainSlug: page.subdomain,
    }));
}

export default async function CpSubdomainRedirectPage({ params }: PageProps) {
  const { domainSlug, subdomainSlug } = await params;
  const published = getPublishedSubdomainPage("cp", domainSlug, subdomainSlug);

  if (!published) {
    notFound();
  }

  permanentRedirect(published.route);
}
