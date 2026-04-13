const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const analyzeRoutes = require("./routes/analyze.routes.js");


const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/health", healthRoutes);

app.use("/analyze", analyzeRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
})

app.use(errorMiddleware);

module.exports = app;
