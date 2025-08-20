
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["ongoing", "completed"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
