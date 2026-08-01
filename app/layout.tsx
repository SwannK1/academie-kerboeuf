import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import "./globals.css";

// TODO: remplacer par le domaine réel avant mise en production
const BASE_URL = "https://academie-kerboeuf.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Académie Kerboeuf | Missions pédagogiques immersives",
    template: "%s | Académie Kerboeuf",
  },
  description:
    "Une plateforme pédagogique immersive pour élèves, enseignants et parents — de la maternelle à la Terminale.",
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
