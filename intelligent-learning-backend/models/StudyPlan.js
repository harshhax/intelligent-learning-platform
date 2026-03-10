const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
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

    scheduledDate: Date,

    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("StudyPlan", studyPlanSchema);