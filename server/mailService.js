import nodemailer from "nodemailer";
import {
  customerBookingEmail,
  customerContactEmail,
  ownerBookingEmail,
  ownerContactEmail,
} from "./emailTemplates.js";

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "OWNER_EMAIL"];

export const missingEnv = () => requiredEnv.filter((key) => !process.env[key]);

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

export const isEmail = (value) => /\S+@\S+\.\S+/.test(String(value || ""));

export const clean = (value) => String(value || "").trim().slice(0, 2000);

export const reference = (prefix) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const sendPair = async ({ customerEmail, subjectOwner, subjectCustomer, ownerHtml, customerHtml, replyTo }) => {
  const missing = missingEnv();
  if (missing.length) {
    const error = new Error("Email service is not configured.");
    error.details = missing;
    throw error;
  }

  const ownerEmail = process.env.OWNER_EMAIL;
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

export const bookingFromBody = (body = {}) => ({
  reference: reference("TAG"),
  fullName: clean(body.fullName),
  email: clean(body.email),
  phone: clean(body.phone),
  nationality: clean(body.nationality),
  selectedTour: clean(body.selectedTour),
  tourTitle: clean(body.tourTitle),
  date: clean(body.date),
  travelers: clean(body.travelers),
  fitness: clean(body.fitness),
  message: clean(body.message),
});

export const validateBooking = (booking) =>
  Boolean(
    booking.fullName &&
      isEmail(booking.email) &&
      booking.phone &&
      booking.nationality &&
      booking.selectedTour &&
      booking.date &&
      booking.travelers
  );

export const contactFromBody = (body = {}) => ({
  reference: reference("MSG"),
  name: clean(body.name),
  email: clean(body.email),
  subject: clean(body.subject),
  message: clean(body.message),
});

export const validateContact = (message) => Boolean(message.name && isEmail(message.email) && message.message);

export const sendBookingEmails = async (booking) =>
  sendPair({
    customerEmail: booking.email,
    replyTo: booking.email,
    subjectOwner: `New trip request: ${booking.fullName} - ${booking.tourTitle || booking.selectedTour}`,
    subjectCustomer: `We received your TifinaghTrails request ${booking.reference}`,
    ownerHtml: ownerBookingEmail(booking),
    customerHtml: customerBookingEmail(booking),
  });

export const sendContactEmails = async (message) =>
  sendPair({
    customerEmail: message.email,
    replyTo: message.email,
    subjectOwner: `New website message: ${message.subject || message.name}`,
    subjectCustomer: `We received your message ${message.reference}`,
    ownerHtml: ownerContactEmail(message),
    customerHtml: customerContactEmail(message),
  });
