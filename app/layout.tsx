import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Académie Kerboeuf — Plateforme pédagogique",
    template: "%s | Académie Kerboeuf",
  },
  description:
    "Académie Kerboeuf : une plateforme pédagogique structurée pour apprendre, s'entraîner et progresser, de la maternelle au lycée.",
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
