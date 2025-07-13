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
    <section className="portrait landscape w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <ToastContainer />

      <div className="min-h-[100dvh] flex flex-col items-center justify-center py-10">
        <img
          src={signUpImg}
          alt="Sign Up"
          className="scale-image mb-6 rounded-lg shadow-lg"
        />

        <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Create your <span className="text-blue-600">Account</span>
        </h2>

        <form
          onSubmit={handleRegistration}
          className="w-full max-w-md space-y-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="scale-up w-full rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-5 text-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="scale-up w-full rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-5 text-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="scale-up w-full rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-5 text-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className="scale-up w-full rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-5 text-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="scale-up w-full rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-5 text-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="scale-up w-full rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-5 text-xl text-gray-600 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            type="submit"
            className="scale-up w-full py-5 text-xl rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition transform hover:scale-105 duration-200">
            Sign Up
          </button>

          <p className="text-lg text-center text-gray-600 dark:text-gray-300">
            Already have an account?
            <Link to="/login" className="text-blue-600 font-medium ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
