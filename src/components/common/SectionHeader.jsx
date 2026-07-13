export default function SectionHeader({
  tag,
  title,
  description,
  align = "center"
}) {
  return (
    <div className={`section-header ${align === "left" ? "section-header-left" : ""}`}>
      {tag && <span className="section-header-tag">{tag}</span>}
      <div className="section-header-divider" />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
