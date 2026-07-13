import { useState, useMemo } from "react";
import SEO, { BreadcrumbJsonLd } from "../utils/seo";
import tours, { tourCategories, difficultyLevels } from "../data/tours";
import TourCard from "../components/common/TourCard";

export default function Tours() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const filtered = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch =
        !search ||
        tour.title.toLowerCase().includes(search.toLowerCase()) ||
        tour.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        tour.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || tour.category === category;
      const matchesDifficulty =
        difficulty === "all" || tour.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, category, difficulty]);

  return (
    <>
      <SEO
        title="Trekking Tours — Mount Toubkal & High Atlas"
        description="Explore our range of guided trekking tours in the High Atlas Mountains: Toubkal summit ascents, Berber village day trips, multi-day valley treks, and fully customizable private tours from Marrakech."
        path="/tours"
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }]} />
      <section className="page-header">
        <div className="container">
          <h1>Our Tours & Treks</h1>
          <p>
            Discover our range of guided trekking experiences in the High
            Atlas Mountains
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tours-toolbar">
            <div className="tours-toolbar-left">
              <div className="tours-search">
                <span className="tours-search-icon">&#128269;</span>
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <span className="tours-result-count">
                {filtered.length} tour{filtered.length !== 1 ? "s" : ""} found
              </span>
            </div>
            <div className="tours-filters">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {tourCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficultyLevels.map((diff) => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid-2" style={{ gap: "1.5rem" }}>
              {filtered.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#128270;</div>
              <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                No tours found matching your criteria.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                Try adjusting your search or filter settings.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setDifficulty("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
