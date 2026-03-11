import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import promMid from "express-prometheus-middleware";

import { initializeAPI } from "./routes/api";
import { initializeMessageBroker } from "./message-broker";
import logger from "./utils/logger";

const port = 3000;
const app = express();

/* =========================================
   MIDDLEWARE
========================================= */

// JSON parsing
app.use(express.json());

// Prometheus metrics endpoint
app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: false,
    requestDurationBuckets: [0.1, 0.3, 0.5, 1, 1.5],
  })
);

// Optional Rate Limiter (controlled via ENV)
if (process.env.ENABLE_RATE_LIMIT === "true") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      error: "Too many requests. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(limiter);
  logger.info("Rate limiting enabled");
}

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

/* =========================================
   MESSAGE BROKER (Queue)
========================================= */

initializeMessageBroker();

/* =========================================
   ROLE-BASED SERVER START
========================================= */

if (process.env.SERVER_ROLE === "api") {
  initializeAPI(app);

  app.listen(port, () => {
    logger.info(`API Server running on http://localhost:${port}`);
  });
} else {
  logger.info("Worker role active — HTTP server not started.");
}