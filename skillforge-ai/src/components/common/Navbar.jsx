import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-brand">
        <span className="navbar-brand-text">
          SkillForge <span>AI</span>
        </span>
      </a>

      <ul className="nav-links">
        <li>
          <a href="#home" className="active">
            Home
          </a>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/signup" className="nav-signup">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;