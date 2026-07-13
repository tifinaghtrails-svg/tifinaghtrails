import "dotenv/config";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  customerBookingEmail,
  customerContactEmail,
  ownerBookingEmail,
  ownerContactEmail,
} from "./emailTemplates.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 5174);
const siteUrl = process.env.SITE_URL || "http://localhost:5173";
const ownerEmail = process.env.OWNER_EMAIL;

app.use(cors({ origin: siteUrl, credentials: false }));
app.use(express.json({ limit: "32kb" }));

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "OWNER_EMAIL"];

const missingEnv = () => requiredEnv.filter((key) => !process.env[key]);

const transporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const isEmail = (value) => /\S+@\S+\.\S+/.test(String(value || ""));
const clean = (value) => String(value || "").trim().slice(0, 2000);
const reference = (prefix) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const fail = (res, status, message, details) => res.status(status).json({ ok: false, message, details });

const sendPair = async ({ customerEmail, subjectOwner, subjectCustomer, ownerHtml, customerHtml, replyTo }) => {
  const missing = missingEnv();
  if (missing.length) {
    const error = new Error("Email service is not configured.");
    error.details = missing;
    throw error;
  }

  const mailer = transporter();
  await Promise.all([
    mailer.sendMail({
      from: process.env.SMTP_FROM,
      to: ownerEmail,
      replyTo,
      subject: subjectOwner,
      html: ownerHtml,
    }),
    mailer.sendMail({
      from: process.env.SMTP_FROM,
      to: customerEmail,
      replyTo: ownerEmail,
      subject: subjectCustomer,
      html: customerHtml,
    }),
  ]);
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "mail", configured: missingEnv().length === 0 });
});

app.post("/api/booking", async (req, res) => {
  const booking = {
    reference: reference("TAG"),
    fullName: clean(req.body.fullName),
    email: clean(req.body.email),
    phone: clean(req.body.phone),
    nationality: clean(req.body.nationality),
    selectedTour: clean(req.body.selectedTour),
    tourTitle: clean(req.body.tourTitle),
    date: clean(req.body.date),
    travelers: clean(req.body.travelers),
    fitness: clean(req.body.fitness),
    message: clean(req.body.message),
  };

  if (!booking.fullName || !isEmail(booking.email) || !booking.phone || !booking.nationality || !booking.selectedTour || !booking.date || !booking.travelers) {
    return fail(res, 400, "Please complete all required booking fields.");
  }

  try {
    await sendPair({
      customerEmail: booking.email,
      replyTo: booking.email,
      subjectOwner: `New trip request: ${booking.fullName} - ${booking.tourTitle || booking.selectedTour}`,
      subjectCustomer: `We received your TifinaghTrails request ${booking.reference}`,
      ownerHtml: ownerBookingEmail(booking),
      customerHtml: customerBookingEmail(booking),
    });

    res.status(202).json({ ok: true, reference: booking.reference });
  } catch (error) {
    console.error(error);
    fail(res, 500, "We could not send the email right now. Please try again or contact us on WhatsApp.", error.details);
  }
});

app.post("/api/contact", async (req, res) => {
  const message = {
    reference: reference("MSG"),
    name: clean(req.body.name),
    email: clean(req.body.email),
    subject: clean(req.body.subject),
    message: clean(req.body.message),
  };

  if (!message.name || !isEmail(message.email) || !message.message) {
    return fail(res, 400, "Please complete all required contact fields.");
  }

  try {
    await sendPair({
      customerEmail: message.email,
      replyTo: message.email,
      subjectOwner: `New website message: ${message.subject || message.name}`,
      subjectCustomer: `We received your message ${message.reference}`,
      ownerHtml: ownerContactEmail(message),
      customerHtml: customerContactEmail(message),
    });

    res.status(202).json({ ok: true, reference: message.reference });
  } catch (error) {
    console.error(error);
    fail(res, 500, "We could not send the email right now. Please try again or contact us on WhatsApp.", error.details);
  }
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Mail server running on http://localhost:${port}`);
});
