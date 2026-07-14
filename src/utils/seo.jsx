import { Helmet } from "react-helmet-async";
import { canonicalUrl, siteConfig } from "../config/site";

const previewNoIndex = import.meta.env.VITE_NOINDEX === "true";
const googleSiteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

export default function SEO({ title, description, path, ogImage, ogType, noIndex, children }) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = canonicalUrl(path || "/");
  const image = ogImage || siteConfig.defaultOgImage;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`;
  const shouldNoIndex = noIndex || previewNoIndex;

  return (
    <Helmet>
      <html lang={siteConfig.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={shouldNoIndex ? "noindex, nofollow" : "index, follow"} />
      <meta property="og:locale" content={siteConfig.defaultLocale} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}
      {children}
    </Helmet>
  );
}

function jsonLd(data) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}

export function LocalBusinessJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description:
      "Local mountain guide in Mount Toubkal, Morocco. Berber-led trekking tours in the High Atlas Mountains from Imlil.",
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.138,
      longitude: -7.919,
    },
    openingHours: "Mo-Su 06:00-20:00",
    priceRange: "EUR",
    areaServed: siteConfig.serviceArea.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trekking Tours",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mount Toubkal Ascent" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Berber Village Day Trip" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Day Valley Treks" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Private Treks" } },
      ],
    },
  });
}

export function TourJsonLd({ tour }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${siteConfig.siteUrl}/tours/${tour.slug}#tour`,
    name: tour.title,
    description: tour.shortDescription,
    url: `${siteConfig.siteUrl}/tours/${tour.slug}`,
    image: tour.image.startsWith("http") ? tour.image : `${siteConfig.siteUrl}${tour.image}`,
    touristType: tour.difficultyLabel,
    duration: tour.duration,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.siteUrl}/tours/${tour.slug}`,
    },
    itinerary: tour.itinerary.map((day) => ({
      "@type": "Itinerary",
      name: day.title,
      description: day.description,
    })),
  });
}

export function BreadcrumbJsonLd({ items }) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.path),
  }));

  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  });
}

export function FAQJsonLd({ faqs }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
}
