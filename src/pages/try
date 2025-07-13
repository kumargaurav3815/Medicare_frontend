/** @format */

import { useState, useEffect } from "react";
import loginImg from "../assets/images/login.gif";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasShownExpiredMessage, setHasShownExpiredMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email,
        password,
        confirmPassword,
      });

      toast.success(res.data.message || "Login successful!");
      const token = res.data.token;
      localStorage.setItem("token", token);
      checkTokenExpiration(token);
      setTimeout(() => {
        navigateTo("/");
      }, 500);
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleRegisterNewUser = () => {
    navigateTo("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!hasShownExpiredMessage) {
      toast.info("Your session has expired. Please log in again.");
      setHasShownExpiredMessage(true);
    }
    navigateTo("/login");
  };

  const checkTokenExpiration = (token) => {
    if (!token) return;
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000;

    if (expirationTime < Date.now()) {
      handleLogout();
      return;
    }

    const intervalId = setInterval(() => {
      if (Date.now() > expirationTime) {
        handleLogout();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkTokenExpiration(token);
    }
  }, []);

  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      <div className="max-w-[1170px] w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block">
            <figure className="rounded-l-lg">
              <img src={loginImg} className="w-full" alt="Login" />
            </figure>
          </div>

          <div className="rounded-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Login
            </h3>

            <form onSubmit={handleLogin}>
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

              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                  Login
                </button>
              </div>

              <p className="mt-2 text-textColor text-center">
                <Link
                  to="/forgotPassword"
                  className="text-primaryColor font-medium ml-1">
                  Forgot Password?
                </Link>
              </p>

              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-800" />

              <div>
                <button
                  type="button"
                  className="w-full bg-slate-500 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  onClick={handleRegisterNewUser}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

export default Login;
