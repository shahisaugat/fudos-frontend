import React, { useState } from "react";
import loginBackground from '../../assets/icons/login-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register/user", {
        username: username,
        password: password,
        confirm_password: confirmPassword,
      });

      if (response.status === 200) {
        toast.success('Registration successful!');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error('Registration failed. Please try again.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-screen-xl flex flex-col md:flex-row mx-auto bg-white p-8 rounded-md shadow-lg">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={loginBackground}
            alt="Signup Image"
            className="w-full md:max-w-md"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up for Fudos</h2>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                username
              </label>
              <input
                type="username"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#EB5757] focus:ring-[#EB5757] h-10"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#EB5757] focus:ring-[#EB5757] h-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="flex items-center justify-center px-2 text-gray-500 focus:outline-none"
                  style={{ marginLeft: '-2rem' }}
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#EB5757] focus:ring-[#EB5757] h-10"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {/* Optional: Add terms and conditions checkbox */}
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#EB5757] hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#EB5757] text-white py-2 px-4 rounded-md hover:bg-[#EB5757] transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account? 
            <button
              type="button"
              className="text-[#EB5757] hover:underline ml-1"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
