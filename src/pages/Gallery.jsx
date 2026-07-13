import SEO, { BreadcrumbJsonLd } from "../utils/seo";
import GalleryGrid from "../components/common/GalleryGrid";
import SectionHeader from "../components/common/SectionHeader";

export default function Gallery() {
  return (
    <>
      <SEO
        title="Photo Gallery — High Atlas Mountains Trekking"
        description="Browse our photo gallery showcasing the beauty of the High Atlas Mountains: Toubkal summit panoramas, Berber village life, valley landscapes, and stunning night skies over Morocco."
        path="/gallery"
        ogImage="/images/mustapha/1000144629.jpg"
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} />
      <section className="page-header">
        <div className="container">
          <h1>Photo Gallery</h1>
          <p>
            Stunning moments captured during our treks through the High Atlas
            Mountains
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
