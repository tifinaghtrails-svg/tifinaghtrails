export const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

export const allowMethods = (req, res, methods = ["POST"]) => {
  res.setHeader("Allow", ["OPTIONS", ...methods].join(", "));

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return false;
  }

  if (!methods.includes(req.method)) {
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return false;
  }

  return true;
};

export const fail = (res, status, message, details) => {
  res.status(status).json({ ok: false, message, details });
};
