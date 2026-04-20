const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },

    questionText: {
        type: String,
        required: true
    },

    options: [
        {
            type: String,
            required: true
        }
    ],

    correctAnswer: {
        type: Number, // index of correct option (0,1,2,3)
        required: true
    },

    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy"
    },

    expectedTime: {
        type: Number, // in seconds
        default: 30
    }
},
{ timestamps: true });

module.exports = mongoose.model("Question", questionSchema);