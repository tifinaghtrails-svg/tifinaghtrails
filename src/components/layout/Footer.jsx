import { Link } from "react-router-dom";
import tours from "../../data/tours";
import { siteConfig } from "../../config/site";

export default function Footer() {
  const popularTours = tours.slice(0, 4);

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h3>Stay Inspired</h3>
        <p>Get trekking tips, special offers, and mountain stories from the High Atlas.</p>
        <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" required />
          <button type="submit" className="btn btn-accent btn-sm">Subscribe</button>
        </form>
      </div>

      <div className="footer-grid">
        <div className="footer-about">
          <h3>TifinaghTrails</h3>
          <p>
            We are a team of certified local mountain guides based in Imlil,
            Morocco. With over a decade of experience, we offer safe,
            authentic, and unforgettable trekking experiences in the High
            Atlas Mountains.
          </p>
          <div className="footer-social">
            <a href={siteConfig.whatsappUrl} aria-label="WhatsApp">&#128172;</a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">&#9993;</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">&#128247;</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">&#120143;</a>
          </div>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/tours">All Tours</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h3>Popular Tours</h3>
          <ul className="footer-links">
            {popularTours.map((tour) => (
              <li key={tour.id}>
                <Link to={`/tours/${tour.slug}`}>{tour.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <span className="footer-contact-icon">&#128205;</span>
              <span>{siteConfig.address.display}</span>
            </li>
            <li>
              <span className="footer-contact-icon">&#128222;</span>
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.displayPhone}</a>
            </li>
            <li>
              <span className="footer-contact-icon">&#128172;</span>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </li>
            <li>
              <span className="footer-contact-icon">&#9993;</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} TifinaghTrails. All rights reserved. |
          Licensed by the Ministry of Tourism, Morocco.
        </p>
      </div>
    </footer>
  );
}
