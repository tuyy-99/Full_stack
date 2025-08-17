require("dotenv").config();
const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/projects", projectRoutes);

// ROOT ENDPOINT (OPTIONAL – FOR TESTING)
app.get("/", (req, res) => {
  res.send("BOOTCAMP PROJECT TRACKER API IS RUNNING 🚀");
});

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "APP";

app.listen(PORT, () => {
  console.log(`${APP_NAME} IS RUNNING ON PORT ${PORT}`);
});
