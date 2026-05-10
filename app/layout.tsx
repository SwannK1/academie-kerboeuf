import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Académie Kerboeuf | Missions pédagogiques immersives",
  description:
    "Une plateforme pédagogique immersive pour élèves, enseignants et parents.",
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
