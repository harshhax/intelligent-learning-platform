const User = require("../models/User");

const getLeaderboard = async (req, res) => {
    try {

        const leaderboard = await User.find({ role: "student" })
            .select("name xp level streak")
            .sort({ xp: -1 })
            .limit(10);

        res.json(leaderboard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLeaderboard };