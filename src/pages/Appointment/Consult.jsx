/** @format */

import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header/Header";
import consultationImg from "../../assets/images/onlineAppointment.png";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
// import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api";

function Consultation() {
  const [currentDate, setCurrentDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [callType, setCallType] = useState("video");
  const [prescriptionNeed, setPrescriptionNeed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const form = useRef();

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
        email.trim() !== "" &&
        appointmentDate !== "" &&
        appointmentTime !== ""
    );
  }, [name, email, appointmentDate, appointmentTime]);

  const bookConsultation = async (e) => {
    e.preventDefault();

    try {
      // Backend booking
      const res = await api.post("consultations/book-consultation", {
        name,
        email,
        appointmentDate,
        appointmentTime,
        callType,
        prescriptionNeed,
      });

      // Send confirmation email
      await emailjs.sendForm(
        "service_67w4fp1",
        "template_3ahxliv",
        form.current,
        "9bIhBrnGj8qVHGlZ-"
      );

      toast.success(res.data.message || "Consultation booked successfully!");

      // Reset fields
      setName("");
      setEmail("");
      setAppointmentDate("");
      setAppointmentTime("");
      setCallType("video");
      setPrescriptionNeed(false);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to book the consultation!";
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-[1170px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="hidden lg:flex justify-center items-center">
            <figure className="w-full h-full flex justify-center items-center">
              <img
                src={consultationImg}
                className="max-w-full max-h-full object-contain"
                alt="Consultation"
              />
            </figure>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] font-bold mb-10 text-center lg:text-left">
              Book your Consultation Now
            </h3>

            <form ref={form} onSubmit={bookConsultation}>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="time"
                  name="appointmentTime"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor"
                  required
                />
              </div>

              <div className="mb-5">
                <select
                  name="callType"
                  value={callType}
                  onChange={(e) => setCallType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primaryColor">
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                </select>
              </div>

              <div className="mb-5 flex items-center">
                <input
                  type="checkbox"
                  name="prescriptionNeed"
                  checked={prescriptionNeed}
                  onChange={() =>
                    setPrescriptionNeed((prevState) => !prevState)
                  }
                  className="mr-2"
                />
                <label htmlFor="prescriptionNeed">Prescription Needed?</label>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 px-4 font-semibold rounded-lg transition-colors duration-300 ${
                    isFormValid
                      ? "bg-primaryColor text-white hover:bg-primaryDark"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  Book Consultation
                </button>
              </div>
            </form>

            <div className="mt-4 text-center lg:text-left">
              <Link
                to="/appointment"
                className="text-primaryColor hover:underline text-sm lg:text-base">
                Visit our clinic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultation;
