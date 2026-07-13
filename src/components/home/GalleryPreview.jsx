import SectionHeader from "../common/SectionHeader";
import GalleryGrid from "../common/GalleryGrid";
import Button from "../common/Button";

export default function GalleryPreview() {
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeader
          tag="Gallery"
          title="Moments From the Mountains"
          description="Browse a selection of photos from our treks through the High Atlas."
        />
        <GalleryGrid limit={6} />
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Button variant="primary" to="/gallery">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
