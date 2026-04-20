const Course = require("../models/Course");
const Subject = require("../models/Subject");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

/* ---------- CREATE COURSE ---------- */
const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        const course = await Course.create({ title, description });
        res.status(201).json(course);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ---------- CREATE SUBJECT ---------- */
const createSubject = async (req, res) => {
    try {
        const { courseId, name } = req.body;

        const subject = await Subject.create({
            course: courseId,
            name
        });

        res.status(201).json(subject);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ---------- CREATE TOPIC ---------- */
const createTopic = async (req, res) => {
    try {
        const { subjectId, name, difficultyLevel } = req.body;

        const topic = await Topic.create({
            subject: subjectId,
            name,
            difficultyLevel
        });

        res.status(201).json(topic);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ---------- GET ALL TOPICS ---------- */
const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find()
            .populate({
                path: "subject",
                populate: { path: "course" }
            });

        res.json(topics);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ---------- ADD QUESTION ---------- */
const addQuestion = async (req, res) => {
    try {
        const { topicId, questionText, options, correctAnswer, difficulty, expectedTime } = req.body;

        const question = await Question.create({
            topic: topicId,
            questionText,
            options,
            correctAnswer,
            difficulty,
            expectedTime
        });

        res.status(201).json(question);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCourse,
    createSubject,
    createTopic,
    getAllTopics,
    addQuestion
};