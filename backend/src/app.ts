import express from "express";
import { initializeAPI } from "./routes/api";
import cors from "cors";
import { initializeMessageBroker } from "./message-broker";

const port = 3000;
const app = express();

app.use(express.json());
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
    console.log(`API Server running on http://localhost:${port}`);
  });
} else {
  console.log("Worker role active — HTTP server not started.");
}