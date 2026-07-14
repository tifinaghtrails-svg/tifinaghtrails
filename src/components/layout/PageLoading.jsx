export default function PageLoading({ overlay = false }) {
  return (
    <div
      className={`page-loading ${overlay ? "page-loading-overlay" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <span className="page-loading-spinner" />
    </div>
  );
}
