/** @format */

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Appointment from "../pages/Appointment/Appointment";
import Review from "../pages/review";
import VirtualAppointment from "../pages/Appointment/VirtualAppointment";
import Consult from "../pages/Appointment/Consult";
import Appointments from "../pages/MyAppointments";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/review" element={<Review />} />
      <Route path="/virtualAppointment" element={<VirtualAppointment />} />
      <Route path="/consult" element={<Consult />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
};

export default Routers;
