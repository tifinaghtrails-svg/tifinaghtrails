import {
  bookingFromBody,
  sendBookingEmails,
  validateBooking,
} from "../server/mailService.js";
import { allowMethods, fail, parseBody } from "../server/httpUtils.js";

export default async function handler(req, res) {
  if (!allowMethods(req, res)) return;

  const booking = bookingFromBody(parseBody(req));

  if (!validateBooking(booking)) {
    return fail(res, 400, "Please complete all required booking fields.");
  }

  try {
    await sendBookingEmails(booking);
    res.status(202).json({ ok: true, reference: booking.reference });
  } catch (error) {
    console.error(error);
    fail(res, 500, "We could not send the email right now. Please try again or contact us on WhatsApp.", error.details);
  }
}
