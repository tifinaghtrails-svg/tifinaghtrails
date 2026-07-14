export default function PageLoading({ overlay = false }) {
  return (
    <div
      className={`page-loading ${overlay ? "page-loading-overlay" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="page-loading-bar" />
      <div className="page-loading-inner">
        <div className="page-loading-brand">
          <span className="page-loading-mark">&#9968;</span>
          <span>Loading TifinaghTrails</span>
        </div>

        <div className="page-loading-shell">
          <div className="page-loading-hero">
            <span className="skeleton skeleton-pill" />
            <span className="skeleton skeleton-title" />
            <span className="skeleton skeleton-line skeleton-wide" />
            <span className="skeleton skeleton-line" />
          </div>

          <div className="page-loading-grid">
            {[0, 1, 2].map((item) => (
              <div className="page-loading-card" key={item}>
                <span className="skeleton skeleton-image" />
                <span className="skeleton skeleton-line skeleton-strong" />
                <span className="skeleton skeleton-line" />
                <span className="skeleton skeleton-line skeleton-short" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
