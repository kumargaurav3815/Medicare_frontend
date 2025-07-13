/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";
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
      const response = await api.put(`/user/reset-password/${token}`, {
        password,
      });

      toast.success(response.data.message || "Password reset successful!");
      setTimeout(() => {
        navigateTo("/login");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Please try again later."
      );
    }
  };

  return (
    <section className="portrait landscape flex items-center justify-center w-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="min-h-[100dvh] flex items-center justify-center py-10 w-full">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <h3 className="text-blue-600 text-4xl font-bold mb-8 text-center">
            Reset Password
          </h3>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                autoComplete="new-password"
                className="scale-up w-full px-5 py-5 text-xl rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                autoComplete="confirm-password"
                className="scale-up w-full px-5 py-5 text-xl rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="scale-up w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg py-5 transition ease-in-out duration-300">
                Reset Password
              </button>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
