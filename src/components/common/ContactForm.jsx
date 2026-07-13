import { useState } from "react";
import { sendContactMessage } from "../../services/mailApi";

const WHATSAPP_NUMBER = "212657794841";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reference, setReference] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await sendContactMessage(formData);
      setReference(result.reference);
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
        <div className="booking-success-animation">&#9993;</div>
        <h3>Message Sent!</h3>
        <p>
          Thank you for reaching out. We usually respond within 24 hours.
          For urgent inquiries, please contact us directly on WhatsApp.
        </p>
        {reference && (
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            Reference: {reference}
          </p>
        )}
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSubmitted(false);
              setReference("");
              setSubmitError("");
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
          >
            Send Another Message
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20TifinaghTrails%2C%20I%20need%20urgent%20assistance.`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="c-name">
            Your Name <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? "error" : ""}`}
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="c-email">
            Email <span style={{color: "var(--color-error)"}}>*</span>
          </label>
          <input
            id="c-email"
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
      <div className="form-group">
        <label className="form-label" htmlFor="c-subject">
          Subject
        </label>
        <input
          id="c-subject"
          name="subject"
          type="text"
          className="form-input"
          placeholder="How can we help you?"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="c-message">
          Message <span style={{color: "var(--color-error)"}}>*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          className={`form-textarea ${errors.message ? "error" : ""}`}
          placeholder="Tell us about your trip plans, questions, or anything else..."
          value={formData.message}
          onChange={handleChange}
          rows={5}
        />
        {errors.message && <div className="form-error">{errors.message}</div>}
      </div>
      {submitError && <div className="form-error" style={{ marginBottom: "1rem" }}>{submitError}</div>}

      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending Message..." : "Send Message"}
      </button>
    </form>
  );
}
