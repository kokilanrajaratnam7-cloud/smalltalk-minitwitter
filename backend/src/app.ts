import rateLimit from "express-rate-limit";
import express from "express";
import { initializeAPI } from "./routes/api";
import cors from "cors";
import { initializeMessageBroker } from "./message-broker";
import logger from "./utils/logger";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    error: "Too many requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const port = 3000;
const app = express();

app.use(express.json());
if (process.env.ENABLE_RATE_LIMIT === "true") {
  app.use(limiter);
}
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Always initialize message broker
initializeMessageBroker();

// Only start HTTP server if role is "api"
if (process.env.SERVER_ROLE === "api") {
  initializeAPI(app);

  app.listen(port, () => {
    logger.info(`API Server running on http://localhost:${port}`);
  });
} else {
  logger.info("Worker role active — HTTP server not started.");
}