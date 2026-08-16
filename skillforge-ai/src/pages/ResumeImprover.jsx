import { useState } from "react";
import { improveResume } from "../services/authService";

function ResumeImprover() {
  const [bullet, setBullet] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bullet.trim()) {
      setError("Please enter a resume bullet to improve.");
      setResult("");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {
      const data = await improveResume(bullet);

      setResult(data.data.improvedResume);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to improve the resume bullet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-center">
      <div className="page-card resume-card">
        <p className="section-badge">Resume Improver</p>

        <h1>Improve Your Resume Bullet</h1>

        <p className="resume-text">
          Paste one resume bullet below and get an AI-improved professional
          version.
        </p>

        <form onSubmit={handleSubmit} className="resume-form">
          <textarea
            className="resume-textarea"
            placeholder="Example: Worked on a college project using Python."
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            disabled={loading}
          />

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loading}
          >
            {loading ? "Improving..." : "Improve Bullet"}
          </button>
        </form>

        {result && (
          <div className="resume-results">
            <h2>Improved Version</h2>

            <p>{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ResumeImprover;