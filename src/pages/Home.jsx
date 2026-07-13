import SEO, { LocalBusinessJsonLd, BreadcrumbJsonLd } from "../utils/seo";
import Hero from "../components/home/Hero";
import PopularTours from "../components/home/PopularTours";
import WhyChooseUs from "../components/home/WhyChooseUs";
import AboutPreview from "../components/home/AboutPreview";
import DestinationsPreview from "../components/home/DestinationsPreview";
import TestimonialsSection from "../components/home/TestimonialsSection";
import GalleryPreview from "../components/home/GalleryPreview";
import CTASection from "../components/home/CTASection";
import FAQAccordion from "../components/common/FAQAccordion";
import faqs from "../data/faqs";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";

export default function Home() {
  const previewFaqs = faqs.slice(0, 4);

  return (
    <>
      <SEO
        title="Local Mountain Guide in Mount Toubkal, Morocco"
        description="TifinaghTrails offers certified local mountain guide services in the High Atlas. Book authentic Berber-led trekking tours to Mount Toubkal summit, valley treks, and cultural day trips from Marrakech."
        path="/"
      />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <Hero />

      <section className="section-cream" style={{ padding: "2.5rem 0" }}>
        <div className="container">
          <div className="trust-bar">
            <div className="trust-item">
              <span className="trust-icon">&#9672;</span>
              Certified Guides
            </div>
            <div className="trust-item">
              <span className="trust-icon">&#9733;</span>
              500+ Travelers
            </div>
            <div className="trust-item">
              <span className="trust-icon">&#9968;</span>
              4,167m Summit
            </div>
            <div className="trust-item">
              <span className="trust-icon">&#128205;</span>
              Free Pickup
            </div>
            <div className="trust-item">
              <span className="trust-icon">&#128101;</span>
              Private Tours
            </div>
          </div>
        </div>
      </section>

      <PopularTours />
      <WhyChooseUs />
      <AboutPreview />
      <DestinationsPreview />
      <TestimonialsSection />
      <GalleryPreview />

      <section className="section">
        <div className="container">
          <SectionHeader
            tag="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about trekking in the High Atlas."
          />
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <FAQAccordion faqs={previewFaqs} />
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Button variant="outline" to="/faq">
              View All FAQs &rarr;
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
