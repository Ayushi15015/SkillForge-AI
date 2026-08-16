import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/authService";

function Dashboard() {
  const [userName] = useState(
    localStorage.getItem("userName") || "Ayushi"
  );

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const quickActions = [
    {
      label: "Improve Resume",
      path: "/resume-improver",
    },
    {
      label: "Generate Questions",
      path: "/interview-generator",
    },
    {
      label: "Start Mock Interview",
      path: "/mock-interview",
    },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();

        setDashboardData(data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="page-center">
        <div className="page-card auth-card">
          <h1>Loading Dashboard...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-center">
        <div className="page-card auth-card">
          <h1>Dashboard Error</h1>
          <p className="error-text">{error}</p>
        </div>
      </main>
    );
  }

  const stats = [
    {
      title: "Total Interviews",
      value: dashboardData?.totalInterviews ?? 0,
      description: "Mock interview attempts completed.",
    },
    {
      title: "Average Score",
      value: dashboardData?.averageScore ?? 0,
      description: "Your average mock interview score out of 10.",
    },
    {
      title: "Highest Score",
      value: dashboardData?.highestScore ?? 0,
      description: "Your best mock interview score.",
    },
    {
      title: "Lowest Score",
      value: dashboardData?.lowestScore ?? 0,
      description: "Your lowest mock interview score.",
    },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <p className="section-badge">Dashboard</p>

        <h1>Welcome back, {userName}</h1>

        <p className="dashboard-subtext">
          Track your interview performance, continue your preparation, and
          use AI-powered tools to move closer to your career goals.
        </p>
      </section>

      <section className="dashboard-section">
        <h2>Progress Overview</h2>

        <div className="dashboard-grid">
          {stats.map((item) => (
            <div key={item.title} className="dashboard-card">
              <h3>{item.title}</h3>

              <p className="dashboard-value">
                {item.value}
              </p>

              <p className="dashboard-description">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="actions-grid">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="action-card"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Recent Interviews</h2>

        {dashboardData?.recentInterviews?.length === 0 ? (
          <div className="activity-card">
            <p className="dashboard-description">
              No mock interviews completed yet. Start your first mock
              interview to see your activity here.
            </p>
          </div>
        ) : (
          <div className="history-grid">
            {dashboardData.recentInterviews.map((item) => (
              <div className="history-card" key={item._id}>
                <p className="history-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <h3>{item.role}</h3>

                <p>
                  <strong>Score:</strong> {item.score}/10
                </p>

                <p>{item.question}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;