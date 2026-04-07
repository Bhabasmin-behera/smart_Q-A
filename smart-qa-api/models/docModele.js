const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

docSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Doc", docSchema);