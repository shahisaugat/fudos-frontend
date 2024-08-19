import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import login from '../../assets/icons/login-background.png';
import { toast } from "react-toastify";

const SignIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");

      if (refreshToken && userId) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/refresh",
            null,
            {
              headers: {
                "Refresh-Token": refreshToken,
              },
            }
          );
          const { accessToken } = response.data;
          localStorage.setItem("token", accessToken);
          navigate("/home");
        } catch (error) {
          console.error("Failed to refresh token:", error);
          localStorage.clear();
        }
      }
    };

    checkTokenAndRedirect();
  }, [navigate]);


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      console.log("Login response:", response.data); // Check response data

      const { accessToken, userId, role,refreshToken } = response.data;
      console.log("Role:", role);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", JSON.stringify(role.name));

      console.log("Token set in localStorage:", localStorage.getItem("token")); // Debug localStorage
      console.log("UserId set in localStorage:", localStorage.getItem("userId"));

      const  accessLevel= role.name.includes("ADMIN") ? "/admin/dashboard" : "/home";
      navigate(accessLevel);
      toast.success("Login successful!");
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-screen-xl flex flex-col md:flex-row mx-auto bg-white p-8 rounded-md shadow-lg">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={login}
            alt="Login Image"
            className="w-full md:max-w-md"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In to Fudos</h2>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                username 
              </label>
              <input
                type="username"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#EB5757] focus:ring-[#EB5757] h-10"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#EB5757] focus:ring-[#EB5757] h-10"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-[#EB5757] text-white py-2 px-4 rounded-md hover:bg-[#EB5757] transition duration-300"
              >
                Sign In
                
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account? 
            <button
              type="button"
              className="text-[#EB5757] hover:underline ml-1"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
