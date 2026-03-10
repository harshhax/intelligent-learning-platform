const adminOnly = (req, res, next) => {

    // user must already be attached by protect middleware
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }

    next(); // VERY IMPORTANT
};

module.exports = adminOnly;