const LostItem = require("../models/lostItem");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Upload buffer to Cloudinary using upload_stream
async function uploadBufferToCloudinary(buffer, folder = "quickfind") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

exports.addLostItem = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      contact,
      latitude,
      longitude
    } = req.body;

    let imageUrl = "";

    // If a file was uploaded via multer, upload to Cloudinary
    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, "quickfind/lost");
      imageUrl = result.secure_url || "";
    } else if (req.body.imageUrl) {
      // Allow sending imageUrl directly (optional)
      imageUrl = req.body.imageUrl;
    }

    const newItem = new LostItem({
      name,
      description,
      category,
      imageUrl,
      contact,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("addLostItem error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

exports.getLostItems = async (req, res) => {
  try {
    // Basic query support (optional): ?q=phone or ?category=🎒
    const { q, category } = req.query;
    const filter = {};
    if (q) {
      // text search on name/description/location-like fields (simple)
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { contact: { $regex: q, $options: "i" } }
      ];
    }
    if (category) filter.category = category;

    const items = await LostItem.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (error) {
    console.error("getLostItems error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
