const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const postJson = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Unable to send your request right now.");
  }

  return data;
};

export const sendBookingRequest = (payload) => postJson("/api/booking", payload);

export const sendContactMessage = (payload) => postJson("/api/contact", payload);
