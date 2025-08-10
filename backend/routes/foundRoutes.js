const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { addFoundItem, getFoundItems } = require("../controllers/foundController");

router.post("/", upload.single("image"), addFoundItem);
router.get("/", getFoundItems);

module.exports = router;
