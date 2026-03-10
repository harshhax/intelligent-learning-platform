const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
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

    accuracy: Number,
    avgResponseTime: Number,
    attempts: Number,
    lastPracticed: Date,
    difficultyScore: Number,
    isWeak: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("PerformanceStats", performanceSchema);