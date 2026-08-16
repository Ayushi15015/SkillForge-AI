import { useEffect, useState } from "react";
import { getInterviewHistory } from "../services/authService";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getInterviewHistory();

        setHistory(data.data || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load interview history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <main className="page-center">
        <div className="page-card auth-card">
          <h1>Loading History...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-center">
        <div className="page-card auth-card">
          <h1>History Error</h1>
          <p className="error-text">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="history-page">
      <section className="history-hero">
        <p className="section-badge">History</p>

        <h1>Your Mock Interview History</h1>

        <p className="history-subtext">
          Review your previous mock interview attempts, scores, and feedback.
        </p>
      </section>

      <section className="history-section">
        <h2>Previous Attempts</h2>

        {history.length === 0 ? (
          <div className="history-card">
            <p>
              No mock interview attempts found yet. Start a mock interview to
              see your history here.
            </p>
          </div>
        ) : (
          <div className="history-grid">
            {history.map((item) => (
              <div className="history-card" key={item._id}>
                <p className="history-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <h3>Role</h3>
                <p>{item.role}</p>

                <h3>Question</h3>
                <p>{item.question}</p>

                <h3>Your Answer</h3>
                <p>{item.answer}</p>

                <h3>Score</h3>
                <p>{item.score}/10</p>

                <h3>AI Feedback</h3>
                <p>{item.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default History;