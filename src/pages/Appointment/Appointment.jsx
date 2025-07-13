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
      // Book appointment API call
      const res = await api.post("/appointments/book", {
        name,
        email,
        appointmentDate,
      });

      // Send confirmation email
      await emailjs.sendForm(
        "service_7jvv9ri",
        "template_jzdhqpk",
        form.current,
        "YLUWX-DZ8Rj4RWl5w"
      );

      toast.success(res.data.message || "Appointment booked successfully!");

      // Reset form
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
      <div className="max-w-[1170px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Image */}
          <div className="hidden lg:block">
            <figure className="rounded-l-lg">
              <img
                src={appointmentImg}
                className="w-full h-full object-cover"
                alt="Appointment"
              />
            </figure>
          </div>

          {/* Right Form */}
          <div className="p-8 lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Book your Appointment Now
            </h3>

            <form ref={form} onSubmit={bookAppointment}>
              <div className="mb-5">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-5">
                <input
                  type="date"
                  name="appointmentDate"
                  min={currentDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full text-[18px] leading-[30px] rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isFormValid
                      ? "bg-primaryColor text-white hover:bg-primaryDark"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  Book Now
                </button>
              </div>
            </form>

            <div className="mt-4 text-center lg:text-left">
              <Link
                to="/consult"
                className="text-primaryColor hover:underline block">
                Book an online appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
