export default function TestimonialCard({ testimonial }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < testimonial.rating);

  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {stars.map((filled, i) => (
          <span key={i}>{filled ? "\u2605" : "\u2606"}</span>
        ))}
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <div className="testimonial-author">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="testimonial-avatar"
          loading="lazy"
        />
        <div>
          <div className="testimonial-name">{testimonial.name}</div>
          <div className="testimonial-tour">
            {testimonial.nationality} \u2022 {testimonial.tour}
          </div>
        </div>
      </div>
    </div>
  );
}
