const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false   // 🔴 very important (password never returned in queries)
    },

    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },

    /* -------- GAMIFICATION FIELDS -------- */

    xp: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 1
    },

    streak: {
        type: Number,
        default: 0
    },

    lastActiveDate: {
        type: Date,
        default: null
    }

},
{ timestamps: true }
);

/* -------- PASSWORD HASHING -------- */

userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* -------- PASSWORD CHECK -------- */

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/* -------- REMOVE SENSITIVE DATA -------- */

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model("User", userSchema);