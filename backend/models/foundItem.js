const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  contact: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FoundItem", foundItemSchema);
