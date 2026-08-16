import {NavLink, Outlet, Link, useNavigate} from "react-router-dom";

function AppLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        
        navigate("/login");        
    };

    return(
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <Link to="/dashboard" className="sidebar-logo">
                        SkillForge AI 
                    </Link>
                    <p>AI Career Preparation Platform</p>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" className="sidebar-link">
                        Dashboard
                    </NavLink>
                    <NavLink to="/resume-improver" className="sidebar-link">
                        Resume Improver
                    </NavLink>
                    <NavLink to="/interview-generator" className="sidebar-link">
                        Interview Generator
                    </NavLink>
                    <NavLink to="/mock-interview" className="sidebar-link">
                        Mock Interview
                    </NavLink>
                    <NavLink to="/history" className="sidebar-link">
                        History
                    </NavLink>
                    <NavLink to="/profile" className="sidebar-link">
                        Profile
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="back-line">
                        ← Back to Landing Page
                    </Link>

                    <button className="logout-btn" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </aside>

            <div className="app-main">
                <header className="app-topbar">
                    <h1>SkillForge AI</h1>
                    <p>Prepare smarter with AI-powered tools</p>
                </header>

                <section className="app-content">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}

export default AppLayout;