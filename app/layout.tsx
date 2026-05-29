import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import { SITE_URL } from "@/content/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
