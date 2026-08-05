import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import { BASE_URL, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Académie Kerboeuf | Missions pédagogiques immersives",
    template: "%s | Académie Kerboeuf",
  },
  description:
    "Une plateforme pédagogique immersive pour élèves, enseignants et parents — de la maternelle à la Terminale.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Académie Kerboeuf",
    title: "Académie Kerboeuf | Missions pédagogiques immersives",
    description:
      "Une plateforme pédagogique immersive pour élèves, enseignants et parents — de la maternelle à la Terminale.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary",
    title: "Académie Kerboeuf | Missions pédagogiques immersives",
    description:
      "Une plateforme pédagogique immersive pour élèves, enseignants et parents — de la maternelle à la Terminale.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-ink"
        >
          Aller au contenu principal
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
