/** @format */

import { useState } from "react";
import signUpImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validatePhone = (phone) => phone.length >= 10;
  const validatePassword = (password) => password.length >= 6;

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Phone number should be at least 10 digits.");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    try {
      const res = await api.post("/user/patient/register", {
        firstName,
        lastName,
        email,
        phone,
        gender,
        password,
      });

      toast.success(res.data.message || "Registration successful!");
      setTimeout(() => navigateTo("/login"), 800);

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 px-4">
      <ToastContainer />
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-10 border border-white/30 dark:bg-gray-800 dark:border-gray-700">
        <div className="hidden md:flex items-center justify-center">
          <img
            src={signUpImg}
            alt="Sign Up"
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center md:text-left text-gray-800 dark:text-white mb-6">
            Create your <span className="text-blue-600">Account</span>
          </h2>

          <form onSubmit={handleRegistration} className="space-y-5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

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

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Already have an account?
              <Link to="/login" className="text-blue-600 font-medium ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
