import {
  bookingFromBody,
  sendBookingEmails,
  validateBooking,
} from "../server/mailService.js";
import { allowMethods, fail, parseBody } from "../server/httpUtils.js";

export default async function handler(req, res) {
  if (!allowMethods(req, res)) return;

  const body = parseBody(req);

  if (body.__tooLarge) {
    return fail(res, 413, "Your request is too large. Please shorten the message and try again.");
  }

  const booking = bookingFromBody(body);

  if (!validateBooking(booking)) {
    return fail(res, 400, "Please complete all required booking fields.");
  }

  try {
    await sendBookingEmails(booking);
    res.status(202).json({ ok: true, reference: booking.reference });
  } catch (error) {
    const isConfigError = error.code === "MAIL_CONFIG_MISSING";
    console.error("Booking email failed", {
      message: error.message,
      code: error.code,
      details: error.details,
      responseCode: error.responseCode,
      command: error.command,
      reference: booking.reference,
    });
    fail(
      res,
      isConfigError ? 503 : 500,
      isConfigError
        ? "The email service is not configured on the server yet. Please contact us on WhatsApp."
        : "We could not send the email right now. Please try again or contact us on WhatsApp."
    );
  }
}
