import { useParams } from "react-router-dom";
import SEO, { TourJsonLd, BreadcrumbJsonLd } from "../utils/seo";
import tours from "../data/tours";
import Button from "../components/common/Button";
import NotFound from "./NotFound";

const difficultyColors = {
  easy: "#10B981",
  moderate: "#E8751A",
  challenging: "#EF4444",
  custom: "#6B7280"
};

const categoryLabels = {
  toubkal: "Toubkal Trek",
  "day-trip": "Day Trip",
  trekking: "Multi-Day Trek",
  custom: "Custom Tour"
};

export default function TourDetails() {
  const { slug } = useParams();
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    return <NotFound />;
  }

  const difficultyColor = difficultyColors[tour.difficulty] || difficultyColors.moderate;

  return (
    <>
      <SEO
        title={`${tour.title} — Guided Tour in High Atlas`}
        description={tour.shortDescription}
        path={`/tours/${tour.slug}`}
        ogImage={tour.image}
      />
      <TourJsonLd tour={tour} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }, { name: tour.title, path: `/tours/${tour.slug}` }]} />
      <div className="tour-details-hero">
        <img src={tour.image} alt={tour.title} />
        <div className="tour-details-hero-overlay" />
        <div className="tour-details-hero-content">
          <div className="tour-details-hero-category">
            {categoryLabels[tour.category] || "Trek"}
          </div>
          <h1>{tour.title}</h1>
          <p>{tour.subtitle}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="tour-details-grid">
            <div className="tour-detail-item">
              <div className="tour-detail-item-icon">&#128197;</div>
              <div className="tour-detail-item-label">Duration</div>
              <div className="tour-detail-item-value">{tour.duration}</div>
            </div>
            <div className="tour-detail-item">
              <div className="tour-detail-item-icon">&#128200;</div>
              <div className="tour-detail-item-label">Difficulty</div>
              <div
                className="tour-detail-item-value"
                style={{ color: difficultyColor }}
              >
                {tour.difficultyLabel}
              </div>
            </div>
            <div className="tour-detail-item">
              <div className="tour-detail-item-icon">&#128101;</div>
              <div className="tour-detail-item-label">Group Size</div>
              <div className="tour-detail-item-value">{tour.groupSize}</div>
            </div>
            <div className="tour-detail-item">
              <div className="tour-detail-item-icon">&#128205;</div>
              <div className="tour-detail-item-label">Starting From</div>
              <div className="tour-detail-item-value">{tour.startPoint}</div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              marginTop: "3rem"
            }}
            className="tour-layout"
          >
            <div>
              <h3 style={{ marginBottom: "1rem" }}>About This Tour</h3>
              <p style={{ lineHeight: 1.8, fontSize: "1rem" }}>
                {tour.description}
              </p>

              <h3 style={{ margin: "2rem 0 1rem" }}>Highlights</h3>
              <ul style={{ padding: 0 }}>
                {tour.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "0.5rem 0",
                      display: "flex",
                      gap: "0.7rem",
                      alignItems: "flex-start",
                      fontSize: "0.95rem",
                      color: "var(--color-text-light)"
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(232, 117, 26, 0.12)",
                        color: "var(--color-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "3px"
                      }}
                    >
                      &#10003;
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <h3 style={{ margin: "2rem 0 1.5rem" }}>Itinerary</h3>
              <div>
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="itinerary-day">
                    <div className="itinerary-day-number">{day.day}</div>
                    <div className="itinerary-day-content">
                      <div className="itinerary-day-title">{day.title}</div>
                      <p className="itinerary-day-desc">{day.description}</p>
                      <div className="itinerary-day-meta">
                        {day.hiking && <span>&#127939; {day.hiking}</span>}
                        {day.meals && (
                          <span>&#127858; {day.meals.join(" \u2022 ")}</span>
                        )}
                        {day.accommodation && (
                          <span>&#127968; {day.accommodation}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tour-details-sidebar">
              {tour.price > 0 && (
                <div className="tour-details-price-box" style={{ marginBottom: "2rem" }}>
                  <div className="price">
                    {tour.currency}{tour.price}
                  </div>
                  <div className="per-person">per person</div>
                  <Button
                    variant="accent"
                    size="lg"
                    fullWidth
                    to={`/booking?tour=${tour.slug}`}
                  >
                    Book This Tour
                  </Button>
                </div>
              )}

              {tour.price === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                    borderRadius: "var(--radius-xl)",
                    color: "var(--color-white)",
                    marginBottom: "2rem",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <h4 style={{ color: "var(--color-white)" }}>Custom Pricing</h4>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", margin: "0.5rem 0 1.5rem" }}>
                    100% tailored to your needs
                  </p>
                  <Button
                    variant="accent"
                    size="lg"
                    fullWidth
                    to={`/booking?tour=${tour.slug}`}
                  >
                    Request a Quote
                  </Button>
                </div>
              )}

              <div
                style={{
                  background: "var(--color-sand)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.5rem",
                  marginBottom: "1.5rem"
                }}
              >
                <h4 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "var(--color-success)" }}>&#10003;</span>
                  Included
                </h4>
                <div className="included-list">
                  {tour.included.map((item, i) => (
                    <div key={i} className="included-item">
                      <span className="included-item-icon">&#10003;</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "var(--color-white)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.5rem",
                  border: "1px solid var(--color-border)",
                  marginBottom: "1.5rem"
                }}
              >
                <h4 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "var(--color-error)" }}>&#10007;</span>
                  Not Included
                </h4>
                <div className="included-list">
                  {tour.notIncluded.map((item, i) => (
                    <div key={i} className="included-item">
                      <span className="included-item-icon not">&#10007;</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "var(--color-sand)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.5rem",
                  marginBottom: "1.5rem"
                }}
              >
                <h4 style={{ marginBottom: "1rem" }}>
                  What to Bring
                </h4>
                <ul style={{ padding: 0 }}>
                  {tour.whatToBring.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "0.4rem 0",
                        display: "flex",
                        gap: "0.6rem",
                        fontSize: "0.9rem",
                        color: "var(--color-text-light)",
                        borderBottom: "1px solid var(--color-border-light)"
                      }}
                    >
                      <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>&#9655;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.5rem",
                  color: "var(--color-white)"
                }}
              >
                <h4 style={{ color: "var(--color-white)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  &#127780; Best Season
                </h4>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", margin: 0 }}>
                  {tour.bestSeason}
                </p>
              </div>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <Button variant="outline" to="/tours">
                  &larr; Back to All Tours
                </Button>
              </div>
            </div>
          </div>

          <style>{`
            @media (min-width: 992px) {
              .tour-layout {
                grid-template-columns: 1.3fr 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
