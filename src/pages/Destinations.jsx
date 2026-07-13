import SEO, { BreadcrumbJsonLd } from "../utils/seo";
import destinations from "../data/destinations";
import Button from "../components/common/Button";

export default function Destinations() {
  return (
    <>
      <SEO
        title="Destinations — High Atlas Mountains & Berber Valleys"
        description="Discover the stunning destinations we visit: Mount Toubkal, Imlil Valley, Azzaden Valley, Berber villages, Ouirgane, and more. Explore the diverse landscapes of Morocco's High Atlas range."
        path="/destinations"
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }]} />
      <section className="page-header">
        <div className="container">
          <h1>Our Destinations</h1>
          <p>
            Explore the stunning locations we visit in the High Atlas
            Mountains
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {destinations.map((dest) => (
            <div key={dest.id} id={dest.slug} className="dest-page-item">
              <img
                src={dest.image}
                alt={dest.name}
                className="destination-detail-image"
                loading="lazy"
              />
              <div>
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <div className="destination-highlights">
                  {dest.highlights.map((h, i) => (
                    <span key={i} className="destination-highlight-tag">
                      {h}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <Button variant="accent" to="/tours">
                    View Tours in This Area
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
