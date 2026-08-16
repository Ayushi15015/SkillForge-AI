import FeatureCard from "./FeatureCard";

const features = [
    {
        icon: "📄",
        title: "Resume AI",
        description: "Improve your resume bullets using AI-powered suggestions.",
    },
    {
        icon: "💬",
        title: "Interview Generator",
        description: "Generate interview questions based on topic and difficulty.",
    },
    {
        icon: "🎤",
        title: "Mock Interview",
        description: "Practice interviews and get AAI-powered feedback.",
    },
    {
        icon: "📈",
        title: "Progress Tracker",
        description: "Track your improvement and monitor your preparation journey.",
    },
];

function Features() {
    return(
        <section className="features-section" id="features">
            <div className="feature-heading">
                <p className="section-badge">Why SkillForge AI?</p>
                <h2>Everything you need to prepare smarter</h2>
            </div>

            <div className="features-grid">
                {features.map((feature) => (
                    <FeatureCard
                    key={feature.title} 
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    />
                ))}
            </div>
        </section>
    );
}

export default Features;