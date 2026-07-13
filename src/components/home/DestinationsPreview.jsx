import SectionHeader from "../common/SectionHeader";
import DestinationCard from "../common/DestinationCard";
import destinations from "../../data/destinations";

export default function DestinationsPreview() {
  const preview = destinations.slice(0, 4);

  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeader
          tag="Destinations"
          title="Explore the High Atlas"
          description="From the summit of Toubkal to the hidden valleys of Azzaden, discover the breathtaking destinations we explore."
        />
        <div className="grid-2" style={{ gap: "1.5rem" }}>
          {preview.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
