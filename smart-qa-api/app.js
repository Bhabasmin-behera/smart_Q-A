require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config.db/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} ${Date.now() - start}ms`);
  });
  next();
});

// Routes
app.use("/api/docs", require("./routes/docRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ask", require("./routes/askRoutes"));

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));