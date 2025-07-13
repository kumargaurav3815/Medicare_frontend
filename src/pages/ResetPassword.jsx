/** @format */

import { useState } from "react";
import resetImg from "../assets/images/reset.gif";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/reset-password", { email });
      toast.success(res.data.message || "Password reset link sent!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  return (
    <section className="w-full min-h-[100dvh] h-auto bg-gray-50 dark:bg-[#0f172a] overflow-y-auto flex justify-center items-center py-10">
      <div className="w-full max-w-[800px] mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {/* Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2">
          <img
            src={resetImg}
            alt="Reset Password"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-8 py-12 md:px-16">
          <h2 className="text-3xl font-bold text-center text-primaryColor dark:text-white mb-8">
            Reset Your Password 🔐
          </h2>

          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-primaryColor hover:bg-blue-700 transition text-white text-lg font-medium py-3 rounded-md">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default ResetPassword;
