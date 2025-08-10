const FoundItem = require("../models/foundItem");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

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

exports.addFoundItem = async (req, res) => {
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

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, "quickfind/found");
      imageUrl = result.secure_url || "";
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    const newItem = new FoundItem({
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
    console.error("addFoundItem error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

exports.getFoundItems = async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { contact: { $regex: q, $options: "i" } }
      ];
    }
    if (category) filter.category = category;

    const items = await FoundItem.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (error) {
    console.error("getFoundItems error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
