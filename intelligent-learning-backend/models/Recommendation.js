const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },

    message: String,

    recommendedAction: {
        type: String,
        enum: ["revise", "practice", "retake_quiz"]
    }

}, { timestamps: true });

module.exports = mongoose.model("Recommendation", recommendationSchema);