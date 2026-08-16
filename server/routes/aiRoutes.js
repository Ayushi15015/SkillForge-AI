const express = require("express");
const router = express.Router();

console.log("AI Routes file loaded");

const {
  resumeImprover,
  interviewGenerator,
  generateQuestion,
  evaluateAnswer,
  getInterviewHistory,
  getDashboard,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

// ================= Resume =================
router.post("/resume-improve", resumeImprover);

// ================= Interview Generator =================
router.post("/interview-generator", interviewGenerator);

// ================= Mock Interview =================
router.post(
  "/mock-interview/question",
  authMiddleware,
  generateQuestion
);

router.post(
  "/mock-interview/evaluate",
  authMiddleware,
  evaluateAnswer
);

// ================= Interview History =================
router.get(
  "/mock-interview/history",
  authMiddleware,
  getInterviewHistory
);

// ================= Dashboard =================
router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

// ================= Test Route =================
router.get("/test", (req, res) => {
  res.send("AI route working");
});

module.exports = router;