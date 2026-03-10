const PerformanceStats = require("../models/PerformanceStats");
const Recommendation = require("../models/Recommendation");
const StudyPlan = require("../models/StudyPlan");
const QuizAttempt = require("../models/QuizAttempt");


/* -------- GET WEAK TOPICS -------- */
const getWeakTopics = async (req, res) => {
    try {

        const weakTopics = await PerformanceStats
            .find({
                student: req.user._id,
                isWeak: true
            })
            .populate({
                path: "topic",
                populate: {
                    path: "subject",
                    select: "name"
                }
            })
            .sort({ difficultyScore: -1 });

        res.json(weakTopics);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


/* -------- GET RECOMMENDATIONS -------- */
const getRecommendations = async (req, res) => {
    try {

        const recommendations = await Recommendation
            .find({ student: req.user._id })
            .populate("topic", "name");

        res.json(recommendations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* -------- GET STUDY PLAN -------- */
const getStudyPlan = async (req, res) => {
    try {

        const plans = await StudyPlan
            .find({ student: req.user._id })
            .populate("topic", "name");

        res.json(plans);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* -------- GET QUIZ RESULTS (LATEST ATTEMPT PER TOPIC) -------- */
const getQuizResults = async (req, res) => {
    try {

        const attempts = await QuizAttempt
            .find({ student: req.user._id })
            .populate({
                path: "topic",
                select: "name subject",
                populate: {
                    path: "subject",
                    select: "name"
                }
            })
            .sort({ createdAt: -1 });

        /* --- REMOVE DUPLICATE TOPICS (KEEP LATEST ATTEMPT) --- */

        const uniqueMap = new Map();

        for (const a of attempts) {
            const topicId = a.topic?._id?.toString();

            if (!uniqueMap.has(topicId)) {
                uniqueMap.set(topicId, a);
            }
        }

        const filteredAttempts = Array.from(uniqueMap.values());

        const results = filteredAttempts.map((a) => {

            const accuracy = Math.round((a.score / a.totalQuestions) * 100);

            const totalTime = a.answers.reduce((sum, ans) => {
                return sum + (ans.responseTime || 0);
            }, 0);

            return {
                id: a._id,
                date: a.createdAt.toISOString().split("T")[0],
                subjectName: a.topic?.subject?.name || "Unknown Subject",
                topicName: a.topic?.name || "Unknown Topic",
                score: a.score,
                totalQuestions: a.totalQuestions,
                accuracy: accuracy,
                timeTaken: totalTime
            };
        });

        res.json(results);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getWeakTopics,
    getRecommendations,
    getStudyPlan,
    getQuizResults
};