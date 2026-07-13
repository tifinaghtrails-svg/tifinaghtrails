import SectionHeader from "../common/SectionHeader";
import TourCard from "../common/TourCard";
import tours from "../../data/tours";

export default function PopularTours() {
  const popular = tours.filter((t) => t.category !== "custom").slice(0, 4);

  return (
    <section className="section" id="popular-tours">
      <div className="container">
        <SectionHeader
          tag="Our Treks"
          title="Popular Tours & Treks"
          description="Discover our most popular trekking experiences in the High Atlas Mountains. Each tour is guided by certified local experts."
        />
        <div className="grid-2" style={{ gap: "1.5rem" }}>
          {popular.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
