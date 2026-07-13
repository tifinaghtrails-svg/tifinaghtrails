import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations#${destination.slug}`}
      className="destination-card"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="destination-card-image"
        loading="lazy"
      />
      <div className="destination-card-overlay">
        <h3 className="destination-card-title">{destination.name}</h3>
        {destination.tourCount && (
          <span className="destination-card-count">
            {destination.tourCount} tour{destination.tourCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </Link>
  );
}
