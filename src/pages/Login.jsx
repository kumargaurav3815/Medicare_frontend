/** @format */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import loginImg from "../assets/images/login.gif";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email,
        password,
        confirmPassword,
      });
      toast.success(res.data.message || "Login successful!");
      localStorage.setItem("token", res.data.token);
      setTimeout(() => navigateTo("/"), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <section className="w-full h-[100dvh] flex responsive-layout items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-300 px-4">
      <ToastContainer />
      <div className="flex justify-center items-center p-4 w-full max-w-md">
        <img
          src={loginImg}
          alt="Login"
          className="w-40 h-40 rounded-lg mb-4 md:mb-0"
        />
      </div>
      <div className="flex flex-col justify-center w-full max-w-md px-4 py-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <Link to="/forgotPassword" className="text-blue-600">
            Forgot Password?
          </Link>{" "}
          •
          <Link to="/register" className="text-blue-600 ml-2">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
