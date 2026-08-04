import type { Metadata } from "next";

// TODO: remplacer par le domaine réel avant mise en production
const BASE_URL = "https://academie-kerboeuf.fr";
const SITE_NAME = "Académie Kerboeuf";

type PageMetadataInput = {
  /** Page title WITHOUT the "Académie Kerboeuf" suffix — the root layout's title template appends it. */
  title: string;
  description: string;
  /** Canonical path for this page, starting with "/" (e.g. "/primaire/cm2"). */
  path: string;
  robots?: Metadata["robots"];
};

/**
 * Builds a page's Metadata object: canonical, OpenGraph and Twitter are derived
 * from title/description so every route gets a unique social preview instead of
 * inheriting the root layout's generic one.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  robots,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      title: fullTitle,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}

export { BASE_URL, SITE_NAME };
