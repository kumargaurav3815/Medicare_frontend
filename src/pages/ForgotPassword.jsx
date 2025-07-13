/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotPasswordImg from "../assets/images/forgot-password.webp";
import api from "../../api";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/request-password-reset", {
        email,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to request password reset. Please try again later.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen w-full bg-gradient-to-tr from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-all">
      <ToastContainer />
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white/30 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-10 border border-white/40 dark:border-gray-700">
        <div className="hidden md:flex items-center justify-center">
          <img
            src={forgotPasswordImg}
            alt="Forgot Password"
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center md:text-left text-gray-800 dark:text-white mb-6">
            Forgot your <span className="text-blue-600">Password?</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-4 text-center md:text-left">
            Enter your registered email address. We will send you a password
            reset link.
          </p>

          <form onSubmit={handleResetPasswordRequest} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
              Request Password Reset
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Remember your password?
              <Link to="/login" className="text-blue-600 font-medium ml-1">
                Login
              </Link>
            </p>

            <div className="flex justify-center items-center">
              <Link to="/register" className="w-full">
                <button
                  type="button"
                  className="w-full py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                  Create Account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordRequest;
