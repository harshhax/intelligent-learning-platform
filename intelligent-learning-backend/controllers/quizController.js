const Question = require("../models/Question");
const QuizAttempt = require("../models/QuizAttempt");
const { calculateDifficulty } = require("../services/difficultyService");
const { updateGamification } = require("../services/gamificationService");


/* ---------------- GET QUIZ BY TOPIC ---------------- */
const getQuizByTopic = async (req, res) => {
    try {
        const { topicId } = req.params;

        if (!topicId) {
            return res.status(400).json({ message: "Topic ID required" });
        }

        const questions = await Question
            .find({ topic: topicId })
            .select("-correctAnswer");

        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this topic" });
        }

        // shuffle questions
        const shuffled = questions.sort(() => Math.random() - 0.5);

        res.json(shuffled);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* ---------------- SUBMIT QUIZ ---------------- */
const submitQuiz = async (req, res) => {
  try {

    const { topicId, answers } = req.body;

    if (!topicId || !answers) {
        return res.status(400).json({ message: "topicId and answers are required" });
    }

    const questions = await Question.find({ topic: topicId });

    if (!questions.length) {
        return res.status(404).json({ message: "Quiz questions not found" });
    }

    let score = 0;

    const evaluatedAnswers = answers.map((a) => {

      const question = questions.find(q => q._id.toString() === a.questionId);

      if (!question) {
        return {
          questionId: a.questionId,
          selectedOption: a.selectedOption,
          isCorrect: false,
          responseTime: a.responseTime
        };
      }

      const isCorrect = question.correctAnswer === a.selectedOption;

      if (isCorrect) score++;

      return {
        questionId: a.questionId,
        selectedOption: a.selectedOption,
        isCorrect,
        responseTime: a.responseTime
      };
    });

    /* ---------------- SAVE QUIZ ATTEMPT ---------------- */

    const attempt = await QuizAttempt.create({
      student: req.user._id,
      topic: topicId,
      answers: evaluatedAnswers,
      score: score,
      totalQuestions: questions.length
    });

    /* ---------------- UPDATE PERFORMANCE ---------------- */

    await calculateDifficulty(req.user._id, topicId, score, questions.length);

    /* ---------------- UPDATE XP / LEVEL ---------------- */

    await updateGamification(req.user._id, score);

    /* --------------------------------------------------- */

    res.json({
      score,
      totalQuestions: questions.length,
      accuracy: Math.round((score / questions.length) * 100),
      attemptId: attempt._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    getQuizByTopic,
    submitQuiz
};