import {Link} from "react-router-dom";

function Hero() {
    return(
        <section className="hero" id="home">
            <div className="hero-content">
                <p className="hero-badge">Let's Get You Hired</p>

                <h1>Your AI-Powered Carrer Partner</h1>

                <p className="hero-text">
                    Improve your resume, practice with mock interviews, 
                    and prepare for placement with AI-powered tools built for students.
                </p>

                <div className="hero-actions">

                    <Link to="/signup" className="primary-btn">
                        Get Started
                    </Link>

                    <a href="#about" className="secondary-btn">
                        Learn More
                    </a>

                </div>
            </div>
        </section>
    );
}

export default Hero;