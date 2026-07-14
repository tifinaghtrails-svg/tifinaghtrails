import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import tours from "../../data/tours";
import { sendBookingRequest } from "../../services/mailApi";
import { siteConfig } from "../../config/site";
import { trackBookingRequest, trackWhatsAppClick } from "../../utils/analytics";

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const preselectedTour = searchParams.get("tour") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    selectedTour: preselectedTour,
    date: "",
    travelers: "1",
    fitness: "moderate",
    message: "",
    website: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone or WhatsApp number is required";
    if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required";
    if (!formData.selectedTour) newErrors.selectedTour = "Please select a tour";
    if (!formData.date) newErrors.date = "Choose your preferred date";
    if (!formData.travelers || parseInt(formData.travelers) < 1) newErrors.travelers = "At least 1 traveler required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedTour = tours.find((tour) => tour.slug === formData.selectedTour);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await sendBookingRequest({
        ...formData,
        tourTitle: selectedTour?.title || formData.selectedTour,
      });
      setConfirmation({ reference: result.reference, tourTitle: selectedTour?.title || formData.selectedTour });
      trackBookingRequest({
        tourSlug: formData.selectedTour,
        travelers: formData.travelers,
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="booking-success-animation">&#10003;</div>
        <h3>Thank You, {formData.fullName.split(" ")[0]}!</h3>
        <p>
          Your booking request for <strong>{confirmation?.tourTitle || tours.find(t => t.slug === formData.selectedTour)?.title || formData.selectedTour}</strong> has been sent. We will contact you soon on WhatsApp or email.
        </p>
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
          Reference: {confirmation?.reference}
        </p>
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSubmitted(false);
              setConfirmation(null);
              setSubmitError("");
              setFormData({
                fullName: "", email: "", phone: "", nationality: "",
                selectedTour: "", date: "", travelers: "1", fitness: "moderate", message: "", website: ""
              });
            }}
          >
            Submit Another Booking
          </button>
          <a
            href={siteConfig.whatsappUrl}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: "booking_success" })}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={`form-input ${errors.fullName ? "error" : ""}`}
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="form-error">{errors.fullName}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone / WhatsApp <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`form-input ${errors.phone ? "error" : ""}`}
            placeholder="+212 657-794841"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="nationality">
            Nationality <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            className={`form-input ${errors.nationality ? "error" : ""}`}
            placeholder="e.g. United Kingdom"
            value={formData.nationality}
            onChange={handleChange}
          />
          {errors.nationality && <div className="form-error">{errors.nationality}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="selectedTour">
            Selected Tour <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <select
            id="selectedTour"
            name="selectedTour"
            className={`form-select ${errors.selectedTour ? "error" : ""}`}
            value={formData.selectedTour}
            onChange={handleChange}
          >
            <option value="">Select a tour...</option>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.slug}>
                {tour.title} &mdash; {tour.currency}{tour.price > 0 ? tour.price : "Custom"}
              </option>
            ))}
          </select>
          {errors.selectedTour && <div className="form-error">{errors.selectedTour}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Preferred Date <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className={`form-input ${errors.date ? "error" : ""}`}
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <div className="form-error">{errors.date}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="travelers">
            Number of Travelers <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <select
            id="travelers"
            name="travelers"
            className={`form-select ${errors.travelers ? "error" : ""}`}
            value={formData.travelers}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Traveler" : "Travelers"}
              </option>
            ))}
            <option value="15+">15+ (Group)</option>
          </select>
          {errors.travelers && <div className="form-error">{errors.travelers}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="fitness">
            Fitness Level
          </label>
          <select
            id="fitness"
            name="fitness"
            className="form-select"
            value={formData.fitness}
            onChange={handleChange}
          >
            <option value="beginner">Beginner &ndash; Regular exercise weekly</option>
            <option value="moderate">Moderate &ndash; Active lifestyle</option>
            <option value="fit">Fit &ndash; Frequent exercise</option>
            <option value="very-fit">Very Fit &ndash; Athlete level</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Message / Special Request
        </label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          placeholder="Dietary requirements, accommodation preferences, or any questions..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {submitError && <div className="form-error" style={{ marginBottom: "1rem" }}>{submitError}</div>}

      <button type="submit" className="btn btn-accent btn-lg btn-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending Request..." : "Submit Booking Request"}
      </button>
    </form>
  );
}
