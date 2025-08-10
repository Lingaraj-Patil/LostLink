const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, default: "" }, // like "🎒", "📱", etc.
  imageUrl: { type: String, default: "" }, // Cloudinary URL
  contact: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LostItem", lostItemSchema);
