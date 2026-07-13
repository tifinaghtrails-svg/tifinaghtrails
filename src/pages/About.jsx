import SEO, { LocalBusinessJsonLd, BreadcrumbJsonLd } from "../utils/seo";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";

const values = [
  {
    icon: "\uD83C\uDFF4",
    title: "Local Expertise",
    text: "Growing up in the High Atlas, we know these mountains intimately. Every trail, every village, every seasonal change is familiar to us. We share this knowledge to enrich your trekking experience."
  },
  {
    icon: "\u2696",
    title: "Official Certification",
    text: "Our guides hold official certification from the Moroccan Ministry of Tourism and the Royal Moroccan Federation of Ski and Mountain Sports. We meet the highest professional standards."
  },
  {
    icon: "\uD83D\uDE91",
    title: "Safety & First Aid",
    text: "All our guides are trained in wilderness first aid and mountain rescue. We carry comprehensive first aid kits on every trek and maintain constant communication with emergency services."
  },
  {
    icon: "\uD83C\uDF0D",
    title: "Cultural Connection",
    text: "We believe travel should be meaningful. Our treks offer genuine cultural exchange with Berber communities, from sharing meals with local families to learning about traditional mountain life."
  }
];

const stats = [
  { number: "10+", label: "Years Experience", icon: "\uD83D\uDCC5" },
  { number: "500+", label: "Happy Travelers", icon: "\uD83D\uDC65" },
  { number: "4,167m", label: "Toubkal Summit", icon: "\uD83C\uDFD4" },
  { number: "100%", label: "Local Team", icon: "\uD83C\uDF0D" }
];

export default function About() {
  return (
    <>
      <SEO
        title="About — Local Berber Mountain Guides in Imlil"
        description="Meet the certified local mountain guides behind TifinaghTrails. Learn about our Berber heritage, official credentials, safety standards, and commitment to authentic High Atlas trekking experiences."
        path="/about"
      />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <section className="page-header">
        <div className="container">
          <h1>About TifinaghTrails</h1>
          <p>Meet your local mountain guide and discover our story</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "start"
            }}
            className="about-page-grid"
          >
            <div className="about-story">
              <SectionHeader
                tag="Our Story"
                title="Born in the Mountains, Raised in the Valley"
                description=""
                align="left"
              />
              <p>
                TifinaghTrails was founded by a group of lifelong Berber
                mountain guides from the village of Imlil. For generations, our
                families have lived in the shadow of Mount Toubkal, farming
                terraced fields in summer and navigating mountain passes in
                winter. The mountains are not just our workplace &mdash; they are
                our home.
              </p>
              <p>
                We started guiding professionally over a decade ago, sharing
                our love for the High Atlas with travelers from around the
                world. What began as a small family operation has grown into a
                trusted team of certified guides, cooks, and muleteers who
                share a common passion: showing visitors the true beauty of
                Moroccan mountain culture.
              </p>
              <p>
                Every guide on our team was born in the Atlas region, speaks
                fluent Berber (Tamazight), Arabic, and English, and holds
                official guiding credentials. We invest in continuous training,
                safety equipment, and sustainable tourism practices because we
                believe the mountains should be enjoyed responsibly.
              </p>
              <p>
                When you trek with us, you are supporting local families,
                preserving Berber traditions, and experiencing the High Atlas
                through the eyes of people who have lived here their entire
                lives. This is not just a job for us &mdash; it is our heritage.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem"
              }}
            >
              <img
                src="/images/mustapha/1000150522.jpg"
                alt="High Atlas valley above an Imlil village"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)"
                }}
                loading="lazy"
              />
              <img
                src="/images/mustapha/1000144576.jpg"
                alt="Local guide with guests in a mountain village"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)",
                  marginTop: "2rem"
                }}
                loading="lazy"
              />
            </div>
          </div>

          <style>{`
            @media (min-width: 768px) {
              .about-page-grid {
                grid-template-columns: 1.2fr 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHeader
            tag="Experience"
            title="Our Team by the Numbers"
            description="We measure our success in smiles, summits, and safe returns."
          />
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Our Values"
            title="What We Stand For"
            description="Our guiding philosophy is built on respect, safety, and authenticity."
          />
          <div className="about-values">
            {values.map((value, index) => (
              <div key={index} className="about-value-card">
                <div className="about-value-icon">{value.icon}</div>
                <div className="about-value-content">
                  <h4>{value.title}</h4>
                  <p>{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <h2 style={{ marginBottom: "1rem" }}>
            Ready to Trek With Us?
          </h2>
          <p style={{ opacity: 0.85, marginBottom: "2rem" }}>
            Join hundreds of happy travelers who have explored the High Atlas
            with our certified local guides.
          </p>
          <Button variant="accent" size="lg" to="/tours">
            Browse Our Tours
          </Button>
        </div>
      </section>
    </>
  );
}
