/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigateTo = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired token.");
      setTimeout(() => {
        navigateTo("/login");
      }, 3000);
    }
  }, [token, navigateTo]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `https://medicare-backend-ko6l.onrender.com/api/v1/user/reset-password/${token}`,
        { password }
      );
      console.log("Password reset success:", response.data);
      toast.success(response.data.message);

      setTimeout(() => {
        navigateTo("/login");
      }, 500);
    } catch (error) {
      console.error(
        "Error during password reset:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to reset password. Please try again later.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h3 className="text-primaryColor text-3xl font-bold mb-8 text-center">
          Reset Password
        </h3>

        <form onSubmit={handleResetPassword}>
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primaryColor focus:outline-none text-gray-900 text-base placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              autoComplete="confirm-password"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primaryColor focus:outline-none text-gray-900 text-base placeholder-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-primaryColor hover:bg-primaryDark text-white text-lg font-semibold rounded-lg px-4 py-3 transition ease-in-out duration-300">
              Reset Password
            </button>
          </div>
        </form>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </section>
  );
};

export default ResetPassword;
