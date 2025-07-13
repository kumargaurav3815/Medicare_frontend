/** @format */

import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header/Header";
import consultationImg from "../../assets/images/onlineAppointment.png";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import api from "../../api"; // ⬅️ Axios instance with baseURL
import "react-toastify/dist/ReactToastify.css";

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
    setCurrentDate(new Date().toISOString().split("T")[0]);
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
      // Backend consultation booking
      const res = await api.post("/api/v1/consultations/book-consultation", {
        name,
        email,
        appointmentDate,
        appointmentTime,
        callType,
        prescriptionNeed,
      });

      // EmailJS confirmation
      await emailjs.sendForm(
        "service_67w4fp1",
        "template_3ahxliv",
        form.current,
        "9bIhBrnGj8qVHGlZ-"
      );

      toast.success(res.data.message || "Consultation booked successfully!");

      // Reset form
      setName("");
      setEmail("");
      setAppointmentDate("");
      setAppointmentTime("");
      setCallType("video");
      setPrescriptionNeed(false);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(
        err.response?.data?.message || "Failed to book consultation!"
      );
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-[1170px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Image */}
          <div className="hidden lg:flex items-center justify-center">
            <img
              src={consultationImg}
              alt="Consultation"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Right - Form */}
          <div className="p-8 lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] font-bold mb-10 text-center lg:text-left">
              Book your Consultation Now
            </h3>

            <form ref={form} onSubmit={bookConsultation}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input-style mb-5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input-style mb-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />

              <input
                type="date"
                name="appointmentDate"
                min={currentDate}
                className="input-style mb-5"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />

              <input
                type="time"
                name="appointmentTime"
                className="input-style mb-5"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />

              <select
                name="callType"
                className="input-style mb-5"
                value={callType}
                onChange={(e) => setCallType(e.target.value)}>
                <option value="video">Video Call</option>
                <option value="audio">Audio Call</option>
              </select>

              <div className="mb-5 flex items-center">
                <input
                  type="checkbox"
                  name="prescriptionNeed"
                  checked={prescriptionNeed}
                  onChange={() => setPrescriptionNeed(!prescriptionNeed)}
                  className="mr-2"
                />
                <label htmlFor="prescriptionNeed">Prescription Needed?</label>
              </div>

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
