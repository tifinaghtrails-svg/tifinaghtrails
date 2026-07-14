export const siteConfig = {
  name: "TifinaghTrails",
  alternateName: "Tifinagh Trails",
  siteUrl: "https://tifinaghtrails.com",
  defaultLocale: "en_US",
  language: "en",
  email: "tifinaghtrails@gmail.com",
  phone: "+212657794841",
  displayPhone: "+212 657-794841",
  whatsappNumber: "212657794841",
  whatsappUrl: "https://wa.me/212657794841",
  address: {
    streetAddress: "Douar Imlil, Asni",
    locality: "Imlil",
    region: "High Atlas",
    country: "MA",
    display: "Douar Imlil, Asni, High Atlas, Morocco",
  },
  serviceArea: [
    "Mount Toubkal",
    "Imlil Valley",
    "Azzaden Valley",
    "Ouirgane Valley",
    "High Atlas Mountains",
    "Marrakech",
  ],
  defaultOgImage: "/images/mustapha/1000144629.jpg",
};

export const canonicalUrl = (path = "/") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${cleanPath === "/" ? "/" : cleanPath}`;
};
