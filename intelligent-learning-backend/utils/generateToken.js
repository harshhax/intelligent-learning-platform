const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign(
        { id: id.toString() },   // VERY IMPORTANT
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = generateToken;