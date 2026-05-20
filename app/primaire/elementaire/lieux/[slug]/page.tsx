import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ElementaryPlaceDetail } from "@/components/academy/elementary-place-detail";
import {
  elementaryPlaceSlugs,
  getElementaryPlaceBySlug,
} from "@/content/elementary-places";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return elementaryPlaceSlugs;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = getElementaryPlaceBySlug(slug);

  if (!place) {
    return { title: "Lieu introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${place.title} | Lieux élémentaires`,
    description: place.shortDescription,
  };
}

export default async function ElementaryPlacePage({ params }: PageProps) {
  const { slug } = await params;
  const place = getElementaryPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  return <ElementaryPlaceDetail place={place} />;
}
