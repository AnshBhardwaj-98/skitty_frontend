import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const location = useLocation();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // console.log(authUser);
  if (isCheckingAuth && !authUser)
    return (
      <div className="h-[100vh] w-full flex justify-center items-center ">
        {/* <span className="loading loading-spinner text-secondary h-16 w-16"></span> */}
        <span className="loading loading-dots h-16 w-16"></span>
      </div>
    );

  return (
    <div data-theme={theme} className="size-full">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default App;
