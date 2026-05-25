import { restaurantInfo, siteUrl } from "@/content/restaurant-info";

export function RestaurantJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantInfo.name,
    alternateName: restaurantInfo.alternateName,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurantInfo.address.streetAddress,
      postalCode: restaurantInfo.address.postalCode,
      addressLocality: restaurantInfo.address.addressLocality,
      addressCountry: restaurantInfo.address.addressCountry,
    },
    telephone: restaurantInfo.telephone,
    servesCuisine: restaurantInfo.servesCuisine,
    priceRange: restaurantInfo.priceRange,
    openingHours: restaurantInfo.openingHours,
    acceptsReservations: restaurantInfo.acceptsReservations,
    menu: `${siteUrl}${restaurantInfo.menuPath}`,
    ...(restaurantInfo.sameAs.length > 0 ? { sameAs: restaurantInfo.sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
