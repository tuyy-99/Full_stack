// LOAD ENV VARIABLES
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const projectRoutes = require("./routes/projectRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/projects", projectRoutes);


app.get("/", (req, res) => {
  res.send("✅ BOOTCAMP PROJECT TRACKER BACKEND IS RUNNING");
});

// MONGO CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MONGO DB CONNECTED"))
  .catch((err) => console.error("❌ MONGO CONNECTION FAILED:", err));

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "App";

// START SERVER
app.listen(PORT, () => console.log(`${APP_NAME} RUNNING ON PORT ${PORT}`));
