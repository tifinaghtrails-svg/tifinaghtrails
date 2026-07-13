import { useState } from "react";
import galleryData, { galleryCategories } from "../../data/gallery";

export default function GalleryGrid({ limit }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeCategory === "all"
      ? galleryData
      : galleryData.filter((img) => img.category === activeCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {!limit && (
        <div className="gallery-filters">
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              className={`gallery-filter-btn ${activeCategory === cat.value ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {displayed.map((img) => (
          <div
            key={img.id}
            className="gallery-item"
            onClick={() => setLightbox(img)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="gallery-item-overlay">
              <span className="gallery-item-overlay-icon">&#128269;</span>
              <span>{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={lightbox.src.replace("w=600", "w=1200")}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption">{lightbox.title}</div>
        </div>
      )}
    </>
  );
}
