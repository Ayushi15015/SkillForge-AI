import {FaGithub, FaLinkedin, FaEnvelope} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer-section" id="footer">
            <div className="footer-top">
                <h2 className="fotter-brand">SkillForge AI</h2>
                <p className="footer-description">
                    Helping students prepare effectively for 
                    interviews through AI-powered guidance.
                </p>
            </div>

            <div className="footer-columns">
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                </div>

                <div className="footer-column">
                    <h3>Contact</h3>
                    <a href="#mailto:skillforgeai@example.com">
                        <FaEnvelope className="footer-icon" />
                        Email
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <FaGithub className="footer-icon" />
                        GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <FaLinkedin className="footer-icon" />
                        LinkedIn
                    </a>
                </div>

            </div>

            <div className="fotter-bottom">
                <p>© 2026 SkillForge AI. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;