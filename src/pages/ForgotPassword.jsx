/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotPasswordImg from "../assets/images/forgot-password.webp";
import api from "../../api";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/request-password-reset", {
        email,
      });
      toast.success(response.data.message);
    } catch (error) {
      // console.error("Error requesting password reset:", error);
      toast.error("Failed to request password reset. Please try again later.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen w-full ">
      <div className="max-w-[1170px] w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block">
            <figure className="rounded-l-lg">
              <img
                src={forgotPasswordImg}
                className="w-full"
                alt="Forgot Password"
              />
            </figure>
          </div>

          <div className="rounded-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Forgot Password
            </h3>

            <form onSubmit={handleResetPasswordRequest}>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                  Request Password Reset
                </button>
              </div>

              <p className="mt-2 text-textColor text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-800" />
              <div>
                <Link to="/register">
                  <button className="w-full bg-slate-500 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                    Create Account
                  </button>
                </Link>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordRequest;
