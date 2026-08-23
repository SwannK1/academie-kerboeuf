import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import {
  DEFAULT_SITE_DESCRIPTION,
  getPublicSiteUrl,
  SITE_NAME,
} from "@/content/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    url: getPublicSiteUrl(),
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
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
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <a
          href="#contenu-principal"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-md bg-gold px-4 py-2 text-sm font-bold text-ink shadow-lg transition focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white print:hidden"
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
