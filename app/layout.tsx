import type { Metadata } from "next";
import { SiteFooter } from "@/components/academy/SiteFooter";
import { SiteHeader } from "@/components/academy/SiteHeader";
import { RestaurantJsonLd } from "@/components/RestaurantJsonLd";
import { restaurantInfo, siteUrl } from "@/content/restaurant-info";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chez Juju & Fifi — Restaurant français à Chelles",
    template: "%s",
  },
  description:
    "Restaurant français à Chelles, cuisine traditionnelle, menu du jour, terrasse, groupes et réservation en ligne.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: restaurantInfo.name,
    title: "Chez Juju & Fifi — Restaurant français à Chelles",
    description:
      "Restaurant français à Chelles, cuisine traditionnelle, menu du jour, terrasse, groupes et réservation en ligne.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Chez Juju & Fifi — Restaurant français à Chelles",
    description:
      "Restaurant français à Chelles, cuisine traditionnelle, menu du jour, terrasse, groupes et réservation en ligne.",
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
        <RestaurantJsonLd />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
