/** @format */

import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header/Header";
import consultationImg from "../../assets/images/onlineAppointment.png";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
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
      const res = await api.post("consultations/book-consultation", {
        name,
        email,
        appointmentDate,
        appointmentTime,
        callType,
        prescriptionNeed,
      });

      await emailjs.sendForm(
        "service_67w4fp1",
        "template_3ahxliv",
        form.current,
        "9bIhBrnGj8qVHGlZ-"
      );

      toast.success(res.data.message || "Consultation booked successfully!");

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
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Left Image */}
          <div className="hidden lg:flex justify-center items-center bg-blue-50">
            <img
              src={consultationImg}
              alt="Online Consultation"
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Right Form */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-white to-blue-50">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center lg:text-left">
              Book an{" "}
              <span className="text-primaryColor">Online Consultation</span>
            </h2>

            <form ref={form} onSubmit={bookConsultation} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    min={currentDate}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Call Type
                </label>
                <select
                  name="callType"
                  value={callType}
                  onChange={(e) => setCallType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="prescriptionNeed"
                  checked={prescriptionNeed}
                  onChange={() => setPrescriptionNeed((prev) => !prev)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                  Prescription Needed?
                </label>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-300 ${
                    isFormValid
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  Book Consultation
                </button>
              </div>
            </form>

            <div className="mt-5 text-center">
              <Link
                to="/appointment"
                className="text-blue-600 hover:underline font-medium">
                Prefer in-clinic visit?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Consultation;
