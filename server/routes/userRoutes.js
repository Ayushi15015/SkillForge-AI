const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authmiddleware");
const User = require("../models/User");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "Welcome to your Profile",
            user,
        });
    } catch (error) {
        console.error("Profile error:", error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

module.exports = router;