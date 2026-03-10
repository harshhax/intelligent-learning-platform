const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { addQuestion } = require("../controllers/adminController");

const {
    createCourse,
    createSubject,
    createTopic,
    getAllTopics
} = require("../controllers/adminController");

// All routes protected + admin
router.post("/course", protect, adminOnly, createCourse);
router.post("/subject", protect, adminOnly, createSubject);
router.post("/topic", protect, adminOnly, createTopic);
router.get("/topics", protect, adminOnly, getAllTopics);
router.post("/question", protect, adminOnly, addQuestion);

module.exports = router;