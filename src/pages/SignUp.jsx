/** @format */

import { useState } from "react";
import registerImg from "../assets/images/signup.gif";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigateTo = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const res = await api.post("/user/register", form);
      toast.success(res.data.message || "Registered successfully!");
      setTimeout(() => {
        navigateTo("/login");
      }, 800);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <section className="w-full min-h-[100dvh] h-auto bg-gray-50 dark:bg-[#0f172a] overflow-y-auto flex justify-center items-center py-10">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {/* Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2">
          <img
            src={registerImg}
            alt="Register Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-8 py-12 md:px-16">
          <h2 className="text-3xl font-bold text-center text-primaryColor dark:text-white mb-8">
            Create an Account 🚀
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              onChange={handleChange}
              value={form.name}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              onChange={handleChange}
              value={form.email}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              onChange={handleChange}
              value={form.password}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryColor transition"
              onChange={handleChange}
              value={form.confirmPassword}
              required
            />

            <button
              type="submit"
              className="w-full bg-primaryColor hover:bg-blue-700 transition text-white text-lg font-medium py-3 rounded-md">
              Register
            </button>
            <p className="mt-5 text-white text-center">
              Already have an account?
              <Link to="/login" className="text-primaryColor font-medium ml-1">
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

export default Register;
