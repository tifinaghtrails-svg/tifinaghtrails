import SEO, { BreadcrumbJsonLd } from "../utils/seo";
import ContactForm from "../components/common/ContactForm";
import Button from "../components/common/Button";
import SectionHeader from "../components/common/SectionHeader";

const WHATSAPP_NUMBER = "+212 657-794841";
const WHATSAPP_LINK = "https://wa.me/212657794841";
const EMAIL = "tifinaghtrails@gmail.com";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact — Get in Touch With Your Local Mountain Guide"
        description="Contact TifinaghTrails via WhatsApp, email, or our contact form. We are based in Imlil, High Atlas, and ready to help you plan your perfect Moroccan trekking adventure."
        path="/contact"
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Get in touch with TifinaghTrails. We are here to help plan
            your perfect adventure.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <SectionHeader
                tag="Get in Touch"
                title="We Would Love to Hear From You"
                description=""
                align="left"
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.5rem",
                  marginBottom: "2.5rem"
                }}
                className="contact-cards-grid"
              >
                <div className="contact-card">
                  <div className="contact-card-icon">&#128172;</div>
                  <h4>WhatsApp</h4>
                  <p>{WHATSAPP_NUMBER}</p>
                  <div style={{ marginTop: "1rem" }}>
                    <Button variant="whatsapp" href={WHATSAPP_LINK}>
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">&#9993;</div>
                  <h4>Email</h4>
                  <p>{EMAIL}</p>
                  <div style={{ marginTop: "1rem" }}>
                    <Button variant="primary" href={`mailto:${EMAIL}`}>
                      Send Email
                    </Button>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">&#128205;</div>
                  <h4>Location</h4>
                  <p>
                    Douar Imlil, Asni<br />
                    High Atlas, Morocco
                  </p>
                  <div style={{ marginTop: "1rem" }}>
                    <Button variant="outline" href="https://maps.google.com/?q=Imlil+Morocco">
                      View on Map
                    </Button>
                  </div>
                </div>
              </div>

              <div className="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6779.487586982113!2d-7.924423284853677!3d31.137074733051107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafb3e5a8e3e6c1%3A0x8c5c5a5c5f5c5f5c!2sImlil%2C%20Morocco!5e0!3m2!1sen!2s!4v1"
                  title="Imlil Location Map"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <SectionHeader
                tag="Send a Message"
                title="Contact Form"
                description=""
                align="left"
              />
              <ContactForm />
            </div>
          </div>

          <style>{`
            @media (min-width: 600px) {
              .contact-cards-grid {
                grid-template-columns: 1fr 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
