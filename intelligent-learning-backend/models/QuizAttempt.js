const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
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

    answers: [
        {
            questionId: mongoose.Schema.Types.ObjectId,
            selectedOption: Number,
            isCorrect: Boolean,
            responseTime: Number
        }
    ],

    score: Number,
    totalQuestions: Number
},
{ timestamps: true });

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);