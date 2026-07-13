import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";

export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center"
          }}
          className="about-preview-grid"
        >
          <div>
            <SectionHeader
              tag="About Your Guide"
              title="Your Local Mountain Guide in Imlil"
              description="Meet the team behind your High Atlas adventure."
              align="left"
            />
            <p style={{ marginBottom: "1rem" }}>
              Born and raised in the shadow of Mount Toubkal, our family of
              guides has been leading treks in the High Atlas for more than a
              decade. We know every trail, every village, and every peak in
              this magnificent range.
            </p>
            <p style={{ marginBottom: "2rem" }}>
              As certified mountain guides with official Ministry of Tourism
              licensing, we combine professional expertise with the warm
              hospitality that Berber culture is famous for. When you trek
              with us, you are not just a client \u2014 you are a guest in our
              mountain home.
            </p>
            <Button variant="primary" to="/about">
              Learn Our Story
            </Button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem"
            }}
          >
            <img
              src="/images/mustapha/1000144576.jpg"
              alt="Local guide with guests in Imlil"
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                borderRadius: "var(--radius-lg)"
              }}
              loading="lazy"
            />
            <img
              src="/images/mustapha/1000154245.jpg"
              alt="Imlil village below snow-capped Atlas mountains"
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                borderRadius: "var(--radius-lg)",
                marginTop: "2rem"
              }}
              loading="lazy"
            />
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .about-preview-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
