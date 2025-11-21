import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  jwtSecret: process.env.JWT_SECRET || "change-me",
};

if (!config.supabaseUrl || !config.supabaseKey) {
  console.warn(
    "[config] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in the environment."
  );
}

if (!process.env.JWT_SECRET) {
  console.warn("[config] JWT_SECRET not set, using fallback development secret.");
}

