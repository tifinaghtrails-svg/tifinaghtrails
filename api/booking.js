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
    console.error("Booking email failed", {
      message: error.message,
      details: error.details,
      reference: booking.reference,
    });
    fail(res, 500, "We could not send the email right now. Please try again or contact us on WhatsApp.");
  }
}
