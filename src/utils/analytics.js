import { track } from "@vercel/analytics/react";

const safeString = (value, fallback = "unknown") =>
  String(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .slice(0, 80);

const safeNumber = (value) => {
  const numeric = Number.parseInt(value, 10);
  return Number.isFinite(numeric) ? numeric : null;
};

export const trackBookingRequest = ({ tourSlug, travelers }) => {
  track("booking_request_submitted", {
    tour_slug: safeString(tourSlug),
    travelers: safeNumber(travelers),
  });
};

export const trackContactMessage = ({ subject }) => {
  track("contact_message_submitted", {
    subject_present: Boolean(subject),
  });
};

export const trackWhatsAppClick = ({ location }) => {
  track("whatsapp_click", {
    location: safeString(location),
  });
};
