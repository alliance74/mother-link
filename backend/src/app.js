import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import { config } from "./config/env.js";
import { errorResponse } from "./utils/response.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", env: config.port });
});

app.use("/api", router);

app.use((req, res) => {
  errorResponse(res, "Route not found", 404);
});

app.use((err, req, res, next) => {
  console.error("Unhandled error", err);
  errorResponse(res, "Internal server error", 500);
});

export default app;

