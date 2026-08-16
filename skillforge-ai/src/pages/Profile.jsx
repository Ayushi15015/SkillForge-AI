import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data);
      } catch (error) {
        console.error("Profile fetch failed:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="page-center">
        <div className="page-card auth-card">
          <h1>Loading Profile...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-center">
        <div className="page-card auth-card">
          <h1>Profile Error</h1>
          <p className="error-text">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">
          {profile?.user?.name?.charAt(0).toUpperCase() || "A"}
        </div>

        <div className="profile-intro">
          <p className="section-badge">Profile</p>

          <h1>My Profile</h1>

          <p className="profile-subtext">
            Your authenticated profile information from the backend.
          </p>
        </div>
      </section>

<section className="profile-section">
    <h2>Authenticated User</h2>

    <div className="profile-details-card">
        <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">
                {profile?.user?.name || "Not available"}
            </span>
        </div>

        <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">
                {profile?.user?.email || "Not available"}
            </span>
        </div>

        <div className="detail-item">
            <span className="detail-label">User ID</span>
            <span className="detail-value">
                {profile?.user?._id || profile?.user?.id || "Not available"}
            </span>
        </div>
    </div>
</section>
    </main>
  );
}

export default Profile;