const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Debug route
router.get("/test", (req, res) => {
    res.send("User route working correctly");
});

// Protected route
router.get("/profile", protect, userController.getUserProfile);

module.exports = router;