const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getQuizByTopic, submitQuiz } = require("../controllers/quizController");

// submit quiz FIRST (important order)
router.post("/submit", protect, submitQuiz);

// get quiz questions
router.get("/:topicId", protect, getQuizByTopic);

module.exports = router;