const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // memory storage (buffer available at req.file.buffer)
const { addLostItem, getLostItems } = require("../controllers/lostController");

router.post("/", upload.single("image"), addLostItem);
router.get("/", getLostItems);

module.exports = router;
