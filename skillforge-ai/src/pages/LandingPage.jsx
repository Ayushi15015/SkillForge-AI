import Navbar from "../components/common/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import About from "../components/landing/About";
import Footer from "../components/landing/Footer";

function LandingPage() {
    return(
        <>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Footer />
        </>
    );
}

export default LandingPage;