const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

    try {

        let token;

        // token comes in header: Authorization: Bearer <token>
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // attach user to request
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            return next();   // ✅ VERY IMPORTANT

        } else {
            return res.status(401).json({ message: "No token provided" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;