/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired token.");
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");

    try {
      const res = await api.put(`/user/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <section className="w-full h-[100dvh] flex responsive-layout items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      <ToastContainer />
      <div className="flex justify-center items-center p-4 w-full max-w-md">
        <img
          src="/assets/images/reset.gif"
          alt="Reset Password"
          className="w-40 h-40 rounded-lg mb-4 md:mb-0"
        />
      </div>
      <div className="flex flex-col justify-center w-full max-w-md px-4 py-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Reset
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
