import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/authImagePattern";
import { useAuthStore } from "../store/useAuthStore";

import toast from "react-hot-toast";

const LoginPage = () => {
  const { authLogin, isLoggingIn } = useAuthStore();
  const [ShowPassword, setShowPassword] = useState(false);
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!LoginData.email.trim() || !LoginData.password)
      return toast.error("All fields are required !!!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(LoginData.email))
      return toast.error("Invalid Email !!!");

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid === true) authLogin(LoginData);
  };
  return (
    <div className="min-h-screen  text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl  rounded-2xl  flex overflow-hidden shadow-2xl border-1 border-black">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold mb-2 text-yellow-400">Login</h2>
          <p className="text-sm text-gray-400 mb-8">Log in to your account</p>
          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="skitty@example.com"
                className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) =>
                  setLoginData({ ...LoginData, email: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type={ShowPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) =>
                  setLoginData({ ...LoginData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!ShowPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-yellow-400"
              >
                {ShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition"
              onClick={handleLogin}
            >
              {isLoggingIn ? (
                <span class="loading loading-dots loading-xs"></span>
              ) : (
                "LogIN"
              )}
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              sign Up
            </Link>
          </p>
        </div>

        {/* Right Section - Visual */}
        <div className="hidden md:flex w-1/2 bg-[#121212] items-center justify-center">
          <AuthImagePattern
            title={"Join our community"}
            subtitle={
              "Connect with friends, share moments, and stay in touch with your loved ones."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
