const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy"
    }
}, { timestamps: true });

module.exports = mongoose.model("Topic", topicSchema);