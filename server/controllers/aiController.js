const Interview = require("../models/Interview");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ============================================
// Resume Improver
// ============================================

const resumeImprover = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Resume text is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert ATS resume writer.

Rewrite the user's resume bullet into ONE strong professional bullet point.

Rules:
- Return ONLY one improved bullet.
- Do not give explanations.
- Do not give alternatives.
- Do not use markdown.
- Start with a strong action verb.
- Keep it under 30 words.
- Make it ATS friendly.`,
        },
        {
          role: "user",
          content: resumeText,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 100,
    });

    return res.status(200).json({
      success: true,
      message: "Resume improved successfully",
      data: {
        improvedResume: completion.choices[0].message.content.trim(),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ============================================
// Interview Generator
// ============================================

const interviewGenerator = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || role.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert technical interviewer.

Generate exactly 10 interview questions.

For each question provide:
Question:
Difficulty:
Expected Answer:

Return plain text only.
No markdown.`,
        },
        {
          role: "user",
          content: `Generate interview questions for ${role}`,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 800,
    });

    return res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      data: {
        interviewQuestions: completion.choices[0].message.content.trim(),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ============================================
// Mock Interview - Generate Question
// ============================================

const generateQuestion = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || role.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert technical interviewer.

Generate ONLY ONE interview question.

Rules:
- Return only the interview question.
- No numbering.
- No explanation.
- No markdown.`,
        },
        {
          role: "user",
          content: `Generate one interview question for a ${role}.`,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 100,
    });

    return res.status(200).json({
      success: true,
      message: "Interview question generated successfully",
      data: {
        question: completion.choices[0].message.content.trim(),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ============================================
// Mock Interview - Evaluate Answer
// ============================================

const evaluateAnswer = async (req, res) => {
  try {
    const { role,question, answer } = req.body;
    const user=req.user.id;

    // Validation
    if (!role || role.trim()===""){
      return res.status(400).json({
        success:false,
        message:"Role is required",
      });
    }
    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    if (!answer || answer.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Answer is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert technical interviewer.

Evaluate the candidate's answer.

Return your response in exactly this format:

Score: X/10

Strengths:
- point 1
- point 2

Improvements:
- point 1
- point 2

Ideal Answer:
Write a concise ideal answer.

Do not use markdown or any extra explanation.`,
        },
        {
          role: "user",
          content: `Question: ${question}

Candidate Answer: ${answer}`,
        },
      ],
      temperature: 0.4,
      max_completion_tokens: 500,
    });

    const evaluation=completion.choices[0].message.content.trim();

    const scoreMatch=evaluation.match(/Score:\s*(\d+)/i);
    const score=scoreMatch ? Number(scoreMatch[1]):0;

    await Interview.create({
      user,
      role,
      question,
      answer,
      score,
      feedback:evaluation,
    });

    return res.status(200).json({
      success: true,
      message: "Answer evaluated and Saved successfully",
      data: {
        role,
        question,
        answer,
        score,
        evaluation,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getInterviewHistory=async(req,res)=>{
  try{
    const user=req.user.id;
    const interviews=await Interview.find({user})
    .sort({createdAt:-1});

    return res.status(200).json({
      success:true,
      message:"Interview history fetched successfully..",
      count:interviews.length,
      data:interviews,
    });
  } catch(error){
    console.error(error);
    
    return res.status(500).json({
      success:false,
      message:"Internal server Error",
      error:error.message,
    });
  }
  };

  // ============================================
// Dashboard
// ============================================

const getDashboard = async (req, res) => {
  try {
    const user = req.user.id;

    const interviews = await Interview.find({ user }).sort({
      createdAt: -1,
    });

    const totalInterviews = interviews.length;

    const averageScore =
      totalInterviews > 0
        ? (
            interviews.reduce(
              (sum, interview) => sum + interview.score,
              0
            ) / totalInterviews
          ).toFixed(1)
        : 0;

    const highestScore =
      totalInterviews > 0
        ? Math.max(...interviews.map((interview) => interview.score))
        : 0;

    const lowestScore =
      totalInterviews > 0
        ? Math.min(...interviews.map((interview) => interview.score))
        : 0;

    const recentInterviews = interviews.slice(0, 5);

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: {
        totalInterviews,
        averageScore,
        highestScore,
        lowestScore,
        recentInterviews,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ============================================

module.exports = {
  resumeImprover,
  interviewGenerator,
  generateQuestion,
  evaluateAnswer,
  getInterviewHistory,
  getDashboard,
};