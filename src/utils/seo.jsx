import { Helmet } from "react-helmet-async";

const SITE_URL = "https://tifinaghtrails.com";
const SITE_NAME = "TifinaghTrails";
const DEFAULT_OG_IMAGE = "/images/mustapha/1000144629.jpg";

export default function SEO({ title, description, path, ogImage, ogType, noIndex, children }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path || "/"}`;
  const image = ogImage || DEFAULT_OG_IMAGE;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
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
      {noIndex && <meta name="robots" content="noindex" />}
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
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: "Certified local mountain guide in Mount Toubkal, Morocco. Berber-led trekking tours in the High Atlas Mountains since 2014.",
    url: SITE_URL,
    telephone: "+212-657-794841",
    email: "tifinaghtrails@gmail.com",
    image: `${SITE_URL}/images/mustapha/1000144629.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Imlil, High Atlas Mountains",
      addressLocality: "Marrakech-Tensift-El Haouz",
      addressCountry: "MA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.138,
      longitude: -7.919
    },
    openingHours: "Mo-Su 06:00-20:00",
    priceRange: "€€",
    areaServed: {
      "@type": "City",
      name: "Mount Toubkal, High Atlas, Morocco"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trekking Tours",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mount Toubkal Ascent" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Berber Village Day Trip" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Day Valley Treks" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Private Treks" } }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5"
    }
  });
}

export function TourJsonLd({ tour }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${SITE_URL}/tours/${tour.slug}#tour`,
    name: tour.title,
    description: tour.shortDescription,
    url: `${SITE_URL}/tours/${tour.slug}`,
    image: tour.image.startsWith("http") ? tour.image : `${SITE_URL}${tour.image}`,
    touristType: tour.difficultyLabel,
    duration: tour.duration,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/tours/${tour.slug}`
    },
    itinerary: tour.itinerary.map(day => ({
      "@type": "Itinerary",
      name: day.title,
      description: day.description
    }))
  });
}

export function BreadcrumbJsonLd({ items }) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`
  }));

  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  });
}

export function FAQJsonLd({ faqs }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  });
}
