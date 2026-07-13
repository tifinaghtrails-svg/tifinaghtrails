import Button from "../common/Button";

export default function Hero() {
  return (
    <section className="hero">
      <img
        src="/images/mustapha/1000144629.jpg"
        alt="Group trekking toward Mount Toubkal in the High Atlas"
        className="hero-bg"
      />
      <div className="hero-overlay" />
      <div className="hero-particles">
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
      </div>
      <div className="hero-content">
        <span className="hero-tag">
          <span className="hero-tag-dot" />
          Explore the High Atlas
        </span>
        <h1>
          Conquer <span>Mount Toubkal</span> With a Local Certified Guide
        </h1>
        <p>
          Experience the majesty of North Africa&apos;s highest peak with expert
          Berber guides. Safe treks, authentic culture, and unforgettable
          adventures in the heart of Morocco&apos;s Atlas Mountains.
        </p>
        <div className="hero-actions">
          <Button variant="accent" size="lg" to="/tours">
            Explore Tours
          </Button>
          <Button variant="outline-light" size="lg" to="/booking">
            Book Your Trek
          </Button>
        </div>
        <div className="hero-badges">
          <div className="hero-badge-item">
            <span className="hero-badge-icon">&#9968;</span>
            Certified Guide
          </div>
          <div className="hero-badge-item">
            <span className="hero-badge-icon">&#127939;</span>
            Safe Treks
          </div>
          <div className="hero-badge-item">
            <span className="hero-badge-icon">&#128234;</span>
            Free Pickup
          </div>
          <div className="hero-badge-item">
            <span className="hero-badge-icon">&#11088;</span>
            500+ Travelers
          </div>
        </div>
      </div>
    </section>
  );
}
