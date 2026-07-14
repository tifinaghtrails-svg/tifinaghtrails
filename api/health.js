import { mailStatus } from "../server/mailService.js";
import { allowMethods } from "../server/httpUtils.js";

export default function handler(req, res) {
  if (!allowMethods(req, res, ["GET"])) return;

  const includeDetails = req.query?.details === "1" || req.query?.details === "true";
  const status = mailStatus({ includeDetails });

  res.status(200).json({
    ok: true,
    service: "mail",
    ...status,
  });
}
