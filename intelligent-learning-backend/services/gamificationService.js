const User = require("../models/User");

const updateGamification = async (studentId, score, totalQuestions) => {

    const user = await User.findById(studentId);
    if (!user) return;

    /* -------- XP CALCULATION -------- */
    const percentage = (score / totalQuestions) * 100;

    let xpEarned = 0;

    if (percentage === 100) xpEarned = 50;
    else if (percentage >= 70) xpEarned = 40;
    else if (percentage >= 40) xpEarned = 25;
    else xpEarned = 10;

    user.xp += xpEarned;

    /* -------- LEVEL SYSTEM -------- */
    // every 200 XP = next level
    user.level = Math.floor(user.xp / 200) + 1;

    /* -------- STREAK SYSTEM -------- */
    const today = new Date().toDateString();

    if (!user.lastActiveDate) {
        user.streak = 1;
    } else {
        const last = new Date(user.lastActiveDate).toDateString();

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (last === yesterday.toDateString()) {
            user.streak += 1;
        }
        else if (last !== today) {
            user.streak = 1;
        }
    }

    user.lastActiveDate = new Date();

    await user.save();

    return {
        xpEarned,
        totalXP: user.xp,
        level: user.level,
        streak: user.streak
    };
};

module.exports = { updateGamification };