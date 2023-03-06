import { rateLimit } from "express-rate-limit";

const DEFAULT_TIME_WINDOW = 60 * 1000; // 1 minute;
const DEFAULT_MAX_REQUESTS = 10; // limit each IP to 10 requests per windowMs
const DEFAULT_MESSAGE =
  "Too many requests from this IP, please try again later";

export const limiter = rateLimit({
  windowMs: DEFAULT_TIME_WINDOW,
  max: DEFAULT_MAX_REQUESTS,
  message: DEFAULT_MESSAGE,
  keyGenerator: (req) => req.headers["x-forwarded-for"] || req.ip,
});
