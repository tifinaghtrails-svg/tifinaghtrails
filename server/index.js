import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  bookingFromBody,
  contactFromBody,
  missingEnv,
  sendBookingEmails,
  sendContactEmails,
  validateBooking,
  validateContact,
} from "./mailService.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 5174);
const siteUrl = process.env.SITE_URL || "http://localhost:5173";

const fail = (res, status, message, details) => res.status(status).json({ ok: false, message, details });

app.use(cors({ origin: siteUrl, credentials: false }));
app.use(express.json({ limit: "32kb" }));

app.use((error, _req, res, next) => {
  if (error?.type === "entity.too.large") {
    return fail(res, 413, "Your request is too large. Please shorten the message and try again.");
  }
  return next(error);
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "mail", configured: missingEnv().length === 0 });
});

app.post("/api/booking", async (req, res) => {
  const booking = bookingFromBody(req.body);

  if (!validateBooking(booking)) {
    return fail(res, 400, "Please complete all required booking fields.");
  }

  try {
    await sendBookingEmails(booking);

    res.status(202).json({ ok: true, reference: booking.reference });
  } catch (error) {
    console.error("Booking email failed", {
      message: error.message,
      details: error.details,
      reference: booking.reference,
    });
    fail(res, 500, "We could not send the email right now. Please try again or contact us on WhatsApp.");
  }
});

app.post("/api/contact", async (req, res) => {
  const message = contactFromBody(req.body);

  if (!validateContact(message)) {
    return fail(res, 400, "Please complete all required contact fields.");
  }

  try {
    await sendContactEmails(message);

    res.status(202).json({ ok: true, reference: message.reference });
  } catch (error) {
    console.error("Contact email failed", {
      message: error.message,
      details: error.details,
      reference: message.reference,
    });
    fail(res, 500, "We could not send the email right now. Please try again or contact us on WhatsApp.");
  }
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Mail server running on http://localhost:${port}`);
});
