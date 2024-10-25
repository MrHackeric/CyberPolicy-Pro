const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/regulatory", require("./routes/regulatoryAssistant"));
app.use("/api/documents", require("./routes/documentDrafting"));
app.use("/api/risk-scoring", require("./routes/riskScoring"));
app.use("/api/alerts", require("./routes/complianceAlerts"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
