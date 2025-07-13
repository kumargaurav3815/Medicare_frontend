/** @format */

import { useState, useEffect } from "react";
import loginImg from "../assets/images/login.gif";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
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
      setTimeout(() => {
        navigateTo("/");
      }, 500);
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleRegisterNewUser = () => {
    navigateTo("/register");
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
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000;

    if (expirationTime < Date.now()) {
      handleLogout();
      return;
    }

    const intervalId = setInterval(() => {
      if (Date.now() > expirationTime) {
        handleLogout();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkTokenExpiration(token);
    }
  }, []);

  return (
    <section className="w-full min-h-[100dvh] h-auto bg-gray-50 dark:bg-[#0f172a] overflow-y-auto flex justify-center items-center py-10">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {/* Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2">
          <img
            src={loginImg}
            alt="Login Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-8 py-12 md:px-16">
          <h2 className="text-3xl font-bold text-center text-primaryColor dark:text-white mb-8">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            <button
              type="submit"
              className="w-full bg-primaryColor hover:bg-blue-700 transition text-white text-lg font-medium py-3 rounded-md">
              Login
            </button>

            <div className="text-center mt-4">
              <Link
                to="/forgotPassword"
                className="text-sm text-primaryColor hover:underline dark:text-blue-400">
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center gap-4 my-4">
              <hr className="flex-1 border-gray-300 dark:border-gray-600" />
              <span className="text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-300 dark:border-gray-600" />
            </div>

            <button
              type="button"
              className="w-full bg-gray-600 hover:bg-gray-700 transition text-white text-lg font-medium py-3 rounded-md"
              onClick={handleRegisterNewUser}>
              Create Account
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default Login;
