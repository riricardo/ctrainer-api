const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { getDbHealth } = require("./db");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  const db = getDbHealth();
  const isHealthOk = db.isDbUp;

  const status = isHealthOk ? "ok" : "degraded";
  const code = isHealthOk ? 200 : 503;

  res.status(code).json({ status, db });
});

app.get("/", (req, res) => {
  res.send("API running");
});

app.use((req, res) => {
  res.status(404).json({ error: { message: "Not found" } });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  const code = err.code;

  if (code) {
    res.status(status).json({ error: { message, code } });
    return;
  }

  res.status(status).json({ error: { message } });
});

module.exports = app;
