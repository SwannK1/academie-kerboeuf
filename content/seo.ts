import type { Metadata } from "next";

export const SITE_NAME = "Académie Kerboeuf";
export const SITE_TITLE_SEPARATOR = " | ";
export const DEFAULT_SITE_DESCRIPTION =
  "Préparer sa classe, piloter son école, trouver des ressources prêtes à imprimer : la plateforme de travail des professeurs des écoles et des directions.";

const DEFAULT_SITE_URL = "https://academie-kerboeuf.vercel.app";

export function getPublicSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}

export function getAbsoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getPublicSiteUrl()}${normalizedPath}`;
}

export function normalizePageTitle(title: string): string {
  return title
    .replace(new RegExp(`\\s*\\|\\s*${SITE_NAME}$`), "")
    .replace(new RegExp(`\\s*—\\s*${SITE_NAME}$`), "")
    .trim();
}

export function buildFullTitle(title?: string): string {
  const normalizedTitle = title ? normalizePageTitle(title) : undefined;
  if (!normalizedTitle) return SITE_NAME;
  return `${normalizedTitle}${SITE_TITLE_SEPARATOR}${SITE_NAME}`;
}

type PageMetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const normalizedTitle = title ? normalizePageTitle(title) : undefined;
  const fullTitle = buildFullTitle(normalizedTitle);

  return {
    title: normalizedTitle ?? { absolute: SITE_NAME },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: getAbsoluteUrl(path),
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
