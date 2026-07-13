import SectionHeader from "../common/SectionHeader";

const reasons = [
  {
    icon: "\u2696",
    title: "Certified Local Guide",
    text: "All our guides are officially certified by the Moroccan Ministry of Tourism with extensive training in mountain safety and first aid."
  },
  {
    icon: "\u2728",
    title: "Safety First Approach",
    text: "Your safety is our priority. We provide proper equipment, comprehensive safety briefings, and guide-to-guest ratios that ensure individual attention."
  },
  {
    icon: "\uD83C\uDFD4",
    title: "Authentic Berber Experience",
    text: "Trek with us and experience genuine Berber hospitality \u2014 from sharing meals with local families to sleeping in mountain villages."
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Transparent Pricing",
    text: "No hidden fees, no surprise costs. What we quote is what you pay. We believe in honest, straightforward pricing for all our tours."
  },
  {
    icon: "\uD83D\uDE98",
    title: "Marrakech Pickup Included",
    text: "Every tour includes convenient pickup and drop-off at your Marrakech accommodation. Sit back, relax, and let us handle the logistics."
  },
  {
    icon: "\uD83C\uDF0D",
    title: "Custom Private Tours",
    text: "Want something unique? We design personalized itineraries based on your interests, fitness level, and schedule. The mountains are yours to explore."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeader
          tag="Why Choose Us"
          title="Why Trek With TifinaghTrails"
          description="We are not just guides \u2014 we are your local hosts, safety officers, and cultural ambassadors. Here is what sets us apart."
        />
        <div className="grid-3">
          {reasons.map((reason, index) => (
            <div key={index} className="why-card">
              <div className="why-card-icon">{reason.icon}</div>
              <h4>{reason.title}</h4>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
