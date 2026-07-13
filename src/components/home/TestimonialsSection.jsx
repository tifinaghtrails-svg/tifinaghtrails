import SectionHeader from "../common/SectionHeader";
import TestimonialCard from "../common/TestimonialCard";
import testimonials from "../../data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          tag="Testimonials"
          title="What Our Travelers Say"
          description="Don't take our word for it. Here is what our guests have to say about their Toubkal adventure."
        />
        <div className="grid-3">
          {testimonials.slice(0, 3).map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
