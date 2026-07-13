import { Link } from "react-router-dom";
import Button from "./Button";

export default function TourCard({ tour }) {
  const difficultyClass = tour.difficultyLabel?.toLowerCase() || tour.difficulty;

  return (
    <article className="tour-card">
      <Link to={`/tours/${tour.slug}`} className="tour-card-image-wrap">
        <img
          src={tour.image}
          alt={tour.title}
          className="tour-card-image"
          loading="lazy"
        />
        <span className={`tour-card-badge ${difficultyClass}`}>
          {tour.difficultyLabel}
        </span>
        {tour.price > 0 && (
          <span className="tour-card-price">
            {tour.currency}{tour.price}
            <small>/person</small>
          </span>
        )}
      </Link>
      <div className="tour-card-body">
        <h3 className="tour-card-title">
          <Link to={`/tours/${tour.slug}`}>{tour.title}</Link>
        </h3>
        <div className="tour-card-meta">
          <span className="tour-card-meta-item">
            <span className="tour-card-meta-icon">&#128197;</span>
            {tour.duration}
          </span>
          <span className="tour-card-meta-item">
            <span className="tour-card-meta-icon">&#128204;</span>
            {tour.location}
          </span>
          <span className="tour-card-meta-item">
            <span className="tour-card-meta-icon">&#128101;</span>
            {tour.groupSize}
          </span>
        </div>
        <p className="tour-card-desc">{tour.shortDescription}</p>
        <div className="tour-card-actions">
          <Button variant="outline" size="sm" to={`/tours/${tour.slug}`}>
            View Details
          </Button>
          <Button variant="accent" size="sm" to={`/booking?tour=${tour.slug}`}>
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}
