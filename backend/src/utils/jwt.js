import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const signToken = (payload, options = {}) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: "12h", ...options });

