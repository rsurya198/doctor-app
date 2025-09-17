const express = require("express");
const { addToQueue, getQueue } = require("../controllers/queueController");
const router = express.Router();

router.post("/", addToQueue);
router.get("/", getQueue);

module.exports = router;
