import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../common/Button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/tours", label: "Tours" },
  { to: "/destinations", label: "Destinations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">&#9968;</div>
            Tifinagh<span>Trails</span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="navbar-actions">
            <Button variant="accent" size="sm" to="/booking">
              Book Now
            </Button>
          </div>

          <button
            className={`navbar-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">Navigation</div>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            end={link.to === "/"}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mobile-nav-actions">
          <Button variant="accent" fullWidth to="/booking">
            Book Now
          </Button>
          <Button
            variant="whatsapp"
            fullWidth
            href="https://wa.me/212657794841"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
}
