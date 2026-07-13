import Button from "../common/Button";

export default function CTASection() {
  return (
    <section className="section section-dark" style={{ textAlign: "center" }}>
      <div
        className="container"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>
          Ready for Your Toubkal Adventure?
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "2rem",
            opacity: 0.85
          }}
        >
          Book your trek today and experience the magic of the High Atlas
          Mountains with a certified local guide. Your adventure starts here.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center"
          }}
        >
          <Button variant="accent" size="lg" to="/booking">
            Book Your Trek Now
          </Button>
          <Button
            variant="whatsapp"
            size="lg"
            href="https://wa.me/212657794841"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
