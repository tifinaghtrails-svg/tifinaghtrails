import tours from "../src/data/tours.js";
import destinations from "../src/data/destinations.js";
import faqs from "../src/data/faqs.js";
import { canonicalUrl, siteConfig } from "../src/config/site.js";

const page = (route) => ({
  changefreq: "monthly",
  priority: "0.7",
  image: siteConfig.defaultOgImage,
  index: true,
  ...route,
});

export const staticRoutes = [
  page({
    path: "/",
    title: "Local Mountain Guide in Mount Toubkal, Morocco",
    description:
      "TifinaghTrails helps travelers plan guided Mount Toubkal and High Atlas trekking tours from Imlil and Marrakech, Morocco.",
    h1: "TifinaghTrails High Atlas Trekking Tours",
    intro:
      "Guided Mount Toubkal ascents, Berber village day trips, valley treks, and private High Atlas itineraries from Marrakech and Imlil.",
    bullets: ["Mount Toubkal summit treks", "High Atlas day trips", "Private and custom tours"],
    changefreq: "weekly",
    priority: "1.0",
  }),
  page({
    path: "/about",
    title: "About - Local Berber Mountain Guides in Imlil",
    description:
      "Meet the local mountain guides behind TifinaghTrails and learn about the team, Berber heritage, safety approach, and High Atlas trekking experience.",
    h1: "About TifinaghTrails",
    intro:
      "TifinaghTrails is based in Imlil in Morocco's High Atlas Mountains and focuses on guided trekking experiences rooted in local mountain knowledge.",
    bullets: ["Local Imlil knowledge", "Berber cultural connection", "Safety-focused mountain guiding"],
    priority: "0.8",
  }),
  page({
    path: "/tours",
    title: "Trekking Tours - Mount Toubkal and High Atlas",
    description:
      "Explore guided High Atlas trekking tours including Mount Toubkal ascents, Berber village day trips, multi-day valley treks, and custom private tours.",
    h1: "Guided High Atlas Tours and Treks",
    intro:
      "Compare Mount Toubkal climbs, Imlil day trips, Azzaden Valley treks, Ouirgane tours, and tailor-made private adventures.",
    bullets: tours.map((tour) => `${tour.title} from ${tour.currency}${tour.price > 0 ? tour.price : "custom"}`),
    changefreq: "weekly",
    priority: "0.9",
  }),
  page({
    path: "/destinations",
    title: "Destinations - High Atlas Mountains and Berber Valleys",
    description:
      "Discover Mount Toubkal, Imlil Valley, Azzaden Valley, Berber villages, Ouirgane, Toubkal National Park, and the High Atlas destinations we visit.",
    h1: "High Atlas Destinations",
    intro:
      "Explore the mountain places, valleys, villages, and national park landscapes that shape TifinaghTrails itineraries.",
    bullets: destinations.map((destination) => destination.name),
    priority: "0.8",
  }),
  page({
    path: "/gallery",
    title: "Photo Gallery - High Atlas Mountains Trekking",
    description:
      "Browse High Atlas trekking photos featuring Mount Toubkal panoramas, Imlil valley landscapes, Berber village life, mountain camps, and Morocco trail views.",
    h1: "High Atlas Trekking Photo Gallery",
    intro:
      "A visual overview of the landscapes, villages, trails, and mountain moments travelers can expect on TifinaghTrails tours.",
    bullets: ["Mount Toubkal views", "Berber villages", "Valleys, passes, and mountain camps"],
    priority: "0.6",
  }),
  page({
    path: "/faq",
    title: "FAQ - Trekking in the High Atlas",
    description:
      "Answers to common questions about Mount Toubkal difficulty, High Atlas trekking equipment, booking, payment, meals, accommodation, and altitude.",
    h1: "Frequently Asked Questions",
    intro:
      "Practical answers for travelers planning a Mount Toubkal climb or High Atlas trekking trip in Morocco.",
    bullets: faqs.map((faq) => faq.question),
  }),
  page({
    path: "/contact",
    title: "Contact - Plan Your High Atlas Trek",
    description:
      "Contact TifinaghTrails by WhatsApp, email, or contact form to plan a Mount Toubkal climb, Imlil day trip, or private High Atlas trek.",
    h1: "Contact TifinaghTrails",
    intro:
      `Reach the team by WhatsApp at ${siteConfig.displayPhone} or email at ${siteConfig.email} for trekking questions and booking help.`,
    bullets: ["WhatsApp support", "Email inquiries", "Imlil, High Atlas, Morocco"],
    priority: "0.8",
  }),
  page({
    path: "/booking",
    title: "Book Your Trek - Mount Toubkal and High Atlas Tours",
    description:
      "Send a booking request for a guided High Atlas trek, Mount Toubkal ascent, Berber village day trip, or custom private Morocco itinerary.",
    h1: "Book Your High Atlas Trek",
    intro:
      "Choose your preferred tour, date, group size, and fitness level, then receive a booking response by email or WhatsApp.",
    bullets: ["Mount Toubkal ascents", "Private tour dates", "Customer and owner email notifications"],
  }),
];

export const tourRoutes = tours.map((tour) =>
  page({
    path: `/tours/${tour.slug}`,
    title: `${tour.title} - Guided High Atlas Tour`,
    description: tour.shortDescription,
    h1: tour.title,
    intro: tour.description,
    bullets: tour.highlights,
    image: tour.image,
    priority: "0.7",
    tour,
  })
);

export const notFoundRoute = page({
  path: "/404",
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist. Browse guided trekking tours in the High Atlas Mountains or return to the homepage.",
  h1: "404 - Page Not Found",
  intro: "This page is not available. Use the tours page or contact page to continue planning your trek.",
  bullets: ["Browse tours", "Return home", "Contact TifinaghTrails"],
  index: false,
  priority: "0.0",
});

export const allRoutes = [...staticRoutes, ...tourRoutes];
export const sitemapRoutes = allRoutes.filter((route) => route.index);

export const canonicalForRoute = (route) => canonicalUrl(route.path);

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.siteUrl}/#business`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
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
  areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "Place", name })),
});

export const breadcrumbJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.path),
  })),
});

export const tourJsonLd = (tour) => ({
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
});

export const faqJsonLd = () => ({
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
