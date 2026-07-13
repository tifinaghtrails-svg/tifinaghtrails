import { useNavigate } from "react-router-dom";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  fullWidth,
  className = "",
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  ...props
}) {
  const navigate = useNavigate();

  const classes = [
    "btn",
    `btn-${variant}`,
    size !== "md" ? `btn-${size}` : "",
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (loading || disabled) return;
    if (to) {
      e.preventDefault();
      navigate(to);
    }
    onClick?.(e);
  };

  const content = loading ? (
    <>
      <span className="btn-spinner" />
      {children}
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
