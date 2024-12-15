/** @format */

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appointmentImg from "../../assets/images/appointment.gif";
import Header from "../../components/Header/Header";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

function Appointment() {
  const [currentDate, setCurrentDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    const isValid =
      name.trim() !== "" && email.trim() !== "" && appointmentDate !== "";
    setIsFormValid(isValid);
  }, [name, email, appointmentDate]);

  const form = useRef();

  const bookAppointment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/appointments/book",
        {
          name,
          email,
          appointmentDate,
        }
      );

      emailjs
        .sendForm(
          "service_7jvv9ri",
          "template_jzdhqpk",
          form.current,
          "YLUWX-DZ8Rj4RWl5w"
        )
        .then(
          () => {
            toast.success("Appointment booked and email sent successfully!");
          },
          (error) => {
            toast.error("Failed to send the email, please try again.");
          }
        );

      toast.success(response.data.message);
      setName("");
      setEmail("");
      setAppointmentDate("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to book the appointment!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-[1170px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block">
            <figure className="rounded-l-lg">
              <img
                src={appointmentImg}
                className="w-full h-full object-cover"
                alt="Appointment"
              />
            </figure>
          </div>

          <div className="p-8 lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Book your Appointment Now
            </h3>

            <form ref={form} onSubmit={bookAppointment}>
              <div className="mb-5">
                <input
                  type="text"
                  name="full_name"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1"
                  placeholder="Full Name"
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
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1 text-black"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-5">
                <input
                  type="date"
                  id="appointment"
                  name="appointment"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1"
                  min={currentDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                  autoComplete="date"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className={`w-full text-[18px] leading-[30px] rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isFormValid
                      ? "bg-primaryColor text-white hover:bg-primaryDark"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}>
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
