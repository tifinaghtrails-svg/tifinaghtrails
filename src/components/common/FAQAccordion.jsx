import { useState } from "react";

export default function FAQAccordion({ faqs, category }) {
  const filtered = category
    ? faqs.filter((f) => f.category === category)
    : faqs;

  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="accordion">
      {filtered.map((faq) => (
        <div key={faq.id} className="accordion-item">
          <button
            className={`accordion-header ${openId === faq.id ? "active" : ""}`}
            onClick={() => toggle(faq.id)}
            aria-expanded={openId === faq.id}
          >
            <span>{faq.question}</span>
            <span className={`accordion-icon ${openId === faq.id ? "open" : ""}`}>
              +
            </span>
          </button>
          <div
            className={`accordion-content ${openId === faq.id ? "open" : ""}`}
          >
            <div className="accordion-content-inner">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
