/** @format */

import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import appointmentImg from "../../assets/images/appointment.gif";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import api from "../../../api";
import "react-toastify/dist/ReactToastify.css";

function Appointment() {
  const [currentDate, setCurrentDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const form = useRef();

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" && email.trim() !== "" && appointmentDate !== ""
    );
  }, [name, email, appointmentDate]);

  const bookAppointment = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/appointments/book", {
        name,
        email,
        appointmentDate,
      });

      await emailjs.sendForm(
        "service_7jvv9ri",
        "template_jzdhqpk",
        form.current,
        "YLUWX-DZ8Rj4RWl5w"
      );

      toast.success(res.data.message || "Appointment booked successfully!");

      setName("");
      setEmail("");
      setAppointmentDate("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to book the appointment!";
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Left Image */}
          <div className="hidden lg:block">
            <img
              src={appointmentImg}
              alt="Book Appointment"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-white to-blue-50">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center lg:text-left">
              Book your <span className="text-primaryColor">Appointment</span>
            </h2>

            <form ref={form} onSubmit={bookAppointment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  min={currentDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full text-white font-semibold text-lg py-3 rounded-lg transition duration-300 ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}>
                Book Now
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/consult"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                Book an online appointment instead
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Appointment;
