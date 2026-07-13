import SEO, { FAQJsonLd, BreadcrumbJsonLd } from "../utils/seo";
import faqs from "../data/faqs";
import FAQAccordion from "../components/common/FAQAccordion";
import SectionHeader from "../components/common/SectionHeader";

const categories = [
  { value: "difficulty", label: "Difficulty & Experience" },
  { value: "equipment", label: "Equipment & Packing" },
  { value: "booking", label: "Booking & Payment" }
];

export default function FAQ() {
  return (
    <>
      <SEO
        title="FAQ — Everything About Trekking in High Atlas"
        description="Frequently asked questions about climbing Mount Toubkal, trekking difficulty, equipment, booking process, payment, and what to expect on your High Atlas adventure with a local guide."
        path="/faq"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <section className="page-header">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>
            Everything you need to know before your trek in the High Atlas
            Mountains
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          {categories.map((cat) => {
            const catFaqs = faqs.filter((f) => f.category === cat.value);
            if (catFaqs.length === 0) return null;
            return (
              <div key={cat.value} style={{ marginBottom: "3rem" }}>
                <SectionHeader
                  tag={cat.label}
                  title=""
                  description=""
                />
                <FAQAccordion faqs={catFaqs} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
