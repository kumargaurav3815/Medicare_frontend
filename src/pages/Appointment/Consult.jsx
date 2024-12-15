/** @format */

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import consultationImg from "../../assets/images/onlineAppointment.png";
import Header from "../../components/Header/Header";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

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
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    const isValid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      appointmentDate !== "" &&
      appointmentTime !== "";
    setIsFormValid(isValid);
  }, [name, email, appointmentDate, appointmentTime]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_67w4fp1",
        "template_3ahxliv",
        form.current,
        "9bIhBrnGj8qVHGlZ-"
      )
      .then(
        () => {
          toast.success("Consultation booked and email sent successfully!!");
        },
        () => {
          toast.error("Failed to send the email. Please try again.");
        }
      );
  };

  const bookConsultation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/consultations/book-consultation",
        {
          name,
          email,
          appointmentDate,
          appointmentTime,
          callType,
          prescriptionNeed,
        }
      );

      sendEmail(e);

      setName("");
      setEmail("");
      setAppointmentDate("");
      setAppointmentTime("");
      setCallType("video");
      setPrescriptionNeed(false);

      toast.success(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to book the consultation!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-[1170px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:flex justify-center items-center">
            <figure className="w-full h-full flex justify-center items-center">
              <img
                src={consultationImg}
                className="max-w-full max-h-full object-contain"
                alt="Consultation"
              />
            </figure>
          </div>

          <div className="p-8 lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Book your Consultation Now
            </h3>

            <form ref={form} onSubmit={bookConsultation}>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                />
              </div>

              <div className="mb-5">
                <input
                  type="date"
                  id="appointment"
                  name="appointmentDate"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1"
                  min={currentDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="time"
                  name="appointmentTime"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </div>

              <div className="mb-5">
                <select
                  name="callType"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mt-1"
                  value={callType}
                  onChange={(e) => setCallType(e.target.value)}>
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                </select>
              </div>

              <div className="mb-5 flex items-center">
                <input
                  type="checkbox"
                  name="prescriptionNeed"
                  checked={prescriptionNeed}
                  onChange={() => setPrescriptionNeed(!prescriptionNeed)}
                  className="mr-2"
                />
                <label>Prescription Needed?</label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full py-2 px-4 bg-primaryColor text-white font-bold rounded-md disabled:bg-gray-400">
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
