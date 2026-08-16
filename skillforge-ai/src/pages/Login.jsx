import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const [formData, setFormData] = useState({
        emai: "",
        password: "",
    });
    
    // Stores validation errors
    const [errors, setErrors] = useState({})
    
    // controls password visibility
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    //runs whenever the user types
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //validates the form
    const validateForm = () => {
        const newErrors = {};
        
        //email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email sddress.";
        }
        
        //password validation
        if (!formData.password.trim()) {
            newErrors.password = "Password is required."
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        return newErrors;
    };

    //runs when login button is clicked
    const handleSubmit = async(e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        //no validation errors
        if(Object.keys(validationErrors).length === 0){
            try {
                const data = await loginUser(formData);

                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userName", data.user?.name || formData.email);
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } catch (error) {
                setErrors({
                    api: error.response?.data?.message || "Login failed. Please try again.",
                });
            }
        }
    };


    return(
        <main className="page-center">
            <div className="page-card auth-card">
                <h1>Login</h1>
                <p>Login to continue your carrer preparation journey.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {errors.api && <p className="error-text">{errors.api}</p>}

                    {/* Email */}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="emil"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email" 
                        />
                        {errors.email && 
                        (<p className="error-text">{errors.email}</p>

                        )}

                    </div>

                    {/* Password */}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password"
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

                        <div>
                            {errors.password && (
                                <p className="error-text">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* {errors.password && <p className="error-text">{errors.password}</p>} */}
                    
                    </div>

                    <button type="submit" className="primary-btn auth-btn">
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login;