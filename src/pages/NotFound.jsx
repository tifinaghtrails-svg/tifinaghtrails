import { Link } from "react-router-dom";
import SEO from "../utils/seo";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist. Browse our guided trekking tours in the High Atlas Mountains or return to the homepage."
        path="/404"
        noIndex
      />
      <section className="section">
      <div className="container">
        <div className="not-found">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            The page you are looking for does not exist or has been moved. Let
            us help you find your way back to the mountains.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Button variant="primary" to="/">
              Back to Home
            </Button>
            <Button variant="accent" to="/tours">
              Browse Tours
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
