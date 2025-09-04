import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("Attempting login with:", { email, password: "***", confirmPassword: "***", role: "Patient" });
      
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { 
          email, 
          password, 
          confirmPassword,
          role: "Patient" 
        },
        {
          withCredentials: true, 
          headers: { "Content-Type": "application/json" },
        }
      );
      
      console.log("Login response:", response.data);
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Server responded with error status
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        toast.error("No response from server. Please check if the server is running.");
      } else {
        // Something else happened
        console.error("Error:", error.message);
        toast.error("An error occurred during login");
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero nemo esse ratione, nihil culpa ex.</p>
      
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email'
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password'
          required
        />
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder='Confirm Password'
          required
        />
        
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link 
            to={"/register"} 
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Register Now
          </Link>
        </div>
        
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

