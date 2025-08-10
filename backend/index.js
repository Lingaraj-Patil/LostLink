require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const lostRoutes = require("./routes/lostRoutes");
const foundRoutes = require("./routes/foundRoutes");

const app = express();

// Cloudinary config (from env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json()); // for JSON body parsing (non-file)
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded form data

// Routes
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);

// Basic health check
app.get("/", (req, res) => res.send({ ok: true, message: "QuickFind API" }));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
