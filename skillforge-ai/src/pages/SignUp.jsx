import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";

function Signup() {

    //stores user input

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    //stores validation errors
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    //password visibility
    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    // input handler
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //validation
    const validateForm = () => {
        const newErrors = {};

        //name
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        //email
        if(!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        //password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long."
        }
        
        //confirm password
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match."
        }

        return newErrors;
        
    };


    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Signup submit clicked");

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            setLoading(true);

            try {
                await signupUser(formData);

                navigate("/login");
            } catch (error) {
                setErrors({
                    api: error.response?.data?.message || "Signup failed. Please try again.",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return(
        <main className="page-center">
            <div className="page-card auth-card">
                <h1>Sign Up</h1>
                <p>Join SkillForge AI and start preparing for ypur dream carrer.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {errors.api && <p className="error-text">{errors.api}</p>}

                    <div className="form-group">

                        {/* Name */}

                        <label>Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange} 
                            placeholder="Enter your name"
                            />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>

                    <div className="form-group">

                        {/* Email */}

                        <label>Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} 
                            placeholder="Enter your email"
                        />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>


                    <div className="form-group">

                        {/* Password */}

                        <label>Password</label>

                        <div className="password-wrapper">

                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange} 
                            placeholder="Enter your password"
                        />

                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() => 
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>

                        </div>

                        {errors.password && (<p className="error-text">{errors.password}</p>)}
                    
                    </div>


                    <div className="form-group">

                        {/* Confirm Password */}

                        <label>Confirm Password</label>
                        
                        <div className="password-wrapper">
                        
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange} 
                            placeholder="Confirm your password"
                        />

                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>

                        </div>

                        {errors.confirmPassword && (
                            <p className="error-text">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="primary-btn auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                </form>
                <p className="auth-switch">
                    Already registered?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
}

export default Signup;