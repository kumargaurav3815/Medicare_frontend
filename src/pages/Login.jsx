/** @format */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImg from "../assets/images/login.gif";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasShownExpiredMessage, setHasShownExpiredMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email,
        password,
        confirmPassword,
      });
      toast.success(res.data.message || "Login successful!");

      const token = res.data.token;
      localStorage.setItem("token", token);
      checkTokenExpiration(token);

      setTimeout(() => navigateTo("/"), 500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!hasShownExpiredMessage) {
      toast.info("Your session has expired. Please log in again.");
      setHasShownExpiredMessage(true);
    }
    navigateTo("/login");
  };

  const checkTokenExpiration = (token) => {
    if (!token) return;
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    const expirationTime = decoded.exp * 1000;

    if (Date.now() > expirationTime) {
      handleLogout();
      return;
    }

    const interval = setInterval(() => {
      if (Date.now() > expirationTime) {
        handleLogout();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) checkTokenExpiration(token);
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-6">
      <ToastContainer />
      <div className="w-full max-w-md bg-white/30 dark:bg-gray-800 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-8 border border-white/30 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <img
            src={loginImg}
            alt="Login"
            className="w-40 h-40 mb-4 rounded-lg shadow-md block lg:hidden"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Welcome Back
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <input
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Login
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300 gap-3 pt-2">
            <Link to="/forgotPassword" className="hover:text-blue-600">
              Forgot Password?
            </Link>
            <button
              type="button"
              onClick={() => navigateTo("/register")}
              className="hover:text-blue-600">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
