import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { errorResponse } from "../utils/response.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Authorization token missing", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    return next();
  } catch (err) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};

