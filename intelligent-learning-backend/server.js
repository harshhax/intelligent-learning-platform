const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


// Load env
dotenv.config();

const app = express();

/* ---------------- GLOBAL MIDDLEWARE ---------------- */

// Security
app.use(helmet());

// Logger
app.use(morgan("dev"));

// CORS (React)
app.use(cors({
    origin: true,
    credentials: true
}));    

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quizRoutes = require("./routes/quizRoutes");
const studentRoutes = require("./routes/studentRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Intelligent Learning Difficulty Prediction API Running"
    });
});

/* ---------------- 404 HANDLER ---------------- */

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

/* ---------------- START SERVER (IMPORTANT FIX) ---------------- */

const PORT = process.env.PORT || 5000;

// start only after DB connects
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();