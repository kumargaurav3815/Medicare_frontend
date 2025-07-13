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
    <section className="flex items-center justify-center min-h-screen w-full">
      <div className="max-w-[1170px] w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block rounded-l-lg overflow-hidden">
            <figure className="h-full w-full">
              <img
                src={signUpImg}
                className="object-cover w-full h-full"
                alt="Sign Up"
              />
            </figure>
          </div>

          <div className="rounded-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={handleRegistration}>
              <div className="mb-5">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                  required
                  autoComplete="tel"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="ml-4 text-textColor font-semibold text-[15px] px-4 py-3 border border-gray-300 rounded focus:outline-none"
                    required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                  Sign Up
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default Signup;
