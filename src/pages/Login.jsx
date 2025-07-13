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
    <section className="h-[100dvh] w-full overflow-y-auto bg-gradient-to-br from-blue-200 via-white to-purple-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <ToastContainer />

      <div className="min-h-[100dvh] flex flex-col items-center justify-center py-10">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-36 h-36 mb-6 rounded-lg shadow-lg"
        />

        <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Welcome Back
        </h2>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6"
          autoComplete="off">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-5 text-xl rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-5 text-xl rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-5 py-5 text-xl rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-5 text-xl rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition transform hover:scale-105 duration-200">
            Login
          </button>

          <div className="flex justify-between text-lg text-gray-600 dark:text-gray-300 pt-2">
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
