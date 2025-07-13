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
      setTimeout(() => {
        navigateTo("/login");
      }, 800);

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGender("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="w-full min-h-[100dvh] h-auto bg-gray-50 dark:bg-[#0f172a] overflow-y-auto flex justify-center items-center py-10">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {/* Left Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2">
          <img
            src={signUpImg}
            alt="Sign Up"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 px-8 py-12 md:px-16">
          <h2 className="text-3xl font-bold text-center text-primaryColor dark:text-white mb-8">
            Create Your Account 👤
          </h2>

          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="font-medium text-gray-700 dark:text-white">
                Gender:
              </label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full sm:w-auto px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primaryColor hover:bg-blue-700 transition text-white text-lg font-medium py-3 rounded-md">
              Sign Up
            </button>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Already have an account?
              <Link
                to="/login"
                className="text-primaryColor font-semibold ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default Signup;
