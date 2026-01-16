const { randomUUID } = require("crypto");

const requestId = (req, res, next) => {
  const incoming = req.headers["x-request-id"];
  const id = incoming || randomUUID();

  req.id = id;
  res.setHeader("x-request-id", id);
  next();
};

module.exports = requestId;
