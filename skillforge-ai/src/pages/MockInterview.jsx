import { useState } from "react";
import {
  generateMockQuestion,
  evaluateMockAnswer,
} from "../services/authService";

function MockInterview() {
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const [error, setError] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingEvaluation, setLoadingEvaluation] = useState(false);

  const handleGenerateQuestion = async (e) => {
    e.preventDefault();

    if (!role.trim()) {
      setError("Please enter a job role.");
      return;
    }

    setError("");
    setQuestion("");
    setAnswer("");
    setEvaluation(null);
    setLoadingQuestion(true);

    try {
      const data = await generateMockQuestion(role);

      setQuestion(data.data.question);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to generate an interview question. Please try again."
      );
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleEvaluateAnswer = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }

    setError("");
    setEvaluation(null);
    setLoadingEvaluation(true);

    try {
      const data = await evaluateMockAnswer({
        role,
        question,
        answer,
      });

      setEvaluation(data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to evaluate your answer. Please try again."
      );
    } finally {
      setLoadingEvaluation(false);
    }
  };

  return (
    <main className="page-center">
      <div className="page-card mock-card">
        <p className="section-badge">Mock Interview</p>

        <h1>Practice a Mock Interview</h1>

        <p className="mock-text">
          Enter a job role, generate an interview question, submit your answer,
          and receive AI-powered feedback.
        </p>

        <form
          onSubmit={handleGenerateQuestion}
          className="mock-form"
        >
          <div className="form-group">
            <label htmlFor="role">Job Role</label>

            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Example: Frontend Developer"
              disabled={loadingQuestion}
            />
          </div>

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loadingQuestion}
          >
            {loadingQuestion
              ? "Generating Question..."
              : "Generate Question"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        {question && (
          <div className="mock-question-block">
            <h2>Interview Question</h2>

            <p className="mock-question">
              {question}
            </p>

            <form
              onSubmit={handleEvaluateAnswer}
              className="mock-form"
            >
              <div className="form-group">
                <label htmlFor="answer">
                  Your Answer
                </label>

                <textarea
                  id="answer"
                  className="mock-textarea"
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={loadingEvaluation}
                />
              </div>

              <button
                type="submit"
                className="primary-btn auth-btn"
                disabled={loadingEvaluation}
              >
                {loadingEvaluation
                  ? "Evaluating..."
                  : "Submit Answer"}
              </button>
            </form>
          </div>
        )}

        {evaluation && (
          <div className="mock-result">
            <h2>Interview Feedback</h2>

            <p>
              <strong>Score:</strong>{" "}
              {evaluation.score}/10
            </p>

            <div className="evaluation-text">
              <pre>{evaluation.evaluation}</pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MockInterview;