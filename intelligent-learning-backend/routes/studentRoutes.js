const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getWeakTopics,
    getRecommendations,
    getStudyPlan,
    getQuizResults
} = require("../controllers/studentController");

router.get("/weak-topics", protect, getWeakTopics);
router.get("/recommendations", protect, getRecommendations);
router.get("/study-plan", protect, getStudyPlan);
router.get("/results", protect, getQuizResults);

module.exports = router;