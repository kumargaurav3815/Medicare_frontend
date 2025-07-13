/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import signUpImg from "../assets/images/signup.gif";
import api from "../../api";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigateTo = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) return toast.error("Invalid email");
    if (form.phone.length < 10) return toast.error("Phone must be 10+ digits");
    if (form.password.length < 6) return toast.error("Password too short");

    try {
      const res = await api.post("/user/patient/register", form);
      toast.success(res.data.message || "Registration successful");
      setTimeout(() => navigateTo("/login"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <section className="w-full h-[100dvh] flex responsive-layout items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <ToastContainer />
      <div className="flex justify-center items-center p-4 w-full max-w-md">
        <img
          src={signUpImg}
          alt="Signup"
          className="w-40 h-40 rounded-lg mb-4 md:mb-0"
        />
      </div>
      <div className="flex flex-col justify-center w-full max-w-md px-4 py-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create your <span className="text-blue-600">Account</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstName", "lastName", "email", "phone", "password"].map(
            (name, idx) => (
              <input
                key={idx}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            )
          )}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-600">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
