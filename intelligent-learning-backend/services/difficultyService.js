const mongoose = require("mongoose");
const QuizAttempt = require("../models/QuizAttempt");
const PerformanceStats = require("../models/PerformanceStats");
const { generateRecommendation } = require("./recommendationService");

const calculateDifficulty = async (studentId, topicId) => {

    try {
        console.log("🧠 Difficulty calculation started");

        // convert to ObjectId (VERY IMPORTANT)
        const studentObjectId = new mongoose.Types.ObjectId(studentId);
        const topicObjectId = new mongoose.Types.ObjectId(topicId);

        // get all attempts for this topic
        const attempts = await QuizAttempt.find({
            student: studentObjectId,
            topic: topicObjectId
        });

        console.log("Attempts found:", attempts.length);

        if (!attempts || attempts.length === 0) return;

        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalTime = 0;

        attempts.forEach(attempt => {
            totalQuestions += attempt.totalQuestions;
            totalCorrect += attempt.score;

            attempt.answers.forEach(ans => {
                totalTime += ans.responseTime || 15; // default 15 sec
            });
        });

        const wrongAnswers = totalQuestions - totalCorrect;
        const avgTime = totalTime / totalQuestions;
        const repeatedAttempts = attempts.length - 1;

        const lastPracticed = attempts[attempts.length - 1].createdAt;
        const inactivityDays =
            (Date.now() - new Date(lastPracticed)) / (1000 * 60 * 60 * 24);

        // difficulty formula
        const difficultyScore =
            (wrongAnswers * 3) +
            (avgTime * 2) +
            (repeatedAttempts * 4) +
            (inactivityDays * 1);

        const isWeak = difficultyScore > 8;

        console.log("Difficulty Score:", difficultyScore);
        console.log("Weak Topic:", isWeak);

        // update performance stats
        await PerformanceStats.findOneAndUpdate(
            { student: studentObjectId, topic: topicObjectId },
            {
                student: studentObjectId,
                topic: topicObjectId,
                accuracy: (totalCorrect / totalQuestions) * 100,
                avgResponseTime: avgTime,
                attempts: attempts.length,
                lastPracticed,
                difficultyScore,
                isWeak
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log("✅ PerformanceStats updated");

        /* 🔥 NEW PART — GENERATE RECOMMENDATION + STUDY PLAN */
        if (isWeak) {
            await generateRecommendation(studentObjectId, topicObjectId, difficultyScore);
            console.log("📚 Recommendation + Study plan created");
        }

    } catch (error) {
        console.error("❌ Difficulty Service Error:", error.message);
    }
};

module.exports = { calculateDifficulty };