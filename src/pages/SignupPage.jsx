import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/authImagePattern";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isSignup, signup } = useAuthStore();

  const validateForm = () => {
    if (
      !FormData.email.trim() ||
      !FormData.fullName.trim() ||
      !FormData.password
    )
      return toast.error("All fields are required !!!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(FormData.email))
      return toast.error("Invalid Email !!!");

    if (FormData.password.length < 6)
      return toast.error(
        "Password must be atleast or greater than 6 characters !!!"
      );

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid === true) {
      signup(FormData);
    }
  };

  return (
    <div className="min-h-screen  text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl  rounded-2xl shadow-2xl flex overflow-hidden border-1 border-black">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold mb-2 text-yellow-400">
            Create Account
          </h2>
          <p className="text-sm text-gray-400 mb-8">
            Get started with your free account
          </p>
          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Skitty Skitty"
                className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) =>
                  setFormData({ ...FormData, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="skitty@example.com"
                className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) =>
                  setFormData({ ...FormData, email: e.target.value })
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
                  setFormData({ ...FormData, password: e.target.value })
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
              onClick={handleSubmit}
            >
              {isSignup ? (
                <span class="loading loading-dots loading-xs"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Log in
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

export default SignupPage;
