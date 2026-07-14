import {
  contactFromBody,
  sendContactEmails,
  validateContact,
} from "../server/mailService.js";
import { allowMethods, fail, parseBody } from "../server/httpUtils.js";

export default async function handler(req, res) {
  if (!allowMethods(req, res)) return;

  const body = parseBody(req);

  if (body.__tooLarge) {
    return fail(res, 413, "Your request is too large. Please shorten the message and try again.");
  }

  const message = contactFromBody(body);

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
}
