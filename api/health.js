import { missingEnv } from "../server/mailService.js";
import { allowMethods } from "../server/httpUtils.js";

export default function handler(req, res) {
  if (!allowMethods(req, res, ["GET"])) return;

  res.status(200).json({
    ok: true,
    service: "mail",
    configured: missingEnv().length === 0,
  });
}
