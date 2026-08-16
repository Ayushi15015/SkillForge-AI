import { useState } from "react";
import { generateInterviewQuestions } from "../services/authService";

function InterviewGenerator() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role.trim()) {
      setError("Please enter a job role.");
      setQuestions("");
      return;
    }

    setError("");
    setQuestions("");
    setLoading(true);

    try {
      const data = await generateInterviewQuestions(role);

      setQuestions(data.data.interviewQuestions);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to generate interview questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-center">
      <div className="page-card interview-card">
        <p className="section-badge">Interview Generator</p>

        <h1>Generate Interview Questions</h1>

        <p className="interview-text">
          Enter a job role and generate AI-powered interview questions for
          practice.
        </p>

        <form onSubmit={handleSubmit} className="interview-form">
          <div className="form-group">
            <label htmlFor="role">Job Role</label>

            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Example: Frontend Developer"
              disabled={loading}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </form>

        {questions && (
          <div className="interview-results">
            <h2>Generated Questions</h2>
            <pre>{questions}</pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default InterviewGenerator;