import { randomUUID } from "crypto";

const requestId = (req: any, res: any, next: any) => {
  const incoming = req.headers["x-request-id"];
  const id = incoming || randomUUID();

  req.id = id;
  res.setHeader("x-request-id", id);
  next();
};

export default requestId;
