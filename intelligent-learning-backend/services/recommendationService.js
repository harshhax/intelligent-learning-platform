const Recommendation = require("../models/Recommendation");
const StudyPlan = require("../models/StudyPlan");

const generateRecommendation = async (studentId, topicId, difficultyScore) => {

    try {

        let action = "revise";
        let message = "You should revise this topic.";

        // decide action based on difficulty
        if (difficultyScore > 30) {
            action = "retake_quiz";
            message = "You are struggling a lot. Retake the quiz after revision.";
        }
        else if (difficultyScore > 15) {
            action = "practice";
            message = "Practice more problems on this topic.";
        }

        /* -------- CREATE / UPDATE RECOMMENDATION -------- */

        await Recommendation.findOneAndUpdate(
            { student: studentId, topic: topicId },
            {
                student: studentId,
                topic: topicId,
                message,
                recommendedAction: action
            },
            {
                upsert: true,
                returnDocument: "after"
            }
        );

        /* -------- CREATE / UPDATE STUDY PLAN -------- */

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        await StudyPlan.findOneAndUpdate(
            { student: studentId, topic: topicId },
            {
                student: studentId,
                topic: topicId,
                scheduledDate: tomorrow
            },
            {
                upsert: true,
                returnDocument: "after"
            }
        );

        console.log("📚 Recommendation + Study plan created");

    } catch (error) {
        console.log("Recommendation Error:", error);
    }
};

module.exports = { generateRecommendation };