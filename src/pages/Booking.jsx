import SEO, { BreadcrumbJsonLd } from "../utils/seo";
import BookingForm from "../components/common/BookingForm";
import { siteConfig } from "../config/site";

export default function Booking() {
  return (
    <>
      <SEO
        title="Book Your Trek — Mount Toubkal & High Atlas Tours"
        description="Book your guided trekking tour in the High Atlas Mountains. Secure online booking with free Marrakech pickup, no hidden fees, and instant confirmation from our local team."
        path="/booking"
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Booking", path: "/booking" }]} />
      <section className="page-header">
        <div className="container">
          <h1>Book Your Trek</h1>
          <p>
            Fill out the form below and we will confirm your booking within 24 hours
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booking-page-layout">
            <div>
              <BookingForm />
            </div>
            <div className="booking-sidebar">
              <h4>&#128172; Why Book With Us?</h4>
              <ul>
                <li>Certified local mountain guides</li>
                <li>Free Marrakech hotel pickup & drop-off</li>
                <li>Flexible dates & private tours</li>
                <li>No booking fees or hidden charges</li>
                <li>24/7 support during your trip</li>
                <li>100% safe & secure booking</li>
              </ul>
              <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--color-white)", borderRadius: "var(--radius-lg)" }}>
                <p style={{ fontSize: "0.85rem", margin: 0, textAlign: "center" }}>
                  <strong>Need help?</strong><br />
                  <a
                    href={siteConfig.whatsappUrl}
                    style={{ color: "var(--color-whatsapp)", fontWeight: 600 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
